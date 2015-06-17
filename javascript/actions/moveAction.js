var moveAction = (function () {

  var execute = function () {
    d3.select("html").on("mousemove", function () {
      var x = d3.event.clientX
      var y = d3.event.clientY

      if (screenCenterX < x) {
        if (screenCenterY < y) {
          currentStartAngle = angle._270
          currentEndAngle = angle._360
        } else {
          currentStartAngle = angle._180
          currentEndAngle = angle._270
        }
      } else {
        if (screenCenterY < y) {
          currentStartAngle = 0
          currentEndAngle = angle._90
        } else {
          currentStartAngle = angle._90
          currentEndAngle = angle._180
        }
      }

      pie.startAngle(currentStartAngle).endAngle(currentEndAngle)
      action.transition()
        .duration(300)
        .ease("linear")
        .delay(100)
        .attr("transform", "translate(" + x + "," + y + ") rotate(" + 0 + ")")

      update(controlDataEmpty())
    })

    progressMeterBackground
      .style("fill", color("move"))

    progressMeterForeground
      .style("fill", progressMeter.baseColor)

    d3.selectAll(".action").on("mouseenter", triggerActionPointFix)
    d3.selectAll(".action").on("mouseleave", cancelActionPointFix)
  }

  var triggerActionPointFix = function () {
    progressMeterForeground
      .datum({endAngle: 0})
      .transition()
        .ease("linear")
        .duration(userSelectionTime)
        .call(arcAngleTween, -angle._360)
        .each('end', resetAction.execute);
  }

  var cancelActionPointFix = function () {
    progressMeterForeground
      .transition()
        .duration(animateDuration / 2)
        .call(arcAngleTween, 0)
  }

  return {
    execute: execute
  }

})()
