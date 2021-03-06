var moveAction = (function () {

  var execute = function () {
    d3.select("html").on("mousemove", function () {
      actionPosition.x = d3.event.clientX
      actionPosition.y = d3.event.clientY

      if (screenCenterX < actionPosition.x) {
        if (screenCenterY < actionPosition.y) {
          currentStartAngle = angle._270
          currentEndAngle = angle._360
        } else {
          currentStartAngle = angle._180
          currentEndAngle = angle._270
        }
      } else {
        if (screenCenterY < actionPosition.y) {
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
        .attr("transform", "translate(" + actionPosition.x + "," + actionPosition.y + ") rotate(" + 0 + ")")

      update(emptyControlState())
    })

    d3.selectAll(".action").on("mouseenter", triggerActionPointFix)
    d3.selectAll(".action").on("mouseleave", cancelActionPointFix)
  }

  var triggerActionPointFix = function () {
    progressMeterForeground
      .style("fill", color("move"))
      .datum({endAngle: angle._360})
      .transition()
        .ease("linear")
        .duration(moveDuration)
        .call(arcAngleTween, 0)
        .transition()
          .duration(0)
          .each('end', function () {
            document.getElementById('robot-legs-collision').play();
            actionController.resetEverything()
            update(baseControlState())
          });
  }

  var cancelActionPointFix = function () {
    progressMeterForeground
      .transition()
        .duration(100)
        .call(arcAngleTween, angle._360)
  }

  return {
    execute: execute
  }

})()
