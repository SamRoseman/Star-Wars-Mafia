// Timer javascript code for Star Wars Mafia game.

$(document).ready(function(){




	$("#startButton").on('click', function(){
		// $("#startWindow").hide();
		// $("#container").show();
		startTimer();

	});

	function startTimer(){
		var countDown = 31;
		var interval = setInterval(function() { 
			countDown--;
			$("#timeRemaining").html("Time Remaining: " + countDown);
			if (countDown == 0) {
				showResults();
				clearInterval(interval);
        	}
        	
		}, 1000);

	};

	

	function showResults(){
		
		// SHOW RESULTS OF WHO WAS KILLED OR IF PEOPLE ARE SAFE - Then - SET NEXT TIMER:

		var countDown = 121;
		var interval = setInterval(function() { 
			countDown--;
			$("#timeRemaining").html("Time Remaining: " + countDown);
			if (countDown == 0) {
				startTimer();
				clearInterval(interval);
        	}
        	
		}, 1000);


	};




});