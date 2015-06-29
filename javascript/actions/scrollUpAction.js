var scrollUpAction = (function () {

  var execute = function () {
    d3.select("circle.actionSelector").style("pointer-events", "none")
    var element = document.elementFromPoint(actionPosition.x, actionPosition.y)
    var scrollable = element ? jiggleScrollTop(element, -1) : null
    d3.select("circle.actionSelector").style("pointer-events", "auto")

    if (scrollable) {
      var newScrollTop = Math.max(scrollable.scrollTop - scrollIncrement, 0)
      d3.select(scrollable)
        .transition()
        .duration(scrollAnimationDuration)
        .tween('scrollDown', scrollTopTween(newScrollTop))
    } else {
      scroller.scrollBy(0, -scrollIncrement, true);
    }

    document.getElementById('robot-legs-ping-a-ding').play();
    actionController.resetEverything()
  }



  return {
    execute: execute
  }

})()
