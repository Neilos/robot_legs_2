var clickControlState = function () {
  return {
    options: [
      moveControl(),
      clickControl({selected: true}),
      scrollControl(),
      zoomControl(),
      navigateControl()
    ]
  }
}
