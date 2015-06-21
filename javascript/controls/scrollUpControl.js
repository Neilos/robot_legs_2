var scrollUpControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "scroll",
    text: "scroll up",
    selected: false,
    highlighted: false,
    action: scrollUpAction
  }, config)
}
