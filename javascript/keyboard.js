var keyboard = (function () {
  $('text, textarea, input:not(:file):not(:radio):not(:submit):not(:hidden):not(:button):not(:checkbox):not(:image)').keyboard({
    // set this to ISO 639-1 language code to override language set by the layout
    // http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // language defaults to "en" if not found
    language: ['en'], // string or array

    // *** choose layout ***
    layout: 'qwerty',
    customLayout: { 'default': ['{cancel}','{prev}','{next}'] },

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
})()
