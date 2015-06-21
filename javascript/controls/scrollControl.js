var scrollControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "scroll",
    text: "scroll",
    selected: false,
    highlighted: false,
    controlState: scrollControlState,
    action: { execute: function(){console.log("scroll") }}
  }, config)
}
