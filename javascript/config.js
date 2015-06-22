///////////////////////////////////////////////////////
/////////////////// global config /////////////////////

var strokeWidth = 5
var tierBreadth = 100
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

var userSelectionTime = 1200
var animateDuration = 400
var fanAngle = Math.PI / 20

var currentStartAngle = 0
var currentEndAngle = angle._90

var COLOR_MAPPINGS = {
  mouse: "#0099CC",
  move: "#008AB8",
  click: "#0099CC",
  scroll: "#009999",
  zoom: "#00CC99",
  navigate: "#fdae6b",
  tabs: "#fd8d3c"
}

var color = function (type) {
  return COLOR_MAPPINGS[type]
}

var pie = d3.layout.pie()
            .value(function(d) { return d.value })
            .sort(null)
            .startAngle(0)
            .endAngle(angle._90)

var fanArc = d3.svg.arc()

var baseControlState = {}
var emptyControlState = {}
var mouseControlState = {}
var moveControlState = {}
var navigateBackControlState = {}
var navigateControlState = {}
var navigateForwardControlState = {}
var navigateHomeControlState = {}
var navigateTabsControlState = {}
var refreshPageControlState = {}
var scrollControlState = {}
var zoomControlState = {}
