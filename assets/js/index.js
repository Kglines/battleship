import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here


// Create a div for the game board
const boardDiv = document.createElement('div');
boardDiv.setAttribute('id', 'board-div');
document.body.appendChild(boardDiv);

function createGameUI(){
    // Iterate through the grid
    board.grid.forEach((rows, row) => {
        // For Each row of the grid, create a div and append to the game board div
        rows.forEach((cols, col) => {
            let eachDiv = document.createElement('div');
            // console.log(eachDiv);
            boardDiv.appendChild(eachDiv);
            eachDiv.setAttribute('class', `square ${row}-${col}`);
    
        })
    })
}



console.log(board.makeHit(5, 3));

window.addEventListener("DOMContentLoaded", e => {
    createGameUI();
})

