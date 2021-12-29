import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyBmVwXYpv8Lnu65izVDgaWn6jkSm0yqM9I",
  authDomain: "crud-dc713.firebaseapp.com",
  projectId: "crud-dc713",
  storageBucket: "crud-dc713.appspot.com",
  messagingSenderId: "171463060687",
  appId: "1:171463060687:web:91767847de02a74d1e9bba",
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();