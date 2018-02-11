var Header = (function(){
  const DOM = {},
  content = `<h1>Let's play</h1>`;

  function cacheDom(){
    DOM.header = document.querySelector('header');
  }
  function render(){
    DOM.header.innerHTML = content;
  }

   function init(){
     cacheDom();
     render();
   };
   return{
     init: init
   };
}());
