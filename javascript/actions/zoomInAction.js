var zoomInAction = (function () {

  var execute = function () {
    scroller.zoomBy(1.25, true, actionPosition.x, actionPosition.y)
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
