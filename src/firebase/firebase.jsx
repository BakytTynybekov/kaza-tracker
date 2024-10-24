// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "kaza-namaz-a1700.firebaseapp.com",
  projectId: "kaza-namaz-a1700",
  storageBucket: "kaza-namaz-a1700.appspot.com",
  messagingSenderId: "250300286553",
  appId: "1:250300286553:web:bacc16fd92c0cc4b1fd348",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);
