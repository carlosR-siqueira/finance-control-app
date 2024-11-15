//api/auth/AuthContext.tsx
import { ref, set } from 'firebase/database';
import { auth, database } from '../../lib/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<User | undefined>;
  createUser: (email: string, password: string, name: string) => Promise<User | undefined>;
 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função de login
export const loginUser = async (email: string, password: string): Promise<User | undefined> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Função de criação de usuário
export const createUser = async (email: string, password: string, name: string, profileImageUrl?: string): Promise<User | undefined> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      // Atualizar o nome do usuário
      await updateProfile(user, { displayName: name });

      // Salvar os dados do usuário no Realtime Database, incluindo a URL da imagem de perfil
      await set(ref(database, `users/${user.uid}`), {
        email: user.email,
        name, // Usar o nome fornecido no form
        createdAt: new Date().toISOString(),
        uid: user.uid,
        profileImageUrl: profileImageUrl || null, // Se tiver URL da imagem, adiciona; caso contrário, deixa como null
      });
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};




// O AuthProvider que gerencia o estado de autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Valores do contexto
  const value = {
    user,
    loading,
    loginUser,
    createUser,
    
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para acessar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
