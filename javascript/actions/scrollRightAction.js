var scrollRightAction = (function () {

  var execute = function () {
    scroller.scrollBy(scrollIncrement, 0, true);
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
