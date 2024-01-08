import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDmtsnNTQZzAl0RXh6SubNbToImkthwF9M",
  authDomain: "raja-cepat.firebaseapp.com",
  databaseURL: "https://raja-cepat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "raja-cepat",
  storageBucket: "raja-cepat.appspot.com",
  messagingSenderId: "246440045274",
  appId: "1:246440045274:web:4b1e3e7cb23b32222993e3",
  measurementId: "G-8T1FDDM55G"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});