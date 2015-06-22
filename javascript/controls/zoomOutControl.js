var zoomOutControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "zoom",
    text: "Out",
    selected: false,
    highlighted: false,
    action: zoomOutAction
  }, config)
}
