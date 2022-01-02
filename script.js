const gridDisplayArea = document.querySelector('.testing-space')

// 1. Create a IFFE module to create a gameboard object
const createGameBoard = (() => {
  const boardArray = () => {
    return {
      grid: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    }
  }
  const printBoard = () => {
    return boardArray()
  }
  return { printBoard }
})()

let gameboard = createGameBoard.printBoard()

// 2. Create a factory function that creates two player objects
const playerFactory = (name, mark) => {
  const setName = name
  const setMark = mark
  const getName = () => {
    return setName
  }
  const getMark = () => {
    return setMark
  }
  return { getName, getMark }
}

const player1 = playerFactory('Player 1', 'X')
const player2 = playerFactory('Player 2', 'O')

// 3. Function to start game logic
function gameFlow() {
  let player1Turn = true
  // player switch function
  // if player turn is player1
  const switchPlayers = () => {
    if (player1Turn === true) {
      // place mark for player1 function
    } else {
      // place mark for player 2
    }
    //switch player
    //is player 1 turn not true?
    player1Turn = !player1Turn
  }

  const playerMark = () => {
  //place mark on the index 0
  console.log(currentPlayer)
  gameboard.grid[0] = player1.getMark()
  displayController.displayBoard()
  switchPlayers()
  console.log(currentPlayer)
  // put player1 mark down on the gameboard
  // check winning condition (combo)
  // if win is detected announce winner
  // otherwise winning condition is false
  // switch to player2

  // put player2 mark down on the gameboard
  // check winning condition (combo)
  // if win is detected announce winner
  // otherwise winning condition is false
  // switch to player 1
  return {
    currentPlayer,
    switchPlayers,
  }
}

const displayController = (function () {
  const displayBoard = function () {
    for (index of gameboard.grid) {
      gridDisplayArea.textContent += index
    }
  }
  return { displayBoard }
})()

// Once project is finished, store all invocation flow to main()?