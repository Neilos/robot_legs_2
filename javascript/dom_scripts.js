
var content = $('body')[0]
var container = $('html')[0]
var clientWidth = 0
var clientHeight = 0
var contentWidth = content.clientWidth
var contentHeight = content.clientHeight

////////////////////////////////////

var render = function(left, top, zoom) {
  content.style.marginLeft = left ? (-left/zoom) + 'px' : '';
  content.style.marginTop = top ? (-top/zoom) + 'px' : '';
  content.style.zoom = zoom || '';
};

var scroller = new Scroller(render, {
  zooming: true,
  animating: true,
  animationDuration: 2 * 300,
  maxZoom: 5
});

var rect = content.getBoundingClientRect();
scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);

// Reflow handling
var reflow = function() {
  clientWidth = container.clientWidth;
  clientHeight = container.clientHeight;
  scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);
};

window.addEventListener("resize", reflow, false);
reflow();

//////////////////////////////////
var zoomDelta = 0.1
var animateZoom = true
var cursorPosition = { x: -1000, y: -1000 }

var userZoomLevel = 1
var newZoomLevel = userZoomLevel

var newZoomLevel, userZoomLevel
// how to zoom
newZoomLevel = newZoomLevel + zoomDelta
if (newZoomLevel > scroller.options.maxZoom) {
  cancelSelection()
} else {
  scroller.zoomTo(newZoomLevel, animateZoom, cursorPosition.x, cursorPosition.y);
}

// reset zoom
newZoomLevel = userZoomLevel
scroller.zoomTo(userZoomLevel, animateZoom, cursorPosition.x, cursorPosition.y);
///////////////////////////////////

function prepareKeyboard () {
  $('text, textarea, input:not(:file):not(:radio):not(:submit):not(:hidden):not(:button):not(:checkbox):not(:image)').keyboard({
    // set this to ISO 639-1 language code to override language set by the layout
    // http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // language defaults to "en" if not found
    language: ['en'], // string or array

    // *** choose layout ***
    layout: 'qwerty',
    customLayout: { 'normal': ['{cancel}'] },

    position : {
      of : $('body'), // null (attach to input/textarea) or a jQuery object (attach elsewhere)
      my : 'left top',
      at : 'left top',
      collision: 'fit fit'
    },

    reposition: true, // allow jQuery position utility to reposition the keyboard on window resize
    usePreview: true, // preview added above keyboard if true, original input/textarea used if false
    alwaysOpen: false, // if true, the keyboard will always be visible
    initialFocus: true, // give the preview initial focus when the keyboard becomes visible
    stayOpen: true, // if true, keyboard will remain open even if the input loses focus.
    openOn: 'click', // Event (namespaced) on the input to reveal the keyboard. To disable it, just set it to ''.
    keyBinding: 'click', // When the character is added to the input
  })
}

function triggerSelectionOf (element) {
  try {
    var element = document.elementFromPoint(point.x, point.y)
    $(element).trigger('eye-targeting', [ point.x, point.y ])
    $(element)[0].click()
  } catch (error) {
    console.log(error, 'Target element that could not be clicked is: ', element)
  }
  finally {
    cancelSelection()
  }
}
