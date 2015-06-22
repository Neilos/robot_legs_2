///////////////////////////////////////////////////////
/////////////////// global config /////////////////////

var strokeWidth = 3
var tierBreadth = 90
var radius = 60
var progressMeterOuterRadius = radius + strokeWidth / 2
var progressMeterBreadth = 9
var progressMeterInnerRadius = radius - progressMeterBreadth
var innerRadius = radius - progressMeterBreadth
var baseColor = "#ddd"

var progressMeter = {
  baseColor: baseColor,
  color: "brown",
  backgroundArc: d3.svg.arc().outerRadius(progressMeterOuterRadius).innerRadius(innerRadius).startAngle(0),
  arc: d3.svg.arc().outerRadius(progressMeterOuterRadius - strokeWidth).innerRadius(innerRadius).startAngle(0),
  clickArc: d3.svg.arc().outerRadius(progressMeterBreadth + 0.5).innerRadius(0.5).startAngle(0)
}

var angle = {
  "_90": Math.PI / 2,
  "_180": Math.PI,
  "_270": Math.PI * (3/2),
  "_360": Math.PI * 2
}

var actionPosition = { x: -1000, y: -1000 }

var scroller  = new Scroller(render, {
  zooming: true,
  animating: true,
  animationDuration: 500,
  maxZoom: 5
});

var scrollIncrement = 100

var clientWidth = 0
var clientHeight = 0
var contentWidth = 10000
var contentHeight = 10000

var userSelectionTime = 1500
var animateDuration = 300
var clickDuration = 300
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

var navigationControlState = {}
var scrollControlState = {}
var zoomControlState = {}
var clickControlState = {}
var moveControlState = {}

