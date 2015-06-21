var zoomControlState = function () {
  return {
    options: [
      moveControl(),
      clickControl(),
      scrollControl(),
      zoomControl({selected: true}),
      navigateControl()
    ],

    subOptions: [
      zoomInControl(),
      zoomOutControl()
    ]
  }
}
