

$(document).ready(function(){

    var audio = $("audio")[0];
    audio.play();


    // $("#starwars-demo").show();
    // $("#user-name").show();
    $("#timerArea").hide();
    $("#questionArea").hide();
    $("#answersTable").hide();
    $("#deadArea").hide();
    $("#deadTable").hide();
    $("#saveArea").hide();
    $("#saveTable").hide();
    $("#story_button").hide();
    $("#story").hide();
    $("#displayImage1").hide();
    $("#displayImage2").hide();



setTimeout(function(){
    $("#byline").html("ENTER GAME")
  },9990);

//VARIABLES ==============================================================================

// var config = {
//     apiKey: "AIzaSyD_1Jy0NGPP6bMv9WPXryV3nmWwE3WwRmM",
//     authDomain: "star-wars-mafia.firebaseapp.com",
//     databaseURL: "https://star-wars-mafia.firebaseio.com",
//     projectId: "star-wars-mafia",
//     storageBucket: "star-wars-mafia.appspot.com",
//     messagingSenderId: "471949818682"
//   };
//   firebase.initializeApp(config);

// // Create a variable to reference the database.
// var database = firebase.database();

var usersArray = [];
var heroArray = ["Luke" , "Leia"];
var villainArray = ["Darth Vader", "Darth Maul"];
var user1;
var user2;
var user3;
var user4;
var user5;
var user6;
var userCounter;
var user;

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
    audio.pause();
    $(".starwars-demo").html("");
    $("#user-name").attr("class" , "user-name-display");

    
  });


  $(document).on("click", "#go", function (){
    

    var userName = $("#user-input").val();
      user = {
      userName: userName
    };
    $("#user-input").val(" ");
    database.ref("/connections").on("child_added", function(childSnapshot) {
      usersArray.push(childSnapshot.key); 
      }); 

    database.ref("/gameStats").set({usersArray: usersArray});
    userCounter = usersArray.length - 1;

    database.ref("/connections/" + usersArray[userCounter]).set(user);

    

    

    $("#starwars-demo").hide();
    $("#user-name").hide();
    $("#timerArea").show();
    $("#questionArea").show();
    $("#answersTable").show();
    $("#deadArea").show();
    $("#deadTable").show();
    $("#saveArea").show();
    $("#saveTable").show();
    $("#story_button").show();
    $("#story").show();
    $("#displayImage1").show();
    $("#displayImage2").show();

    

  });



});















