var update = function (controlData) {
  var fanLevel = d3.values(controlData).filter(function(controls) {
    return controls.length > 0
  }).length

  var fanBackground = action.select("path.fanBackground")
                            .attr("d",
                                d3.svg.arc()
                                    .innerRadius(radius)
                                    .outerRadius(radius + fanLevel * tierBreadth)
                                    .startAngle(currentStartAngle)
                                    .endAngle(currentEndAngle)
                            )
                            .style("fill", baseColor)
                            .style("stroke", baseColor)
                            .style("stroke-width", strokeWidth)
                            .style("filter", "url(#drop-shadow2)")

  var tiers = action.selectAll("g.tier")
    .data(d3.values(controlData))

  var tiersEnter = tiers.enter().append("g").classed({"tier": true})

  tiers.exit().remove()

  var controls = tiers.selectAll("g")
                    .data(function (d) { return pie(d) })

  var controlsEnter = controls
                        .enter()
                         .append("g")

  controls
    .classed({"control": true})
    .on("mouseenter", function (d) {
      actionController.activateControl(color(d.data.type))
      d.data.highlighted = true
      update(controlData)
    })
    .on("mouseleave", function (d) {
      d.data.highlighted = false
      d.data.selected = false
      update(controlData)
    })

  controlsEnter.append("path").classed({"fanHighlighter": true})
  controlsEnter.append("path").classed({"fan": true})
  controlsEnter.append("text").classed({"control-label": true})

  var fanHighlighter = controls.select("path.fanHighlighter")

  fanHighlighter
    .style("stroke", "none")
    .style("stroke-width", strokeWidth)
    .attr("fill", "none")
    .style("opacity", 1)
    .attr("d", function(d, i, j) {
      return (
        fanArc
          .innerRadius(j * tierBreadth + radius)
          .outerRadius(j * tierBreadth + radius)(d)
      )
    })
    .transition().duration(0).each("end", null)

  fanHighlighter.filter(function (d) { return d.data.highlighted })
    .attr("fill", function (d) { return color(d.data.type) })
    .transition()
      .duration(userSelectionTime)
      .ease("linear")
      .attr("d", function(d, i, j) {
        return (
          fanArc
            .innerRadius(j * tierBreadth + radius)
            .outerRadius((j + 1) * tierBreadth + radius)(d)
        )
      })
      .each("end", function (d) {
        d.data.selected = true
        d.data.highlighted = false

        console.log("finished" + d.data.text)

        if (typeof d.data.action !== 'undefined') {
          d.data.action.execute()
        }

        if (d.data.commands) {
          controlData.commands = d.data.commands
        }
        update(controlData)
      })

  fanHighlighter.filter(function (d) { return d.data.selected })
    .attr("fill", function (d) { return color(d.data.type) })
    .attr("d", function(d, i, j) {
      return (
        fanArc
          .innerRadius(j * tierBreadth + radius)
          .outerRadius((j + 1) * tierBreadth + radius)(d)
      )
    })

  var fans = controls.select("path.fan")

  fans
    .style("stroke", baseColor)
    .style("stroke-width", strokeWidth)
    .attr("fill", function(d, i) { return color(d.data.type) })
    .style("fill-opacity", 0.5)
    .attr("d", function(d, i, j) {
      return (
        fanArc
          .innerRadius(j * tierBreadth + radius)
          .outerRadius((j + 1) * tierBreadth + radius)(d)
      )
    })

  var controlLabels = controls.select("text.control-label")
  controlLabels
    .classed({"control-label": true})
    .style("pointer-events", "none")
    .style("fill", "none")
    .style("font", "bold 10px Arial")
    .attr("dx", function(d) {
      var a = textAngle(d, 0, 0);
      return a < 0 ? "-10px" : "10px";
    })
    .attr("text-anchor", function(d) {
      var a = textAngle(d, 0, 0);
      return a < 0 ? "start" : "end";
    })
    .attr("transform", function(d, i, j) { //set text'ss origin to the centroid
      //we have to make sure to set these before calling arc.centroid
      fanArc
        .innerRadius(j * tierBreadth + radius)
        .outerRadius((j + 1) * tierBreadth + radius)(d)
      return "translate(" + fanArc.centroid(d) + ") rotate(" + textAngle(d, -90, 90) + ")";
    })
    .style("fill", "black")
    .text(function (d) { return d.data.text })

  controls.exit().remove()
}
