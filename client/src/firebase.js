import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCUPCHlcwIMzWe207bzJB1AzYCACVOLRJA",
  authDomain: "l360tutor.firebaseapp.com",
  projectId: "l360tutor",
  storageBucket: "l360tutor.appspot.com",
  messagingSenderId: "682214907713",
  appId: "1:682214907713:web:776c6d172137cf54ebcbc0",
  measurementId: "G-RGP8CGSF2S"
})

export const auth = app.auth()
export default app
