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
var radius = 40
var progressIndicatorThickness = radius / 2
var circle360 = 2 * Math.PI

///////////////////////////////////////////////////////
// drop shadows

// filters go in defs element
var defs = svg.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 2)
    .attr("dy", 2)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

////////////////////////////////////////////////



var moveAction = function () {
  d3.select("html").on("mousemove", function () {
    var x = d3.event.clientX
    var y = d3.event.clientY
    cursorPosition.x = x
    cursorPosition.y = y
    cursorPosition.element = document.elementFromPoint(x, y)

    action.attr("transform", "translate(" + x + "," + y + ")")
  })
}


var action = svg.append("g")
                  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
                  .style("pointer-events", "auto")

// catpure the cursorPosition
var cursorPosition = {x:0, y:0}

var backgroundArc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - progressIndicatorThickness)
    .startAngle(0)

var foregroundArc = d3.svg.arc()
    .outerRadius(radius - 2)
    .innerRadius(radius - progressIndicatorThickness + 2)
    .startAngle(0)

function arcTween(transition, newAngle) {
  transition.attrTween("d", function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
      d.endAngle = interpolate(t);
      return foregroundArc(d);
    };
  });
}

var actionSelector = action.append("circle")
                      .attr("r", radius)

// Add the background arc, from 0 to 100% (τ).
var background = action.append("path")
                          .datum({endAngle: circle360})
                          .style("pointer-events", "none")
                          .style("fill", "#ddd")
                          .attr("d", backgroundArc)
                          .style("filter", "url(#drop-shadow)")

// Add the foreground arc in orange, currently 0%.
var foreground = action.append("path")
                          .datum({endAngle: 0})
                          .style("pointer-events", "none")
                          .style("fill", "orange")
                          .attr("d", foregroundArc)



actionSelector.on("mouseenter", function () {
  foreground.datum({endAngle: 0})
    .transition()
      .ease("linear")
      .duration(2000)
      .call(arcTween, circle360)
      .each('end', moveAction);
})

actionSelector.on("mouseout", function () {
  foreground
    .transition()
      .duration(100)
      .call(arcTween, 0)
})
