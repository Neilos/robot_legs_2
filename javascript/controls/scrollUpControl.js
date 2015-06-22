var scrollUpControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "scroll",
    text: "Up",
    selected: false,
    highlighted: false,
    action: scrollUpAction
  }, config)
}
