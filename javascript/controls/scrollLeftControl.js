var scrollLeftControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "scroll",
    text: "Left",
    selected: false,
    highlighted: false,
    action: scrollLeftAction
  }, config)
}
