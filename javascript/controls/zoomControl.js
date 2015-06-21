var zoomControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "zoom",
    text: "zoom",
    selected: false,
    highlighted: false,
    controlState: zoomControlState,
    action: { execute: function(){ console.log("zoom") }}
  }, config)
}
