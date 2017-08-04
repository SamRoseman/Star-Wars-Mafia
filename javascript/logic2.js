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

var usersArray = [];

var user1;
var user2;
var user3;
var user4;
var user5;
var user6;
var userCounter;

//==========================================================================================

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").html(snap.numChildren());
});
//=============================================================================================

  $(document).on("click", function (){
    $(".starwars-demo").html("");
    $("#user-name").attr("class" , "user-name-display");
  })


  $(document).on("click", "#go", function (){
    var userName = $("#user-input").val();
      var user = {
      userName: userName
    };
    $("#user-input").val(" ");
    database.ref("/connections").on("child_added", function(childSnapshot) {
      usersArray.push(childSnapshot.key); 
      }); 

    database.ref("/game-stats").set({usersArray: usersArray});
    userCounter = usersArray.length - 1;

    database.ref("/connections/" + usersArray[userCounter]).set(user);

   
    console.log(usersArray.length);
    console.log(usersArray);
    console.log(usersArray[userCounter]);




})





















