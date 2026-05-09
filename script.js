const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const aiToggle = document.getElementById('aiToggle');
const cells = Array.from(document.querySelectorAll('.cell'));

let currentPlayer = 'X';
let gameState = Array(9).fill('');
let gameActive = true;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function updateStatus(text) {
  statusDisplay.textContent = text;
}

function resetGame() {
  currentPlayer = 'X';
  gameState.fill('');
  gameActive = true;
  updateStatus("Player X's turn");
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x','o');
  });
}

function checkWinner() {
  for (const [a,b,c] of wins) {
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }
  return false;
}

function makeMove(index) {
  if (!gameActive || gameState[index]) return;
  const cell = cells[index];
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    updateStatus(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    updateStatus('Draw!');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function aiMove() {
  const freeIndices = gameState
    .map((value,index) => value === '' ? index : -1)
    .filter(index => index >= 0);

  if (!freeIndices.length) return;
  const index = freeIndices[Math.floor(Math.random() * freeIndices.length)];
  makeMove(index);
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    makeMove(index);
    if (gameActive && aiToggle.checked && currentPlayer === 'O') {
      setTimeout(aiMove, 200);
    }
  });
});

resetButton.addEventListener('click', resetGame);
aiToggle.addEventListener('change', resetGame);

updateStatus("Player X's turn");
