import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAc0qw4NiIlzYRv0BQYzEbw_8eSfy9LN1M",
  authDomain: "real-estate-e2da5.firebaseapp.com",
  projectId: "real-estate-e2da5",
  storageBucket: "real-estate-e2da5.firebasestorage.app",
  messagingSenderId: "663341820627",
  appId: "1:663341820627:web:7ea0a86d9f8e8db57fc226",
  measurementId: "G-HR73F7RSL7"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore()
// const analytics = getAnalytics(app);