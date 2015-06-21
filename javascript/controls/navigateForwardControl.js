var navigateForwardControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "forward",
    selected: false,
    highlighted: false,
    action: { execute: function(){console.log("forward") }}
  }, config)
}
