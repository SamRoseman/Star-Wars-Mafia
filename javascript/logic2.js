$(document).ready(function(){

    var audio = $("audio")[0];
    audio.play();


    // $("#starwars-demo").show();
    // $("#user-name").show();
    $("#startTimer").hide();
    $("#timeRemaining").hide();
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
    $("#displayImage3").hide();
    $("#displayWaiting").hide();



setTimeout(function(){
    $("#byline").html("ENTER GAME")
  },9990);



//VARIABLES ==============================================================================
var startGame = false;

var startGameObject = {startGame: startGame}


var placeholder1 = "whatever";
var quiGonID = "WJdNmeAxkpZIc";
var yodaID = "zQhFEBrX6plKg";
var obiWanID = "fC4sywbr4JpTi";
var hanID = "sjhsTOB3WVjJm";
var lukeID = "ZiYw0j9gkHJja";
var leiaID = "tP917GtgNLqEg";
var reyID = "dHwG6FCjBU0Za";

// Bad guy variables - specific ID's based on Giphy page.
var placeholder2 = "whenever";
var maulID = "No0TwN9itfV16";
var dookuID = "DeOUbnXkLU6B2";
var grievousID = "UIeLsVh8P64G4";
var greedoID = "o5B2eWukUOZ8I";
var vaderID = "d2sdxvH0u2oU0";
var jabbaID = "6xvwDfDGfejhm";
var kyloID = "Sq7gNmCWU7iSs";

// Droid variable - specific ID based on Giphy page.
var droidID = "Tdf5O0ik31iPS";
var queryURL4 = "https://api.giphy.com/v1/gifs/" + droidID + "?api_key=24a1780a82694e2f91abe2751c4b3e4d";

// Waiting GIF to show waiting for other users.
var waiting = "luA2Qmo9KVQC4";
var queryURL5 = "https://api.giphy.com/v1/gifs/" + waiting + "?api_key=24a1780a82694e2f91abe2751c4b3e4d";

// Arrays in order of release date, displays after button click based on index of episodes.
var goodGuys = [placeholder1, hanID, lukeID, leiaID, quiGonID, yodaID, obiWanID, reyID];
var badGuys = [placeholder2, greedoID, vaderID, jabbaID, maulID, dookuID, grievousID, kyloID];
var buttons = ["A New Hope", "The Empire Strikes Back", "Return of the Jedi", "The Phantom Menace", "Attack of the Clones","Revenge of the Sith", "The Force Awakens"];



var characterArray = ["hero" , "villain" , "droid1" , "droid2" , "droid3", "droid4"];

var charCounter;
var user;
var userCon;
var char;


var snappyName;


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
    console.log(con.key);
    userCon = con.key;
  } // end of "if (snap.val) statement"
}); //end of snap


// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {


  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").html(snap.numChildren());
}); //end of connectionsRef.on - snap
//=============================================================================================
    
  $(document).on("click", function (){
    audio.pause();
    $("#starwars-demo").hide();
    $("#user-name").attr("class" , "user-name-display");
    $("#user-input").focus();
    
  });


database.ref("/connections").once("value", function(snappyCharArray) {
    char = characterArray.sort(function(a, b){return 0.5 - Math.random()});

    if (snappyCharArray.numChildren() === 1) {
        database.ref("/gameStats/characterArray").set(char);
    }
    console.log(snappyCharArray.numChildren());

  }); //end of snappyCharArray




