import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider ,FacebookAuthProvider ,GithubAuthProvider ,TwitterAuthProvider} from "firebase/auth";
// Initialize Firebase
const config = {
  apiKey: "AIzaSyArHdfvsqxQ0Yrtct4eKQD-b4Dk9qciowo",
  authDomain: "eurekadev-d5422.firebaseapp.com",
  // databaseURL: "https://race-acb4d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eurekadev-d5422",
  storageBucket: "eurekadev-d5422.appspot.com",
  messagingSenderId: "857876827694",
  appId: "1:857876827694:web:dce7be3159451766e559bf",
  measurementId: "G-0KN5PTMMNF"
};
// const config = {
//   apiKey: "AIzaSyAz-GPfA-hN74oFh3XvXsF9vQrlE5xpU10",
//   authDomain: "wieldy-4f59c.firebaseapp.com",
//   databaseURL: "https://wieldy-4f59c.firebaseio.com",
//   projectId: "wieldy-4f59c",
//   storageBucket: "wieldy-4f59c.appspot.com",
//   messagingSenderId: "81949884261"
// };

// firebase.initializeApp(config);
// const auth = firebase.auth();
const app = initializeApp(config);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const twitterAuthProvider = new TwitterAuthProvider();
const database = getDatabase(app);

export {
  database,
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};
