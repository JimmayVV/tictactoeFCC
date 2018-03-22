var Game = (function() {
  const DOM = {};
  const STATUS = {
    winner: "",
    isX: true,
    gameOver: false,
    userPlayer: "",
    computerPlayer: "",
    numMoves: 0,
    availableMoves: []
  };

  const WINS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  function setUserPlayer(str) {
    STATUS.userPlayer = str;
    STATUS.computerPlayer = str == "X" ? "O" : "X";
    // STATUS.isX = str == "X" ? true : false; would need this line for a 2 player mode
    render();
    if (STATUS.userPlayer=="O"){
      console.log(STATUS.isX)
      computerMove();
    }

  }

  function render() {
    DOM.boxes = [];
    for (let i = 1; i < 10; i++) {
      var box = document.createElement("div");
      box.classList.add('box');
      box.setAttribute("data-value",i);
      DOM.game.appendChild(box);
      DOM.boxes.push(box);
    }
    DOM.game.style.display = "flex";

  }

  function cacheDom() {
    DOM.game = document.querySelector('.grid')
    DOM.choices = document.querySelector('.choices')
  }


  function checkWins() {
    STATUS.gameOver = WINS.some(win => checkWin(win));
    if (STATUS.gameOver) {
      console.log(STATUS.winner + " is the winner");
    }
  }

  function checkWin(winArray) {
    let result = "";
    winArray.forEach(function(item) {
      result += document.querySelector('[data-value="'+item+'"]').innerHTML;
    })
    if (result == "XXX" || result == "OOO") {
      STATUS.winner = result[0];
      return true
    };
    return false;
  }

  function play() {
    DOM.game.addEventListener("click",  handleClick)
  }

  function checkDraw(){
    if (STATUS.numMoves == 9){
      console.log("DRAW!");
    }
  }

  function handleClick(e){
    var target = e.target;
    if (target.innerHTML == "" && !STATUS.gameOver) {
      target.innerHTML = STATUS.isX ? "X" : "O";
      STATUS.isX = !STATUS.isX;
      checkWins();
      STATUS.numMoves++
      if (!STATUS.gameOver){
        checkDraw();
        computerMove();
      }
    }
  }

  function getEmptySquares(){
   STATUS.availableMoves = [];
    DOM.boxes.forEach(function addAvailable(box){
      if (box.innerHTML==""){
        STATUS.availableMoves.push(box.getAttribute('data-value'))
      }
    })

  }

  function computerMove(){
    getEmptySquares();
    let place = STATUS.availableMoves[Math.floor(Math.random()*STATUS.availableMoves.length)]
    let target = DOM.game.querySelector('[data-value="'+place+'"]');
    target.innerHTML = STATUS.isX?"X":"O";
    STATUS.isX = !STATUS.isX
    STATUS.numMoves++
    checkWins()
    if (!STATUS.gameOver){
      checkDraw()
    }
  }


  function init() {
    cacheDom();
    play();
  };
  return {
    init: init,
    setUserPlayer: setUserPlayer
  };
}());
