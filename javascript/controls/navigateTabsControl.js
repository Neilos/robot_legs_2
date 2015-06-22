var navigateTabsControl = function (config) {
  return mergeObjects({
    value: 1,
    type: "navigate",
    text: "Tabs",
    selected: false,
    highlighted: false,
    controlState: navigateTabsControlState
  }, config)
}
