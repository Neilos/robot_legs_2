var scrollLeftControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "scroll",
    text: "scroll left",
    selected: false,
    highlighted: false,
    action: scrollLeftAction
  }, config)
}
