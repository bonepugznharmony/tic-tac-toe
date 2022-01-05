const gridDisplayArea = document.querySelector('.grid-container')

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

let board = createGameBoard.printBoard()

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
  const switchPlayers = () => {
    // if player turn is player1
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
    // player clicks the event and triggers player mark function
    // set the index of the array with player mark
    // gameboard array index is set to the player get mark
    for (let i = 0; i < board.length; i++) {
      if (player1Turn === true) {
        board.grid[i] = player1.getMark()
        //displayController.displayGrid()
        displayGame.displayGrid()
      } else {
        board.grid[i] = player2.getMark()
        displayGame.displayGrid()
      }
    }
  }

  return {
    switchPlayers,
    playerMark,
    player1Turn,
  }
}

const game = gameFlow()

const displayController = () => {
  const displayGrid = () => {
    for (index of board.grid) {
      let gridBox = document.createElement('div')
      gridDisplayArea.appendChild(gridBox)
      gridBox.classList.add('grid-box')
      gridBox.textContent += index
    }
  }

  return { displayGrid }
}

const displayGame = displayController()

displayGame.displayGrid()
const boxBtn = document.querySelectorAll('.grid-box')

for (let i = 0; i < boxBtn.length; i++) {
  boxBtn[i].addEventListener('click', (e) => {
    e.target === boxBtn[i]
    console.log(board.grid[i])
  })
}

console.log(boxBtn)
