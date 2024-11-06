// lib/firebaseConfig.ts
import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o AsyncStorage corretamente
import { getReactNativePersistence } from "firebase/auth"; // Importação da persistência para React Native

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBug6PHwI7MvRf8ceElcFqaZqbMafXNGRg",
  authDomain: "finace-control-app.firebaseapp.com",
  databaseURL: "https://finace-control-app-default-rtdb.firebaseio.com",
  projectId: "finace-control-app",
  storageBucket: "finace-control-app.appspot.com",
  messagingSenderId: "741642799744",
  appId: "1:741642799744:web:f07dcb20f06ff14d16f465"
};

// Tente pegar a instância do app Firebase existente, caso contrário, inicialize
let app: FirebaseApp;
try {
  app = getApp(); // Tenta pegar a instância existente
} catch (error) {
  app = initializeApp(firebaseConfig); // Caso não tenha, inicializa a instância
}

// Inicializa o Firebase Authentication com persistência usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa o Realtime Database
const database = getDatabase(app);

export { database, auth };
