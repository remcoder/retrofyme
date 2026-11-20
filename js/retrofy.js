/*global  document, zepQuery, _, console, RGBColor, Utils */
(function($) {
  "use strict";

  var Retrofy = function(context) {

    function retrofy(element) {
      var $element = $(element);
      //console.log(element.tagName);
      switch (element.tagName)
      {
        // skip these
        case "HTML":
        case "HEAD":
        case "STYLE":
        case "SCRIPT":
        case "TITLE":
        case "META":
        case "LINK":
          break;

        case "IMG":
          convertImage($element);
          break;

        default:
          convertGeneric($element);
          break;
      }
    }

    function convertGeneric($element) {
      convertColors($element);
      convertBackground($element);
      convertFont($element);
    }

    function convertColors(el) {
      var colorProps = ["color", "background-color", "border-color"];
      var $el = $(el);
      $.each(colorProps, function(i,propName) {
        var orgColor = $el.data("original-" + propName);
        var color = orgColor || $el.css(propName);
        if (!orgColor) $el.data("original-" + propName, color);

        if (!color | color == "rgba(0, 0, 0, 0)") return;
        var parsedColor = new RGBColor(color);
        // console.log(parsedColor);
        var rgb = convertColor(parsedColor.r, parsedColor.g, parsedColor.b).color.rgb;
        // console.log(rgb);
        var newColor = Utils.rgbString(rgb[0],rgb[1],rgb[2]);
        // console.log(el.tagName, propName,color, parsedColor, rgb, newColor);
        $el.css(propName, newColor);
      });
    }

    function convertFont($el) {
      $el.css("font-family", "'c64' !important");
    }

    function convertBackground($el) {
      var bgImage = $el.css("background-image");

      if (!bgImage) return;
      if (!bgImage.length) return;
      if (bgImage == "none") return;

      var orgSrc = $el.data("orginal-url");
      var src = orgSrc || Utils.parseCssUrl(bgImage);

      if (!orgSrc)
        $el.data("orginal-url", src);
      //console.log(bgImage, src);

      var img = new Image();

      // support cross-origin requested images that are served with a CORS header
      // http://www.whatwg.org/specs/web-apps/current-work/multipage/fetching-resources.html#potentially-cors-enabled-fetch
      img.crossOrigin = "anonymous";

      img.onload = function() {
        var src = convertImageToDataUrl(img);
        $el.css("background-image", "url(" + src + ")");
        img.onload = undefined;
      };
      img.src = src;
    }

    function tryConvertImage(el) {
      //console.log("be converted!" , el);

      try
      {
        return convertImage(el);
      }
      catch(ex)
      {
        console.warn(ex,"image not loaded yet, attaching load event");
        el.onload = function () {
          //console.log("converting second try");
          try
          {
            return convertImage(el);
          }
          catch(ex2)
          {
            console.error(ex2);
          }
        };
      }
    }

    // FIXME: for CORS support, add crossOrigin = 'anonymous'
    function convertImage($img) {
      var img = $img[0];

      if (img._converting)
        return;

      img._converting = true;

      img.onload = function() {
        img.onload = undefined;
        console.log("done");
        img._converting = false;
      };

      var orgUrl = $(img).data("orginal-url");
      if (orgUrl && orgUrl.length)
      {
        var temp = new Image();
        temp.crossOrigin = "anonymous";
        temp.onload = function() {
          //console.log("temp done");
          img.src = convertImageToDataUrl(temp);
        };
        temp.src = orgUrl;
      }
      else
      {
        $(img).data("orginal-url", img.src);
      }

      img.src = convertImageToDataUrl(img);
      img._converting = false;
    }

    function convertImageToDataUrl(img) {
      //console.log("convert to data url");
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      //console.log("creating temp canvas" ,w,h);
      ctx.drawImage(img, 0,0);
      var bmp = ctx.getImageData(0,0,canvas.width,canvas.height);

      convertImageData(bmp);

      ctx.putImageData(bmp,0,0);
      return canvas.toDataURL();
    }

    // time to beat: 282ms
    // time to beat: 145ms (2x)
    // time to beat: 73ms (-3.86x)
    // FIXME: try optimizing by reusing a color object to avoid memory allocation inside the loop
    // FIXME: try optimizing by reusing imagedata objects between successive calls.
    function convertImageData(imagedata, alpha) {
      var bmp = imagedata.data;
      // var matches = new Array(bmp.length/4);
      var blockSize  = 4;

      for (var y = 0 ; y < imagedata.height ; y+=blockSize )
      for (var x = 0 ; x < imagedata.width ; x+=blockSize )
      {
        // sample
        var sx = Math.min(x+Math.floor(blockSize/2), imagedata.width-1);
        var sy = Math.min(y+Math.floor(blockSize/2), imagedata.height-1);
        var i = (sy * imagedata.width + sx) * 4;
        var red = bmp[i];
        var green = bmp[i+1];
        var blue = bmp[i+2];
        var a = bmp[i+3] < 128 ? 0 : 255;

        var match = convertColor(red, green, blue);
        var color = match.color.rgb;

        for (var ty = 0 ; ty < blockSize ; ty++ )
        for (var tx = 0 ; tx < blockSize ; tx++ )
        {
          var ry = Math.min(y+ty, imagedata.height-1);
          var rx = Math.min(x+tx, imagedata.width-1);
          var k = ( ry*imagedata.width + rx ) * 4;
          bmp[k] = color[0];
          bmp[k+1] = color[1];
          bmp[k+2] = color[2];
          bmp[k+3] = a;
        }
      }
    }

    function convertColor(red,green,blue) {
      var c64_color = null;
      var min_error = Infinity;

      for (var c in context.palette)
      {
        var color = context.palette[c];
        var guess = color.rgb;
        var w = context.weights[c];
        //var abs = Math.sqr;
        var dr = red - guess[0];
        var dg = green - guess[1];
        var db = blue - guess[2];
        var error = dr*dr/w + dg*dg/w + db*db/w;

        if (error < min_error)
        {
          c64_color = color;
          min_error = error;
        }

        if (error < context.threshhold)
        {
          break;
        }
      }

      return { color: c64_color, error:min_error, earlyExit : c };
    }

    return {
      convertColor : convertColor,
      convertImageData: convertImageData,
      retrofy : retrofy
    };
  };

  // export
  window.Retrofy = Retrofy;
  Retrofy.Colors = {};

}(zepQuery));

