let greetingModal = document.querySelector('.welcome-greeting');
let greetingButton = document.querySelector('.greeting-button');
const gameContainer = document.querySelector('.game-container');
gameContainer.style.display = 'none';
let newGame;

const player1Form = document.querySelector('#player1Form');
const player2Form = document.querySelector('#player2Form');

const player1Modal = document.querySelector('#player1');
const player2Modal = document.querySelector('#player2');

let newPlayer1;
let newPlayer2;

const player1X = document.querySelector('#player1X');
const player1O = document.querySelector('#player1O');
const player2X = document.querySelector('#player2X');
const player2O = document.querySelector('#player2O');

const winnerModal = document.querySelector('#winnerModal');
const winnerGreeting = document.querySelector('.winnerGreeting');
const restartButton = document.querySelector('#restartButton');


player1Form.addEventListener('submit', (e) => {
    e.preventDefault(); 
});

player2Form.addEventListener('submit', (e) => {
    e.preventDefault();
});


document.addEventListener('DOMContentLoaded', () => {

    if (greetingModal) {
        greetingModal.showModal();

        if (greetingButton) {
            greetingButton.addEventListener('click', () => {
                greetingModal.close();
                player1Modal.showModal();
                renderGame()
            });
        }
    };
});

function renderGame(){


player1X.addEventListener('click', (e) => {

    if(player1Form.name.value){
    e.preventDefault();
    newPlayer1 = createPlayer(player1Form.name.value, player1X.value);
    player1Modal.close();
    player2X.disabled = true;
    player2Modal.showModal();

    return{newPlayer1};
    }
    
});

player1O.addEventListener('click', (e) => {

    if(player1Form.name.value){
    e.preventDefault();
    newPlayer1 = createPlayer(player1Form.name.value, player1O.value);
    player1Modal.close();
    player2O.disabled = true;
    player2Modal.showModal();

    return{newPlayer1};
    }
    
});


    player2O.addEventListener('click', (e) => {

        if(player2Form.name.value){
        e.preventDefault();
        newPlayer2 = createPlayer(player2Form.name.value, player2O.value);
        player2Modal.close();
        gameContainer.style.display = 'flex';
        startGame()
    
        return{newPlayer2};
        }
    });
    

    player2X.addEventListener('click', (e) => {

        if(player2Form.name.value){
        e.preventDefault();
        newPlayer2 = createPlayer(player2Form.name.value, player2X.value);
        player2Modal.close();
        gameContainer.style.display = 'flex';
        startGame();
    
        return{newPlayer2};
        }
    });
}



const createGameboard = function () {
    const create = () => new Array(9).fill(''); 
    return { create }
}();


function createPlayer(name, marker) {

    const placeMark = (array, index) => array[index] = marker;
    
    let playerMarks = [];

    return { name, marker, placeMark, playerMarks };
}

const gameController = (function(){

    function isWinner(playerMarks) {
    if (playerMarks.includes('0') && playerMarks.includes('1') && playerMarks.includes('2')) {
        return true;
    }
    else if (playerMarks.includes('3') && playerMarks.includes('4') && playerMarks.includes('5')) {
        return true;
    }
    else if (playerMarks.includes('6') && playerMarks.includes('7') && playerMarks.includes('8')) {
        return true;
    }
    else if (playerMarks.includes('0') && playerMarks.includes('3') && playerMarks.includes('6')) {
        return true;
    }
    else if (playerMarks.includes('1') && playerMarks.includes('4') && playerMarks.includes('7')) {
        return true;
    }
    else if (playerMarks.includes('2') && playerMarks.includes('5') && playerMarks.includes('8')) {
        return true;
    }
    else if (playerMarks.includes('0') && playerMarks.includes('4') && playerMarks.includes('8')) {
        return true;
    }
    else if (playerMarks.includes('2') && playerMarks.includes('4') && playerMarks.includes('6')) {
        return true;
    }
    else {
        return false;
    }
}

const resultGame = function() {
    winnerModal.showModal();
    restartButton.addEventListener('click', restartGame)
}

const restartGame = function() {
    winnerModal.close()
    newPlayer1.playerMarks.length = 0;
    newPlayer2.playerMarks.length = 0;
    startGame()
}

const isDraw = function(gameBoard) {
    return gameBoard.every(item => item !== '');
}


return { isWinner, resultGame, restartGame, isDraw}

}());



function startGame() {
    console.log('game started');

    let newGameboard = createGameboard.create();
    let player1Turn = true;
    const gameTiles = document.querySelectorAll('.game-tile');

    gameTiles.forEach((gameTile, index) => {
        gameTile.classList.remove('O', 'X');
        gameTile.removeEventListener('click', tileClick);
        gameTile.addEventListener('click', tileClick, { once: true });
        gameTile.setAttribute('data-tile', index);
    });

    function tileClick(e) {
        let tile = e.target;
        const playerChoice = e.target.getAttribute('data-tile');

        if (player1Turn) {
            newPlayer1.placeMark(newGameboard, playerChoice);
            newPlayer1.playerMarks.push(playerChoice);
            tile.classList.add(newPlayer1.marker);

            if (gameController.isWinner(newPlayer1.playerMarks)) {
                winnerGreeting.textContent = `${newPlayer1.name} wins!`;
                gameController.resultGame();
            }
        } else {
            newPlayer2.placeMark(newGameboard, playerChoice);
            newPlayer2.playerMarks.push(playerChoice);
            tile.classList.add(newPlayer2.marker);

            if (gameController.isWinner(newPlayer2.playerMarks)) {
                winnerGreeting.textContent = `${newPlayer2.name} wins!`;
                gameController.resultGame();
            }
        }

        if(gameController.isDraw(newGameboard)){
            winnerGreeting.textContent = `It's a draw!`;
            gameController.resultGame()
        }

        player1Turn = !player1Turn;
        console.log(newGameboard);
    }
}
                