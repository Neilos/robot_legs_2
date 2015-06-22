var nextTabControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "tabs",
    text: "Next tab",
    selected: false,
    highlighted: false,
    controlState: navigateControlState,
    action: nextTabAction
  }, config)
}
