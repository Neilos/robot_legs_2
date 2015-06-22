var scrollRightControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "scroll",
    text: "Right",
    selected: false,
    highlighted: false,
    action: scrollRightAction
  }, config)
}
