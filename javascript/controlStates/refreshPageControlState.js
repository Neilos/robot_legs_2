var refreshPageControlState = function () {
  return [
    [
      mouseControl(),
      navigateControl({selected: true})
    ],

    [
      navigateBackControl(),
      navigateForwardControl(),
      navigateHomeControl(),
      navigateTabsControl(),
      refreshPageControl({selected: true})
    ]
  ]
}
