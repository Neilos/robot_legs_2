var navigateBackControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "back",
    selected: false,
    highlighted: false,
    action: { execute: function(){console.log("back") }}
  }, config)
}
