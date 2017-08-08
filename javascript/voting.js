// Voting code for Star Wars Mafia game.


  // Initialize Firebase
 // var config = {
 //    apiKey: "AIzaSyD_1Jy0NGPP6bMv9WPXryV3nmWwE3WwRmM",
 //    authDomain: "star-wars-mafia.firebaseapp.com",
 //    databaseURL: "https://star-wars-mafia.firebaseio.com",
 //    projectId: "star-wars-mafia",
 //    storageBucket: "star-wars-mafia.appspot.com",
 //    messagingSenderId: "471949818682"
 //  };
 //   firebase.initializeApp(config);


    // Variables
   
    // Get a reference to the database service
    // var database = firebase.database();
// ========================================================================
    var user1Count = 0;
    var user2Count = 0;
    var user3Count = 0;
      // console.log(user1Count);
      // console.log(user2Count);
      // console.log(user3Count);

    $("#submitBtn").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      //capture user input into global variables.
      if ($("input:checked").val() === "User 1")
        user1Count++;
      else if ($("input:checked").val() === "User 2")
        user2Count++;
      else if ($("input:checked").val() === "User 3")
        user3Count++;
  
      		

      //Put new variable data into one object to make it easy to display the object properties/values in one row:
      var voteObject = {
        user1Data: user1Count,
  	    user2Data: user2Count,
  	    user3Data: user3Count
      }
      database.ref("/gameStats/voteObject").set({
	      voteObject
      });

      // Clears all of the text-boxes
	  $('input[name="selectUser"]').prop('checked', false);

    });
// =========================================================================
// shows which user was selected?
	database.ref().on("child_added", function(childSnapshot) {

		if ($('#selectUser1').is(':checked')){
		    var tableRow = $("<tr>").html("<td>" + childSnapshot.val().voteObject.user1Data);
			$("#tBody").append(tableRow);
		}
		else if ($('#selectUser2').is(':checked')){
			var tableRow = $("<tr>").html("<td>" + childSnapshot.val().voteObject.user2Data);
			$("#tBody").append(tableRow);
		}
		else if ($('#selectUser3').is(':checked')){
			var tableRow = $("<tr>").html("<td>" + childSnapshot.val().voteObject.user3Data);
			$("#tBody").append(tableRow);
		}

	      // Handle the errors
	    }, function(errorObject) {
	      console.log("Errors handled: " + errorObject.code);
	    });



// ========================================================================
   
    var user1Alive = true;
    var user2Alive = true;
    var user3Alive = true;

    var voteDeadAliveObject = {
        user1Alive: user1Alive,
        user2Alive: user2Alive,
        user3Alive: user3Alive
      }


    $("#deadBtn").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      
      //capture user input into global variables.
      if ($("input:checked").val() === "Dead User 1")
        user1Alive = false;
      else if ($("input:checked").val() === "Dead User 2")
        user2Alive = false;
      else if ($("input:checked").val() === "Dead User 3")
        user3Alive = false;

      voteDeadAliveObject = {
        user1Alive: user1Alive,
        user2Alive: user2Alive,
        user3Alive: user3Alive
      }
    
   

      database.ref("/gameStats/lifeStatus").set({
        voteDeadAliveObject
      });

      // Clears all of the text-boxes
    $('input[name="deadUser"]').prop('checked', false);

    });


  

  database.ref().on("child_added", function(childSnapshot) {

    if ($('#deadUser1').is(':checked')){
        var tableRow = $("<tr>").html("<td>" + childSnapshot.val().voteDeadObject.user1Dead);
      $("#tDeadBody").append(tableRow);
    }
    else if ($('#deadUser2').is(':checked')){
      var tableRow = $("<tr>").html("<td>" + childSnapshot.val().voteDeadObject.user2Dead);
      $("#tDeadBody").append(tableRow);
    }
    else if ($('#deadUser3').is(':checked')){
      var tableRow = $("<tr>").html("<td>" + childSnapshot.val().voteDeadObject.user3Dead);
      $("#tDeadBody").append(tableRow);
    }

        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

// ==========================================================================

    var user1Save = "";
    var user2Save = "";
    var user3Save = "";


    $("#saveBtn").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      
      //capture user input into global variables.
      if ($("input:checked").val() === "Saved User 1")
        user1Alive = true;
      else if ($("input:checked").val() === "Saved User 2")
        user2Alive = true;
      else if ($("input:checked").val() === "Saved User 3")
        user3Alive = true;

      voteDeadAliveObject = {
        user1Alive: user1Alive,
        user2Alive: user2Alive,
        user3Alive: user3Alive
      }
     
  

       database.ref("/gameStats/lifeStatus").set({
        voteDeadAliveObject
      });

      // Clears all of the text-boxes
    $('input[name="saveUser"]').prop('checked', false);

    });


  

  database.ref().on("child_added", function(childSnapshot) {

    if ($('#saveUser1').is(':checked')){
        var tableRow = $("<tr>").html("<td>" + childSnapshot.val().voteSaveObject.user1Saved);
      $("#tSaveBody").append(tableRow);
    }
    else if ($('#saveUser2').is(':checked')){
      var tableRow = $("<tr>").html("<td>" + childSnapshot.val().voteSaveObject.user2Saved);
      $("#tSaveBody").append(tableRow);
    }
    else if ($('#saveUser3').is(':checked')){
      var tableRow = $("<tr>").html("<td>" + childSnapshot.val().voteSaveObject.user3Saved);
      $("#tSaveBody").append(tableRow);
    }

        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });