'use strict';

// Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores; // For holding scores
let currentScore; // For calculationg current scores
let activePlayer; // For switching players
let playing; // Is game available or not

// Initialize game function
function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
    diceEL.classList.add('hidden');
    scores[0] = 0;
    scores[1] = 0;
}
init(); // Basically initiates the  game

//This function is for switching player
function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0; // Nullifying that calculated score
    currentScore = 0; // resetting score back to 0
    activePlayer = activePlayer === 0 ? 1 : 0; // Switching player
    player0EL.classList.toggle('player--active'); // Toggling active/inactive player backgrounds
    player1EL.classList.toggle('player--active'); // Toggling active/inactive player backgrounds
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to the current score
            currentScore += dice; // Calculating score
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; // Displaying that calculated score
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score  to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if score >= 100
        if (scores[activePlayer] >= 50) {
            playing = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else switchPlayer();
    }
});

// Start a new game when new game button is pressed
btnNew.addEventListener('click', init);
