var active = true

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  if (active) {
    active = false
    chrome.browserAction.setIcon({
      "path": {
        "19": "images/inactive_icon_19.png",
        "38": "images/inactive_icon_38.png"
      }
    });
  } else {
    active = true
    chrome.browserAction.setIcon({
      "path": {
        "19": "images/active_icon_19.png",
        "38": "images/active_icon_38.png"
      }
    });

  }

  document.addEventListener('DOMContentLoaded', function () {
    console.log('coloring')
    document.body.style.backgroundColor = "red"
  });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message) {
    case "nextTab":
      nextTab()
      break;
    case "previousTab":
      previousTab()
      break;
  }
});

var nextTab = function () {
  // Getting a list of tabs of the current window.
  chrome.windows.getLastFocused(
    {populate: true}, // Without this, window.tabs is not populated.
    function (window) {
      var foundSelected = false;
      for (var i = 0; i < window.tabs.length; i++) {
        if (window.tabs[i].active) {
          foundSelected = true;
        } else if (foundSelected) {
         // Selecting the next tab.
         chrome.tabs.update(window.tabs[i].id, {active: true});
         return;
        }
      }
    }
  );
}


var previousTab = function () {
  // Getting a list of tabs of the current window.
  chrome.windows.getLastFocused(
    {populate: true}, // Without this, window.tabs is not populated.
    function (window) {
      var foundSelected = false;
      for (var i = window.tabs.length - 1; i > 0; i--) {
        if (window.tabs[i].active) {
          foundSelected = true;
        } else if (foundSelected) {
         // Selecting the next tab.
         chrome.tabs.update(window.tabs[i].id, {active: true});
         return;
        }
      }
    }
  );
}
