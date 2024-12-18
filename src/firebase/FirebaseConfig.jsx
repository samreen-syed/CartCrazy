// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSLLZIJZMSCWM-YiTpBexwkPq_oO_infU",
  authDomain: "myecom-33978.firebaseapp.com",
  projectId: "myecom-33978",
  storageBucket: "myecom-33978.firebasestorage.app",
  messagingSenderId: "480920453330",
  appId: "1:480920453330:web:1edd9b8110569a3765ad0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }