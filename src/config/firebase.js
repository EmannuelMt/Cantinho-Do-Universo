import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCeaPgAwPv0_pj9TVNda2jqg9mtp6wvj84",
  authDomain: "cantinho-do-universo-90361.firebaseapp.com",
  projectId: "cantinho-do-universo-90361",
  storageBucket: "cantinho-do-universo-90361.firebasestorage.app",
  messagingSenderId: "1075454284596",
  appId: "1:1075454284596:web:203a378eb1a425e1c24b61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;