var data = [ {name: "one", value: 10375} ];

var svg = d3.select("body")
            .append('svg')
              .attr("width", "100%")
              .attr("height", "100%")
              .style("position", "fixed")
              .style("top", 0)
              .style("left", 0)
              .style("pointer-events", "none")

var width = svg[0][0].clientWidth
var height = svg[0][0].clientHeight
var radius = 50
var fullCircle = 2 * Math.PI

var action = svg.append("g")
                  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

// catpure the cursorPosition
var cursorPosition = {}
d3.select("html").on("mousemove", function () {
  var x = d3.event.clientX
  var y = d3.event.clientY
  cursorPosition.x = x
  cursorPosition.y = y
  cursorPosition.element = document.elementFromPoint(x, y)
})

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 20)
    .startAngle(0)

// Add the background arc, from 0 to 100% (τ).
var background = action.append("path")
    .datum({endAngle: fullCircle})
    .style("fill", "#ddd")
    .attr("d", arc);

// Add the foreground arc in orange, currently 0%.
var foreground = action.append("path")
    .datum({endAngle: 0.1})
    .style("fill", "orange")
    .attr("d", arc)
    .style("pointer-events", "auto")
    .style("cursor", "crosshair")
    .transition()
      .ease("linear")
      .duration(2000)
      .call(arcTween, fullCircle)
