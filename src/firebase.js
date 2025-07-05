// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGdOJ537xx4Kp9c60BUckUod6GRJg569w",
  authDomain: "realtimechat-react-18f98.firebaseapp.com",
  projectId: "realtimechat-react-18f98",
  storageBucket: "realtimechat-react-18f98.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:0987654321abcdef"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
