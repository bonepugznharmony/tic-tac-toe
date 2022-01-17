// Game display function
const displayController = () => {
  const gridContainer = document.querySelector('#grid-container')
  const outputContainer = document.querySelector('#output-container')
  const resetBtn = document.createElement('button')
  const startContainer = document.querySelector('#start-container')
  const playBtn = document.createElement('button')
  const p1NameInput = document.querySelector('#player1NameInput')
  const p2NameInput = document.querySelector('#player2NameInput')
  let p1Name
  let p2Name

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
    outputContainer.textContent = `${game.playerName} is the winner!`
    display.showResetBtn()
  }

  const showResetBtn = () => {
    resetBtn.textContent = 'Play Again!'
    resetBtn.setAttribute('id', 'resetBtn')
    outputContainer.appendChild(resetBtn)
    const playAgain = document.querySelector('#resetBtn')
    playAgain.addEventListener('click', game.resetGame)
  }

  const removeResetBtn = () => {
    outputContainer.removeChild(resetBtn)
  }

  const getPlayerNameValue = () => {
    display.p1Name = display.p1NameInput.value.replace(/\s+/g, ' ').trim()
    display.p2Name = display.p2NameInput.value.replace(/\s+/g, ' ').trim()
  }

  const startButton = () => {
    playBtn.textContent = 'Start Game!'
    playBtn.setAttribute('id', 'playBtn')
    startContainer.appendChild(playBtn)
    const playGame = document.querySelector('#playBtn')
    playGame.addEventListener('click', (e) => {
      if (
        display.p1NameInput.value === '' ||
        display.p2NameInput.value === ''
      ) {
        return e.preventDefault()
      }
      display.getPlayerNameValue()
      game.createPlayers()
      startContainer.remove()
      display.outputContainer.textContent = `It's ${game.player1.getName()}'s turn!`
      display.clearGrid()
      display.drawGrid()
      display.handleGridBtns
      gridContainer.addEventListener('click', handleGridBtns)
    })
  }

  //display.startButton()

  const handleGridBtns = (e) => {
    let targetObj = e.target.getAttribute('data-id')
    targetObj = Number(targetObj)

    if (e.target === gridContainer) {
      e.preventDefault()
    } else {
      for (let i = 0; i < board.grid.length; i++) {
        if (targetObj === i) {
          game.placeMark(i)
          game.checkWinner()
          display.clearGrid()
          display.drawGrid()
          if (game.winner === true) {
            gridContainer.removeEventListener('click', handleGridBtns)
            return display.endGame()
          }
          game.tieGame()
        }
      }
    }
  }

  return {
    drawGrid,
    clearGrid,
    gridContainer,
    endGame,
    outputContainer,
    resetBtn,
    showResetBtn,
    removeResetBtn,
    startContainer,
    startButton,
    playBtn,
    p1NameInput,
    p2NameInput,
    getPlayerNameValue,
    p1Name,
    p2Name,
    handleGridBtns,
  }
}

const display = displayController()

// Gameboard IIFE and board instantiation
const createGameBoard = (() => {
  const boardArray = () => {
    return {
      grid: ['', '', '', '', '', '', '', '', ''],
    }
  }
  const getBoard = () => {
    return boardArray()
  }

  const resetBoard = () => board.grid.fill('')

  return { getBoard, resetBoard }
})()

let board = createGameBoard.getBoard()

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

// Game related function and instantiation
function gameContainer() {
  let player1Turn = true
  let playerMark = ''
  let playerName = ''
  let turnCount = 0
  let winner = false
  let player1
  let player2

  const createPlayers = () => {
    game.player1 = playerFactory(display.p1Name, 'X')
    game.player2 = playerFactory(display.p2Name, 'O')
  }

  const switchPlayers = (player1Turn) => {
    if (player1Turn) {
      game.player1Turn = false
      game.turnCount += 1
      game.playerName = game.player1.getName()
      display.outputContainer.textContent = `${game.player2.getName()}'s turn!`
      return game.player1.getMark()
    } else {
      game.player1Turn = true
      game.turnCount += 1
      game.playerName = game.player2.getName()
      display.outputContainer.textContent = `${game.player1.getName()}'s turn!`
      return game.player2.getMark()
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
      playerMark = game.player1.getMark()
    } else {
      playerMark = game.player2.getMark()
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
      display.outputContainer.textContent = 'Tie Game...'
      display.showResetBtn()
    }
  }

  const resetGame = () => {
    createGameBoard.resetBoard()
    game.player1Turn = true
    game.playerMark = ''
    game.playerName = ''
    game.turnCount = 0
    game.winner = false
    game.player1 = ''
    game.player2 = ''
    display.p1NameInput.value = ''
    display.p2NameInput.value = ''
    display.removeResetBtn()
    display.outputContainer.textContent = ''
    display.outputContainer.appendChild(display.startContainer)
    display.clearGrid()
    main()
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
    player1,
    player2,
    createPlayers,
  }
}
const game = gameContainer()

/*
// Main function to execute flow
let main
;(main = () => {
  display.startButton()

  const gridContainer = document.querySelector('#grid-container')

  const handleGridBtns = (e) => {
    let targetObj = e.target.getAttribute('data-id')
    targetObj = Number(targetObj)

    if (e.target === gridContainer) {
      e.preventDefault()
    } else {
      for (let i = 0; i < board.grid.length; i++) {
        if (targetObj === i) {
          game.placeMark(i)
          game.checkWinner()
          display.clearGrid()
          display.drawGrid()
          if (game.winner === true) {
            gridContainer.removeEventListener('click', handleGridBtns)
            return display.endGame()
          }
          game.tieGame()
        }
      }
    }
  }

  gridContainer.addEventListener('click', handleGridBtns)
})()
*/

const main = () => {
  display.startButton()
}

main()
