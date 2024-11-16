// api/auth/AuthContext.tsx
import { ref, set } from 'firebase/database';
import { auth, database } from '../../lib/firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Interface do Contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<User | undefined>;
  createUser: (
    email: string,
    password: string,
    name: string,
    profileImageUrl?: string
  ) => Promise<User | undefined>;
  logoutUser: () => Promise<void>; // Função de logout
}

// Contexto de Autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função de login
export const loginUser = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Erro ao fazer login:', error.message);
    throw new Error('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
  }
};

// Função de criação de usuário
export const createUser = async (
  email: string,
  password: string,
  name: string,
  profileImageUrl?: string
): Promise<User | undefined> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      // Atualizar o perfil do usuário
      await updateProfile(user, { displayName: name });

      // Salvar os dados do usuário no Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        email: user.email,
        name,
        createdAt: new Date().toISOString(),
        uid: user.uid,
        profileImageUrl: profileImageUrl || null,
      });
    }

    return user;
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error.message);
    throw new Error('Erro ao criar usuário. Verifique as informações e tente novamente.');
  }
};

// Função de logout
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('Usuário deslogado com sucesso');
  } catch (error: any) {
    console.error('Erro ao fazer logout:', error.message);
    throw new Error('Erro ao fazer logout. Tente novamente mais tarde.');
  }
};

// AuthProvider para gerenciar o estado de autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    loginUser,
    createUser,
    logoutUser, // Adiciona logout ao contexto
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para consumir o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider.');
  }
  return context;
};
