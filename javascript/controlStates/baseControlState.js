var baseControlState = function () {
  return {
    options: [
      moveControl(),
      clickControl(),
      scrollControl(),
      zoomControl(),
      navigateControl()
    ]
  }
}
