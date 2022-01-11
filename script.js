// Gameboard IIFE and board instantiation
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

// Player factory function and instantiation
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

// Game logic function and instantiation
function gameFlow() {
  let player1Turn = true

  const switchPlayers = (player1Turn) => {
    if (player1Turn) {
      game.player1Turn = false
      return player1.getMark()
    } else {
      game.player1Turn = true
      return player2.getMark()
    }
  }

  // Check if the mark has been placed on the board
  const placeMark = (i) => {
    if (board.grid[i] === 'X' || board.grid[i] === 'O') {
      return
    } else {
      board.grid[i] = game.switchPlayers(game.player1Turn)
    }
  }

  return {
    switchPlayers,
    player1Turn,
    placeMark,
  }
}
const game = gameFlow()

// Game display function
const displayController = () => {
  const gridContainer = document.querySelector('#grid-container')

  const drawGrid = () => {
    board.grid.forEach((item) => {
      let gridBox = document.createElement('div')
      gridContainer.appendChild(gridBox)
      gridBox.classList.add('grid-box')
      gridBox.textContent += item
    })
  }

  const clearGrid = () => {
    let previousGridBox = document.querySelectorAll('.grid-box')
    previousGridBox.forEach((box) => {
      gridContainer.removeChild(box)
    })
  }

  return { drawGrid, clearGrid }
}
const display = displayController()

// Main IIFE to execute flow
const main = (() => {
  display.drawGrid()

  const gridBtns = document.querySelector('#grid-container')

  const handleGridBtns = (e) => {
    const gridBtnValue = e.target.textContent
    for (let i = 0; i < board.grid.length; i++) {
      if (gridBtnValue === board.grid[i]) {
        game.placeMark(i)
        console.log(board.grid)
        checkWinner()
        display.clearGrid()
        display.drawGrid()
      }
    }
  }

  gridBtns.addEventListener('click', handleGridBtns)
})()

// Check win condition
const checkWinner = () => {
  let player
  if (game.player1Turn === false) {
    player = player1.getMark()
  } else {
    player = player2.getMark()
  }

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  winCombos.forEach((combo) => {
    if (
      board.grid[combo[0]] === player &&
      board.grid[combo[1]] === player &&
      board.grid[combo[2]] === player
    ) {
      console.log(`winner is ${player}`)
    }
  })
}

// If winner is found stop the game

// Display winner in the DOM
