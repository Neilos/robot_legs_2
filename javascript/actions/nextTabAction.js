var nextTabAction = (function () {

  var execute = function () {
    chrome.runtime.sendMessage("nextTab")
    document.getElementById('robot-legs-confirm').play();
    actionController.resetEverything()
  }

  return {
    execute: execute
  }

})()


