//1. gameboard is stored as an array inside of Gameboard object
const createGameBoard = (function () {
  const board = function () {
    let boardArray = {
      grid: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
    }
    return boardArray
  }
  return { board }
})()

const newBoard = createGameBoard.board()
console.log(newBoard)

// call factory function to create gameboard object
// 2. create an object that creates players
// factory function

/*
3. an object that controls the flow of the game

4. if you only ever need ONE of something (gameBoard, displayController)

5. If you need multiples of something (players!), create them with factories
*/
