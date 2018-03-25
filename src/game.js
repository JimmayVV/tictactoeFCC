var Game = (function() {
  const DOM = {}; //populated by cacheDom
  const STATUS = { //reset by reset()
    winner: "",
    gameOver: false,
    userPlayer: "",
    computerPlayer: "",
    numMoves: 0,
    availableMoves: [],
    computerMove: false
  };

  // All the possible winning combinations based on cell ID
  const WINS = [
    [1, 2, 3],  // Top row
    [4, 5, 6],  // Middle row
    [7, 8, 9],  // Bottom row
    [1, 4, 7],  // Left column
    [2, 5, 8],  // Middle column
    [3, 6, 9],  // Right column
    [1, 5, 9],  // \ top left-bottom right diagonal
    [3, 5, 7]   // / bottom left-top right diagonal
  ];

  function reset(){
    let str;
    if (STATUS.winner !== "") {
      str = STATUS.winner + " is the winner!"
    } else {
      str = "Draw!"
    }
    STATUS.winner = "";
    STATUS.numMoves = 0;
    STATUS.gameOver = false;
    STATUS.computerMove = false;
    Modal.init(str);
  }

  function clearBoard(){
    if (DOM.game.children.length > 0){
      for (let i = 0; i < 9; i++) {
        DOM.game.children[i].innerHTML = "";
      }
    }
  }

  function render() {
    DOM.boxes = [];
    for (let i = 1; i < 10; i++) {
      var box = document.createElement("div");
      box.classList.add('box');
      box.setAttribute("data-value", i);
      DOM.game.appendChild(box);
      DOM.boxes.push(box);
    }
    DOM.game.style.display = "flex";
  }

  function step(){
    STATUS.numMoves++
    if (checkWins() || checkDraw()) {
      reset();
      return;
    }
    if (STATUS.computerMove){
      computerMove();
    }
  }

  // This function goes through each possible winning row/col/diagonal combination to see if there's a winner, and returns true if someone won, false otherwise
  function checkWins() {
    STATUS.gameOver = WINS.some(win => checkWin(win));  // If someone has won (as defined by the checkWin function for each 'winning' pssibility) then store 'true', otherwise 'false'
    return STATUS.gameOver;                             // Return whatever the result of the above calculation is. This also stored in the main state JSON var 'STATUS'
  }

  function checkWin(winArray) {
    let result = "";  // This string will eventually be populated with the content of each cell in the provided winning row
    // Loop through all 3 of the cells to get the value of them
    winArray.forEach(function(item) {
      result += document.querySelector('[data-value="' + item + '"]').innerHTML;  // Get the value of the cell, and append that letter to the 'result' string
    });

    // Check if the string has 3 X's or 3 O's which means someone won
    if (result == "XXX" || result == "OOO") {
      STATUS.winner = result[0];  // Set the winner to the first letter found in the 'result' string
      return true;                // Let the calling function know there was a winner
    };
    // Any other combination of the above comparison means no one has won, return false to tell the caller know as much
    return false;
  }

  // Very simply checks if 10 moves have been played, in order the determine if the game was a draw
  function checkDraw() {
    return (STATUS.numMoves == 10);
  }

  // Processes the player clicking on a grid item in the game
  function handleClick(e) {
    // Get the target dom element
    var target = e.target;
    // Check if the cell is empty, and verify that the game is not over
    if (target.innerHTML == "" && !STATUS.gameOver) {
      target.innerHTML = STATUS.userPlayer; // Place the player's icon in that cell
      STATUS.computerMove = true;           // Indicate it's the computer's turn
      step();                               // Step to the computer's turn, who will now go
    }
  }

  // Set STATUS.availableMoves to all of the available moves
  function getEmptySquares() {
    STATUS.availableMoves = [];
    // Loop through all of the nodes in the game grid
    DOM.boxes.forEach(function addAvailable(box) {
      // Check if the current item is empty, if so it's an available move
      if (box.innerHTML == "") {
        STATUS.availableMoves.push(box.getAttribute('data-value')); // Store the data-value attribute to the availableMoves array so we can call it
      }
    });
  }

  // Computes what move a computer player should make, and then makes that move
  function computerMove() {
    // Get all of the empty squares (via getEmptySquares function, which stores the result in a shared JSON var)
    getEmptySquares();
    let place = STATUS.availableMoves[Math.floor(Math.random() * STATUS.availableMoves.length)]; // Pick a completely random item in the availableMoves array
    let target = DOM.game.querySelector('[data-value="' + place + '"]');  // Get the dom node of the chosen element data-value
    target.innerHTML = STATUS.computerPlayer; // Place the computer's icon in that cell
    STATUS.computerMove = false;              // Tell the game it is not the computer's turn, so the player can now play
    step();                                   // Proceed to the next step in the game

  }

  // Add a click event listener to the game
  function bindEvents() {
    DOM.game.addEventListener("click", handleClick)
  }

  // Store the root element to JSON var
  function cacheDom() {
    DOM.game = document.querySelector('.grid')
  }

  //public methods//

  //called by Modal.js
  function setUserPlayer(str) {
    STATUS.userPlayer = str;
    STATUS.computerPlayer = str == "X" ? "O" : "X";
    STATUS.computerMove = str == "O";
    clearBoard();
    step();
  }

  // called by App.js
  function init() {
    cacheDom();
    bindEvents();
    render();
    step();
  };

  return {
    init: init,
    setUserPlayer: setUserPlayer
  };
}());
