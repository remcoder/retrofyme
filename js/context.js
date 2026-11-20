/*globals Retrofy,_,$ */
var Context = function() {
    "use strict";

    // defaults
    var palette = Retrofy.Colors.C64;
    var weights = {};
    _.each(palette, function(color, key) { weights[key] = 1; });

    return {
        elements : $(),
        palette : palette,
        weights : weights,
        threshold : 1
    };
};
