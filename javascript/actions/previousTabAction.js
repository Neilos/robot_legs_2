var previousTabAction = (function () {

  var execute = function () {
    chrome.runtime.sendMessage("previousTab")
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
