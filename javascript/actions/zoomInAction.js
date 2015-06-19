var zoomInAction = (function () {

  var execute = function () {
    scroller.zoomBy(1.2, true, actionPosition.x, actionPosition.y)
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
