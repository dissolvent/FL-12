'use strict';

const minPocketValue = 0;
const pocketValueIncrement = 4;
const maxGuessAttempt = 3;

let totalPrize, maxPocketValue, continueGame;
let prizes = {};
let startGame = confirm('Do you want to play a game?');


if (!startGame) {
    alert('You did not become a billionaire, but can.');
};

while (startGame) {
    
    totalPrize = 0;
    maxPocketValue = 8;
    prizes = {
        0: 100,
        1: 50,
        2: 25
    };
    continueGame = true;

    while (continueGame) {

        continueGame = false;
        let randomPocket = Math.floor(Math.random() * (maxPocketValue + 1));
        let userPocketGuess;
        let currentAttempt = 0;

        do {
            userPocketGuess = parseInt(prompt(`Choose a roulette pocket number from 0 to ${maxPocketValue}
                                               Attempts left: ${maxGuessAttempt - currentAttempt}
                                               Total prize: ${totalPrize}
                                               Possible prize on current attempt: ${prizes[currentAttempt]}`));
            currentAttempt++;
        } while (maxGuessAttempt > currentAttempt && randomPocket !== userPocketGuess);
        
        if (randomPocket === userPocketGuess) {
            let currentPrize = prizes[currentAttempt - 1];
            continueGame = confirm(`Congratulation, you won!   Your prize is: ${currentPrize}$. Do you want to continue?`);
            totalPrize += currentPrize;
        };
        
        if (!continueGame || randomPocket !== userPocketGuess) {
            alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
            startGame = confirm('Do you want to play again?');
        } else {
            maxPocketValue += pocketValueIncrement;
            for (let key of Object.keys(prizes)) {
                prizes[key] *= 2;
            }
        }
    }
}

