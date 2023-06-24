import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8OlriDaBzPUidE6UuE62EQ2rEPQvKAbk",
  authDomain: "fir-course-9ea95.firebaseapp.com",
  projectId: "fir-course-9ea95",
  storageBucket: "fir-course-9ea95.appspot.com",
  messagingSenderId: "330131505354",
  appId: "1:330131505354:web:e815df536adf1e5ec43433"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(app);