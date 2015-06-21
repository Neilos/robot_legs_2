var moveControlState = function () {
  return {
    options: [
      moveControl({selected: true}),
      clickControl(),
      scrollControl(),
      zoomControl(),
      navigateControl()
    ]
  }
}
