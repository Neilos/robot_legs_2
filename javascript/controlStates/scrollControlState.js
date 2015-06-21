var scrollControlState = function () {
  return {
    options: [
      moveControl(),
      clickControl(),
      scrollControl({selected: true}),
      zoomControl(),
      navigateControl()
    ],

    subOptions: [
      scrollUpControl(),
      scrollDownControl(),
      scrollLeftControl(),
      scrollRightControl()
    ]
  }
}
