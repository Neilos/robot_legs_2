var clickControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "click",
    text: "Click",
    selected: false,
    highlighted: false,
    controlState: clickControlState,
    action: clickAction
  }, config)
}
