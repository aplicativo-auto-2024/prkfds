import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBLCKgRLmvT2RkJUjgKOa1GaEkSMBOWaiU",
    authDomain: "visu-new-7729d.firebaseapp.com",
    projectId: "visu-new-7729d",
    storageBucket: "visu-new-7729d.appspot.com",
    messagingSenderId: "390611655815",
    appId: "1:390611655815:web:5685885c5fd3e47a46ac22"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const storage = app.storage();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider, firebase as default };


