var navigateBackControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Back",
    selected: false,
    highlighted: false,
    controlState: navigateBackControlState,
    action: backAction
  }, config)
}
