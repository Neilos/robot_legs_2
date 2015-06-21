var refreshPageControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "refresh page",
    selected: false,
    highlighted: false,
    action: { execute: function(){console.log("refresh page") }}
  }, config)
}
