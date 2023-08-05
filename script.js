'use strict';
//Selecting Elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const currScore0 = document.getElementById('current--0')
const currScore1 = document.getElementById('current--1')
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

//Starting Conditions

let scores, currentScore, activePlayer, playing;
    
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
    currScore0.textContent = 0;
    currScore1.textContent = 0;
    
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}
init();

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    //Switch to next Player
    activePlayer = activePlayer === 0 ? 1 : 0;
    //If active player is 0 then change it to 1 or change back to 0
    //Toogling the CSS
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    //While configuring with the class list don't put dot at the beginning of the string
    
}

//Rolling Dice Functionality

btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. Generating a random Dice number
        const dice = Math.trunc(Math.random() * 6) + 1;


        //2. Showing that number
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
    
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    
        } else {
            switchPlayer();
        }
    

        //3. If it's a 1 then switch to the next player
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        //1. Add current score to the active  player
        scores[activePlayer] += currentScore;
        //scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. Check if player's score is >= 100
        if (scores[activePlayer] >= 20) {
            //Finish the Game
            diceEl.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //Switch to the next player
            switchPlayer();
        
        }
    }

});

btnNew.addEventListener('click', init)

