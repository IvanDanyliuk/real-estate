// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc0qw4NiIlzYRv0BQYzEbw_8eSfy9LN1M",
  authDomain: "real-estate-e2da5.firebaseapp.com",
  projectId: "real-estate-e2da5",
  storageBucket: "real-estate-e2da5.firebasestorage.app",
  messagingSenderId: "663341820627",
  appId: "1:663341820627:web:7ea0a86d9f8e8db57fc226",
  measurementId: "G-HR73F7RSL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);