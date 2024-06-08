import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAJPFjUXKvLWuVO0Q7Ym63ucqjBs9aFc-4",
    authDomain: "site-bruno-25206.firebaseapp.com",
    projectId: "site-bruno-25206",
    storageBucket: "site-bruno-25206.appspot.com",
    messagingSenderId: "375748976839",
    appId: "1:375748976839:web:6a8281c7980d696da95ee2"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const storage = app.storage();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider, firebase as default };


