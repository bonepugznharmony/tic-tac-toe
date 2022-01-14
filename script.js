// Gameboard IIFE and board instantiation
const createGameBoard = (() => {
  const boardArray = () => {
    return {
      grid: ['', '', '', '', '', '', '', '', ''],
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
  let playerMark = ''
  let playerName = ''
  let turnCount = 0
  let winner = false

  const switchPlayers = (player1Turn) => {
    if (player1Turn) {
      game.player1Turn = false
      game.turnCount += 1
      game.playerName = player1.getName()
      return player1.getMark()
    } else {
      game.player1Turn = true
      game.turnCount += 1
      game.playerName = player2.getName()
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

  // Check win condition
  const checkWinner = () => {
    if (game.player1Turn === false) {
      playerMark = player1.getMark()
    } else {
      playerMark = player2.getMark()
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
        board.grid[combo[0]] === playerMark &&
        board.grid[combo[1]] === playerMark &&
        board.grid[combo[2]] === playerMark
      ) {
        return (game.winner = true)
      }
    })
  }

  const tieGame = () => {
    if (game.turnCount === 9) {
      display.turnAndResult.textContent = 'Tie Game...'
      display.showResetBtn()
    }
  }

  const resetGame = () => {
    board.grid = ['', '', '', '', '', '', '', '', '']
    display.clearGrid()
    display.drawGrid()
    display.removeResetBtn()
  }

  return {
    switchPlayers,
    player1Turn,
    placeMark,
    playerName,
    checkWinner,
    tieGame,
    turnCount,
    winner,
    resetGame,
  }
}
const game = gameFlow()

// Game display function
const displayController = () => {
  const gridContainer = document.querySelector('#grid-container')
  const turnAndResult = document.querySelector('#player-turn')
  const btnContainer = document.querySelector('#btn-container')
  const resetBtn = document.createElement('button')

  const drawGrid = () => {
    board.grid.forEach((item, index) => {
      let dataIndex = index
      let gridBox = document.createElement('div')
      gridContainer.appendChild(gridBox)
      gridBox.classList.add('grid-box')
      gridBox.textContent += item
      gridBox.setAttribute('data-id', dataIndex)
      dataIndex = dataIndex + 1
    })
  }

  const clearGrid = () => {
    let previousGridBox = document.querySelectorAll('.grid-box')
    previousGridBox.forEach((box) => {
      gridContainer.removeChild(box)
    })
  }

  const endGame = () => {
    turnAndResult.textContent = `${game.playerName} is the winner!`
    display.showResetBtn()
  }

  const showResetBtn = () => {
    resetBtn.textContent = 'Play Again!'
    resetBtn.setAttribute('id', 'resetBtn')
    btnContainer.appendChild(resetBtn)
    const playAgain = document.querySelector('#resetBtn')
    playAgain.addEventListener('click', game.resetGame)
  }

  const removeResetBtn = () => {
    btnContainer.removeChild(resetBtn)
  }

  const 

  return {
    drawGrid,
    clearGrid,
    gridContainer,
    endGame,
    turnAndResult,
    btnContainer,
    resetBtn,
    showResetBtn,
    removeResetBtn,
  }
}

const display = displayController()

// Main IIFE to execute flow
const main = (() => {
  display.drawGrid()

  const gridBtns = document.querySelector('#grid-container')

  const handleGridBtns = (e) => {
    let targetObj = e.target.getAttribute('data-id')
    targetObj = Number(targetObj)
    console.log(targetObj)
    for (let i = 0; i < board.grid.length; i++) {
      if (targetObj === i) {
        game.placeMark(i)
        game.checkWinner()
        display.clearGrid()
        display.drawGrid()
        if (game.winner === true) {
          gridBtns.removeEventListener('click', handleGridBtns)
          return display.endGame()
        }
        game.tieGame()
      }
    }
  }

  gridBtns.addEventListener('click', handleGridBtns)
})()
