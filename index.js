// Vanilla JS
// const notAllowedKeys = ["Shift", "Control", "Alt", "Enter", "Tab", "Backspace", 
//                         "Escape", "CapsLock", "Insert", "Delete", "Home", "End", 
//                         "PageUp", "PageDown", "PrintScreen", "Meta", "ContextMenu",
//                         "NumLock", "ScrollLock", "Pause", "F1", "F2", "F3", "F4", "F5", "F6", 
//                         "F7", "F8", "F9", "F10", "F12", "F12"];

// let currentLevel = 1;
// let levelTitle = document.querySelector("#level-title");
// let result = document.querySelector("#level-reached");

// document.addEventListener("keydown", keydownEventListener, true);

// function keydownEventListener(event) {
//     if (!notAllowedKeys.includes(event.key)) {
//         levelTitle.textContent = ("Level " + currentLevel.toString());
//         result.textContent = ("");
//         newLevel(currentLevel);
//     }
// }

// let simonButtons = document.querySelectorAll(".btn");

// function startGame() {
//     for (var i = 0; i < simonButtons.length; i++) {
//         simonButtons[i].addEventListener("click", clickEventListener, true);
//     }
// }

// function clickEventListener() {
//     var buttonColor = this.getAttribute("id");
//     simonSpeak(buttonColor);
//     buttonAnimation(buttonColor);
//     // check if patterns match
//     checkPattern(buttonColor);
// }

// function newRandomColor() {
//     let colors = ["green", "red", "yellow", "blue"];
//     let randomColor = colors[Math.floor(Math.random() * colors.length)];
//     return randomColor;
// }

// let simonSays;

// function newPattern(level) {
//     simonSays = [];
//     for (let i = 0; i < level; i++) {
//         var color = newRandomColor();
//         simonSays.push(color);
//     }
//     playPattern(simonSays);
// }

// // adds delay on playing new pattern
// function playPattern(simon) {
//     var delay = 750;
//     if (currentLevel > 4) {
//         delay = 500;
//     }
    
//     function processSound(index) {
//         buttonAnimation(simon[index]);
//         let sound = new Audio ("./sounds/" + simon[index] +".mp3");
//         sound.play();

//         if (index < simon.length - 1) {
//             setTimeout(function() {
//                 processSound(index + 1);
//             }, delay);
//         }
//     }
//     processSound(0);
// }

// function simonSpeak(color) {
//     switch(color) {
//         case "green":
//             let green = new Audio("./sounds/green.mp3");
//             green.play();
//             break;

//         case "red":
//             let red = new Audio("./sounds/red.mp3");
//             red.play();
//             break;

//         case "yellow":
//             let yellow = new Audio("./sounds/yellow.mp3");
//             yellow.play();
//             break;

//         case "blue":
//             let blue = new Audio("./sounds/blue.mp3");
//             blue.play();
//             break;

//         default:
//             break;
//     }
// }

// function buttonAnimation(currentButton) {
//     var activeButton = document.querySelector("#" + currentButton);
//     activeButton.classList.add("pressed");

//     setTimeout(function() {
//         activeButton.classList.remove("pressed");
//     }, 100);
// }

// function checkPattern(active) {
//     if (active === simonSays[0]) {
//         simonSays.shift();
//         if (simonSays.length < 1) {
//             setTimeout(function() {
//                 currentLevel++;
//                 levelTitle.textContent = ("Level " + currentLevel);
//             },500);

//             setTimeout(function() {
//                 newLevel(currentLevel)
//             }, 750);
//         }
//     } else {
//         // level feedback
//         if (currentLevel < 10){
//             result.textContent = ("Can't beat level " + (currentLevel).toString() + "?");
//         } else {
//             result.textContent = ("Wow! You've reached level " + (currentLevel).toString() + " without a sweat!");
//         }

//         // reset level
//         gameOverAlert();
//         currentLevel = 1;
        
