var clickControlState = function () {
  return [
    [
      moveControl(),
      clickControl({selected: true}),
      scrollControl(),
      zoomControl(),
      navigateControl()
    ]
  ]
}
