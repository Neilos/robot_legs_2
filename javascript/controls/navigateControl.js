var navigateControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "navigate",
    selected: false,
    highlighted: false,
    controlState: navigationControlState,
    action: { execute: function(){console.log("navigate") }}
  }, config)
}
