/*globals Retrofy */

(function() {
  "use strict";

  Retrofy.Colors.C64 = {
    "0": {
        "name": "Black",
        "rgb": [0, 0, 0]
    },
    "1": {
        "name": "White",
        "rgb": [255, 255, 255]
    },
    "2": {
        "name": "Red",
        "rgb": [224, 64, 64]
    },
    "3": {
        "name": "Cyan",
        "rgb": [96, 255, 255]
    },
    "4": {
        "name": "Magenta",
        "rgb": [224, 96, 224]
    },
    "5": {
        "name": "Green",
        "rgb": [64, 224, 64]
    },
    "6": {
        "name": "Blue",
        "rgb": [64, 64, 224]
    },
    "7": {
        "name": "Yellow",
        "rgb": [255, 255, 64]
    },
    "8": {
        "name": "Orange",
        "rgb": [224, 160, 64]
    },
    "9": {
        "name": "Brown",
        "rgb": [156, 116, 72]
    },
    "10": {
        "name": "Pink",
        "rgb": [250, 160, 160]
    },
    "11": {
        "name": "DarkGrey",
        "rgb": [84, 84, 84]
    },
    "12": {
        "name": "Grey",
        "rgb": [136, 136, 136]
    },
    "13": {
        "name": "LightGreen",
        "rgb": [160, 160, 160]
    },
    "14": {
        "name": "LightBlue",
        "rgb": [160, 160, 255]
    },
    "15": {
        "name": "LGrey",
        "rgb": [192, 192, 192]
    }
  };

}());

// // convert to css
// for ( var k in Retrofy.Colors.C64 ) {
//   var color = Retrofy.Colors.C64[k];
//   console.log("."+color.name+" { color: rgb(" + color.rgb[0] +"," + color.rgb[1] + "," + color.rgb[2] + "); }");
//  }
