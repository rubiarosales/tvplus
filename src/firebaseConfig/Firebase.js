import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAK6ZSeaLmu3goDVMAY8Dqbgj0LE1rpUrM",
    authDomain: "tvplus-23302.firebaseapp.com",
    projectId: "tvplus-23302",
    storageBucket: "tvplus-23302.appspot.com",
    messagingSenderId: "16245606448",
    appId: "1:16245606448:web:0e051173f7065b8c7245f5"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);