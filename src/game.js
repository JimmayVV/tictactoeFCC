var Game = (function() {
  const DOM = {}; //populated by cacheDom
  const STATUS = { //reset by reset()
    winner: "",
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

  function reset(){
    DOM.game.removeEventListener("click",handleClick)
    let str;
    if (STATUS.winner !== ""){
      str = STATUS.winner + " is the winner!"
    }
    else{
      str = "Draw!"
    }
    STATUS.winner = "";
    STATUS.numMoves = 0;
    STATUS.gameOver = false;
    Modal.init(str);
    bindEvents();

  }


  function render() {
    while (DOM.game.firstChild){
      DOM.game.removeChild(DOM.game.firstChild)
    }
    DOM.boxes = [];
    for (let i = 1; i < 10; i++) {
      var box = document.createElement("div");
      box.classList.add('box');
      box.setAttribute("data-value",i);
      DOM.game.appendChild(box);
      DOM.boxes.push(box);
    }
    DOM.game.style.display = "flex";
    if (STATUS.userPlayer=="O"){
      computerMove();
    }
  }




  function checkWins() {
    STATUS.gameOver = WINS.some(win => checkWin(win));
    return STATUS.gameOver;
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


  function checkDraw(){
    return (STATUS.numMoves == 9);
  }

  function handleClick(e){
    var target = e.target;
    if (target.innerHTML == "" && !STATUS.gameOver) {
      target.innerHTML = STATUS.userPlayer;
      STATUS.numMoves++
      if (checkWins() || checkDraw()){
        reset()
      }
      else{
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
    if (place){
      let target = DOM.game.querySelector('[data-value="'+place+'"]');
      target.innerHTML = STATUS.computerPlayer;
      STATUS.numMoves++
      if (checkWins() || checkDraw()){
        reset();
      }
    }
  }

  function bindEvents() {
    DOM.game.addEventListener("click",  handleClick)
  }

  function cacheDom() {
    DOM.game = document.querySelector('.grid')
  }

//public methods//

//called by Modal.js
  function setUserPlayer(str) {
    STATUS.userPlayer = str;
    STATUS.computerPlayer = str == "X" ? "O" : "X";
    render();
  }

// called by App.js
  function init() {
    cacheDom();
    bindEvents();
  };

  return {
    init: init,
    setUserPlayer: setUserPlayer
  };
}());
