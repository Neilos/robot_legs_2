// Angle Calculation Function...
function textAngle(d, offset, threshold) {
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

var arcAngleTween = function (transition, newAngle) {
  transition.attrTween("d", function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function (t) {
      d.endAngle = interpolate(t);
      return progressMeter.arc(d);
    };
  });
}


var playSound = function (soundfile) {
  document.getElementById("sound").innerHTML=
    "<embed src=\"" + soundfile + "\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
}
