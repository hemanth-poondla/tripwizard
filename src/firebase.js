import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4MbH_gbvIhqZ9DSNWkcmRGFg1jDEfVzY",
    authDomain: "tripwizard-client.firebaseapp.com",
    projectId: "tripwizard-client",
    storageBucket: "tripwizard-client.firebasestorage.app",
    messagingSenderId: "476766368457",
    appId: "1:476766368457:web:b82e713a80526d12fb9318",
    measurementId: "G-Z9YLMV8RJB"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
