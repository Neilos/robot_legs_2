var navigateBackControlState = function () {
  return [
    [
      mouseControl(),
      navigateControl({selected: true})
    ],

    [
      navigateBackControl({selected: true}),
      navigateForwardControl(),
      navigateHomeControl(),
      refreshPageControl()
    ]
  ]
}
