import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
   apiKey: "AIzaSyCx5ZzfxJN9vepVf-uGUzXuK7eSqHtChfM",
   authDomain: "cooking-book-4338f.firebaseapp.com",
   projectId: "cooking-book-4338f",
   storageBucket: "cooking-book-4338f.appspot.com",
   messagingSenderId: "1060941138384",
   appId: "1:1060941138384:web:cfd512d20df07d295211d5"
 }

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }