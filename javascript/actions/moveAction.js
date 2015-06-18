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
        .duration(animateDuration)
        .ease("linear")
        .delay(100)
        .attr("transform", "translate(" + x + "," + y + ") rotate(" + 0 + ")")

      update(controlDataEmpty())
    })

    d3.selectAll(".action").on("mouseenter", triggerActionPointFix)
    d3.selectAll(".action").on("mouseleave", cancelActionPointFix)
  }

  var triggerActionPointFix = function () {
    progressMeterForeground
      .datum({endAngle: angle._360})
      .transition()
        .ease("linear")
        .duration(userSelectionTime)
        .call(arcAngleTween, 0)
        .each('end', function () {
          actionController.resetEverything()
          update(controlDataBase())
        });
  }

  var cancelActionPointFix = function () {
    progressMeterForeground
      .transition()
        .duration(0)
        .call(arcAngleTween, angle._360)
  }

  return {
    execute: execute
  }

})()
