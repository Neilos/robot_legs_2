var clickAction = (function () {

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
        .duration(clickDuration)
        .attr("d", progressMeter.clickArc)
        .each('end', function () {
          document.getElementById('robot-legs-drumbeat').play();
          console.log("click once")
        })
      .transition()
        .ease("linear")
        .duration(clickDuration)
        .attr("d", progressMeter.arc)
        .each('end', function () {
          actionController.resetEverything()
        })
  }

  return {
    execute: execute
  }

})()
