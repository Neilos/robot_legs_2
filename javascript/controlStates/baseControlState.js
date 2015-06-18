var controlDataBase = function () {
  return {
    options: [
      { value: 1,
        type: "move",
        text: "move",
        commands: [],
        action: moveAction },
      { value: 1,
        type: "click",
        text: "click",
        commands: [],
        action: clickAction },
      { value: 1,
        type: "scroll",
        text: "scroll",
        commands: [
          { value: 1,
            type: "scroll",
            text: "up",
            action: scrollUpAction },
          { value: 1,
            type: "scroll",
            text: "down",
            action: scrollDownAction },
          { value: 1,
            type: "scroll",
            text: "left",
            action: scrollLeftAction },
          { value: 1,
            type: "scroll",
            text: "right",
            action: scrollRightAction }
        ],
        action: { execute: function(){console.log("scroll")}  }},
      { value: 1,
        type: "zoom",
        text: "zoom",
        commands: [
          { value: 1,
            type: "zoom",
            text: "in",
            action: zoomInAction },
          { value: 1,
            type: "zoom",
            text: "out",
            action: zoomOutAction }
        ],
        action: { execute: function(){
          console.log("zoom")
        }}
      },
      { value: 1,
        type: "navigate",
        text: "navigate",
        commands: [
          { value: 1,
            type: "navigate",
            text: "back",
            action: { execute: function(){console.log("back")}  }},
          { value: 1,
            type: "navigate",
            text: "forward",
            action: { execute: function(){console.log("forward")}  }},
          { value: 1,
            type: "navigate",
            text: "home",
            action: { execute: function(){console.log("home")}  }},
          { value: 1,
            type: "navigate",
            text: "refresh",
            action: { execute: function(){console.log("refresh")} } }
        ],
        action: { execute: function(){console.log("navigate")} } }
    ]
  }
};
