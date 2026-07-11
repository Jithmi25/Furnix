// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEJ2OlyaKM3F74LC9-tyPUMdFIvIT1I0I",
  authDomain: "furnix-63f75.firebaseapp.com",
  projectId: "furnix-63f75",
  storageBucket: "furnix-63f75.firebasestorage.app",
  messagingSenderId: "1083767598996",
  appId: "1:1083767598996:web:a09663caa989075a18e981",
  measurementId: "G-TSHD16PRYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and export it so other files can use it
export const auth = getAuth(app);