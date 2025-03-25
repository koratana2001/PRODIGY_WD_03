// script.js

document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusDisplay = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    function handleCellClick(event) {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  
      if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
      }
  
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.innerText = currentPlayer;
  
      if (checkWin()) {
        statusDisplay.innerText = `Player ${currentPlayer} has won!`;
        gameActive = false;
      } else if (gameState.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
      } else {
        statusDisplay.innerText = "It's a draw!";
        gameActive = false;
      }
    }
  
    function checkWin() {
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          return true;
        }
      }
      return false;
    }
  
    function resetGame() {
      gameState = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      currentPlayer = "X";
      statusDisplay.innerText = `Player X's turn`;
      cells.forEach(cell => cell.innerText = "");
    }
  
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
  });
  
