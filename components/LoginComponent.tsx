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

type LoginFormProps = {
  onLogin: (email: string, password: string) => void;
  errorMessage: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(email, password);
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
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
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

export default LoginForm;