//         // toggle event listeners
//         document.addEventListener("keydown", keydownEventListener, true);
//         for (var i = 0; i < simonButtons.length; i++) {
//             simonButtons[i].removeEventListener("click", clickEventListener, true);
//         }
//     }
// }

// function gameOverAlert() {
//     let gameOver = new Audio("./sounds/wrong.mp3");
//     gameOver.play();

//     levelTitle.textContent = ("Game Over, Press Any Key To Try Again.");

//     document.querySelector("body").classList.add("game-over");
//     setTimeout(function() {
//         document.querySelector("body").classList.remove("game-over");
//     }, 100);
// }

// function newLevel(level) {
//     newPattern(level);
//     startGame();
//     document.removeEventListener("keydown", keydownEventListener, true);
// }

// jQuery
let $currentLevel = 1;
let $levelTitle = $("#level-title");
let $resultAlert = $("#level-reached");

$(document).keypress(keydownEventListener);

function keydownEventListener(event) {
    if (!($levelTitle.text() === "Level " + $currentLevel)){
        $levelTitle.text("Level " + $currentLevel);
        $resultAlert.text("");
        createPattern($currentLevel);
    }
}

let $simonButtons = $(".btn");
$simonButtons.click(clickEventListener);

function clickEventListener() {
    if ($levelTitle.text() === "Level " + $currentLevel){
        var $buttonColor = $(this).attr("Id");
        simonSpeak($buttonColor);
        buttonAnimation($buttonColor);
        checkPattern($buttonColor);
    }
}

function simonSpeak(color) {
    switch(color) {
        case "green":
            let green = new Audio("./sounds/" + color + ".mp3");
            green.play();
            break;

        case "red":
            let red = new Audio("./sounds/" + color + ".mp3");
            red.play();
            break;

        case "yellow":
            let yellow = new Audio("./sounds/" + color + ".mp3");
            yellow.play();
            break;

        case "blue":
            let blue = new Audio("./sounds/" + color + ".mp3");
            blue.play();
            break;

        default:
            break;
    }
}

function buttonAnimation(active) {
    let $buttonClicked = $("#" + active);
    $buttonClicked.addClass("pressed");

    setTimeout(function() {
        $buttonClicked.removeClass("pressed");
    }, 100);
}

let $simonSays;

function createPattern(level) {
    $simonSays = [];
    function randomColor() {
        let colors = ["green", "red", "yellow", "blue"];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    for(var i = 0; i < level; i++) {
        $simonSays.push(randomColor());
    }
    playPattern($simonSays);
}

// Adds delay on playing each sound
function playPattern(pattern) {
    let $delay = 750;
    function processAudio(index) {
        buttonAnimation(pattern[index]);
        let sound = new Audio("./sounds/" + pattern[index] + ".mp3");
        sound.play();

        if (index < pattern.length - 1) {
            setTimeout(function() {
                processAudio(index + 1);
            }, $delay);
        }
    }
    processAudio(0);
}

function checkPattern(active) {
    if (active === $simonSays[0]) {
        $simonSays.shift();
        if ($simonSays.length < 1) {
            // Adds delay to level changing
            setTimeout(function(){
                $currentLevel++;
                $levelTitle.text("Level " + $currentLevel);
            }, 250);

            // Adds delay to showing new pattern
            setTimeout(function() {
                createPattern($currentLevel);
            }, 750);
        }
    } else {
        gameOver();
    }
}

function gameOver(){
    // Game Over Animation
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);

    // Game Over Sound
    let sound = new Audio("./sounds/wrong.mp3");
    sound.play();

    // Player Feedback
    if ($currentLevel < 8) {
        $resultAlert.text("Can't beat level " + $currentLevel + "? 😒")
    } else {
        $resultAlert.text("You did great! 🚩")
    }

    $levelTitle.text("Game Over, Press A Key to Try Again.");
    $currentLevel = 1;
}