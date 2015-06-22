var clickAction = (function () {

  var triggerClick = function () {
    try {
      d3.select("circle.actionSelector").style("pointer-events", "none")
      var element = document.elementFromPoint(actionPosition.x, actionPosition.y)
      $(element).trigger('eye-targeting', [ actionPosition.x, actionPosition.y ])
      $(element)[0].click()
    } catch (error) {
      console.log(error, 'Target element that could not be clicked is: ', element)
    } finally {
      document.getElementById('robot-legs-click').play();
      d3.select("circle.actionSelector").style("pointer-events", "auto")
    }
  }

  var execute = function () {
    d3.selectAll(".action").on("mouseenter", null)
    d3.selectAll(".action").on("mouseleave", null)
    d3.selectAll(".control").on("mouseenter", null)
    d3.selectAll(".control").on("mouseleave", null)

    d3.select(".progressMeterForeground")
      .datum({endAngle: angle._360})
      .transition()
        .style("fill", color("click"))
        .ease("sin")
        .duration(animateDuration/2)
        .attr("d", progressMeter.clickArc)
        .each('end', triggerClick)
      .transition()
        .ease("linear")
        .duration(animateDuration/2)
        .attr("d", progressMeter.arc)
        .each('end', function () {
          actionController.resetEverything()
        })
  }

  return {
    execute: execute
  }

})()
