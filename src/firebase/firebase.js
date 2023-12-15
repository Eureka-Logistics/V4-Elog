import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { ref, onValue } from "firebase/database";


// Initialize Firebase

const config = {
  apiKey: "AIzaSyDmtsnNTQZzAl0RXh6SubNbToImkthwF9M",
  authDomain: "raja-cepat.firebaseapp.com",
  projectId: "raja-cepat",
  storageBucket: "raja-cepat.appspot.com",
  messagingSenderId: "246440045274",
  appId: "1:246440045274:web:4b1e3e7cb23b32222993e3",
  measurementId: "G-8T1FDDM55G"
};
const app = initializeApp(config);
const firestore = getFirestore(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const twitterAuthProvider = new TwitterAuthProvider();
const database = getDatabase(app);




export {
  database,
  firestore,
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};
