import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from '../../components/LoginComponent'; // Corrigido o nome da importação para Login
import { loginUser } from '../../api/auth/auth'; // Função de login
import { useRouter } from 'expo-router';  // Usando useRouter para navegação no expo-router

const LoginScreen: React.FC = () => {
  const [error, setError] = useState('');
  const router = useRouter();  // Navegação com o useRouter

  const handleLogin = async (email: string, password: string) => {
    try {
      await loginUser(email, password); // Chama a função loginUser
      router.push('/index'); // Após o login, redireciona para a página principal (ou home)
    } catch (error: any) {
      setError(error.message); // Exibe a mensagem de erro, caso ocorra
    }
  };

  return (
    <View style={styles.container}>
      <Login onLogin={handleLogin} errorMessage={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
