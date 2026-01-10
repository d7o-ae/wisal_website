// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwffmFON8Ymp-txflTFaCSswcNjlsLsIM",
  authDomain: "wisal-5d1e5.firebaseapp.com",
  projectId: "wisal-5d1e5",
  storageBucket: "wisal-5d1e5.firebasestorage.app",
  messagingSenderId: "658940575542",
  appId: "1:658940575542:web:b05c368b6d1e2e1e973d97",
  measurementId: "G-T8FD9L9B4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
export const db = getFirestore(app);
