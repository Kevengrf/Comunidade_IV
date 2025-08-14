import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9nAnHUnAVM5kYQK5EDTeeqyPLh_6TXcM", // Substitua pela sua chave real se for diferente
  authDomain: "comunidade-iv.firebaseapp.com",
  projectId: "comunidade-iv",
  storageBucket: "comunidade-iv.appspot.com",
  messagingSenderId: "822853877247",
  appId: "1:822853877247:web:0eef4bfa4f3aab0bfbca7c",
  measurementId: "G-78CMJMXH87" // Substitua pelo seu ID real se for diferente
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços do Firebase que serão utilizados no aplicativo
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);