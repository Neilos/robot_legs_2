var scrollDownControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "scroll",
    text: "Down",
    selected: false,
    highlighted: false,
    action: scrollDownAction
  }, config)
}
