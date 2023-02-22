import {initializeApp,cert} from "firebase-admin/app"

initializeApp({
    credential: cert(process.env.FIREBASE_KEY)
  });