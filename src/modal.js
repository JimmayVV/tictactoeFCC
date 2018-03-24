var Modal = (function() {

  const MODAL = {};

  function cacheDom(){
    MODAL.choice = document.querySelectorAll('.choice')
    MODAL.modal = document.querySelector('.modal')
    MODAL.content = document.querySelector('.modal-content')
    MODAL.text = MODAL.content.querySelector('p')
  }

  function render(str){
    if (str){
      MODAL.choice[0].removeEventListener("click", start)
      MODAL.choice[1].removeEventListener("click", start)
      MODAL.text.innerHTML = str +"<br> Play Again? <br>"
    }
    else {
      MODAL.text.innerHTML = "Your choice is here...X goes first"
    }
    MODAL.modal.style.display = "block"
  }

  function bindEvent(){
    MODAL.choice[0].addEventListener("click", start)
    MODAL.choice[1].addEventListener("click", start)
  }
  function start(e){
    MODAL.modal.style.display = "none";
    MODAL.value = e.target.innerHTML;
    Game.setUserPlayer(MODAL.value);
  }

  function init(str = "") {
    cacheDom();
    render(str);
    bindEvent()
  }
  return {
    init:init,
  }
})();
