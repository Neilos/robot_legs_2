var navigateControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "navigation controls",
    selected: false,
    highlighted: false,
    controlState: navigationControlState,
    action: { execute: function(){console.log("navigation controls") }}
  }, config)
}
