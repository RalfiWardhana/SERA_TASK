const firebase = require("firebase")
const firebaseConfig = {
    apiKey: "AIzaSyCXjQkHwBm2yq00REeW2IORdf6ehOEzav8",
    authDomain: "serawithfirebase.firebaseapp.com",
    projectId: "serawithfirebase",
    storageBucket: "serawithfirebase.appspot.com",
    messagingSenderId: "479514262528",
    appId: "1:479514262528:web:590676587538d49b83ece5"
  };

  firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()
  const User= db.collection("Users")

  module.exports = User;