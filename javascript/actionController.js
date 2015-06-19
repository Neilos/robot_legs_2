var actionController = {

  activateControl: function (color) {
    d3.select(".progressMeterForeground")
      .datum({startAngle: 0, endAngle: angle._360})
      .attr("d", progressMeter.arc)
      .style("fill", color)
  },

  resetControl: function () {
    d3.select(".progressMeterForeground")
      .datum({startAngle: 0, endAngle: 0})
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
  }

}
