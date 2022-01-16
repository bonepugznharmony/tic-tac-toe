// Game display function
const displayController = () => {
  const gridContainer = document.querySelector('#grid-container')
  const turnAndResult = document.querySelector('#player-turn')
  const btnContainer = document.querySelector('#btn-container')
  const resetBtn = document.createElement('button')
  const startContainer = document.querySelector('#start-container')
  const playBtn = document.createElement('button')
  const p1NameInput = document.querySelector('#player1Name')
  const p2NameInput = document.querySelector('#player2Name')
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

  const getPlayerNameValue = () => {
    display.p1Name = display.p1NameInput.value
    console.log(display.p1Name)

    display.p2Name = display.p2NameInput.value
    console.log(display.p2Name)
  }

  const startButton = () => {
    playBtn.textContent = 'Start Game!'
    playBtn.setAttribute('id', 'playBtn')
    startContainer.appendChild(playBtn)
    const playGame = document.querySelector('#playBtn')
    playGame.addEventListener('click', (e) => {
      display.getPlayerNameValue()
      startContainer.remove()
      display.drawGrid()
    })
  }

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
    startContainer,
    startButton,
    playBtn,
    p1NameInput,
    p2NameInput,
    getPlayerNameValue,
    p1Name,
    p2Name,
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
const player1 = playerFactory(display.p1Name, 'X')
const player2 = playerFactory(display.p2Name, 'O')

// Game related function and instantiation
function gameContainer() {
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
    createGameBoard.resetBoard()
    display.removeResetBtn()
    display.turnAndResult.textContent = ''
    display.turnAndResult.appendChild(display.startContainer)
    display.clearGrid()
    game.player1Turn = true
    game.playerMark = ''
    game.playerName = ''
    game.turnCount = 0
    game.winner = false
    display.drawGrid()
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
  }
}
const game = gameContainer()

// Main function to execute flow
let main
;(main = () => {
  display.startButton()

  const gridBtns = document.querySelector('#grid-container')

  const handleGridBtns = (e) => {
    let targetObj = e.target.getAttribute('data-id')
    targetObj = Number(targetObj)
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
