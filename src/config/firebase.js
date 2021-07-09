import * as firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"


const app = firebase.default.initializeApp( {
    apiKey: "AIzaSyDE2ec6LbWh7L4YEwYQf6jSyUqUFTX-MF4",
    authDomain: "artbraikerportfolio.firebaseapp.com",
    projectId: "artbraikerportfolio",
    storageBucket: "artbraikerportfolio.appspot.com",
    messagingSenderId: "810185621628",
    appId: "1:810185621628:web:d381791953defed0d2c9f9",
    measurementId: "G-MR0NNNLDGD"
});


firebase.default.firestore()
firebase.default.auth()
firebase.default.analytics()


export const auth = app.auth()
export default app
