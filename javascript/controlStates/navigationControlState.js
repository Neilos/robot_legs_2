var navigationControlState = function () {
  return {
    options: [
      moveControl(),
      clickControl(),
      scrollControl(),
      zoomControl(),
      navigateControl({selected: true})
    ],

    subOptions: [
      navigateBackControl(),
      navigateForwardControl(),
      navigateHomeControl(),
      refreshPageControl()
    ]
  }
}
