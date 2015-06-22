var nextTabControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "tabs",
    text: "Next tab",
    selected: false,
    highlighted: false,
    controlState: nextTabControlState,
    action: nextTabAction
  }, config)
}
