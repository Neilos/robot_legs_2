var navigationControlState = function () {
  return [
    [
      moveControl(),
      clickControl(),
      scrollControl(),
      zoomControl(),
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
