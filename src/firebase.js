import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDo2Z29tKqwpL2k4L3byAuVATaEhZuWBDI",
    authDomain: "bruno-new-app-a3547.firebaseapp.com",
    projectId: "bruno-new-app-a3547",
    storageBucket: "bruno-new-app-a3547.appspot.com",
    messagingSenderId: "591103658956",
    appId: "1:591103658956:web:b4019b42c97838f148ab69"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const storage = app.storage();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider, firebase as default };


