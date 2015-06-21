var zoomInControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "zoom",
    text: "zoom in",
    selected: false,
    highlighted: false,
    action: zoomInAction
  }, config)
}
