//VARIABLES ==============================================================================
var config = {
    apiKey: "AIzaSyD_1Jy0NGPP6bMv9WPXryV3nmWwE3WwRmM",
    authDomain: "star-wars-mafia.firebaseapp.com",
    databaseURL: "https://star-wars-mafia.firebaseio.com",
    projectId: "star-wars-mafia",
    storageBucket: "star-wars-mafia.appspot.com",
    messagingSenderId: "471949818682"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();