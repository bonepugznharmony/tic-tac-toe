//1. Store the gameboard array inside of a gameboard object

const createGameBoard = (function () {
  const boardArray = function () {
    return {
      grid: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
      ],
    }
  }

  const printBoard = function () {
    return boardArray()
  }
  return { printBoard }
})()

let newBoard = createGameBoard.printBoard()
console.log(newBoard) // => { grid: [ [ '1', '2', '3' ], [ '4', '5', '6' ], [
// '7', '8', '9' ] ] }

// 2. create a factory function that creates players objects

const playerFactory = function (name, mark) {
  const setName = name
  const setMark = mark

  const getName = function () {
    return setName
  }

  const getMark = function () {
    return setMark
  }

  return { getName, getMark }
}

const player1 = playerFactory('Player 1', 'X')
console.log(player1)
const player2 = playerFactory('Player 2', 'O')
console.log(player2)

// 3. an object that controls the flow of the game

// 4. if you only ever need ONE of something (gameBoard, displayController)

// 5. If you need multiples of something (players!), create them with factories
