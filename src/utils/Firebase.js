// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy_wumWZJVTmsThMzp_jSuKUj-NXx3Noo",
  authDomain: "chatflixai-9d6d8.firebaseapp.com",
  projectId: "chatflixai-9d6d8",
  storageBucket: "chatflixai-9d6d8.firebasestorage.app",
  messagingSenderId: "363318297814",
  appId: "1:363318297814:web:d63bfb9e3857abe6d13577",
  measurementId: "G-ZRRVM6CW2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();