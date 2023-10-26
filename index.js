// Vanilla JS
const notAllowedKeys = ["Shift", "Control", "Alt", "Enter", "Tab", "Backspace", 
                        "Escape", "CapsLock", "Insert", "Delete", "Home", "End", 
                        "PageUp", "PageDown", "PrintScreen", "Meta", "ContextMenu",
                        "NumLock", "ScrollLock", "Pause", "F1", "F2", "F3", "F4", "F5", "F6", 
                        "F7", "F8", "F9", "F10", "F12", "F12"];

let currentLevel = 1;
let levelTitle = document.querySelector("#level-title");
let result = document.querySelector("#level-reached");

document.addEventListener("keydown", keydownEventListener, true);

function keydownEventListener(event) {
    if (!notAllowedKeys.includes(event.key)) {
        levelTitle.textContent = ("Level " + currentLevel.toString());
        result.textContent = ("");
        newLevel(currentLevel);
    }
}

let simonButtons = document.querySelectorAll(".btn");

function startGame() {
    for (var i = 0; i < simonButtons.length; i++) {
        simonButtons[i].addEventListener("click", clickEventListener, true);
    }
}

function clickEventListener() {
    var buttonColor = this.getAttribute("id");
    simonSpeak(buttonColor);
    buttonAnimation(buttonColor);
    // check if patterns match
    checkPattern(buttonColor);
}

function newRandomColor() {
    let colors = ["green", "red", "yellow", "blue"];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
}

let simonSays;

function newPattern(level) {
    simonSays = [];
    for (let i = 0; i < level; i++) {
        var color = newRandomColor();
        simonSays.push(color);
    }
    playPattern(simonSays);
}

// adds delay on playing new pattern
function playPattern(simon) {
    var delay = 750;
    if (currentLevel > 4) {
        delay = 500;
    }
    
    function processSound(index) {
        buttonAnimation(simon[index]);
        let sound = new Audio ("./sounds/" + simon[index] +".mp3");
        sound.play();

        if (index < simon.length - 1) {
            setTimeout(function() {
                processSound(index + 1);
            }, delay);
        }
    }
    processSound(0);
}

function simonSpeak(color) {
    switch(color) {
        case "green":
            let green = new Audio("./sounds/green.mp3");
            green.play();
            break;

        case "red":
            let red = new Audio("./sounds/red.mp3");
            red.play();
            break;

        case "yellow":
            let yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;

        case "blue":
            let blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;

        default:
            break;
    }
}

function buttonAnimation(currentButton) {
    var activeButton = document.querySelector("#" + currentButton);
    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}

function checkPattern(active) {
    if (active === simonSays[0]) {
        simonSays.shift();
        if (simonSays.length < 1) {
            setTimeout(function() {
                currentLevel++;
                levelTitle.textContent = ("Level " + currentLevel);
            },500);

            setTimeout(function() {
                newLevel(currentLevel)
            }, 750);
        }
    } else {
        // level feedback
        if (currentLevel < 10){
            result.textContent = ("Can't beat level " + (currentLevel).toString() + "?");
        } else {
            result.textContent = ("Wow! You've reached level " + (currentLevel).toString() + " without a sweat!");
        }

        // reset level
        gameOverAlert();
        currentLevel = 1;
        
        // toggle event listeners
        document.addEventListener("keydown", keydownEventListener, true);
        for (var i = 0; i < simonButtons.length; i++) {
            simonButtons[i].removeEventListener("click", clickEventListener, true);
        }
    }
}

function gameOverAlert() {
    let gameOver = new Audio("./sounds/wrong.mp3");
    gameOver.play();

    levelTitle.textContent = ("Game Over, Press Any Key To Try Again.");

    document.querySelector("body").classList.add("game-over");
    setTimeout(function() {
        document.querySelector("body").classList.remove("game-over");
    }, 100);
}

function newLevel(level) {
    newPattern(level);
    startGame();
    document.removeEventListener("keydown", keydownEventListener, true);
}

// jQuery