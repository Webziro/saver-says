// *Variables*
// Declare a variable and assign it to your fav drink as a string. Make sure there is no whitespace on either side of the string, and print the value to the console
let favDrink = "coffee";
// console.log(favDrink);

//Declare a variable, assign it a string of multiple words, and check to see if one of the words is "apple".
let fruitBasket = "banana apple orange";
// console.log(fruitBasket.includes("apple"));

if(fruitBasket.includes("apple")) {
    // console.log("Apple is in the fruit basket!");
} else {
    // console.log("Apple is not in the fruit basket.");
}

// *Functions*
// Create a function that returns rock, paper, or scissors as randomly as possible
function getRandomChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
// console.log(`Server says: ${getRandomChoice()}`);
// alert(`Bot chose: ${getRandomChoice()}`);

// *Conditionals*
//Create a function that takes in a choice (rock, paper, or scissors) 
// and determines if they won a game of rock paper scissors against a bot using the above function
// function playGame(playerChoice) {
//     const botChoice = getRandomChoice();
//     console.log(`Player chose: ${playerChoice}`);
//     console.log(`Server Says: ${botChoice}`);

//     if (playerChoice === botChoice) {
//         console.log("It's a tie!");
//     } else if (
//         (playerChoice === "rock" && botChoice === "scissors") ||
//         (playerChoice === "paper" && botChoice === "rock") ||
//         (playerChoice === "scissors" && botChoice === "paper")
//     ) {
//         console.log("Player wins!");
//     } else {
//         console.log("Server wins!");
//     }
// }

//*Loops*
//Create a function that takes an array of choices. Play the game x times where x is the number of choices 
// in the array. Print the results of each game to the console.
// console.log(playMultipleGames(["rock", "paper", "rock", "rock", "scissors", "paper"]));

function playMultipleGames(choices) {
    choices.forEach(choice => {
        playGame(choice);
    });
}

// --- DOM Interphase for Rock Paper Scissors ---

let selectedChoice = null;

// Sound effects

const pickSound = new Audio('sounds/pick.mp3');
const resultSound = new Audio('sounds/win.mp3');
const bgMusic = new Audio('sounds/background.mp3');
bgMusic.loop = true;
let musicStarted = false;

document.addEventListener('DOMContentLoaded', function() {
    // Sound controls
    const musicPlayBtn = document.getElementById('musicPlay');
    const musicPauseBtn = document.getElementById('musicPause');
    const musicMuteBtn = document.getElementById('musicMute');
    const musicUnmuteBtn = document.getElementById('musicUnmute');
    const musicVolumeSlider = document.getElementById('musicVolume');
    const effectsVolumeSlider = document.getElementById('effectsVolume');

    musicPlayBtn.addEventListener('click', function() {
        bgMusic.play();
    });
    musicPauseBtn.addEventListener('click', function() {
        bgMusic.pause();
    });
    musicMuteBtn.addEventListener('click', function() {
        bgMusic.muted = true;
    });
    musicUnmuteBtn.addEventListener('click', function() {
        bgMusic.muted = false;
    });
    musicVolumeSlider.addEventListener('input', function(e) {
        bgMusic.volume = parseFloat(e.target.value);
    });
    effectsVolumeSlider.addEventListener('input', function(e) {
        pickSound.volume = parseFloat(e.target.value);
        resultSound.volume = parseFloat(e.target.value);
    });
    document.getElementById('rockBtn').addEventListener('click', function() {
        selectedChoice = 'rock';
        highlightSelected('rockBtn');
        playPickSound();
    });
    document.getElementById('paperBtn').addEventListener('click', function() {
        selectedChoice = 'paper';
        highlightSelected('paperBtn');
        playPickSound();
    });
    document.getElementById('scissorsBtn').addEventListener('click', function() {
        selectedChoice = 'scissors';
        highlightSelected('scissorsBtn');
        playPickSound();
    });
    document.getElementById('playBtn').addEventListener('click', function() {
        if (!selectedChoice) {
            displayResult('Please select an option first!');
            return;
        }
        // Start background music on first play
        if (!musicStarted) {
            bgMusic.currentTime = 0;
            bgMusic.play();
            musicStarted = true;
        }
        // Play game and show result
        const botChoice = getRandomChoice();
        let result = `Player chose: ${selectedChoice}<br>Bot chose: ${botChoice}<br>`;
        if (selectedChoice === botChoice) {
            result += "It's a tie!";
        } else if (
            (selectedChoice === "rock" && botChoice === "scissors") ||
            (selectedChoice === "paper" && botChoice === "rock") ||
            (selectedChoice === "scissors" && botChoice === "paper")
        ) {
            result += "Player wins!";
        } else {
            result += "Bot wins!";
        }
        displayResult(result);
        playResultSound();
    });
});

function playPickSound() {
    pickSound.currentTime = 0;
    pickSound.play();
}

function playResultSound() {
    resultSound.currentTime = 0;
    resultSound.play();
}

function displayResult(msg) {
    document.getElementById('resultArea').innerHTML = msg;
}

function highlightSelected(btnId) {
    ['rockBtn','paperBtn','scissorsBtn'].forEach(id => {
        document.getElementById(id).classList.remove('selected');
    });
    document.getElementById(btnId).classList.add('selected');
}
