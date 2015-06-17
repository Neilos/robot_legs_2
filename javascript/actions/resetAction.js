var resetAction = {
  execute: function () {
    d3.select("html").on("mousemove", null)

    d3.selectAll(".action").on("mouseenter", function () {
      update(controlDataBase())
    })

    d3.selectAll(".action").on("mouseleave", function () {
      update(controlDataEmpty())
    })
  }
}
