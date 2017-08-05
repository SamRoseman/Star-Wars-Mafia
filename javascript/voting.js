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


// (function() {
// 'use strict';

// // assign the reference to the element with ID questions to variable form
// var form = $('#question');

// // subscribe to form submission event
// form.onsubmit = function(e) {
//     // prevent default submission (it would send data to the server and reload the page)
//     e.preventDefault();

//     // collect data from form fields - see getData function
//     var data = getData();

//     // reference to Firebase database
//     var dataRef = new Firebase('https://star-wars-mafia.firebaseio.com/star-wars-mafia');

//     // add answer to the database
//     dataRef.push(data, function() {
//         // once the data is saved, show the message
//         window.alert('Form submitted');
//     });
// };


// // this function collects data from the form
// function getData() {
//     // variable data with empty object
//     var data = {};

//     // assign array of elements inside form that are input or textarea to variable inputs
//     var inputs = form.querySelectorAll('input, textarea');

//     // iterate over all inputs
//     for (var i=0; i<inputs.length; i++) {
//         // in each iteration, assign input to variable el
//         var el = inputs[i];

//         switch (el.type) {
//             // el.type is "radio" (radio buttons)
//             case 'radio':
//                 // if element is checked assign its value (defined in HTML)
//                 // to the property of data object, name of the property is defined in HTML
//                 if (el.checked) data[el.name] = el.value;

//                 // break exts switch operator, without it the next case would be executed as well
//                 break;
//             case 'text':
//             default:
//                 // if el.type is text (normal input) or if it is textarea assign its value (entered by user)
//                 // to the property of data object, name of the property is defined in HTML
//                 data[el.name] = el.value;
//                 break;
//         }
//     }

//     // return collected data to the code that called the function (see above)
//     return data;
// }

// })();








// (function() {
// 'use strict';

// // assign the reference of the element with ID "template" to var templateRow
// // this element is used to create new rows in the table
// var templateRow = document.getElementById('template');

// // the reference to el with ID "tableBody" -
// // the body of the table where the new rows will be inserted
// var tableBody = document.getElementById('tableBody');

// // the reference to the data in Firebase
// // note that it is the same as was used to save answers to
// var dataRef = new Firebase('https://star-wars-mafia.firebaseio.com/star-wars-mafia');

// // this function will be called when new answer is added
// // it is also called when the page is opened - once for each existing row
// dataRef.on('child_added', function (snapshot) {
//     // get data of the row to var "item"
//     var item = snapshot.val();

//     // logs to browser console, can be removed
//     // console.log(item);

//     // call function "addRow" to add new row using the data
//     addRow(item);
// });


// // this function creates new table row, populates it with the data from the database
// // and inserts the new row into the end of the table
// function addRow(item) {
//     // cleate copy of our template row (true parameter instructs the browser to copy children too)
//     var row = templateRow.cloneNode(true);

//     // remove id attibute from the copy - only one element can have a certain ID
//     row.removeAttribute('id');

//     // make row visible, as template is invisible (see style="display: none" in HTML)
//     // note, that at this point you can't see the new row yet, as it is not added to the table,
//     // it exists only in browser memory
//     row.style.display = '';

//     // iterate properties of the data object
//     // each property name will be sequentially assigned to variable "prop"
//     for (var prop in item) {
//         // reference to the field in the new row. "data" attribute in HTML is used to identify the fields
//         var field = row.querySelector('[data=' + prop + ']');

//         // set contents of the field to the data
//         field.innerHTML = item[prop];
//     }

//     // add the new row to the table
//     tableBody.appendChild(row);
// }

// })();