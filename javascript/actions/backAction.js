var backAction = (function () {

  var execute = function () {
    window.history.back();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
