import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDiBwMF15IwV3qb4a7XSF9pqb8dXIG4slw",
    authDomain: "bt3103-week-6-ae27b.firebaseapp.com",
    projectId: "bt3103-week-6-ae27b",
    storageBucket: "bt3103-week-6-ae27b.appspot.com",
    messagingSenderId: "671209711026",
    appId: "1:671209711026:web:922b1126ae997721ca30ab",
    measurementId: "G-16VCG1Z36R"
}

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;

