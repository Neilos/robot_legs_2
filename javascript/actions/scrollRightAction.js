var scrollRightAction = (function () {

  var execute = function () {
    scroller.scrollBy(scrollIncrement, 0, true);
    document.getElementById('robot-legs-ping-a-ding').play();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
