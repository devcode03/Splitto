import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsZx7drDCvDv8O6t7Y3EKaABexxyG964s",
  authDomain: "mysplittoapp.firebaseapp.com",
  projectId: "mysplittoapp",
  storageBucket: "mysplittoapp.firebasestorage.app",
  messagingSenderId: "833702008163",
  appId: "1:833702008163:web:d0edafacd3b838c07e2f56",
  measurementId: "G-YWDR9RGZJY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;