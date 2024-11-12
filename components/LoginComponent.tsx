import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

type LoginProps = {
  onLogin: (email: string, password: string) => void;
  errorMessage: string;
};

const Login: React.FC<LoginProps> = ({ onLogin, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Simulando uma atualização
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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
              onPress={() => onLogin(email, password)}
            >
              <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.buttonCreate}>Ainda não possui uma conta!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#135e96',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal:  60,

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
  form: {
    alignItems: 'center',
    width: '100%',
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
