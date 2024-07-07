// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "umarportfolio.firebaseapp.com",
  projectId: "umarportfolio",
  storageBucket: "umarportfolio.appspot.com",
  messagingSenderId: "552744147790",
  appId: "1:552744147790:web:e3f716941b3d17356edc1f",
  measurementId: "G-QJSSNESHJ7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
