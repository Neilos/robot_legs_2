var previousTabAction = (function () {

  var execute = function () {
    chrome.runtime.sendMessage("previousTab")
    document.getElementById('robot-legs-confirm').play();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()
