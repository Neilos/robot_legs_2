var refreshPageControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Refresh page",
    selected: false,
    highlighted: false,
    action: { execute: function(){console.log("refresh page") }}
  }, config)
}
