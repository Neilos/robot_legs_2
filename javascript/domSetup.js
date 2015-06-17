///////////////////////////////////////////////////////
/////////////////// dom related setup /////////////////

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

var action = svg.append("g")
                  .classed({"action": true})
                  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
                  .style("pointer-events", "auto")

action.append("path").classed({"fanBackground": true})

var actionSelector = action.append("circle")
                      .classed({"actionSelector": true})
                      .attr("r", radius)
                      .style("opacity", 0)

d3.selectAll(".action").on("mouseenter", showControlsAction.execute)
d3.selectAll(".action").on("mouseleave", resetAction.execute)

// Add the background arc, from 0 to 100% (τ).
var timerBackground = action.append("path")
                          .datum({endAngle: angle._360})
                          .style("pointer-events", "none")
                          .style("fill", "#ddd")
                          .attr("d", backgroundArc)
                          .style("filter", "url(#drop-shadow1)")

// Add the foreground arc in orange, currently 0%.
var timerForeground = action.append("path")
                          .datum({endAngle: 0})
                          .style("pointer-events", "none")
                          .style("fill", "#ad494a")
                          .attr("d", foregroundArc)

///////////////////////////////////////////////////////
/////////////////// definitions ///////////////////////

// filters go in defs element
var defs = svg.append("defs");

// create filter with id #drop-shadow1
// height=130% so that the shadow is not clipped
var filter1 = defs.append("filter")
    .attr("id", "drop-shadow1")
    .attr("width", "200%")
    .attr("height", "200%")

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter1.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 4)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter1.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 6)
    .attr("dy", 6)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge1 = filter1.append("feMerge");

feMerge1.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge1.append("feMergeNode")
    .attr("in", "SourceGraphic");


// create filter with id #drop-shadow2
// height=130% so that the shadow is not clipped
var filter2 = defs.append("filter")
    .attr("id", "drop-shadow2")
    .attr("width", "200%")
    .attr("height", "200%")

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter2.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter2.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge2 = filter2.append("feMerge");

feMerge2.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge2.append("feMergeNode")
    .attr("in", "SourceGraphic");


///////////////////////////////////////////////////////
/////////////////// initialize ////////////////////////

update(controlDataEmpty())
