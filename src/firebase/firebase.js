import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { getMessaging, getToken } from "firebase/messaging";

// Initialize Firebase

const config = {
  apiKey: "AIzaSyDmtsnNTQZzAl0RXh6SubNbToImkthwF9M",
  authDomain: "raja-cepat.firebaseapp.com",
  databaseURL: "https://raja-cepat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "raja-cepat",
  storageBucket: "raja-cepat.appspot.com",
  messagingSenderId: "246440045274",
  appId: "1:246440045274:web:4b1e3e7cb23b32222993e3",
  measurementId: "G-8T1FDDM55G"

  // apiKey: "AIzaSyDmtsnNTQZzAl0RXh6SubNbToImkthwF9M",
  // authDomain: "raja-cepat.firebaseapp.com",
  // projectId: "raja-cepat",
  // storageBucket: "raja-cepat.appspot.com",
  // messagingSenderId: "246440045274",
  // appId: "1:246440045274:web:4b1e3e7cb23b32222993e3",
  // measurementId: "G-8T1FDDM55G"
};
const app = initializeApp(config);
const firestore = getFirestore(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const twitterAuthProvider = new TwitterAuthProvider();
const database = getDatabase(app);
const messaging = getMessaging(app);
// Add the public key generated from the console here.
getToken(messaging, { vapidKey: "BDzOy_PqJuOr9ZCr5BLW1gJy94mQiaWNB0cOPQpH8h4W0Vrz79Yf0K4mYP2nZ2XPAfPApYwR69FDFiX573_cZWo" }).then((currentToken) => {
  if (currentToken) {
   console.log(`currentToken`,currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
export {
  database,
  firestore,
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};
