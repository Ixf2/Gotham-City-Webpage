// firebase-setup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const FIREBASE_CONFIG = { apiKey: "AIzaSyA3kAu8CstilbjvC94gj29Gyb-FWdEElFk",
  authDomain: "gotham-city-webpage-proyecto.firebaseapp.com",
  databaseURL: "https://gotham-city-webpage-proyecto-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "gotham-city-webpage-proyecto",
  storageBucket: "gotham-city-webpage-proyecto.appspot.com",
  messagingSenderId: "148141084936",
  appId: "1:148141084936:web:fe6f7ae51b763bf0d5dcbd",
  measurementId: "G-443VQ84RK8" };
const APP = initializeApp(FIREBASE_CONFIG);

export const DB = getDatabase(APP);
export const AUTH = getAuth(APP);
export const db = getFirestore(APP);

