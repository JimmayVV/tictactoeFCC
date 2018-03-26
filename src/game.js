let Game = (function() {
  const DOM = {};       //populated by cacheDom
  let gameGrid = [];    // A JS object representation of the actual DOM
  const STATUS = {      //reset by reset()
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

  // This function will do one of two things: 1. return a copy of the provided grid, or 2. it will return an array of null cells (a blank game grid)
  // We do this to cover multiple uses - a copy of the grid is useful so that we can test hypothetical game states without modifying or tracking changes
  // made to the current game - and since the for loop is so similar, we can simply test if we are creating a blank grid by comparing if a valid array
  // was provided. If yes, then we copy the array - if no, then create blank items - hopefully the reason for this makes sense below
  function makeGrid(grid = null) {
    // Verify that grid is an array, otherwise it's not a valid input, in which case change it to null
    if (typeof grid !== 'array') grid = null;

    let newGrid = [];
    // Get the number of elements in the supplied grid, or set to 9
    // We could probably assume the supplied grid is 9, but this covers the case where it's not
    let elems = (grid) ? grid.length : 9;

    // Run through all the elements as calculated above
    for (let elem = 0; elem < elems; ++elem) {
      // Set a value which will be pushed into the new grid array - it will either be the content of the supplied gird, or null (empty)
      let value = (grid) ? grid[elem] : null;
      // Push this value into the row array we defined in the outer for loop
      newGrid.push(value);
    }

    // Now return the copied (or freshly made) grid for use wherever needed
    return newGrid;
  }

  // Primary function will render the game's main gameGrid to the DOM by either creating it, or updating it if it already exists
  function render(grid = gameGrid) {
    // Use either a supplied grid, or if not supplied, the gameGrid

    let node = DOM.game;
    let count = node.children.length;

    // If the grid isn't empty, and doesn't contain 9 children, then delete all the children so that it is empty since the DOM is invalid, we can't trust it
    if (node.children > 0 && node.children !== 9) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }

    // Now that we know it is either empty or valid, render the grid to the DOM by either creating an element, or editing the existing one
    for (let i = 0; i < workingGrid.length; ++i) {
      // Get or set the content to display on the dom
      let content = workingGrid[i] ? workingGrid[i] : '';

      if (count === 0) {
        // if the grid dom was empty, then create a child element and push it to the dom
        let box = document.createElement("div");
        box.classList.add('box');
        box.setAttribute("data-value", i + 1);
        box.innerHTML(content);
        box.addEventListener('click', () => {
          if (STATUS.gameOver) return;  // Don't run any clicks that happen if the game is over
          gameGrid = playMove(i); // Update the gameGrid based on the move played
          step();                 // call step to check if the game is over now (someone won, or tie game) and if not, run the computer's turn
        });
        node.appendChild(box);
      } else {
        // if it was not empty, then overwrite the current cell according to the value of the workingDom
        node.children[i].innerHTML = content;
      }
    }

    return 1;
  }

  // TODO: go through this more when I am more "with it"
  function step() {
    // Render whatever moves have been made up to this point
    render();
    let winner = checkWins();
    let draw = checkDraw();

    // Check for winners or a draw - if the game is over:
    if (winner) {
      // save in string var who won (or if it was a tie)
      STATUS.winner = winner;
      // call Modal.init(str) with this value which will trigger a rematch
      Modal.init(`${winner} is the winner!`);
      // freeze the rest of the logic of this function (by returning out of this function)
      return false;
    }
    
    if (!computerMove) {
    // If it is the user's turn (check if it's not computer turn in Settings)
      // Process the click at the given location
      // Render the click
      // Set the game to be the computer's turn
      // Call 'step' again, which will render the computer move, as defined below:
    } 
    else // If it is the computer's turn (meaning this was called after the player made a move, and the game's not over):
    {
      // Make a move for the computer
      // Render the move to the page
      // Set the game to be the user's turn
    }
    
  }

  // This function goes through each possible winning row/col/diagonal combination to see if there's a winner, and returns true if someone won, false otherwise
  function checkWins(grid = gameGrid) {
    let winner = null;

    WINS.forEach(win => {
      let result = checkWin(win, grid);

      if (result) winner = result
    });

    return result;
    /*
    let gameOver = WINS.some((win) => checkWin(win, grid));  // If someone has won (as defined by the checkWin function for each 'winning' pssibility) then store 'true', otherwise 'false'
    return gameOver;//STATUS.gameOver;   // Return whatever the result of the above calculation is. This also stored in the main state JSON var 'STATUS'
    */
  }

  function checkWin(winArray, grid = gameGrid) {
    // If the passed in grid is invalid, then simply return false to indicate no winners.
    // Even though this probably indicates larger issues, that's all we're really testing for here
    if (!grid) return false;

    // Verify that the first cell is not null, and if so, then compare if the middle element is equal to both the first, and last element - if all are true, then we have a winner
    let winner = (grid[winArray[0]] && grid[winArray[1]] == grid[winArray[1]] && grid[winArray[1]] == grid[winArray[1]]);
    //STATUS.winner = winner;
    return winner;
  }

  // Very simply checks if 10 moves have been played, in order to determine if the game was a draw
  function checkDraw(grid = gameGrid) {
    return (STATUS.numMoves > grid.length);
  }

  // Play a move for the the given icon
  function playMove(index, icon = STATUS.userPlayer, grid = gameGrid) {
    // If the given grid item is not null, then it is already filled, so return to end the function before it's even started
    if (grid[index]) return false;

    // Play the move
    grid[index] = icon;

    // Return the new grid status
    return grid;
  }

  // THE BELOW CODE IS BEING FOLDED INTO THE ABOVE CODE - HAS NOT BEEN OPTIMIZED YET


  // Processes the player clicking on a grid item in the game
  /*function handleClick(e) {
    // Get the target dom element
    var target = e.target;
    // Check if the cell is empty, and verify that the game is not over
    if (target.innerHTML == "" && !STATUS.gameOver) {
      target.innerHTML = STATUS.userPlayer; // Place the player's icon in that cell
      STATUS.computerMove = true;           // Indicate it's the computer's turn
      step();                               // Step to the computer's turn, who will now go
    }
  }*/


  //////////////////////////////////////////////////////////////////////
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

  function render(grid) {
    DOM.boxes = [];
    for (let i = 0; i < grid.length; ++i) {
      let box = document.createElement("div");
      box.classList.add('box');
      box.setAttribute("data-value", i + 1);
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
