import * as firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"


const firebaseConfig =  {
    apiKey: "AIzaSyDE2ec6LbWh7L4YEwYQf6jSyUqUFTX-MF4",
    authDomain: "artbraikerportfolio.firebaseapp.com",
    projectId: "artbraikerportfolio",
    storageBucket: "artbraikerportfolio.appspot.com",
    messagingSenderId: "810185621628",
    appId: "1:810185621628:web:55605d8b080c1ae2d2c9f9",
    measurementId: "G-RP526HPZ21"
  };

firebase.default.initializeApp(firebaseConfig)

firebase.default.firestore()
firebase.default.auth()
firebase.default.analytics()


export const auth = firebase.default.auth()
export default firebase