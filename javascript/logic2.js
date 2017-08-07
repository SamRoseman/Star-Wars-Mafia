

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

// Waiting GIF to show waiting for other users.
var waiting = "luA2Qmo9KVQC4";

// Arrays in order of release date, displays after button click based on index of episodes.
var goodGuys = [placeholder1, hanID, lukeID, leiaID, quiGonID, yodaID, obiWanID, reyID];
var badGuys = [placeholder2, greedoID, vaderID, jabbaID, maulID, dookuID, grievousID, kyloID];
var buttons = ["A New Hope", "The Empire Strikes Back", "Return of the Jedi", "The Phantom Menace", "Attack of the Clones","Revenge of the Sith", "The Force Awakens"];



var characterArray = ["hero" , "villain" , "droid1" , "droid2" , "droid3", "droid4"];
var user1;
var user2;
var user3;
var user4;
var user5;
var user6;
var charCounter;
var user;
var userCon;
var char;

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


database.ref("/connections").once("value", function(snappyCharArray) {
    char = characterArray.sort(function(a, b){return 0.5 - Math.random()});

    if (snappyCharArray.numChildren() === 1) {
        database.ref("/gameStats/characterArray").set(char);
    }
    console.log(snappyCharArray.numChildren());

  }); 




database.ref("/connections").on("child_added", function(childSnapshot) {
 

  }); 



 
  // database.ref("/gameStats/characterArray").set(char);

  $(document).on("click", "#go", function (){

    $("#story_button").show();
    $("#story").show();
    $("#starwars-demo").hide();
    $("#user-name").hide();
    $("#timerArea").show();
    $("#displayImage1").show();
    $("#displayImage2").show();

   
  
   
    // database.ref("/gameStats/characterCounter").set(charCounter);
    
    
    

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
    });
    

    // database.ref().child("/connections/" + userCon).once("value", function(snappyRemove){
    //     console.log(snappyRemove.val().character);
    //     var snappyRemoveCharVal = snappyRemove.val().character;

    //     if (snappyRemoveCharVal === "villian"){
    //       snappyRemoveCharVal.remove();
    //     }
    //     if (snappyRemoveCharVal === "hero"){
    //       snappyRemoveCharVal.remove();
    //     }
    //     if (snappyRemoveCharVal === "droid1"){
    //       snappyRemoveCharVal.remove();
    //     }
    //     if (snappyRemoveCharVal === "droid2"){
    //       snappyRemoveCharVal.remove();
    //     }
    //     if (snappyRemoveCharVal === "droid3"){
    //       snappyRemoveCharVal.remove();
    //     }
    //     if (snappyRemoveCharVal === "droid4"){
    //       snappyRemoveCharVal.remove();
    //     }
    //   });
  

    database.ref("/connections/" + userCon).set(user);
    
 


  });


  database.ref("/connections").on("value", function(snap){
    // var rootRef = snap.val();


    if (snap.numChildren() === 6) {
      //hide wait screens
      $("#story_button").hide();
      $("#story").hide();
      $("#displayImage1").hide();
      $("#displayImage2").hide();

      // console.log(snap.child("connections/character").val());
      database.ref().child("/connections/" + userCon).once("value", function(snappy){
        console.log(snappy.val().character);
        var snappyCharVal = snappy.val().character;
     

       
          if (snappyCharVal === "villain"){
                $("#deadArea").show();
                $("#deadTable").show();
            }
            else if (snappyCharVal === "hero"){
                $("#saveArea").show();
                $("#saveTable").show();
                // $("#questionArea").show();
                // $("#answersTable").show();
            }
            else if (snappyCharVal === "droid1"){
                $("displayWaiting").html("WAITING!");
            }

      
        });
      //show roles (all the if statements)
    }
  });






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
  }).done(function(response) {

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

  $.ajax({
      url: queryURL4,
      method: "GET"
      })
      // After the data from the AJAX request comes back
      .done(function(response) {
        var imageUrl = response.data.images.fixed_height_still.url;
        var goodGuysImage = $("<img>");
        goodGuysImage.attr("src", imageUrl);
        $("#displayImage1").html(goodGuysImage);
      });


}

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
}

renderButtons();


//==========when child element(.gif-button) in document is clicked, run function==========//
$(document).on("click", ".button", displayStory);







});