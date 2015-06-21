var clickControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "click",
    text: "click",
    selected: false,
    highlighted: false,
    controlState: clickControlState,
    action: clickAction
  }, config)
}
