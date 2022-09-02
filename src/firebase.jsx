import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB_rLUHY6DEsk9T9odf1FrUJ3pgN0iq_2o",
  authDomain: "discord-clone-2dd5c.firebaseapp.com",
  databaseURL: "https://discord-clone-2dd5c.firebaseio.com",
  projectId: "discord-clone-2dd5c",
  storageBucket: "discord-clone-2dd5c.appspot.com",
  messagingSenderId: "1095371319634",
  appId: "1:1095371319634:web:99b98fc5ed17a68235728b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
