var clickControlState = function () {
  return [
    [
      mouseControl({selected: true}),
      navigateControl()
    ],

    [
      moveControl(),
      clickControl({selected: true}),
      scrollControl(),
      zoomControl()
    ]
  ]
}