var navigateControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Navigate",
    selected: false,
    highlighted: false,
    controlState: navigateControlState,
    action: { execute: function(){console.log("navigate") }}
  }, config)
}
