// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsa6xgRPcWkFzmKT5-hsJXCDwGx4YoALI",
  authDomain: "kredo-7245e.firebaseapp.com",
  projectId: "kredo-7245e",
  storageBucket: "kredo-7245e.firebasestorage.app",
  messagingSenderId: "682278952487",
  appId: "1:682278952487:web:10b33b32f421f6b62d7802",
  measurementId: "G-B8KV8VMQVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)