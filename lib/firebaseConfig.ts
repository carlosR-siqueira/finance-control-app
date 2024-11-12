// lib/firebaseConfig.ts
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, initializeAuth, Auth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa o AsyncStorage corretamente
import { getReactNativePersistence } from "firebase/auth"; // Importa a persistência para React Native

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

// Inicializa o app Firebase se ainda não existir um
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Inicializa o Auth com persistência de AsyncStorage
const auth = getApps().length === 0
  ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
  : getAuth(app);

const database = getDatabase(app);

export { auth, database };