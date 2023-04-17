// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBNBKon4xO7uS3Zl78o0nKtQhz7QogN3k",
  authDomain: "travel-tracking-app.firebaseapp.com",
  projectId: "travel-tracking-app",
  storageBucket: "travel-tracking-app.appspot.com",
  messagingSenderId: "17348634605",
  appId: "1:17348634605:web:c9faca5feff7a6e47429e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
