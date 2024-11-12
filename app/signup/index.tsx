import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import SignUpForm from '../../components/SignUpComponent';  // Importando o novo componente
import { createUser } from '../../api/auth/authContext'; // Função de criar usuário

const SignUpScreen: React.FC = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (email: string, password: string) => {
    try {
      await createUser(email, password);  // Chama a função de criar usuário
      router.push('/(tabs)');  // Após o registro, redireciona para o login
    } catch (error: any) {
      setError(error.message);  // Exibe a mensagem de erro, caso ocorra
    }
  };

  return (
    <SignUpForm onSignUp={handleSignUp} errorMessage={error} />
  );
};

export default SignUpScreen;
