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
                            .style("fill", "#ddd")
                            .style("filter", "url(#drop-shadow2)")

  var tiers = action.selectAll("g.tier")
    .data(d3.values(controlData))

  var tiersEnter = tiers.enter().append("g").classed({"tier": true})

  var controls = tiers.selectAll("g")
                    .data(function (d) { return pie(d) })

  var controlsEnter = controls
                        .enter()
                         .append("g")

  controlsEnter
    .classed({"control": true})
    .on("mouseenter", function (d) {
      console.log("enter .control")
      if (typeof d.data.action !== 'undefined') {
        d.data.action.execute()
      }
      if (d.data.commands) {
        controlData.commands = d.data.commands
      }
      update(controlData)
    })
    .on("mouseleave", function (d) {
      delete controlData.comands
      update(controlData)
      console.log("leave .control")
    })

  controlsEnter.append("path").classed({"fan": true})
  controlsEnter.append("text").classed({"control-label": true})

  var fans = controls.select("path.fan")

  fans
    .style("stroke", "#ddd")
    .style("stroke-width", strokeWidth)
    .attr("fill", function(d, i) { return color(d.data.type) })
    .attr("d", function(d, i, j) {
      return (
        fanArc
          .innerRadius(j * tierBreadth + radius)
          .outerRadius((j + 1) * tierBreadth + radius)(d)
      )
    })
    .style("opacity", 0.5)

  var controlLabels = controls.select("text.control-label")
  controlLabels
    .classed({"control-label": true})
    .style("pointer-events", "none")
    .style("fill", "none")
    .style("font", "bold 10px Arial")
    .attr("dx", function(d) {
      var a = angle(d, 0, 0);
      return a < 0 ? "-10px" : "10px";
    })
    .attr("text-anchor", function(d) {
      var a = angle(d, 0, 0);
      return a < 0 ? "start" : "end";
    })
    .attr("transform", function(d, i, j) { //set text'ss origin to the centroid
      //we have to make sure to set these before calling arc.centroid
      fanArc
        .innerRadius(j * tierBreadth + radius)
        .outerRadius((j + 1) * tierBreadth + radius)(d)
      return "translate(" + fanArc.centroid(d) + ") rotate(" + angle(d, -90, 90) + ")";
    })
    .style("fill", "black")
    .text(function (d) { return d.data.text })

  controls.exit().remove()
}


update(controlDataEmpty())