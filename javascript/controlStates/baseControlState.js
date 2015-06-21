var navigationControlState = {}
var scrollControlState = {}
var zoomControlState = {}
var clickControlState = {}
var moveControlState = {}

var baseControlState = function () {
  return {
    options: [
      { value: 1,
        type: "move",
        text: "move",
        selected: false,
        highlighted: false,
        controlState: moveControlState,
        commands: [],
        action: moveAction
      },
      { value: 1,
        type: "click",
        text: "click",
        selected: false,
        highlighted: false,
        controlState: clickControlState,
        commands: [],
        action: clickAction
      },
      { value: 1,
        type: "scroll",
        text: "scroll",
        selected: false,
        highlighted: false,
        controlState: scrollControlState,
        action: { execute: function(){console.log("scroll") }}
      },
      { value: 1,
        type: "zoom",
        text: "zoom",
        selected: false,
        highlighted: false,
        controlState: zoomControlState,
        action: { execute: function(){ console.log("zoom") }}
      },
      { value: 1,
        type: "navigate",
        text: "navigate",
        selected: false,
        highlighted: false,
        controlState: navigationControlState,
        action: { execute: function(){console.log("navigate") }}
      }
    ]
  }
};
