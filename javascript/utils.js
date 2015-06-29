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

var mergeObjects = function (target, source) {
  if ( typeof target !== 'object' ) { target = {}; }
  if ( typeof source !== 'object' ) { source = {}; }

  for (var property in source) {
    if ( source.hasOwnProperty(property) ) {
      var sourceProperty = source[ property ];

      if ( typeof sourceProperty === 'object' ) {
        target[ property ] = util.merge( target[ property ], sourceProperty );
        continue;
      }

      target[ property ] = sourceProperty;
    }
  }

  for (var a = 2, l = arguments.length; a < l; a++) {
    merge(target, arguments[a]);
  }

  return target;
};

var insertLinebreaks = function (d) {
    var el = d3.select(this);
    var words = d.data.text.split(' ');
    el.text('');

    for (var i = 0; i < words.length; i++) {
        var tspan = el.append('tspan').text(words[i]);
        if (i > 0)
            tspan.attr('x', 0).attr('dy', '15');
    }
};

// recursive function
var jiggleScrollTop = function (element, jiggleAmount) {
  var origScrollTop = element.scrollTop
  var newjiggledScrollTop = origScrollTop + jiggleAmount

  // Element is scrollable if it holds a given scrollTop
  element.scrollTop = newjiggledScrollTop
  if (element.scrollTop == newjiggledScrollTop) {
    // Reset the scrollTop
    element.scrollTop = origScrollTop
    return element
  } else {
    if (element.parentElement) {
      // check if the parent is scrollable
      return jiggleScrollTop(element.parentElement, jiggleAmount)
    } else {
      return null
    }
  }
}

var scrollTopTween = function (newScrollTop) {
  return function () {
    var interpolate = d3.interpolateNumber(this.scrollTop, newScrollTop)
    return function (time) { this.scrollTop = interpolate(time) }
  }
}

// recursive function
var jiggleScrollLeft = function (element, jiggleAmount) {
  var origScrollLeft = element.scrollLeft
  var newjiggledScrollLeft = origScrollLeft + jiggleAmount

  // Element is scrollable if it holds a given scrollLeft
  element.scrollLeft = newjiggledScrollLeft
  if (element.scrollLeft == newjiggledScrollLeft) {
    // Reset the scrollLeft
    element.scrollLeft = origScrollLeft
    return element
  } else {
    if (element.parentElement) {
      // check if the parent is scrollable
      return jiggleScrollLeft(element.parentElement, jiggleAmount)
    } else {
      return null
    }
  }
}

var scrollLeftTween = function (newScrollLeft) {
  return function () {
    var interpolate = d3.interpolateNumber(this.scrollLeft, newScrollLeft)
    return function (time) { this.scrollLeft = interpolate(time) }
  }
}