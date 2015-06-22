var navigateHomeControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Home",
    selected: false,
    highlighted: false,
    action: { execute: function(){console.log("home") }}
  }, config)
}
