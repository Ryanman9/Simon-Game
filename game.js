var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);

        nextSequence();
        started = true;
    }
});

function nextSequence(){
    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);

            userClickedPattern = [];
        }
    }else{
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 1000);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}