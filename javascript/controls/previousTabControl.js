var previousTabControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Previous tab",
    selected: false,
    highlighted: false,
    controlState: navigateControlState,
    action: previousTabAction
  }, config)
}
