var scrollRightAction = (function () {

  var execute = function () {
    d3.select("circle.actionSelector").style("pointer-events", "none")
    var element = document.elementFromPoint(actionPosition.x, actionPosition.y)
    var scrollable = element ? jiggleScrollLeft(element, 1) : null
    d3.select("circle.actionSelector").style("pointer-events", "auto")

    if (scrollable) {
      var newScrollLeft = Math.min(scrollable.scrollLeft + scrollIncrement, scrollable.scrollWidth)
      d3.select(scrollable)
        .transition()
        .duration(scrollAnimationDuration)
        .tween('scrollDown', scrollLeftTween(newScrollLeft))
    } else {
      scroller.scrollBy(scrollIncrement, 0, true);
    }
    document.getElementById('robot-legs-ping-a-ding').play();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
