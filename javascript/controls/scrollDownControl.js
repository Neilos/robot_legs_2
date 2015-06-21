var scrollDownControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "scroll",
    text: "scroll down",
    selected: false,
    highlighted: false,
    action: scrollDownAction
  }, config)
}
