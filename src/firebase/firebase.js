import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCWnJ2CxcIZxoLa1V9gnbbX5s3A4FXLw3Y",
    authDomain: "discord-clone-1670d.firebaseapp.com",
    projectId: "discord-clone-1670d",
    storageBucket: "discord-clone-1670d.appspot.com",
    messagingSenderId: "145099106841",
    appId: "1:145099106841:web:c4f8ca45036af8f4c39888",
    measurementId: "G-T9F1F798YM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider };
