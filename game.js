var buttonColours = ["green", "red", "yellow", "blue", "purple", "cyan"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;



$("button").one('click', function () { // the game starts when the button "play" is clicked
    nextSequence();
})

function nextSequence() {
    $("button").addClass("no-click");
    $(".btnn").removeClass("no-click"); // because in the delay of 1 sec, we want no clicks

    userClickedPattern = []; // we reset the value in the next level

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 6);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    
    //

    var currentIndex = 0;
    function flashColor() {
        if (currentIndex < gamePattern.length) {
            var color = gamePattern[currentIndex];
            $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100, function() {
                playSound('blue');
                currentIndex++;
                setTimeout(flashColor, 300); // this will keep calling flashColor until the current index is equal to gamePatther.length
            });
        } else {
            gameStarted = true; // game starts the buttons flash is finished
        }
    }
    
    flashColor(); // Start the sequence  
}


$(".btnn").on("click", function() {
    if (gameStarted === true) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound('red'); // playSound(userChosenColour);
        animatePress(userChosenColour);
        
        checkAnswer(userClickedPattern.length - 1);
    }
});



function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3'); /* var audio = new Audio('sounds/' + name + '.mp3'); */
    audio.volume = 0.1;
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 150)
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){
            gameStarted = false; // no user clicks will be entered until the the delay of 1 sec
            $(".btnn").addClass("no-click");
            
            setTimeout(function () {
                nextSequence();
              }, 1000); }

    } else {
        var completedLevel = level - 1; // how many levels completed
        levelText = ""; // do we wirte level or levels when game is over
        if (completedLevel == 1) {
            levelText = "level";
        } else {
            levelText = "levels";
        }
        playSound('wrong');
        $('body').addClass("game-over");
        setTimeout(function() {
            $('body').removeClass("game-over")
        }, 200);
        $("h1").text("Game Over. You completed " + completedLevel + ' ' + levelText + '!');
        $(".btnn").addClass("no-click");
        gameStarted = false; // when game is over, user won't be able to click
        $("button").text('Play Again')
        $("button").removeClass("no-click");
        $("button").one('click', function () {
            gameStarted = true;
            startOver();;
        })
    }
}


function startOver() {
    gamePattern = [];
    level = 0;
    nextSequence();
}














