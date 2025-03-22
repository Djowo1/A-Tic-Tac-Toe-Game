let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const statusDisplay = document.getElementById("status");
const winnerMessageDisplay = document.getElementById("winner-message");

document.querySelectorAll(".cell").forEach(function (cell) {
  cell.addEventListener("click", CellClick);
});

document.querySelector(".restart").addEventListener("click", Restart);

function CellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  CellPlayed(clickedCell, clickedCellIndex);
  ResultValidation();
  statusDisplay.innerHTML = "It's " + currentPlayer + "'s turn";
}

function CellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function ResultValidation() {
  let roundWon = false;
  for (let i = 0; i < 8; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      winnerMessageDisplay.style.display = "block";
      winnerMessageDisplay.innerHTML = `Player ${a} wins! `;
      gameActive = false;
      return;
    }
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    winnerMessageDisplay.style.display = "block";
    winnerMessageDisplay.innerHTML = "It's a draw!";
    gameActive = false;
    return;
  }
}

function Restart() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = "It's " + currentPlayer + "'s turn";
  winnerMessageDisplay.style.display = "none";
  document.querySelectorAll('.cell').forEach(function (cell) {
    cell.innerHTML = '';
  });
}

