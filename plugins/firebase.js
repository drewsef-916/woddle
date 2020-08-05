import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {    
    const config = {
    apiKey: 'AIzaSyCXsgUt1QbcMcdrd6WUhXETYA3 - TjEKv5g',
    authDomain: "woddle-739d9.firebaseapp.com",
    databaseURL: "https://woddle-739d9.firebaseio.com",
    projectId: "woddle-739d9",
    storageBucket: "woddle-739d9.appspot.com",
    messagingSenderId: "223617795868",
    appId: "1:223617795868:web:5b9039cc7d6d4f14e39cd9"
    }; 
    
    firebase.initializeApp(config)
}

const fireDbDate = firebase.firestore.Timestamp;
const fireDb = firebase.firestore()
const fireBaseAuth = firebase.auth();


export { fireDbDate, fireDb, fireBaseAuth }

