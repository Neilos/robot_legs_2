var zoomOutAction = (function () {

  var execute = function () {
    scroller.zoomBy(0.8, true);
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
