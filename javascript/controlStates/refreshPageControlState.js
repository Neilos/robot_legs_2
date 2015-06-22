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
      refreshPageControl({selected: true})
    ]
  ]
}
