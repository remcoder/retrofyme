/*global zepQuery,Retrofy,Context */

(function($) {
  "use strict";

  var dashboard;
  var retrofy;
  var defaults = {}, settings = {};
  var context = new Context();

  $.fn.retrofy = function(options) {

    settings = $.extend(settings, defaults, options);
    $.fn.retrofy.defaults = defaults;
    $.fn.retrofy.settings = settings;

    if (!settings.palette)
      throw new Error("parameter 'palette' missing");

    retrofy = retrofy || new Retrofy(context);

    if (settings.dashboard === true) {
      dashboard = dashboard || new Retrofy.Dashboard(context, function() {
        this.each(function() { retrofy.retrofy(this); });
      }.bind(this));
    }

    return this.each(function() { retrofy.retrofy(this); });

  };

}(zepQuery));
