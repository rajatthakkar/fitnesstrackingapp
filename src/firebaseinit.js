// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvgGxZezLlGe_KlGTzl7GkdrI6piU5qEo",
  authDomain: "habbittracker-1213e.firebaseapp.com",
  projectId: "habbittracker-1213e",
  storageBucket: "habbittracker-1213e.appspot.com",
  messagingSenderId: "488228214587",
  appId: "1:488228214587:web:32799ad6b232717851091e",
  measurementId: "G-E3N1DK4XV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);