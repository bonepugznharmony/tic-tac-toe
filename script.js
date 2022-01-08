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

function gameFlow() {
  let player1Turn = true

  const switchPlayers = (player1Turn) => {
    if (player1Turn === true) {
      game.player1Turn = false
      return player1.getMark()
    } else if (player1Turn === false) {
      game.player1Turn = true
      return player2.getMark()
    }
  }

  return {
    switchPlayers,
    player1Turn,
  }
}
const game = gameFlow()

const displayController = () => {
  const gridContainer = document.querySelector('.grid-container')

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
display.drawGrid()

const gridBtns = document.querySelectorAll('.grid-box')
const gridBtnsArr = [...gridBtns]

const handleGridBtns = (e) => {
  const gridBtnValue = e.target.textContent
  for (let i = 0; i < board.grid.length; i++) {
    if (gridBtnValue === board.grid[i]) {
      board.grid[i] = game.switchPlayers(game.player1Turn)
      display.clearGrid()
      display.drawGrid()
    }
  }
}

gridBtnsArr.forEach((div) => div.addEventListener('click', handleGridBtns))

/*
const isGridNum = (gridBtnValue) => {
  const arrGridNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  return arrGridNum.includes(gridBtnValue)
}

/*
const playerMark = (gridBtnValue) => {
  for (let i = 0; i < gridBtns.length; i++) {
    if (game.player1Turn === true) {
      board.grid[gridBtnValue] = player1.getMark()
      game.switchPlayers(game.player1Turn)
      console.log(game.player1Turn)
      console.log(board.grid)
    } else if (game.player1Turn === false) {
      board.grid[gridBtnValue] = player2.getMark()
      game.switchPlayers(game.player1Turn)
      console.log(game.player1Turn)
      console.log(board.grid)
    }
  }
}

/*
Yes, if you add a breakpoint in your event listener and step into the logic, you'll see that you remove the grids then re-attach them. But when they are re-attached, the existing event listeners lose their reference. 
A couple suggestions:

1. You could add your event listeners in the drawGrid function.
2. You could make use of event delegation and only add the event listener to the grid container. (Why have 9 event listeners when you only need 1!?)
*/
