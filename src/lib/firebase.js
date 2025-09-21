import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyCMdgyLkBik9NYjcqhYNnpWwd0B17rivkY",
  authDomain: "myprojext-45057.firebaseapp.com",
  projectId: "myprojext-45057",
  storageBucket: "myprojext-45057.firebasestorage.app",
  messagingSenderId: "465434881095",
  appId: "1:465434881095:web:fc9d49b8e2c02633b7d562",
  measurementId: "G-RDNJ9P9D0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
