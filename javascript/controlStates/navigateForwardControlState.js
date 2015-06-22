var navigateForwardControlState = function () {
  return [
    [
      mouseControl(),
      navigateControl({selected: true})
    ],

    [
      navigateBackControl(),
      navigateForwardControl({selected: true}),
      navigateHomeControl(),
      navigateTabsControl(),
      refreshPageControl()
    ]
  ]
}
