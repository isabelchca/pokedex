import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDvHYDDcQlrMGwFkvxmq1VNx_U2xOEDc4Q",
    authDomain: "crud-udemy-react-b6480.firebaseapp.com",
    projectId: "crud-udemy-react-b6480",
    storageBucket: "crud-udemy-react-b6480.appspot.com",
    messagingSenderId: "211958513421",
    appId: "1:211958513421:web:42c57847340cac37297a44"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()

  export {auth, firebase, db, storage}