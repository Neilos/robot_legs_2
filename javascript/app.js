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

var controlData = {
  outerControls: [
    { value: 2,
      color: "#1f77b4",
      text: "action 1",
      controlFn: function(){console.log("action 1")} },
    { value: 2,
      color: "#1f77b4",
      text: "action 2",
      controlFn: function(){console.log("action 2")} },
    { value: 2,
      color: "#ff7f0e",
      text: "action 3",
      controlFn: function(){console.log("action 3")} },
    { value: 2,
      color: "#2ca02c",
      text: "action 4",
      controlFn: function(){console.log("action 4")} },
    { value: 2,
      color: "#d62728",
      text: "action 5",
      controlFn: function(){console.log("action 5")} },
    { value: 2,
      color: "#9467bd",
      text: "action 6",
      controlFn: function(){console.log("action 6")} }
  ],
  innerControls: [
    { value: 4,
      color: "#1f77b4",
      text: "action 7",
      controlFn: function(){console.log("action 7")} },
    { value: 2,
      color: "#ff7f0e",
      text: "action 8",
      controlFn: function(){console.log("action 8")} },
    { value: 2,
      color: "#2ca02c",
      text: "action 9",
      controlFn: function(){console.log("action 9")} },
    { value: 2,
      color: "#d62728",
      text: "action 10",
      controlFn: function(){console.log("action 10")} },
    { value: 2,
      color: "#9467bd",
      text: "action 12",
      controlFn: function(){console.log("action 11")} }
  ]
};

var numberOfControlTiers = d3.values(controlData).length

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

var color = [ "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf" ]

var pie = d3.layout.pie()
          .value(function(d) { return d.value })
          .startAngle(-(90/180) * Math.PI)
          .endAngle(0)
          .sort(null)

var fanArc = d3.svg.arc()

var tiers = action.selectAll("g")
                .data(d3.values(controlData))
              .enter()
              .append("g");

var fan = tiers.selectAll("path")
              .data(function(d) { return pie(d); })
            .enter().append("g").append("path")
            .classed({"control": true, "fan": true})
            .style("stroke", "#ddd")
            .style("stroke-width", strokeWidth)
            .attr("fill", function(d, i) { return d.data.color })
            .attr("d", function(d, i, j) {
              return fanArc
                      .innerRadius(fanInnerRadius)
                      .outerRadius(fanInnerRadius)(d)
            })
            .on("mouseenter", function (d) {
              expandFan()
              d.data.controlFn.call()
            })
            .on("mouseout", function (d) {
              collapseFan()
            })

var controls = tiers.selectAll("g")

var controlLabels = controls.append("text")
                      .style("pointer-events", "none")
                      .style("fill", "none")
                      .style("font", "bold 10px Arial")
                      .text(function(d) { return d.data.text })

// Angle Calculation Function...
function angle(d, offset, threshold) {
  var a = (d.startAngle + d.endAngle) * 90 / Math.PI + offset;
  return a > threshold ? a - 180 : a;
}


function expandFan () {
  fanBackground.transition()
    .attr("d", function(d, i, j) {
      return fanBackgroundArc
                .innerRadius(fanInnerRadius)
                .outerRadius((numberOfControlTiers - j) * fanOuterRadius)(d)
    })
    .duration(300)
    .ease("cubic")

  fan.transition()
    .attr("d", function(d, i, j) {
      return fanArc
                .innerRadius(fanInnerRadius)
                .outerRadius((numberOfControlTiers - j) * fanOuterRadius)(d)
    })
    .duration(300)
    .ease("cubic")
    .each('end', function (d) {
      // Add link names to the arcs, translated to the arc centroid and rotated.
      controlLabels
        .attr("dx", function(d) {
          var a = angle(d, 0, 0);
          return a < 0 ? "-16px" : "16px";
        })
        .attr("text-anchor", function(d) {
          var a = angle(d, 0, 0);
          return a < 0 ? "start" : "end";
        })
        .attr("transform", function(d, i, j) { //set text'ss origin to the centroid
          //we have to make sure to set these before calling arc.centroid
          fanArc
            .innerRadius(fanInnerRadius)
            .outerRadius((numberOfControlTiers - j) * fanOuterRadius)(d)
          return "translate(" + fanArc.centroid(d) + ")rotate(" + angle(d, -90, 90) + ")";
        })
        .style("fill", "black")
    })


}

function collapseFan () {
  fanBackground.transition()
    .duration(300)
    .ease("cubic")
    .attr("d", function(d, i, j) {
      return fanBackgroundArc.innerRadius(fanInnerRadius).outerRadius(fanInnerRadius)(d)
    })

  fan.transition()
    .duration(300)
    .ease("cubic")
    .attr("d", function(d, i, j) {
      return fanArc.innerRadius(fanInnerRadius).outerRadius(fanInnerRadius)(d)
    })
    .each("start", function () {
      controlLabels.style("fill", "none")
    })

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
