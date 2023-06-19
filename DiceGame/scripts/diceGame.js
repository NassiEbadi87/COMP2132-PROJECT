// Global variables
var playerTotalScore = 0;
var computerTotalScore = 0;
var playerRound = 0;
var computerRound = 0;
var finalResults = document.getElementById("final-results");
finalResults.innerHTML = "";
var roundNumber = document.getElementById("round");
roundNumber.innerHTML = "";
var round = 0;

// Event listeners for buttons
document.getElementById("rollButton").addEventListener("click", rollDice);
document.getElementById("resetButton").addEventListener("click", resetGame);

function rollDice() {
    roundNumber.innerHTML = "";
    roundNumber.classList.remove("hidden");
    roundNumber.classList.add("fade-in");
    var opacityValue = 0;
    var animationHandler = requestAnimationFrame(fadeIn);

    function fadeIn() {
        opacityValue += 0.05;
        if (opacityValue <= 1) {
            roundNumber.style.opacity = opacityValue;
            requestAnimationFrame(fadeIn);
        } else {
            roundNumber.style.opacity = 1;
        }
    }
    round++;
    roundNumber.innerHTML += "<img class='round-img' src='product-images/round" + round + ".jpg'><br><br>";

    setTimeout(playerTurn, 1000);
    setTimeout(computerTurn, 2000);
}

function playerTurn() {
    // Player's turn
    var playerDice1 = Math.floor(Math.random() * 6) + 1;
    var playerDice2 = Math.floor(Math.random() * 6) + 1;
    var playerRoundScore = calculateScore(playerDice1, playerDice2);

    playerTotalScore += playerRoundScore;
    playerRound++;

    // Display the player's roll results in output1
    var output1 = document.getElementById("output1");
    output1.innerHTML = "<h1>Total Score<br>" + playerTotalScore + "<br></h1>";
    output1.innerHTML += "<strong>Round Score: " + playerRoundScore + "</strong><br><br>";
    output1.innerHTML += "<img src='product-images/dice" + playerDice1 + ".jpg'><br>";
    output1.innerHTML += "<img src='product-images/dice" + playerDice2 + ".jpg'>";
}

function computerTurn() {
    if (computerRound < 3) {
        var computerDice1 = Math.floor(Math.random() * 6) + 1;
        var computerDice2 = Math.floor(Math.random() * 6) + 1;
        var computerRoundScore = calculateScore(computerDice1, computerDice2);
        computerTotalScore += computerRoundScore;
        computerRound++;

        // Display the computer's roll results in output2
        var output2 = document.getElementById("output2");
        output2.innerHTML = "<h1>Total Score<br>" + computerTotalScore + "<br></h1>";
        output2.innerHTML += "<strong>Round Score: " + computerRoundScore + "</strong><br><br>";
        output2.innerHTML += "<img src='product-images/dice" + computerDice1 + ".jpg'><br>";
        output2.innerHTML += "<img src='product-images/dice" + computerDice2 + ".jpg'>";

        // Check if it's the end of the game
        if (playerRound === 3 && computerRound === 3) {
            gameResult();
        }

        // Fade in the round number
        fadeIn(roundNumber);
    }
}

function fadeIn(element) {
    var opacityValue = 0;
    var animationHandler = requestAnimationFrame(fade);

    function fade() {
        opacityValue += 0.05;
        if (opacityValue <= 1) {
            element.style.opacity = opacityValue;
            requestAnimationFrame(fade);
        } else {
            element.style.opacity = 1;
        }
    }
}

        function gameResult() {
            fadeOut();
            
            function fadeOut() {
                var opacityValue = 1;
                var animationHandler = requestAnimationFrame(fade);

                function fade() {
                    opacityValue -= 0.05;
                    if (opacityValue >= 0) {
                        roundNumber.style.opacity = opacityValue;
                        requestAnimationFrame(fade);
                    } else {
                        roundNumber.style.opacity = 0;
                        roundNumber.classList.add("hidden");
                        roundNumber.innerHTML = "";
                    }
                }
            }
            finalResults.innerHTML = "<h2>Final Results</h2><br><br>";

	var winner;
	if (playerTotalScore === computerTotalScore) {
		finalResults.innerHTML += "<strong>Tie!!! None of the Players win the game!</strong><br><br><br>";
	} else {
		if (playerTotalScore < computerTotalScore){
  			winner = "Player 2";
		} else{
			winner = "Player 1";
		}
		            finalResults.innerHTML += "<strong>" + winner + " wins the game!</strong><br><br><br>";
	}   

            // Display final results and winner with fade-in animation
            finalResults.innerHTML += "<strong>Player 1 score: " + playerTotalScore + "<br><br></strong>";
            finalResults.innerHTML += "<strong>Player 2 score: " + computerTotalScore + "<br><br></strong>";

            // Show the final results section with fade-in animation
            finalResults.classList.remove("hidden");
            finalResults.classList.add("fade-in");

            // Disable the roll button
            document.getElementById("rollButton").disabled = true;

            // Animation for fading in the opacity
            var opacityValue = 0;
            var animationHandler = requestAnimationFrame(function fadeInStep() {
                opacityValue += 0.05;
                if (opacityValue <= 1) {
                    finalResults.style.opacity = opacityValue;
                    requestAnimationFrame(fadeInStep);
                } else {
                    finalResults.style.opacity = 1;
                }
            });
        }

function resetGame() {
    playerTotalScore = 0;
    computerTotalScore = 0;
    playerRound = 0;
    computerRound = 0;
    round = 0;
    finalResults.innerHTML = "";
    finalResults.classList.add("hidden");
    roundNumber.textContent = "";
    roundNumber.classList.add("hidden");

    var currentScoreElements = document.querySelectorAll(".current-score");
    currentScoreElements.forEach(function (element) {
        element.textContent = "0";
    });

    var outputElements = document.querySelectorAll("#output1, #output2");
    outputElements.forEach(function (element) {
        element.innerHTML = "";
    });

    document.getElementById("rollButton").disabled = false;
}

function calculateScore(dice1, dice2) {
    if ((dice1 === 1 && dice2 === 1) || (dice1 === 1 && dice2 === 6) || (dice1 === 6 && dice2 === 1)) {
        return 0;
    } else if (dice1 === dice2) {
        return (dice1 + dice2) * 2;
    } else {
        return dice1 + dice2;
    }
}
