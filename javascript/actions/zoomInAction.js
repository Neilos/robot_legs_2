var zoomInAction = (function () {

  var execute = function () {
    scroller.zoomBy(1.25, true, actionPosition.x, actionPosition.y)
    document.getElementById('robot-legs-swish').play();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
