import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCX5x3wvWim4EBsNE73rsnkhKp74Ejw7V4",
  authDomain: "ourtube-a2b99.firebaseapp.com",
  projectId: "ourtube-a2b99",
  storageBucket: "ourtube-a2b99.appspot.com",
  messagingSenderId: "1027937944652",
  appId: "1:1027937944652:web:c3adf908b997766da820e9",
  measurementId: "G-E9S49EXYD4",
};
console.log(process.env.FIREBASE_API, "jjjj");
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
