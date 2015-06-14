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
var screenCenterX = width / 2
var screenCenterY = height / 2
var strokeWidth = 2
var radius = 40
var fanOuterRadius = 100
var fanInnerRadius = radius - strokeWidth
var progressIndicatorBreadth = 5
var innerRadius = radius - progressIndicatorBreadth
var circle360 = 2 * Math.PI
var userSelectionTime = 1500
var animateDuration = 300
var fanAngle = Math.PI / 20

///////////////////////////////////////////////////////
// drop shadows

// filters go in defs element
var defs = svg.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("width", "200%")
    .attr("height", "200%")

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 4)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 6)
    .attr("dy", 6)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

////////////////////////////////////////////////

var currentAngle = 0

var moveActionPoint = function () {
  d3.select("html").on("mousemove", function () {
    var x = d3.event.clientX
    var y = d3.event.clientY

    if (x > screenCenterX) {
      currentAngle = (y > screenCenterY) ? 0 : 270
    } else {
      currentAngle = (y > screenCenterY) ? 90 : 180
    }

    action.attr("transform", "translate(" + x + "," + y + ") rotate(" + currentAngle + ")")
  })
}

var action = svg.append("g")
                  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
                  .style("pointer-events", "auto")


////////////////////////////////

var dataset = {
  tier1Controls: [1, 1, 1, 1, 1],
  tier2Controls: [1, 1, 1, 1, 1],
  tier3Controls: [1, 1, 1, 1, 1]
};

var fanBreadth = 80

var fanBackgroundArc = d3.svg.arc()
      .innerRadius(fanInnerRadius)
      .outerRadius(fanInnerRadius)
      .startAngle(-(90/180) * Math.PI)
      .endAngle(0)

var fanBackground = action.append("path")
                          .classed({"action": true, "fan": true})
                          .style("fill", "#ddd")
                          .attr("d", fanBackgroundArc)
                          .style("filter", "url(#drop-shadow)")

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
            .classed({"action": true, "fan": true})
            .style("opacity", 0.3)
            .style("stroke", "#ddd")
            .style("stroke-width", strokeWidth)
            .attr("fill", function(d, i) { return color(i) })
            .attr("d", function(d, i, j) {
              return fanArcFirstTier
                        .innerRadius(fanInnerRadius)
                        .outerRadius(fanInnerRadius)(d)
            })

function expandFan () {
  fanBackground.transition()
    .attr("d", function(d, i, j) {
      return fanBackgroundArc
                .innerRadius(fanInnerRadius)
                .outerRadius(fanOuterRadius)(d)
    })
    .duration(300)
    .ease("cubic")

  fan.transition()
    .attr("d", function(d, i, j) {
      return fanArcFirstTier
                .innerRadius(fanInnerRadius)
                .outerRadius(fanOuterRadius)(d)
    })
    .duration(300)
    .ease("cubic")
}

function collapseFan () {
  fanBackground.transition()
    .attr("d", function(d, i, j) {
      return fanBackgroundArc
                .innerRadius(fanInnerRadius)
                .outerRadius(fanInnerRadius)(d)
    })
    .duration(300)
    .ease("cubic")

  fan.transition()
    .attr("d", function(d, i, j) {
      return fanArcFirstTier
                .innerRadius(fanInnerRadius)
                .outerRadius(fanInnerRadius)(d)
    })
    .duration(300)
    .ease("cubic")
}

/////////////////////////////////////

var backgroundArc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .startAngle(0)

var foregroundArc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
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
                      .style("opacity", 0)


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
                          .style("fill", "#ad494a")
                          .attr("d", foregroundArc)

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

