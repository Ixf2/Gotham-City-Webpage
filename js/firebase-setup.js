// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3kAu8CstilbjvC94gj29Gyb-FWdEElFk",
  authDomain: "gotham-city-webpage-proyecto.firebaseapp.com",
  projectId: "gotham-city-webpage-proyecto",
  storageBucket: "gotham-city-webpage-proyecto.firebasestorage.app",
  messagingSenderId: "148141084936",
  appId: "1:148141084936:web:fe6f7ae51b763bf0d5dcbd",
  measurementId: "G-443VQ84RK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);