const statusDisplay = document.querySelector(".game-status");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} wins!`;
const drawMessage = () => `It's a draw.`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

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

function handleTilePlayed(clickedTile, clickedTileIndex) {
  gameState[clickedTileIndex] = currentPlayer;
  clickedTile.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]]; 
    console.log(a, b, c);
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleTileClick(event) {
  const clickedTile = event.target;
  const clickedTileIndex = parseInt(clickedTile.dataset.index);

  if (gameState[clickedTileIndex] !== "" || !gameActive) {
    return;
  }

  handleTilePlayed(clickedTile, clickedTileIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".tile").forEach((tile) => (tile.innerHTML = ""));
}

document
  .querySelectorAll(".tile")
  .forEach((tile) => tile.addEventListener("click", handleTileClick));
document
  .querySelector(".restart-button")
  .addEventListener("click", handleRestartGame);

  console.log('test')