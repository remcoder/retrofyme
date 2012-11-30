var Utils = (function() {
  "use strict";

  String.prototype.format = function (o) {
    return this.replace(/\{([^{}]*)\}/g,
      function (a, b) {
        var r = o[b];
        return typeof r === "string" || typeof r === "number" ? r : a;
      }
    );
  };

  function rgbString(r,g,b) {
    return "rgb({r},{g},{b})".format({r:r,g:g,b:b});
  }
  
  function parseCssUrl(input) {
   // remove quotes and wrapping url()
   return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
  }

  return {
    parseCssUrl : parseCssUrl,
    rgbString : rgbString
  };

}());