var buttons = ["A New Hope", "The Empire Strikes Back", "Return of the Jedi", "The Phantom Menace", "Attack of the Clones","Revenge of the Sith", "The Force Awakens"];



function displayStory() {

  var index = $(this).attr("data-name");
  console.log("Button click dispplays index " + index);

  //-----url that will be called-----//
  var queryURL = "https://swapi.co/api/films/" + index + "?format=json";
  console.log(queryURL);


  //----------ajax is calling the url----------//
  $.ajax({ 
    url: queryURL,
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



