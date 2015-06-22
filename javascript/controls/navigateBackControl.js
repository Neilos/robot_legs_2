var navigateBackControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Back",
    selected: false,
    highlighted: false,
    action: { execute: function(){console.log("back") }}
  }, config)
}
