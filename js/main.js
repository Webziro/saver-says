//Function to get player choice and play game
function getRandomChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
// console.log(`Server says: ${getRandomChoice()}`);

//Call the chioce variable from the  getRandomChioce function
function playMultipleGames(choices) {
    choices.forEach(choice => {
        playGame(choice);
    });
}


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
        let resultMsg = `Player chose: ${selectedChoice}<br>Server Says: ${botChoice}<br>`;
        let resultClass = '';
        if (selectedChoice === botChoice) {
            resultMsg += "It's a tie!";
            resultClass = 'result-tie';
        } else if (
            (selectedChoice === "rock" && botChoice === "scissors") ||
            (selectedChoice === "paper" && botChoice === "rock") ||
            (selectedChoice === "scissors" && botChoice === "paper")
        ) {
            resultMsg += "Player wins!";
            resultClass = 'result-win';
        } else {
            resultMsg += "Server Wins!";
            resultClass = 'result-lose';
        }
        displayResult(resultMsg, resultClass);
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
    let area = document.getElementById('resultArea');
    area.innerHTML = msg;
    area.classList.remove('result-win', 'result-lose', 'result-tie');
    if (arguments.length > 1 && arguments[1]) {
        area.classList.add(arguments[1]);
    }
}

function highlightSelected(btnId) {
    ['rockBtn','paperBtn','scissorsBtn'].forEach(id => {
        document.getElementById(id).classList.remove('selected');
    });
    document.getElementById(btnId).classList.add('selected');
}
