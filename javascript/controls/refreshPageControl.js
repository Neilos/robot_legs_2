var refreshPageControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Refresh page",
    selected: false,
    highlighted: false,
    controlState: refreshPageControlState,
    action: refreshPageAction
  }, config)
}
