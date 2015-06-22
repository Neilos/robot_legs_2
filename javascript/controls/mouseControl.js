var mouseControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "none",
    text: "mouse controls",
    selected: false,
    highlighted: false,
    controlState: mouseControlState,
    action: { execute: function(){console.log("mouse controls") }}
  }, config)
}
