var update = function (controlData) {
  var fanLevel = controlData.filter(function(controls) {
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
                            .style("filter", function () {
                              if (fanLevel > 0) {
                                return "url(#drop-shadow2)"
                              }
                            })

  var tiers = action.selectAll("g.tier")
    .data(controlData)

  var tiersEnter = tiers.enter().append("g").classed({"tier": true})

  tiers.exit().remove()

  var controls = tiers.selectAll("g.control")
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
      actionController.activateControl(baseColor)
      update(controlData)
    })

  controlsEnter.append("path").classed({"fanHighlighter": true})
  controlsEnter.append("path").classed({"fan": true})
  controlsEnter.append("text").classed({"control-label-shadow": true})
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
        if (typeof d.data.action !== 'undefined') {
          d.data.action.execute()
        }

        if (d.data.controlState) {
          update(d.data.controlState.call())
        } else {
          update(controlData)
        }
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

  var controlLabelShadow = controls.select("text.control-label-shadow")
  controlLabelShadow
    .style("pointer-events", "none")
    .style("fill", "none")
    .style("font", "normal 14px Arial")
    .style("stroke", "white")
    .style("opacity", 0.5)
    .attr("dx", "0.5px")
    .attr("dy", "0.5px")
    .attr("text-anchor", "middle")
    .attr("transform", function(d, i, j) {
      // set text's origin to the centroid
      fanArc
        .innerRadius(j * tierBreadth + radius)
        .outerRadius((j + 1) * tierBreadth + radius)(d)
      return "translate(" + fanArc.centroid(d) + ")"
    })
    .style("fill", "black")
    .each(insertLinebreaks)

  var controlLabels = controls.select("text.control-label")
  controlLabels
    .style("pointer-events", "none")
    .style("fill", "none")
    .style("font", "normal 14px Arial")
    .attr("dx", "0px")
    .attr("text-anchor", "middle")
    .attr("transform", function(d, i, j) {
      // set text's origin to the centroid
      fanArc
        .innerRadius(j * tierBreadth + radius)
        .outerRadius((j + 1) * tierBreadth + radius)(d)
      return "translate(" + fanArc.centroid(d) + ")"
    })
    .style("fill", "black")
    .each(insertLinebreaks)

  controls.exit().remove()
}
