// app/login/index.tsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from '../../components/LoginComponent'; // Importação do componente de login
import { loginUser } from '../../api/auth/authContext'; // Função de login do Firebase
import { useRouter } from 'expo-router';  // Para navegação no expo-router

const LoginScreen: React.FC = () => {
  const [error, setError] = useState(''); // Estado para mensagens de erro
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      await loginUser(email, password); // Executa a função de login
      router.push('/(tabs)'); // Redireciona para a página principal após o login
    } catch (error: any) {
      setError(error.message); // Exibe uma mensagem de erro caso o login falhe
    }
  };

  return (
    
      <Login onLogin={handleLogin} errorMessage={error} />
    
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

export default LoginScreen;
