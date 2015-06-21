var scrollUpAction = (function () {

  var execute = function () {
    scroller.scrollBy(0, -scrollIncrement, true);
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
