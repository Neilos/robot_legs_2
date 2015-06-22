var mouseControlState = function () {
  return [
    [
      mouseControl({selected: true}),
      navigateControl()
    ],

    [
      moveControl(),
      clickControl(),
      scrollControl(),
      zoomControl(),
    ],
  ]
}
