// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0YmHGXYgwE64vUmoTxNavvhh7cSFGSNk",
    authDomain: "panisha-portfoilo.firebaseapp.com",
    projectId: "panisha-portfoilo",
    storageBucket: "panisha-portfoilo.firebasestorage.app",
    messagingSenderId: "299493886502",
    appId: "1:299493886502:web:acdcc53c83d2d7760934e7",
    measurementId: "G-5HVXGLPJGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
