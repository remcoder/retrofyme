/*global zepQuery,dat,_, Retrofy */

(function ($) {
  "use strict";

  function Dashboard(context, render) {

    render = render || function() {};

    var $dashboard, $button, $controls,
      debug = false,
      showOverlay = false;

    var colorControllers = [];

    var gui = new dat.GUI({ autoPlace: false });

    function slideDown() {
      $dashboard.css({
        top : -$dashboard.outerHeight() - $button.outerHeight()
      });

      $dashboard.animate({
        top : -$dashboard.outerHeight()
      },
      {
        duration: 400
        //easing: "ease-out"
      });
    }

    function toggleDashboard() {
      debug=!debug;
      $dashboard.animate({
        top : debug ? 0 : -$dashboard.outerHeight()
      },
      {
        duration : 200
      });
    }

    //console.log(colorsAndWeights);

    function createColorController(key) {
      var controller = gui.add(context.weights, key , 0, 3);
      controller.onChange(_.throttle(render, 200));

      return controller;
    }

    // init

    // inject css
    var css = "#dashboard {  position: fixed;  background-color: rgba(0,0,0,1);  color: lime;  left:0;  font-family: 'PT Mono', sans-serif;  font-size: 14px;  padding: 20px;  border-radius: 10px;}.dashboard-panel, .dashboard-widget {  margin-right: 15px;  display: inline-block;  vertical-align: top;}#controls {  display: inline-block;  vertical-align: top;}#dashboard .close-button {   display: none;}.dg.main {  font-size: 13px;}button.dashboard-button {  display: inline-block;  font-size: 16px;  border:0;  background-color: black;  color: #eee;  border-radius: 5px 5px 5px 5px;  padding: 10px;  font-family: c64;}button:hover {  text-shadow: #8f8 0px 0px 5px;}.bottom-panel {  position: absolute;  bottom: -40px;}";
    $("head").append($("<style>").text(css));

    // inject html
    $dashboard = $('<div id="dashboard" class="hidden"><div class="widgets"><div id="controls" class="dashboard-widget"></div><div id="status" class="dashboard-widget"></div></div><div class="bottom-panel"><button class="dashboard-button retro" data-role="dashboard-open">retrofy</button></div></div>');
    $("body").append($dashboard);

    $button = $dashboard.find("[data-role~='dashboard-open']");
    $controls = $("#controls");

    //gui.remember(Settings);
    $controls.append( gui.domElement );

    $(document).keydown(function(e) {
      if ( e.which == 27 ) toggleDashboard();
      if ( e.which == 79 ) showOverlay = !showOverlay;
    });

    $button.click(toggleDashboard);

    function resetColorSettings() {
      _.each(colorControllers, function(contr) {
        gui.remove(contr);
      });

      colorControllers = [];

      _.each(context.palette, function(color, key) {
        context.weights[key] = 1;
      });

      for (var key in context.palette) {
        var c = createColorController( key );
        colorControllers.push(c);
      }
    }

    var paletteController = gui.add({ palette: null }, "palette" , ["C64", "NES", "ZXSpectrum"] );
    paletteController.onChange(function(value) {
      context.palette = Retrofy.Colors[value];

      resetColorSettings();

      render();
    });

    var threshholdController = gui.add(context, "threshold" , 0, 88);
    threshholdController.onChange(_.throttle(render, 200));

    resetColorSettings();
    $dashboard.show();
    slideDown();

    return {
      slideDown : slideDown,
      toggleDashboard : toggleDashboard
    };
  }

  Retrofy.Dashboard = Dashboard;

}(zepQuery));
