// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FAREBASE_API_KEY'),
  authDomain: "blog-app-78bdc.firebaseapp.com",
  projectId: "blog-app-78bdc",  
  storageBucket: "blog-app-78bdc.firebasestorage.app",
  messagingSenderId: "366214273693",
  appId: "1:366214273693:web:38d483defd7877cf1b5274"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth , provider}