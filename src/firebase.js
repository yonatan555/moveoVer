import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'


const app = firebase.initializeApp({

    apiKey: "AIzaSyBd6MalFP19yOLKqqIOFn3k-paShCKCQIg",
    authDomain: "moveo-96d59.firebaseapp.com",
    databaseURL: "https://moveo-96d59-default-rtdb.firebaseio.com",
    projectId: "moveo-96d59",
    storageBucket: "moveo-96d59.appspot.com",
    messagingSenderId: "591694843720",
    appId: "1:591694843720:web:d7c2a59b6629c5e5c72d7d",
    measurementId: "G-W183VWYXW4"
})

export const auth = app.auth();
export const firestore = firebase.firestore()
export const ref = firestore.collection("users");

export default app ;