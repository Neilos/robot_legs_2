var scrollRightControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "scroll",
    text: "scroll right",
    selected: false,
    highlighted: false,
    action: scrollRightAction
  }, config)
}
