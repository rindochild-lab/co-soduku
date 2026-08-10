/* =========================================
   SUDOKU TOGETHER
   Version 0.2
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");

const newGameBtn = document.getElementById("new-game-btn");
const joinGameBtn = document.getElementById("join-game-btn");
const backBtn = document.getElementById("back-btn");
const newPuzzleBtn = document.getElementById("new-puzzle-btn");

const sudokuBoard = document.getElementById("sudoku-board");
const numberPad = document.getElementById("number-pad");
const gameMessage = document.getElementById("game-message");


/* =========================================
   GAME STATE
========================================= */

let puzzle = [];
let solution = [];
let playerBoard = [];

let selectedCell = null;


/* =========================================
   START
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    setupNavigation();
    setupNumberPad();
    setupKeyboard();

});


/* =========================================
   NAVIGATION
========================================= */

function setupNavigation() {

    newGameBtn.addEventListener("click", () => {

        startGame();

    });


    joinGameBtn.addEventListener("click", () => {

        /*
         * Multiplayer will be added here.
         *
         * For v0.2, joining simply starts
         * a local game.
         */

        startGame();

        gameMessage.textContent =
            "Multiplayer connection will be added next.";

    });


    backBtn.addEventListener("click", () => {

        showScreen("home");

    });


    newPuzzleBtn.addEventListener("click", () => {

        createNewPuzzle();

    });

}


/* =========================================
   SCREEN MANAGEMENT
========================================= */

function showScreen(screen) {

    homeScreen.classList.remove("active");
    gameScreen.classList.remove("active");


    if (screen === "home") {

        homeScreen.classList.add("active");

    }


    if (screen === "game") {

        gameScreen.classList.add("active");

    }

}


/* =========================================
   START GAME
========================================= */

function startGame() {

    showScreen("game");

    createNewPuzzle();

}


/* =========================================
   CREATE PUZZLE
========================================= */

function createNewPuzzle() {

    selectedCell = null;

    gameMessage.textContent = "";

    solution = generateSolvedBoard();

    puzzle = createPuzzleFromSolution(solution);

    playerBoard = puzzle.map(row => [...row]);

    drawBoard();

}


/* =========================================
   GENERATE SOLVED SUDOKU
========================================= */

function generateSolvedBoard() {

    const board = Array.from(
        { length: 9 },
        () => Array(9).fill(0)
    );


    fillBoard(board);

    return board;

}


function fillBoard(board) {

    const emptyCell = findEmptyCell(board);


    if (!emptyCell) {

        return true;

    }


    const [row, col] = emptyCell;

    const numbers = shuffledNumbers();


    for (const number of numbers) {

        if (isValidPlacement(board, row, col, number)) {

            board[row][col] = number;


            if (fillBoard(board)) {

                return true;

            }


            board[row][col] = 0;

        }

    }


    return false;

}


/* =========================================
   FIND EMPTY CELL
========================================= */

function findEmptyCell(board) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {

                return [row, col];

            }

        }

    }


    return null;

}


/* =========================================
   VALIDATE NUMBER
========================================= */

function isValidPlacement(board, row, col, number) {

    // Row

    for (let x = 0; x < 9; x++) {

        if (board[row][x] === number) {

            return false;

        }

    }


    // Column

    for (let y = 0; y < 9; y++) {

        if (board[y][col] === number) {

            return false;

        }

    }


    // 3x3 box

    const boxRow =
        Math.floor(row / 3) * 3;

    const boxCol =
        Math.floor(col / 3) * 3;


    for (let y = boxRow; y < boxRow + 3; y++) {

        for (let x = boxCol; x < boxCol + 3; x++) {

            if (board[y][x] === number) {

                return false;

            }

        }

    }


    return true;

}


/* =========================================
   SHUFFLE NUMBERS
========================================= */

function shuffledNumbers() {

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];


    for (let i = numbers.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));


        [numbers[i], numbers[j]] =
            [numbers[j], numbers[i]];

    }


    return numbers;

}


/* =========================================
   REMOVE NUMBERS FROM SOLUTION
========================================= */

