var previousTabControlState = function () {
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
      nextTabControl(),
      previousTabControl({selected: true})
    ],
  ]
}