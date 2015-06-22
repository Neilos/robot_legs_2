var refreshPageAction = (function () {

  var execute = function () {
    location.reload();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
