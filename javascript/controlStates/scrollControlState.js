var scrollControlState = function () {
  return {
    options: [
      { value: 1,
        type: "move",
        text: "move",
        controlState: moveControlState,
        commands: [],
        action: moveAction
      },
      { value: 1,
        type: "click",
        text: "click",
        controlState: clickControlState,
        commands: [],
        action: clickAction
      },
      { value: 1,
        type: "scroll",
        text: "scroll",
        selected: true,
        controlState: scrollControlState,
        action: { execute: function(){console.log("scroll") }}
      },
      { value: 1,
        type: "zoom",
        text: "zoom",
        controlState: zoomControlState,
        action: { execute: function(){ console.log("zoom") }}
      },
      { value: 1,
        type: "navigate",
        text: "navigate",
        controlState: navigationControlState,
        action: { execute: function(){console.log("navigate") }}
      }
    ],

    subOptions: [
      { value: 1,
        type: "scroll",
        text: "up",
        action: scrollUpAction
      },
      { value: 1,
        type: "scroll",
        text: "down",
        action: scrollDownAction
      },
      { value: 1,
        type: "scroll",
        text: "left",
        action: scrollLeftAction
      },
      { value: 1,
        type: "scroll",
        text: "right",
        action: scrollRightAction
      }
    ]
  }
};
