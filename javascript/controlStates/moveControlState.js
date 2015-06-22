var moveControlState = function () {
  return [
    [
      mouseControl({selected: true}),
      navigateControl()
    ],

    [
      moveControl({selected: true}),
      clickControl(),
      scrollControl(),
      zoomControl()
    ]
  ]
}
