let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStarted = false;
// This function is what enables the next sequence to trigger and a pattern to be created
function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

  $("#level-title").html("Level " + level);
  level += 1;
}
// This function is the source of what is input to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// This function shows a quick flash box over the box that has been clicked or triggered
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// This function works out if the user has clicked the correct answer for the sequence (Done by comparing the final index of both arrays to see if they match)
function checkAnswer(currentLevel) {
  // const lastElementClicked = userClickedPattern.slice(-1)[0];
  // const lastElementPattern = gamePattern.slice(-1)[0];

  // if (lastElementPattern === lastElementClicked) {
  // BOTH APPROACHES WORK ^^ THIS WAS MY APPROACH WHICH TAKES MORE CODE TO GET TO THE DESIRED ANSWER

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    // Play wrong sound when the user clicks an incorrect pattern
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
    console.log("Fail");
  }
  // This function *startOver* resets the game once the user clicks an incorrect button for the sequence
  function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
  }
}
// This stores the clicks the user makes in order to follow the correct sequences
$(".btn").on("click", function () {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});
// This allows noise to play when keys are clicked or tapped
$(".btn").click(function () {
  playSound(this.id);
  animatePress(this.id);
});

$(document).keypress(function () {
  console.log("Key press");

  // This is only launched when the game first begins (tap key to start)
  if (gamePattern.length < 1) {
    nextSequence();
    gameStarted = true;
  }
});

console.log(gamePattern);
