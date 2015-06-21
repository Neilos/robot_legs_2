///////////////////////////////////////////////////////
/////////////////// zooming setup /////////////////////

$( "body > *" ).wrapAll( "<div id='myContainer'><div id='myContent'></div></div>" )
var container = document.getElementById('myContainer')
var content = document.getElementById('myContent')

content.style.width = contentWidth
content.style.height = contentHeight

// Reflow handling
var reflow = function() {
  clientWidth = container.clientWidth;
  clientHeight = container.clientHeight;
  scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);
};

window.addEventListener("resize", reflow, false);
reflow();


///////////////////////////////////////////////////////
/////////////////// dom related setup /////////////////

var audio = d3.select("body")
              .append("span")
              .attr("id", "sound")

var svg = d3.select("body")
            .append('svg')
              .classed({"overlay": true})
              .attr("width", "100%")
              .attr("height", "100%")
              .style("z-index", 99999999)
              .style("position", "fixed")
              .style("top", 0)
              .style("left", 0)
              .style("pointer-events", "none")


///////////////////////////////////////////////////////
/////////////////// definitions ///////////////////////

// filters go in defs element
var defs = svg.append("defs");

// create filter with id #drop-shadow1
// height more than 100% and offset up and left so that the shadow is not clipped
var filter1 = defs.append("filter")
    .attr("x", -0.5)
    .attr("y", -0.5)
    .attr("id", "drop-shadow1")
    .attr("width", "200%")
    .attr("height", "200%")

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter1.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter1.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 10)
    .attr("dy", 10)
    .attr("result", "offsetBlur");

filter1.append("feColorMatrix")
    .attr("result", "matrixOut")
    .attr("in", "offOut")
    .attr("type", "matrix")
    .attr("values", "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0")

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge1 = filter1.append("feMerge");

feMerge1.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge1.append("feMergeNode")
    .attr("in", "SourceGraphic");



var filter2 = defs.append("filter")
    .attr("id", "drop-shadow2")
    .attr("x", -0.5)
    .attr("y", -0.5)
    .attr("width", "200%")
    .attr("height", "200%")

filter2.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3)
    .attr("result", "blur");

filter2.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 6)
    .attr("dy", 6)
    .attr("result", "offsetBlur");

var feMerge2 = filter2.append("feMerge");

feMerge2.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge2.append("feMergeNode")
    .attr("in", "SourceGraphic");


///////////////////////////////////////////////////////
/////////////////// Append ////////////////////////////

var width = svg[0][0].clientWidth
var height = svg[0][0].clientHeight
var screenCenterX = width / 2
var screenCenterY = height / 2

actionPosition.x = screenCenterX
actionPosition.y = screenCenterY

var action = svg.append("g")
                  .classed({"action": true})
                  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
                  .style("pointer-events", "auto")

action.append("path").classed({"fanBackground": true})

var actionSelector = action.append("circle")
                      .classed({"actionSelector": true})
                      .attr("r", radius)
                      .style("opacity", 0)
                      .style("pointer-events", "auto")

var progressMeterBackground = action.append("path")
                          .classed({"progressMeterBackground": true})
                          .datum({endAngle: angle._360})
                          .style("pointer-events", "none")
                          .style("fill", progressMeter.baseColor)
                          .attr("d", progressMeter.backgroundArc)
                          .style("filter", "url(#drop-shadow1)")

var progressMeterForeground = action.append("path")
                          .classed({"progressMeterForeground": true})
                          .datum({endAngle: 0})
                          .style("pointer-events", "none")
                          .style("fill", progressMeter.color)
                          .attr("d", progressMeter.arc)


///////////////////////////////////////////////////////
/////////////////// Initialize ////////////////////////

actionController.resetEverything()
update(controlDataEmpty())

