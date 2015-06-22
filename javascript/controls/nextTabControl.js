var nextTabControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Next tab",
    selected: false,
    highlighted: false,
    controlState: navigateControlState,
    action: nextTabAction
  }, config)
}
