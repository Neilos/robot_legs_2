var navigationControlState = function () {
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
        selected: true,
        controlState: navigationControlState,
        action: { execute: function(){console.log("navigate") }}
      }
    ],

    subOptions: [
      { value: 1,
        type: "navigate",
        text: "back",
        action: { execute: function(){console.log("back") }}
      },
      { value: 1,
        type: "navigate",
        text: "forward",
        action: { execute: function(){console.log("forward") }}
      },
      { value: 1,
        type: "navigate",
        text: "home",
        action: { execute: function(){console.log("home") }}
      },
      { value: 1,
        type: "navigate",
        text: "refresh",
        action: { execute: function(){console.log("refresh") }}
      }
    ]
  }
};
