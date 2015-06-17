///////////////////////////////////////////////////////
/////////////////// global config /////////////////////

var strokeWidth = 2
var tierBreadth = 80
var radius = 60
// var tierBreadth = radius + 2 * tierBreadth
// var radius = radius + tierBreadth
var progressIndicatorBreadth = 5
var innerRadius = radius - progressIndicatorBreadth
var angle = {
  "_90": Math.PI / 2,
  "_180": Math.PI,
  "_270": Math.PI * (3/2),
  "_360": Math.PI * 2
}

var userSelectionTime = 1500
var animateDuration = 300
var fanAngle = Math.PI / 20

var currentStartAngle = 0
var currentEndAngle = angle._90

var color = d3.scale.category10()

var pie = d3.layout.pie()
            .value(function(d) { return d.value })
            .sort(null)
            .startAngle(0)
            .endAngle(angle._90)

var fanArc = d3.svg.arc()

var backgroundArc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .startAngle(0)

var foregroundArc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .startAngle(0)

