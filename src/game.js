var Game = (function(){
  const DOM = {};
  const STATUS = {
     winner : "",
     isX : true,
     gameOver : false,
     userPlayer : "",
     computerPlayer : ""
  };

  const WINS = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];


  function render(){
    for (let i=1; i<10; i++){
      var box = document.createElement("div");
      box.classList.add('box');
      box.id = i;
      DOM.game.appendChild(box);
    }
    DOM.game.style.display = "flex";
    cacheBoxes();
  }

  function cacheDom(){
    DOM.game = document.querySelector('.grid')
    DOM.choices = document.querySelector('.choices')
  }

  function cacheBoxes(){
    DOM.boxes = document.querySelectorAll('.box');
  }

  function checkWins(){
    STATUS.gameOver = WINS.some(win=>checkWin(win));
    if (STATUS.gameOver){
      console.log(STATUS.winner);
      console.log(Modal.test())
    }

  }

  function checkWin(winArray){
    let result = "";
    winArray.forEach(function(item){
      result += document.getElementById(item).innerHTML;
    })
    if (result== "XXX" ||  result == "OOO"){
      STATUS.winner = result[0];
      return true
    };
    return false;
  }

  function play(){
    DOM.game.addEventListener("click", function humanMove(e){
      var target = e.target;
      if (target.innerHTML=="" && !STATUS.gameOver){
        target.innerHTML = STATUS.isX? "X": "O";
        STATUS.isX = !STATUS.isX;
        checkWins();
      }
    }
  )
  }


  function init(){
    cacheDom();
    render();
    play();
  };
  return{
    init:init
  };
}());
