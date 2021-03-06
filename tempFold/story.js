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




function displayStory() {
  $("#displayArea").html("");

  var index = $(this).attr("data-name");
  console.log("Button click displays index " + index);

  //-----url that will be called-----//
  var queryURL1 = "https://swapi.co/api/films/" + index + "?format=json";
  console.log(queryURL1);

  var queryURL2 = "https://api.giphy.com/v1/gifs/" + goodGuys[index] + "?api_key=24a1780a82694e2f91abe2751c4b3e4d";
  var queryURL3 = "https://api.giphy.com/v1/gifs/" + badGuys[index] + "?api_key=24a1780a82694e2f91abe2751c4b3e4d";


  //----------ajax is calling the url----------//
  $.ajax({ 
    url: queryURL1,
    method: "GET"
  }).done(function(response) {

      var episode = response.episode_id;
      console.log("Episode #: " + episode);

      var title = response.title;
      console.log("Title: " + title);

      var intro = response.opening_crawl;
      console.log("Intro: " + intro);

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

