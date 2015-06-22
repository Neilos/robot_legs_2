var forwardAction = (function () {

  var execute = function () {
    window.history.forward();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
