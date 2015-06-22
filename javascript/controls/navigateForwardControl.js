var navigateForwardControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Forward",
    selected: false,
    highlighted: false,
    controlState: navigateForwardControlState,
    action: forwardAction
  }, config)
}
