// lib/firebaseConfig.ts
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBug6PHwI7MvRf8ceElcFqaZqbMafXNGRg",
  authDomain: "finace-control-app.firebaseapp.com",
  databaseURL: "https://finace-control-app-default-rtdb.firebaseio.com",
  projectId: "finace-control-app",
  storageBucket: "finace-control-app.appspot.com",
  messagingSenderId: "741642799744",
  appId: "1:741642799744:web:f07dcb20f06ff14d16f465",
};

// Inicializa o app Firebase se ainda não existir um
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Inicializa o Auth com persistência do AsyncStorage
let auth = getAuth(app); // Placeholder
if (!getApps().length) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Inicializa o Realtime Database
const database = getDatabase(app);

export { auth, database };
