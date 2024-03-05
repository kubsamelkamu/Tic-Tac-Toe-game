// manipulating DOM
const cells = document.querySelectorAll(".cell");
const messages = document.getElementById("message");

// starting player
let turn = 'X';

// conditions for winning the game
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function handleCellClick(event) {
    const cellIndex = event.target.dataset.cellIndex;
    const cell = cells[cellIndex];
  
    // Check if cell is already filled
    if (cell.textContent === 'X' || cell.textContent === 'O') {
      return;
    }
  
    // Update cell content and switch turns
    cell.textContent = turn;
    turn = turn === 'X' ? 'O' : 'X';
  
    // Check for winner
    const winner = checkWinner();
  
    // Display winner or tie message
    if (winner) {
      message.textContent = `${winner} : Win the game`;
      cells.forEach(cell => cell.disabled = true); // Disable all cells after winner is found
    } else if (checkDraw()) {
      message.textContent = 'Draw!';
      cells.forEach(cell => cell.disabled = true); // Disable all cells after a draw
    } else {
      message.textContent = `Turn: ${turn}`; // Update message to show current player's turn
    }
  }
  
  function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
      const condition = winningConditions[i];
      const cell1 = cells[condition[0]].textContent;
      const cell2 = cells[condition[1]].textContent;
      const cell3 = cells[condition[2]].textContent;
  
      // Check if all three cells in a winning condition match the current player's symbol
      if (cell1 === cell2 && cell2 === cell3 && cell1 !== '') {
        return cell1; // Return the winning player's symbol
        
      }
    }
    return null; // No winner yet
  }
  
  function checkDraw() {
    // Check if all cells are filled but no winner is found
    return cells.every(cell => cell.textContent !== '');
  }
  
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));


