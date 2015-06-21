var zoomControlState = function () {
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
        selected: true,
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
        type: "zoom",
        text: "in",
        action: zoomInAction
      },
      { value: 1,
        type: "zoom",
        text: "out",
        action: zoomOutAction
      }
    ]
  }
};
