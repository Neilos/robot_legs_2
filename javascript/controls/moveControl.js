var moveControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "move",
    text: "move",
    selected: false,
    highlighted: false,
    controlState: moveControlState,
    action: moveAction
  }, config)
}
