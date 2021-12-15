/* 
1. gameboard is stored as an array inside of Gameboard object
*/

// create and array with numbers to fill 9 squares
let boardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// create a facotry function to make a game board
function gameBoardFactory(board) {
  return {
    board: [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
    ],
  }
}

// call factory function to creat gameboard object
const newBoard = gameBoardFactory(boardArray)
console.log(newBoard)

/*
2. create an object that creates players

3. an object that controls the flow of the game

4. if you only ever need ONE of something (gameBoard, displayController)

5. If you need multiples of something (players!), create them with factories
*/
