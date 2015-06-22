var scrollControlState = function () {
  return [
    [
      mouseControl({selected: true}),
      navigateControl()
    ],

    [
      moveControl(),
      clickControl(),
      scrollControl({selected: true}),
      zoomControl(),
    ],

    [
      scrollUpControl(),
      scrollDownControl(),
      scrollLeftControl(),
      scrollRightControl()
    ]
  ]
}
