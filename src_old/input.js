(function() {

  window.onkeypress = function(e) {
    var key = String.fromCharCode(e.keyCode).toLowerCase();
    radio('KeyPressed').broadcast(key);
  };

  window.onkeyup = function(e) {
    var key = String.fromCharCode(e.keyCode).toLowerCase();
    radio('KeyReleased').broadcast(key);
  };

})();
