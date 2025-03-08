// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEQXgrdnDV85sH9ibYZ-iFPC0B4HsTYsk",
  authDomain: "splitto-32325.firebaseapp.com",
  projectId: "splitto-32325",
  storageBucket: "splitto-32325.firebasestorage.app",
  messagingSenderId: "204761989326",
  appId: "1:204761989326:web:fc300ac27e16fbeb5dd09f",
  measurementId: "G-KPJWRB55WM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
