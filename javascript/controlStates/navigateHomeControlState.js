var navigateHomeControlState = function () {
  return [
    [
      mouseControl(),
      navigateControl({selected: true})
    ],

    [
      navigateBackControl(),
      navigateForwardControl(),
      navigateHomeControl({selected: true}),
      refreshPageControl()
    ]
  ]
}
