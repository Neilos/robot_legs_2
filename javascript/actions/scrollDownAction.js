var scrollDownAction = (function () {

  var execute = function () {
    scroller.scrollBy(0, scrollIncrement, true);
    document.getElementById('robot-legs-ping-a-ding').play();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
