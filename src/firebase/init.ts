import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOsKgtTmINOlaQ3z60wzX7zHTb2azTcPM",
  authDomain: "books-9bc9a.firebaseapp.com",
  databaseURL: "https://books-9bc9a.firebaseio.com",
  projectId: "books-9bc9a",
  storageBucket: "books-9bc9a.appspot.com",
  messagingSenderId: "189708821435",
  appId: "1:189708821435:web:017edb3f0b7929d4205a9e"
};

firebase.initializeApp(firebaseConfig);
const emailAuthProvider = firebase.auth.EmailAuthProvider.PROVIDER_ID;
const db = firebase.firestore();

export { firebase, emailAuthProvider, db };