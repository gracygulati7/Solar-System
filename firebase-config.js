// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCl8_Hg0O7LN-PMh_JvE64bj-wdph-Amc8",
    authDomain: "solar-system-a9468.firebaseapp.com",
    projectId: "solar-system-a9468",
    storageBucket: "solar-system-a9468.firebasestorage.app",
    messagingSenderId: "1060640703745",
    appId: "1:1060640703745:web:203abddf80d1ec388bc700"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


