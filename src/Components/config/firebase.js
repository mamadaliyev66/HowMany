// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWuQ_ncFCaOoLjRQ27R3muevHcZxVdtUw",
    authDomain: "howmany-7d055.firebaseapp.com",
    projectId: "howmany-7d055",
    storageBucket: "howmany-7d055.appspot.com",
    messagingSenderId: "353676550617",
    appId: "1:353676550617:web:07a5e5a1a5ae99711cb9c8",
    measurementId: "G-Y966F7ZQRG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };