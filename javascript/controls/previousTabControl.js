var previousTabControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "tabs",
    text: "Previous tab",
    selected: false,
    highlighted: false,
    controlState: previousTabControlState,
    action: previousTabAction
  }, config)
}
