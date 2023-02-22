import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB64sg5GTiYV3S1OOwK2VEf1A3tlaeZYbA",
  authDomain: "asdf-86eb9.firebaseapp.com",
  projectId: "asdf-86eb9",
  storageBucket: "asdf-86eb9.appspot.com",
  messagingSenderId: "371956113122",
  appId: "1:371956113122:web:31cffe18d74f587fad48bb",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
