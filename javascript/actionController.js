var actionController = {

  activateControl: function (color) {
    d3.select(".progressMeterForeground")
      .style("fill", color)
      .datum({startAngle: 0, endAngle: angle._360})
      .transition()
        .duration(0)
        .call(arcAngleTween, angle._360)
  },

  resetControl: function () {
    d3.select(".progressMeterForeground")
      .datum({startAngle: 0, endAngle: angle._360})
      .attr("d", progressMeter.arc)
      .transition()
        .duration(0)
        .call(arcAngleTween, 0)
  },

  resetEverything: function () {
    actionController.resetControl()

    d3.select("html").on("mousemove", null)

    d3.selectAll(".action").on("mouseenter", function () {
      update(controlDataBase())
    })

    d3.selectAll(".action").on("mouseleave", function () {
      actionController.resetControl()
      update(controlDataEmpty())
    })

    d3.selectAll("g.control")
      .on("mouseenter", null)
      .on("mouseleave", null)

    update(controlDataBase())
  }

}
