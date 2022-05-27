import Board from "./board.js";

let board = new Board(); // creates a new game board

// Create a div for the game board
const boardDiv = document.createElement('div');
boardDiv.setAttribute('id', 'board-div');
document.body.appendChild(boardDiv);

let turnCount = 40;


function createGameUI(){
    // Iterate through the grid
    board.grid.forEach((rows, row) => {
        // For Each row of the grid, create a div and append to the game board div
        rows.forEach((cols, col) => {
            let eachDiv = document.createElement('div');
            let currValue = null;

            if(board.grid[row][col]){
                currValue = board.grid[row][col]
            }

            boardDiv.appendChild(eachDiv);
            eachDiv.setAttribute('class', `square`)
            eachDiv.setAttribute('id', `${row}-${col}`);
            
            localStorage.setItem(`${row}-${col}`, currValue);
        })
    })
}

function convertCoords (string) {
    let coords = string.split('-');
    let row = Number(coords[0]);
    let col = Number(coords[1]);
    return [row, col];
}


function clickSquare(){
    // Makes an array of squares
    let squares = document.querySelectorAll('.square');
    // Iterate through the array of squares
    squares.forEach(square => {
        square.addEventListener('click', e => {
            turnCount--;
            if(turnCount === 0) losingScreen();

            // Take the id of an individual square and getting value of the square
            let coordinate = e.target.id
            let val = localStorage.getItem(coordinate);
            let converted = convertCoords(coordinate);
            let row = converted[0];
            let col = converted[1];

            // Count down number of turns using makeHit() and style the square selected
            if(val !== 'null'){
                board.makeHit(row, col);
                e.target.style.backgroundColor = 'lime';
                e.target.innerText = val;
                e.target.style.fontFamily = 'cursive';
            } else {
                e.target.style.backgroundColor = 'white';
            }
            // board.numRemaining = 0;
            // Game over if no remaining turns
            if(board.numRemaining === 0){
                gameOverScreen();
            }
        })
    })
}

function losingScreen(){
    boardDiv.style.display = 'none';
    let over = document.createElement('div');
    
    over.setAttribute('class', 'game-over');
    document.body.appendChild(over);
    let lose = document.createElement('h2');
    lose.setAttribute('id', 'lose');

    let imageDiv = document.createElement('div');
    let image = document.createElement('img');
    image.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Skull-Icon.svg');
    imageDiv.appendChild(image);
    image.setAttribute('id', 'skull');
    imageDiv.setAttribute('id', 'image-div');
    
    lose.innerText = 'You LOSE, LOL!!!';
    over.appendChild(lose);
    over.appendChild(imageDiv);


    let playAgain = document.createElement('button');
    playAgain.setAttribute('id', 'button');
    playAgain.innerText = 'Play Again';
    over.appendChild(playAgain);

    playAgain.addEventListener('click', e => {
        location.reload();
    })
}

function gameOverScreen(){
    // Creates new screen for end of game
    boardDiv.style.display = 'none';
    let over = document.createElement('div');
    over.innerText = 'You Win!' 
    over.setAttribute('class', 'game-over');
    document.body.appendChild(over);

    let playAgain = document.createElement('button');
    playAgain.innerText = 'Play Again';
    over.appendChild(playAgain);

    playAgain.addEventListener('click', e => {
        location.reload();
    })
}

window.addEventListener("DOMContentLoaded", e => {
    createGameUI();
    clickSquare();
})

