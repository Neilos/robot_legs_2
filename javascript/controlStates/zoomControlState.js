var zoomControlState = function () {
  return [
    [
      mouseControl({selected: true}),
      navigateControl()
    ],

    [
      moveControl(),
      clickControl(),
      scrollControl(),
      zoomControl({selected: true}),
    ],

    [
      zoomInControl(),
      zoomOutControl()
    ]
  ]
}
