/*global zepQuery,Retrofy */

(function($) {
  "use strict";

  var dashboard;
  var retrofy;
  var defaults = {}, settings = {};

  $.fn.retrofy = function(options) {

    settings = $.extend(settings, defaults, options);
    $.fn.retrofy.defaults = defaults;
    $.fn.retrofy.settings = settings;

    if (!settings.palette)
      throw new Error("parameter 'palette' missing");

    retrofy = retrofy || new Retrofy(options.palette);

    if (settings.dashboard === true)
      dashboard = dashboard || new Retrofy.Dashboard(this, retrofy);

    return this.each(function() { retrofy.retrofy(this); });

  };

}(zepQuery));
