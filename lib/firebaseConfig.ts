// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBug6PHwI7MvRf8ceElcFqaZqbMafXNGRg",
  authDomain: "finace-control-app.firebaseapp.com",
  databaseURL: "https://finace-control-app-default-rtdb.firebaseio.com",
  projectId: "finace-control-app",
  storageBucket: "finace-control-app.appspot.com",
  messagingSenderId: "741642799744",
  appId: "1:741642799744:web:f07dcb20f06ff14d16f465"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
