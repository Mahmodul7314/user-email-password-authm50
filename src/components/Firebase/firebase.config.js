// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOwsAYNOjY7T5ZDbcUKkygf2OTxIHSFhk",
  authDomain: "user-email--password--auth.firebaseapp.com",
  projectId: "user-email--password--auth",
  storageBucket: "user-email--password--auth.appspot.com",
  messagingSenderId: "135366537491",
  appId: "1:135366537491:web:e43f7b858342416109aae6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;