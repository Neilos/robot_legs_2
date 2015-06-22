var mouseControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "mouse",
    text: "Mouse",
    selected: false,
    highlighted: false,
    controlState: mouseControlState,
    action: { execute: function(){console.log("mouse controls") }}
  }, config)
}
