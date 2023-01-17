//At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];
//At he top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];
// array to store the clicked button id.
var userClickedPattern = [];
//track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//Create a new variable called level and start at level 0.
var level = 0;
//detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$("button").click(function() {
  if (!started) {
    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    //claaing the function.
    nextSequence();
    started = true;
  }
});
//to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
  // selecting the id of the clicked button.
  var userChosenColour = $(this).attr("id");
  // passind the id to the userClickedPattern empty array.
  userClickedPattern.push(userChosenColour);
// calling the sound function.
  playSound(userChosenColour);
// calling the animation function.
  animatePress(userChosenColour);
//Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});
//Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
    //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      //If the user got the most recent answer, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");
      // if user clicked wrong button calling finction to play the sound.
      playSound("wrong");
      // adding the animation to the body.
      $("body").addClass("game-over");
      //removing the animation from the body after the delay of 200ms.
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      //changing the h1 text from selecting the id .
      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}
//Inside game.js create a new function called nextSequence()
function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
//Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);
//Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];
//Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);
//Use jQuery to select the button with the same id as the randomChosenColour
//Use jQuery to animate a flash to the button selected
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//play the sound for the button colour selected
  playSound(randomChosenColour);
}
//function to play the sound.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//function to animate the button when pressed.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
