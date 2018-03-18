var Game = (function(){
  const DOM = {};
  let winner = "";
  let isX = true;
  let gameOver = false;
  const WINS = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

  function render(){
    //renderModal();
    renderBoard();
  }

  function renderBoard(){
    var content = "";
    for (let i=1; i<10; i++){
      content+= `<div class="box" id="${i}"></div>`
    }
    DOM.game.innerHTML = content;
    DOM.game.style.display = "flex";
    cacheBoxes();
  }

  function cacheDom(){
    DOM.game = document.querySelector('.grid')
  }

  function cacheBoxes(){
    DOM.boxes = document.querySelectorAll('.box');
  }

  function checkWins(){
    gameOver = WINS.some(win=>checkWin(win));
    if (gameOver){
      console.log(winner);
    }

  }

  function checkWin(winArray){
    let result = "";
    winArray.forEach(function(item){
      result += document.getElementById(item).innerHTML;
    })
    winner = result[0];
    return result== "XXX" ||  result == "OOO";
  }

  function play(){
    DOM.game.addEventListener("click", function move(e){
      var target = e.target;
      if (target.innerHTML=="" && !gameOver){
        target.innerHTML = isX? "X": "O";
        isX = !isX;
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
