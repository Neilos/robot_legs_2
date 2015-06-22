var baseControlState = function () {
  return [
    [
      moveControl(),
      clickControl(),
      scrollControl(),
      zoomControl(),
      navigateControl()
    ]
  ]
}
