var navigateControlState = function () {
  return [
    [
      mouseControl(),
      navigateControl({selected: true})
    ],

    [
      navigateBackControl(),
      navigateForwardControl(),
      navigateHomeControl(),
      refreshPageControl()
    ]
  ]
}
