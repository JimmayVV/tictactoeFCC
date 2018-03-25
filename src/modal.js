var Modal = (function() {
  // JSON var which contains all the dom nodes and various settings of the popup modal (used multiple ways)
  const MODAL = {};

  // Map all the nodes of the DOM to the JSON object in order to call from a main var - this will be called first to facilitate all the other functions
  function cacheDom(){
    MODAL.choice = document.querySelectorAll('.choice');      // The two options representing user choices ('X' and 'O') in the modal
    MODAL.modal = document.querySelector('.modal');           // The root DOM element of the modal itself
    MODAL.content = document.querySelector('.modal-content'); // The content element from the modal element
    MODAL.text = MODAL.content.querySelector('p');            // The paragraph tag found within the content element
    // SUGGESTION: add the content of MODAL.text to a separate variable such as MODAL.defaultMessage - that way you can avoid
    // duplicating that text when you re-render the modal in the 'else' condition of the 'render' function - see my note there...
  }

  // Will display one of two versions of the modal, one asks the player to play again,
  // the other invites the player to play for the first time (initial load)
  //
  // If a string is provided, this ideally will display who won the previous game, or that the game was a tie.
  function render(str){
    // If the user has already started a game, then the inital content of the modal needs to be updated to display an invitation to play again
    if (str){
      // Not sure why the next two lines are necessary, the event listeners never really change - they get removed to simply get added again?
      MODAL.choice[0].removeEventListener("click", start);  // Remove the event listener for the 'X' option in the modal
      MODAL.choice[1].removeEventListener("click", start);  // Remove the event listener for the 'O' option in the modal
      MODAL.text.innerHTML = str +"<br> Play Again? <br>";  // Change the paragraph to display the provided string (who won, or tied) plus the inviation to play again
    } else {
      // You already have this set in the DOM - which means you probably don't need this conditional - but even if you did, you could have captured it in a var such as MODAL.defaultMessage
      MODAL.text.innerHTML = "Your choice is here...X goes first";  // Default message will simply invite the player to play a game - has not played yet this session
    }
    MODAL.modal.style.display = "block";  // display: block ensures the modal itself is visible (as opposed to hidden)
  }

  // Bind event listeners to the 'X' and 'O' selections from within the modal to start a game
  function bindEvent(){
    MODAL.choice[0].addEventListener("click", start); // 'X'
    MODAL.choice[1].addEventListener("click", start); // 'O'
  }

  // This function will get fired from the event listeners attached to the 'X' and 'O' options of the modal
  function start(e){
    MODAL.modal.style.display = "none"; // Hide the modal
    MODAL.value = e.target.innerHTML;   // Get which option the player wishes to be ('X' or 'O') based on what the innerHTML of the element clicked is
    Game.setUserPlayer(MODAL.value);    // Set the user player to whichever option they selected
  }

  // Initialize the game. This is called from the main app.js file
  function init(str = "") {
    cacheDom();   // Store all necessary DOM elements to a JSON variable as defined in the cacheDom() function
    render(str);  // The initial render of the modal
    bindEvent();  // Add event listeners to the 'X' and 'O' buttons
  }

  // Return the methods desired to be public via closure
  return {
    init:init // We only need to expose 'init' - it handles everything needed
  }
})();