function createPuzzleFromSolution(solvedBoard) {

    const board =
        solvedBoard.map(row => [...row]);


    /*
     * Remove approximately 45 numbers.
     *
     * This gives the prototype a reasonably
     * challenging puzzle while keeping it
     * playable.
     */

    let cellsToRemove = 45;


    while (cellsToRemove > 0) {

        const row =
            Math.floor(Math.random() * 9);

        const col =
            Math.floor(Math.random() * 9);


        if (board[row][col] !== 0) {

            board[row][col] = 0;

            cellsToRemove--;

        }

    }


    return board;

}


/* =========================================
   DRAW BOARD
========================================= */

function drawBoard() {

    sudokuBoard.innerHTML = "";


    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const cell =
                document.createElement("button");


            cell.classList.add("sudoku-cell");


            const value =
                playerBoard[row][col];


            const isGiven =
                puzzle[row][col] !== 0;


            cell.dataset.row = row;
            cell.dataset.col = col;


            if (value !== 0) {

                cell.textContent = value;

            }


            if (isGiven) {

                cell.classList.add("given");

                cell.disabled = true;

            }


            cell.addEventListener("click", () => {

                selectCell(row, col);

            });


            sudokuBoard.appendChild(cell);

        }

    }

}


/* =========================================
   SELECT CELL
========================================= */

function selectCell(row, col) {

    if (puzzle[row][col] !== 0) {

        return;

    }


    selectedCell = {
        row,
        col
    };


    updateSelectedCell();

}


/* =========================================
   UPDATE SELECTED CELL
========================================= */

function updateSelectedCell() {

    const cells =
        document.querySelectorAll(".sudoku-cell");


    cells.forEach(cell => {

        cell.classList.remove("selected");

    });


    if (!selectedCell) {

        return;

    }


    const index =
        selectedCell.row * 9 +
        selectedCell.col;


    if (cells[index]) {

        cells[index].classList.add("selected");

    }

}


/* =========================================
   NUMBER PAD
========================================= */

function setupNumberPad() {

    numberPad.addEventListener("click", event => {

        const button =
            event.target.closest("button");


        if (!button) {

            return;

        }


        if (!selectedCell) {

            gameMessage.textContent =
                "Select a square first.";

            return;

        }


        const number =
            Number(button.dataset.number);


        if (number === 0) {

            enterNumber(null);

        } else {

            enterNumber(number);

        }

    });

}


/* =========================================
   ENTER NUMBER
========================================= */

function enterNumber(number) {

    if (!selectedCell) {

        return;

    }


    const row = selectedCell.row;
    const col = selectedCell.col;


    // Do not modify original puzzle numbers.

    if (puzzle[row][col] !== 0) {

        return;

    }


    if (number === null) {

        playerBoard[row][col] = 0;

        gameMessage.textContent = "";

    } else {

        playerBoard[row][col] = number;


        if (number !== solution[row][col]) {

            gameMessage.textContent =
                "That number doesn't belong there.";

        } else {

            gameMessage.textContent = "";

        }

    }


    drawBoard();

    updateSelectedCell();

    checkForWin();

}


/* =========================================
   KEYBOARD INPUT
========================================= */

function setupKeyboard() {

    document.addEventListener("keydown", event => {

        if (!selectedCell) {

            return;

        }


        // Number keys

        if (
            event.key >= "1" &&
            event.key <= "9"
        ) {

            enterNumber(Number(event.key));

        }


        // Backspace / Delete / 0

        if (
            event.key === "Backspace" ||
            event.key === "Delete" ||
            event.key === "0"
        ) {

            enterNumber(null);

        }

    });

}


/* =========================================
   CHECK WIN
========================================= */

function checkForWin() {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (
                playerBoard[row][col] !==
                solution[row][col]
            ) {

                return;

            }

        }

    }


    gameMessage.textContent =
        "🎉 Puzzle complete!";


    celebrateWin();

}


/* =========================================
   WIN EFFECT
========================================= */

function celebrateWin() {

    const cells =
        document.querySelectorAll(".sudoku-cell");


    cells.forEach(cell => {

        cell.classList.add("selected");

    });

}


/* =========================================
   FUTURE MULTIPLAYER AREA
========================================= */

/*
 *
 * v0.3+
 *
 * This is where we will eventually add:
 *
 * - Room creation
 * - Room codes
 * - Player identification
 * - WebSocket / realtime connection
 * - Shared board state
 * - Synchronization between devices
 * - Player cursors
 * - Conflict handling
 *
 */


/* =========================================
   END
========================================= */
