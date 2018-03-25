// Render the heading of the page
var Header = (function(){
  const
    DOM     = {},
    content = `<h1>Let's play</h1>`
  ;

  // Add the header DOM element to the JSON defined above
  function cacheDom(){
    DOM.header = document.querySelector('header');
  }

  // Set the dome element to the content var we defined above
  function render(){
    DOM.header.innerHTML = content;
  }

  // Thie function will call the cacheDom function (which saves the desired elements to JSON objects) and then renders data to them
  function init(){
    cacheDom();
    render();
  }

  // Return public methods via closures inside a JSON object
  return {
    init: init  // Expose the init method to the caller of this component via a closure
  };
}());
