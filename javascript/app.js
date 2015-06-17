var controlDataBase = function () {
  return {
    options: [
      { value: 1,
        type: "move",
        text: "move",
        selected: true,
        commands: [],
        controlFn: function(){console.log("move")} },
      { value: 1,
        type: "click",
        text: "click",
        commands: [
          { value: 1,
            type: "click",
            text: "once",
            controlFn: function(){console.log("click once")} },
          { value: 1,
            type: "click",
            text: "continuous",
            commands: [
              { value: 1,
                type: "click",
                color: "#1f77b4",
                text: "cancel clicking",
                controlFn: function(){console.log("cancel continuous clicking")} },
            ],
            controlFn: function(){console.log("continuous clicking")} }
        ],
        controlFn: function(){console.log("click")} },
      { value: 1,
        type: "scroll",
        text: "scroll",
        commands: [
          { value: 1,
            type: "scroll",
            text: "up",
            controlFn: function(){console.log("scroll up")} },
          { value: 1,
            type: "scroll",
            text: "down",
            controlFn: function(){console.log("scroll down")} },
          { value: 1,
            type: "scroll",
            text: "left",
            controlFn: function(){console.log("scroll left")} },
          { value: 1,
            type: "scroll",
            text: "right",
            controlFn: function(){console.log("scroll right")} }
        ],
        controlFn: function(){console.log("scroll")} },
      { value: 1,
        type: "zoom",
        text: "zoom",
        commands: [
          { value: 1,
            type: "zoom",
            text: "in",
            controlFn: function(){console.log("zoom in")} },
          { value: 1,
            type: "zoom",
            text: "out",
            controlFn: function(){console.log("zoom out")} }
        ],
        controlFn: function(){console.log("zoom")} },
      { value: 1,
        type: "navigation",
        text: "navigation",
        commands: [
          { value: 1,
            type: "navigation",
            text: "back",
            controlFn: function(){console.log("back")} },
          { value: 1,
            type: "navigation",
            text: "forward",
            controlFn: function(){console.log("forward")} },
          { value: 1,
            type: "navigation",
            text: "home",
            controlFn: function(){console.log("home")} },
          { value: 1,
            type: "navigation",
            text: "refresh",
            controlFn: function(){console.log("refresh")} }
        ],
        controlFn: function(){console.log("navigation")} }
    ]
  }
};

var svg = d3.select("body")
            .append('svg')
              .classed({"overlay": true})
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
var tierBreadth = 120
var radius = 40
// var tierBreadth = radius + 2 * tierBreadth
// var radius = radius + tierBreadth
var progressIndicatorBreadth = 5
var innerRadius = radius - progressIndicatorBreadth
var circle = {
  "_90": Math.PI / 2,
  "_180": Math.PI,
  "_270": Math.PI * (3/2),
  "_360": Math.PI * 2
}

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

var currentStartAngle = 0
var currentEndAngle = 0

var moveActionPoint = function () {
  d3.select("html").on("mousemove", function () {
    var x = d3.event.clientX
    var y = d3.event.clientY

    delete controlData.commands

    if (screenCenterX < x) {
      if (screenCenterY < y) {
        currentStartAngle = circle._270
        currentEndAngle = circle._360
      } else {
        currentStartAngle = circle._180
        currentEndAngle = circle._270
      }
    } else {
      if (screenCenterY < y) {
        currentStartAngle = 0
        currentEndAngle = circle._90
      } else {
        currentStartAngle = circle._90
        currentEndAngle = circle._180
      }
    }
    pie.startAngle(currentStartAngle).endAngle(currentEndAngle)
    update()

    action.transition()
      .duration(300)
      .ease("linear")
      .delay(100)
      .attr("transform", "translate(" + x + "," + y + ") rotate(" + 0 + ")")
  })
}

var action = svg.append("g")
                  .classed({"action": true})
                  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
                  .style("pointer-events", "auto")


////////////////////////////////


action.append("path").classed({"fanBackground": true})

var pie = d3.layout.pie()
            .value(function(d) { return d.value })
            .sort(null)
            .startAngle(0)
            .endAngle(circle._90)

var fanArc = d3.svg.arc()

var color = d3.scale.category10()

function update (controlData) {
  var numberOfControlTiers = d3.values(controlData).length

  var fanBackground = action.select("path.fanBackground")
                            .attr("d", d3.svg.arc()
                                        .innerRadius(radius)
                                        .outerRadius(radius + 10)
                                        .startAngle(currentStartAngle)
                                        .endAngle(currentEndAngle)
                            )
                            .classed({"fanBackground": true})
                            .style("fill", "#ddd")
                            .style("filter", "url(#drop-shadow)")

  var tiers = action.selectAll("g.tier")
    .data(d3.values(controlData))

  var tiersEnter = tiers.enter().append("g").classed({"tier": true})

  var controls = tiers.selectAll("g")
                    .data(function (d) { return pie(d) })

  var controlsEnter = controls
                        .enter()
                         .append("g")

  controls
    .classed({"control": true})
    .on("mouseenter", function (d) {
      console.log("mouseenter control")
      if (typeof d.data.controlFn === 'function') {
        d.data.controlFn.call()
      }
      if (d.data.commands) {
        controlData.commands = d.data.commands
      }
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
    .style("opacity", 0.9)

  var controlLabels = controls.select("text.control-label")
  controlLabels
    .classed({"control-label": true})
    .style("pointer-events", "none")
    .style("fill", "none")
    .style("font", "bold 10px Arial")
    .attr("dx", function(d) {
      var a = angle(d, 0, 0);
      return a < 0 ? "-0px" : "0px";
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

// Angle Calculation Function...
function angle(d, offset, threshold) {
  var a = (d.startAngle + d.endAngle) * 90 / Math.PI + offset;
  return a > threshold ? a - 180 : a;
}

// function expandFan () {
//   fanBackground
//     .transition()
//       .duration(300)
//       .ease("cubic")
//       .attr("d", function(d, i, j) {
//         return fanBackgroundArc
//                   .innerRadius(radius)
//                   .outerRadius(radius + numberOfControlTiers * tierBreadth)(d)
//       })
// }

// function collapseFan () {
//   fanBackground
//     .transition()
//       .duration(300)
//       .ease("cubic")
//       .attr("d", function(d, i, j) {
//         return fanBackgroundArc.innerRadius(radius).outerRadius(radius)(d)
//       })
// }

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
                      .classed({"actionSelector": true})
                      .attr("r", radius)
                      .style("opacity", 0)

d3.selectAll(".action").on("mouseleave", function () {
  console.log("mouseleave .action")
  update({controls: [], options: []})
  // cancelActionPointMove()
})

d3.selectAll(".action").on("mouseenter", function () {
  console.log("mouseenter .action")
  update(controlDataBase())
  // triggerActionPointMove()
})

// Add the background arc, from 0 to 100% (τ).
var timerBackground = action.append("path")
                          .datum({endAngle: circle._360})
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

function triggerActionPointMove () {
  timerForeground.datum({endAngle: 0})
    .transition()
      .ease("linear")
      .duration(userSelectionTime)
      .call(arcAngleTween, circle._360)
      .each('end', moveActionPoint);
}

function cancelActionPointMove () {
  timerForeground
    .transition()
      .duration(animateDuration)
      .call(arcAngleTween, 0)
}

