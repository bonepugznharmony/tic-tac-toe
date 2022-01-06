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

  const switchPlayers = (player1Turn) => {
    if (player1Turn === true) {
      game.player1Turn = false
    } else if (player1Turn === false) {
      game.player1Turn = true
    }
  }

  /* is this even needed?
  const playerMark = () => {
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
  */

  return {
    switchPlayers,
    player1Turn,
    //playerMark,
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

const main = (() => {
  displayGame.displayGrid()
  const boxBtn = document.querySelectorAll('.grid-box')

  for (let i = 0; i < boxBtn.length; i++) {
    boxBtn[i].addEventListener('click', (e) => {
      if (game.player1Turn === true) {
        game.switchPlayers(game.player1Turn)
        //e.target === boxBtn[i]
        board.grid[i] = player1.getMark()
        console.log(game.player1Turn)
        console.log(board.grid)
        //clear grid before drawing again
        //displayGame.displayGrid()
      } else if (game.player1Turn === false) {
        game.switchPlayers(game.player1Turn)
        //e.target === boxBtn[i]
        board.grid[i] = player2.getMark()
        console.log(game.player1Turn)
        console.log(board.grid)
      }
    })
  }
})()
