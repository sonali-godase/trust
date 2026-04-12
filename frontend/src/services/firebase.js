
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRg2jloz78kadtI1gZVzJeiYtIVWqmJ6E",
  authDomain: "trust-management-system-e9e33.firebaseapp.com",
  projectId: "trust-management-system-e9e33",
  storageBucket: "trust-management-system-e9e33.firebasestorage.app",
  messagingSenderId: "575853664482",
  appId: "1:575853664482:web:267a8bd870e0247905e6bb",
  measurementId: "G-ZRFDM1ZY7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);