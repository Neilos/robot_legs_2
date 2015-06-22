var nextTabAction = (function () {

  var execute = function () {
    chrome.runtime.sendMessage("nextTab")
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()