database.ref("/connections").on("child_added", function(childSnapshot) {
 

  }); //end of childSnapshot



 
  // database.ref("/gameStats/characterArray").set(char);

  $(document).on("click", "#go", function (){

    $("#story_button").show();
    $("#story").show();
    $("#starwars-demo").hide();
    $("#user-name").hide();
    $("#startTimer").show();
    $("#displayImage1").show();
    $("#displayImage2").show();

   
    database.ref("/gameStats/characterArray").once("value", function(anotherSnappy){
      var userName = $("#user-input").val();
      var splicey = anotherSnappy.val();
    
      user = {
      userName: userName,
      character: splicey[0]
      };

      console.log(splicey);
      splicey.splice(0, 1);
      database.ref("/gameStats/characterArray").set(splicey);

    }); // end of anotherSnappy

    database.ref("/connections/" + userCon).set(user);

  }); //end of click "go" function




  database.ref("/connections").on("value", function(snap){
    

    if (snap.numChildren() === 6) {
      
      $("#startButton").show();

      // console.log(snap.child("connections/character").val());
      database.ref().child("/connections/" + userCon).once("value", function(snappy){
        console.log(snappy.val().character);
        console.log(snappy.val().userName);        
        var snappyCharVal = snappy.val().character;
        snappyName = snappy.val().userName;

        database.ref("/gameStats/startGameObject/").set(startGameObject);


        $("#startButton").on('click', function(){

          $("#story_button").hide();
          $("#startTimer").hide();
          $("#startButton").hide();
          $("#timeRemaining").show();

          startGame = true;
          startGameObject = {startGame: startGame}

          database.ref("/gameStats/startGameObject/").set(startGameObject);


        }); //end of #startButton

        database.ref().child("/gameStats/startGameObject/").on("value", function(gameStartSnap){

        console.log(startGame);
        console.log(gameStartSnap.val().startGame);

          if (gameStartSnap.val().startGame == true) {

            startTimer();
            $("#timeRemaining").show();
            $("#startTimer").hide();
            $("#startButton").hide();
            $("#story_button").hide();
            
      
          }
        }); // end of gameStartSnap
        


      

        function startTimer(){


          $("#resultsPlaceholder").hide();
          $("#pleaseWait").show();

          var countDown = 20;
          
          var interval = setInterval(function() { 
            countDown--;
            $("#timeRemaining").html("<h1>Time Remaining: " + countDown + "</h1>");
            $("#pleaseWait").html("<h1>Waiting for the Villain and Hero to make their choices...</h1>");



            if (snappyCharVal === "villain"){
                $("#displayImage2").show();
                $("#displayImage1").hide();
                $("#deadArea").show();
                $("#deadTable").show();
            }
            else if (snappyCharVal === "hero"){
                $("#displayImage1").show();
                $("#displayImage2").hide();
                $("#saveArea").show();
                $("#saveTable").show();
                // $("#questionArea").show();
                // $("#answersTable").show();
            }
            else if (snappyCharVal === "droid1" || snappyCharVal === "droid2" || snappyCharVal === "droid3" || snappyCharVal === "droid4"){

               $.ajax({
                  url: queryURL4,
                  method: "GET"
                  })
                // After the data from the AJAX request comes back
                  .done(function(response) {
                    var imageUrl = response.data.images.fixed_height.url;
                    var droidImage = $("<img>");
                    droidImage.attr("src", imageUrl);
                    $("#displayImage3").html(droidImage);
                    $("#displayImage3").show();
                    $("#displayImage1").hide();
                    $("#displayImage2").hide();
                  });

            }

            if (countDown == 0) {
              showResults();
              clearInterval(interval);
            }
                
          }, 1000);

        }; //end of startTimer function

        

        function showResults(){
          
          // SHOW RESULTS OF WHO WAS KILLED OR IF PEOPLE ARE SAFE - Then - SET NEXT TIMER:
              $("#questionArea").show();
              // $("#resultsPlaceholder").show();
              $("#pleaseWait").hide();
              
              // $("#displayImage2").hide();

              $("#deadArea").hide();
              $("#deadTable").hide();
              
              // $("#displayImage1").hide();
              $("#saveArea").hide();
              $("#saveTable").hide();

              // $("#displayImage3").hide();
              // $("#displayWaiting").hide();



          var countDown = 30;
          var interval = setInterval(function() { 
            countDown--;
            $("#timeRemaining").html("<h1>Time Remaining: " + countDown + "</h1>");

            
           
            if (countDown == 0) {
              //startTimer();
              displayVotes();
              clearInterval(interval);

            }
                
          }, 1000);

        }; //end of showResults function



      }); // end of "snappy".

    } // end of "if (snap.numChildren"

  }); // end of "snap"






function displayStory() {
  $("#displayArea").html("");

  var index = $(this).attr("data-name");
  // console.log("Button click displays index " + index);

  //-----url that will be called-----//
  var queryURL1 = "https://swapi.co/api/films/" + index + "?format=json";
  // console.log(queryURL1);

  var queryURL2 = "https://api.giphy.com/v1/gifs/" + goodGuys[index] + "?api_key=24a1780a82694e2f91abe2751c4b3e4d";
  var queryURL3 = "https://api.giphy.com/v1/gifs/" + badGuys[index] + "?api_key=24a1780a82694e2f91abe2751c4b3e4d";
  


  //----------ajax is calling the url----------//
  $.ajax({ 
    url: queryURL1,
    method: "GET"
  })
    .done(function(response) {

      var episode = response.episode_id;
      // console.log("Episode #: " + episode);

      var title = response.title;
      // console.log("Title: " + title);

      var intro = response.opening_crawl;
      // console.log("Intro: " + intro);

      //$("#story_button").empty();

      $("#story").html("<h1>Star Wars: Episode " + episode + " - " + title +"</h1><p>" + intro + "</p>");
    
    });


  $.ajax({
    url: queryURL2,
    method: "GET"
  })
    // After the data from the AJAX request comes back
    .done(function(response) {
      var imageUrl = response.data.images.fixed_height_still.url;
      var goodGuysImage = $("<img>");
      goodGuysImage.attr("src", imageUrl);
      $("#displayImage1").html(goodGuysImage);
    });

  $.ajax({
    url: queryURL3,
    method: "GET"
  })
    // After the data from the AJAX request comes back
    .done(function(response) {
      var imageUrl = response.data.images.fixed_height_still.url;
      var badGuysImage = $("<img>");
      badGuysImage.attr("src", imageUrl);
      $("#displayImage2").html(badGuysImage);
    });


} // end of displayStory function



