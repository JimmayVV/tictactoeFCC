var Modal = (function() {

  const MODAL = {};

  function cacheDom(){
    MODAL.choices = document.querySelector('.choices')
    MODAL.modal = document.querySelector('.modal')
  }
  function init() {
    cacheDom();
    MODAL.choices.addEventListener("click", function start(e){
      MODAL.modal.style.display = "none";
      MODAL.value = e.target.innerHTML;
      Game.setUserPlayer(MODAL.value);
    })
  }
  function test(){
    return MODAL.value
  }
  return {
    init:init,
  }

})();
