var moveControlState = function () {
  return [
    [
      moveControl({selected: true}),
      clickControl(),
      scrollControl(),
      zoomControl(),
      navigateControl()
    ]
  ]
}
