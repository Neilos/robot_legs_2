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
var fanRadius = 100
var innerRadius = radius / 2
var progressIndicatorBreadth = radius - innerRadius
var circle360 = 2 * Math.PI
var userSelectionTime = 1500
var animateDuration = 300
var fanAngle = Math.PI / 16

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


var moveActionPoint = function () {
  d3.select("html").on("mousemove", function () {
    action.attr("transform", "translate(" + d3.event.clientX + "," + d3.event.clientY + ")")
  })
}

var action = svg.append("g")
                  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
                  .style("pointer-events", "auto")

var backgroundArc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .startAngle(0)

var foregroundArc = d3.svg.arc()
      .outerRadius(radius - 2)
      .innerRadius(innerRadius + 2)
      .startAngle(0)

function arcAngleTween (transition, newAngle) {
  transition.attrTween("d", function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function (t) {
      d.endAngle = interpolate(t);
      return foregroundArc(d);
    };
  });
}

var actionSelector = action.append("circle")
                      .classed({"action": true})
                      .attr("r", radius)

// Add the background arc, from 0 to 100% (τ).
var timerBackground = action.append("path")
                          .datum({endAngle: circle360})
                          .style("pointer-events", "none")
                          .style("fill", "#ddd")
                          .attr("d", backgroundArc)
                          .style("filter", "url(#drop-shadow)")

// Add the foreground arc in orange, currently 0%.
var timerForeground = action.append("path")
                          .datum({endAngle: 0})
                          .style("pointer-events", "none")
                          .style("fill", "orange")
                          .attr("d", foregroundArc)

////////////////////////////////

var dataset = {
  tier1Controls: [1, 1, 1, 1],
  tier2Controls: [1, 1, 1, 1],
  tier3Controls: [1, 1, 1, 1]
};

var fanBreadth = 80

var color = d3.scale.category20();
var pie = d3.layout.pie().sort(null);

var pie = d3.layout.pie()
        .sort(null)
        .startAngle(-(90/180) * Math.PI)
        .endAngle(0)

var fanArcFirstTier = d3.svg.arc()

var tiers = action.selectAll("g")
                .data(d3.values(dataset))
              .enter()
              .append("g");

var fan = tiers.selectAll("path")
    .data(function(d) { return pie(d); })
  .enter().append("path")
    .classed({"action": true})
    .attr("fill", function(d, i) { return color(i) })
    .style("opacity", 0.4)
    .attr("d", function(d, i, j) {
      return fanArcFirstTier
                .innerRadius(radius)
                .outerRadius(radius)(d)
    })

function expandFan () {
  fan.transition()
    .attr("d", function(d, i, j) {
      return fanArcFirstTier
                .innerRadius(radius)
                .outerRadius(fanRadius)(d)
    })
    .duration(300)
}

function collapseFan () {
  fan.transition()
    .attr("d", function(d, i, j) {
      return fanArcFirstTier
                .innerRadius(radius)
                .outerRadius(radius)(d)
    })
    .duration(300)
}

/////////////////////////////////////

d3.selectAll(".action").on("mouseenter", function () {
  expandFan()
})

d3.selectAll(".action").on("mouseout", function () {
  collapseFan()
  cancelActionPointMove()
})

actionSelector.on("mouseover", function () {
  triggerActionPointMove()
})


function triggerActionPointMove () {
  timerForeground.datum({endAngle: 0})
    .transition()
      .ease("linear")
      .duration(userSelectionTime)
      .call(arcAngleTween, circle360)
      .each('end', moveActionPoint);
}

function cancelActionPointMove () {
  timerForeground
    .transition()
      .duration(animateDuration)
      .call(arcAngleTween, 0)
}

