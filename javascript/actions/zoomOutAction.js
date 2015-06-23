var zoomOutAction = (function () {

  var execute = function () {
    scroller.zoomBy(0.8, true, actionPosition.x, actionPosition.y)
    document.getElementById('robot-legs-swish').play();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
