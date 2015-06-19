var zoomInAction = (function () {

  var execute = function () {
    var rect = container.getBoundingClientRect();
    scroller.setPosition(
      rect.left + container.clientLeft + actionPosition.x,
      rect.top + container.clientTop + actionPosition.y
    )
    scroller.zoomBy(1.2, true);
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
