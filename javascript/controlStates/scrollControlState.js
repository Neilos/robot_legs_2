var scrollControlState = function () {
  return [
    [
      moveControl(),
      clickControl(),
      scrollControl({selected: true}),
      zoomControl(),
      navigateControl()
    ],

    [
      scrollUpControl(),
      scrollDownControl(),
      scrollLeftControl(),
      scrollRightControl()
    ]
  ]
}
