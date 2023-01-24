// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6-R7RGV7cRzsqNAW8KcoCpb2b8BOX1mc",
  authDomain: "chat-681b2.firebaseapp.com",
  projectId: "chat-681b2",
  storageBucket: "chat-681b2.appspot.com",
  messagingSenderId: "474522452290",
  appId: "1:474522452290:web:d686a9ef481ed890b788db"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)