function renderButtons() {

  //-----deletes buttons prior to adding new gifs so there is no repeats-----//
  $("#story_button").empty();
  

  //-----Loops through the array of gifs-----//
  for (var i = 0; i < buttons.length; i++) {

    var newButton = $("<button>"); // creates a new button tag
    newButton.addClass("button"); //adds a class to button
    newButton.attr("data-name", i+1); // add data-name to button
    newButton.text(buttons[i]); // add text to button

    //-----adding buttons into the section "buttons-view"-----//
    $("#story_button").append(newButton); 
  }
} // end of renderButtons

renderButtons();


//==========when child element(.gif-button) in document is clicked, run function==========//
$(document).on("click", ".button", displayStory);

//=======================================================//
//=========================VOTING========================//
//=======================================================//

    var user1Count = 0;
    var user2Count = 0;
    var user3Count = 0;
    var user4Count = 0;
    var user5Count = 0;
    var user6Count = 0;

    var voteObject = {
      user1Data: user1Count,
      user2Data: user2Count,
      user3Data: user3Count,
      user4Data: user4Count,
      user5Data: user5Count,
      user6Data: user6Count
    }

    database.ref("/gameStats/voteObject").set({ 
      voteObject
    });

    $("#submitBtn").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      database.ref("/gameStats/voteObject").on("value", function(snapVote) {
        var newCount1 = snapVote.val().voteObject.user1Data;
        var newCount2 = snapVote.val().voteObject.user2Data;
        var newCount3 = snapVote.val().voteObject.user3Data;
        var newCount4 = snapVote.val().voteObject.user4Data;
        var newCount5 = snapVote.val().voteObject.user5Data;
        var newCount6 = snapVote.val().voteObject.user6Data;


      //capture user input into global variables.
      if ($("input:checked").val() === "User 1")
        newCount1++;
      else if ($("input:checked").val() === "User 2")
        newCount2++;
      else if ($("input:checked").val() === "User 3")
        newCount3++;
      else if ($("input:checked").val() === "User 4")  
        newCount4++; 
      else if ($("input:checked").val() === "User 5")
        newCount5++;
      else if ($("input:checked").val() === "User 6")
        newCount6++;

      //Put new variable data into one object to make it easy to display the object properties/values in one row:
    voteObject = {
      user1Data: newCount1,
      user2Data: newCount2,
      user3Data: newCount3,
      user4Data: newCount4,
      user5Data: newCount5,
      user6Data: newCount6
    }


    });

      database.ref("/gameStats/voteObject").set({
        voteObject
      });

      // Clears all of the text-boxes
    //$('input[name="selectUser"]').prop('checked', false);
    $("#questionArea").hide();
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
    $("#deadArea").hide();
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



    // database.ref("/connections/" + userCon).once("value", function(playerSnap){

    //   var playerChar = playerSnap.val().character;
    //   console.log(playerChar);

    // });  

  function displayVotes() {
    database.ref("/gameStats/voteObject/voteObject").on("value", function(snapResult) {
      console.log(snapResult.val().user1Data);
      $("#questionArea").hide();
      $("#resultsPlaceholder").show();
      $("#resultsPlaceholder").html(
        // "<p>This is " + userName + "'s' votes: " + snapResult.val().user1Data + "</p>" + 
        "<div><h2>Here's how many voted for User 1: " + snapResult.val().user1Data + 
        "<br />Here's how many voted for User 2: " + snapResult.val().user2Data + 
        "<br />Here's how many voted for User 3: " + snapResult.val().user3Data +  
        "<br />Here's how many voted for User 4: " + snapResult.val().user4Data + 
        "<br />Here's how many voted for User 5: " + snapResult.val().user5Data + 
        "<br />Here's how many voted for User 6: " + snapResult.val().user6Data + "</h2></div>");

    });

  }


});



