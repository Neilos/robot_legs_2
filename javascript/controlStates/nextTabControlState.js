var nextTabControlState = function () {
  return [
    [
      mouseControl(),
      navigateControl({selected: true})
    ],

    [
      navigateBackControl(),
      navigateForwardControl(),
      navigateHomeControl(),
      navigateTabsControl({selected: true}),
      refreshPageControl()
    ],

    [
      nextTabControl({selected: true}),
      previousTabControl()
    ],
  ]
}
