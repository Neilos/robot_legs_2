var navigateHomeControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Home",
    selected: false,
    highlighted: false,
    controlState: navigateHomeControlState,
    action: homeAction
  }, config)
}
