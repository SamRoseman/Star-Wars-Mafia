$(document).ready(function(){


  var numRight = 0;
  var numWrong = 0;



  $("#testButton").on('click', function(){
    // $("#startWindow").hide();
    // $("#container").show();
    showQuestions();

  });

  function showQuestions(){
    var countDown = 31;
    var interval = setInterval(function() { 
      countDown--;
      $("#timeRemainingTest").html("Time Remaining Test: " + countDown);
      if (countDown == 0) {

          if ($("#question input[type='radio'][class='right']:checked").val()){
            ++numRight;
          }
          if ($("#question input[type='radio'][class='wrong1']:checked").val()){
            ++numWrong;
          }
          if ($("#question input[type='radio'][class='wrong2']:checked").val()){
            ++numWrong;
          }
          else {
            ++numWrong;
          }



        // $("#container").hide();
        // $("#resultsWindow").show();
        // // validateResults();
        showResults();
        // clearInterval(interval);
      }
    }, 1000);


// showQuestions();


    $("#submitBtn").on('click', function(){
          if ($("#question input[type='radio'][class='right']:checked").val()){
            ++numRight;
          }
          if ($("#question input[type='radio'][class='wrong1']:checked").val()){
            ++numWrong;
          }
          if ($("#question input[type='radio'][class='wrong2']:checked").val()){
            ++numWrong;
          }
          else {
            ++numWrong;
          }
            

      // $("#container").hide();
      // $("#resultsWindow").show();
      // validateResults();
      showResults();
      // clearInterval(interval);
    });

  };




  function showResults(){
    // validateResults();
    $("#totalRight").html("Total right: " + numRight);
    $("#totalWrong").html("Total wrong: " + numWrong);
  };


});