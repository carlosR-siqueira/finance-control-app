//components/signUpComponent.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

type SignUpFormProps = {
  onSignUp: (email: string, password: string, Name: string) => void;
  errorMessage: string;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleSignUp = () => {
    if (password === confirmPassword) {
      onSignUp(email, password, Name);
    } else {
      setIsPasswordMatch(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userImage}>
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.image}
        />
      </View>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={Name}
          onChangeText={setName}
          autoCapitalize="none"
        /> 
        <TextInput
         style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      {!isPasswordMatch && (
        <Text style={styles.error}>As senhas não coincidem</Text>
      )}
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#135e96',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 60,
  },
  userImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#008D85',
    width: 170,
    height: 170,
    borderRadius: 100,
    marginBottom: 40,
  },
  image: {
    width: 108,
    height: 108,
  },
  input: {
    backgroundColor: '#FFF',
    width: 250,
    height: 35,
    borderRadius: 5,
    padding: 5,
    marginBottom: 13,
  },
  button: {
    backgroundColor: '#00229A',
    width: 100,
    height: 30,
    borderRadius: 5,
    marginTop: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  link: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUpForm;
