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

    reposition: false, // allow jQuery position utility to reposition the keyboard on window resize
    usePreview: false, // preview added above keyboard if true, original input/textarea used if false
    alwaysOpen: false, // if true, the keyboard will always be visible
    initialFocus: true, // give the preview initial focus when the keyboard becomes visible
    stayOpen: true, // if true, keyboard will remain open even if the input loses focus.
    openOn: 'click', // Event (namespaced) on the input to reveal the keyboard. To disable it, just set it to ''.
    keyBinding: 'click', // When the character is added to the input
    autoAccept: 'true',
    visible: function(e, keyboard, el) {
        addNav(keyboard);
    },
    beforeClose: function(e, keyboard, el, accepted) {
        $('input.current').removeClass('current');
        $("body").css('padding-bottom', '0px');
    }
  })
})()

// Add next/previous buttons
var addNav = function(base) {
    base.$el.addClass('current');
    $("body").css('padding-bottom', '250px'); // keep Donate Now button in view
    var inputs = $('input'),
        numberOfInputs = inputs.length - 1,
        inputIndex = inputs.index(base.$el),
        topPadding = 50; // distance from top where the focused input is placed
    // make sure input is in view
    $(window).scrollTop(inputs.eq(inputIndex).offset().top - topPadding);

    // see if nav is already set up
    if (base.$keyboard.find('.ui-keyboard-nav').length) {
        return;
    }

    // add nav window & buttons
    base.$keyboard.append('<div class="ui-keyboard-nav"><button class="prev ui-state-default ui-corner-all">prev</button><button class="next ui-state-default ui-corner-all">next</button></div>');

    base.$keyboard.find('.next').click(function(e) {
      var n = inputIndex + 1;
      if (n >= numberOfInputs) {
        return;
      }
      base.close(true); // true = auto accept
      // set focus to next input
      inputs.eq(n).click();
      // make sure input is in view
      $(window).scrollTop(inputs.eq(n).offset().top - topPadding);
      $(this).click()
    });

    base.$keyboard.find('.prev').click(function(e) {
      var n = inputIndex - 1;
      if (n < 0) {
        return;
      }
      base.close(true); // true = auto accept
      // set focus to previous input
      inputs.eq(n).click();
      // make sure input is in view
      $(window).scrollTop(inputs.eq(n).offset().top - topPadding);
    });

}


