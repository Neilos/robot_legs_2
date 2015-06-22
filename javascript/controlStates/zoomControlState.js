var zoomControlState = function () {
  return [
    [
      moveControl(),
      clickControl(),
      scrollControl(),
      zoomControl({selected: true}),
      navigateControl()
    ],

    [
      zoomInControl(),
      zoomOutControl()
    ]
  ]
}
