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

    var user1Count = "";
    var user2Count = "";
    var user3Count = "";


    $("#submitBtn").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      //capture user input into global variables.
      user1Count = $("#selectUser1").val();
      user2Count = $("#selectUser2").val();
      user3Count = $("#selectUser3").val();
      		

      //Put new variable data into one object to make it easy to display the object properties/values in one row:
      var voteObject = {
        user1Data: user1Count,
  	    user2Data: user2Count,
  	    user3Data: user3Count
      }

      database.ref().push({
	      voteObject
      });

      // Clears all of the text-boxes
	  $('input[name="selectUser"]').prop('checked', false);

    });


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







    var user1Die = "";
    var user2Die = "";
    var user3Die = "";


    $("#deadBtn").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      
      //capture user input into global variables.
      user1Die = $("#deadUser1").val();
      user2Die = $("#deadUser2").val();
      user3Die = $("#deadUser3").val();
  

      //Put new variable data into one object to make it easy to display the object properties/values in one row:
      var voteDeadObject = {
        user1Dead: user1Die,
        user2Dead: user2Die,
        user3Dead: user3Die
      }

      database.ref().push({
        voteDeadObject
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



    var user1Save = "";
    var user2Save = "";
    var user3Save = "";


    $("#saveBtn").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      
      //capture user input into global variables.
      user1Save = $("#saveUser1").val();
      user2Save = $("#saveUser2").val();
      user3Save = $("#saveUser3").val();
  

      //Put new variable data into one object to make it easy to display the object properties/values in one row:
      var voteSaveObject = {
        user1Saved: user1Save,
        user2Saved: user2Save,
        user3Saved: user3Save
      }

      database.ref().push({
        voteSaveObject
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