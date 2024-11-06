import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router'; // Importando useRouter para navegação

type LoginProps = {
  onLogin: (email: string, password: string) => void; // Função para login
  errorMessage: string; // Mensagem de erro
};

const Login: React.FC<LoginProps> = ({ onLogin, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();  // Usando o hook useRouter

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.userImage}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            autoCapitalize="none"
            secureTextEntry
            placeholderTextColor="#000"
            value={password}
            onChangeText={setPassword}
          />
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonForm}
            onPress={() => onLogin(email, password)} // Chama a função onLogin
          >
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/')}> {/* Usando router.push no lugar de navigation.navigate */}
            <Text style={styles.buttonCreate}>Ainda não possui uma conta!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006660',
  },
  userImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#008D85',
    width: 170,
    height: 170,
    borderRadius: 100,
    marginBottom: 54,
    marginTop: 60,
  },
  image: {
    width: 108,
    height: 108,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    width: 250,
    height: 35,
    borderRadius: 5,
    padding: 5,
    marginBottom: 13,
  },
  buttonForm: {
    backgroundColor: '#00229A',
    width: 100,
    height: 30,
    borderRadius: 5,
    marginTop: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonCreate: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
