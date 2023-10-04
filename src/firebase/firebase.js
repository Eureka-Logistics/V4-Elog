import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider ,FacebookAuthProvider ,GithubAuthProvider ,TwitterAuthProvider} from "firebase/auth";
// Initialize Firebase
const config = {
  apiKey: "AIzaSyBadE6ILm5J35O2yWcuC7stPaUGdyJJOAw",
  authDomain: "race-acb4d.firebaseapp.com",
  databaseURL: "https://race-acb4d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "race-acb4d",
  storageBucket: "race-acb4d.appspot.com",
  messagingSenderId: "260622640484",
  appId: "1:260622640484:web:d90f8c65763ab8c9dac671",
  measurementId: "G-ZNN60QPY4C"
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
