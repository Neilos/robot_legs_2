var zoomOutAction = (function () {

  var execute = function () {
    scroller.zoomBy(0.8, true, actionPosition.x, actionPosition.y)
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
