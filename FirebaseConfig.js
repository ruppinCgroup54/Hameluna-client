// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY ,
  authDomain: "hameluna-e8140.firebaseapp.com",
  databaseURL: "https://hameluna-e8140-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hameluna-e8140",
  storageBucket: "hameluna-e8140.appspot.com",
  messagingSenderId: "463648907717",
  appId: "1:463648907717:web:ff72a34dce530eb12eabac",
  measurementId: "G-PZNMWWTZP1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
