/*globals jQuery,Zepto */

;(function() {

    window.zepQuery = window.jQuery || window.Zepto;
    var $ = window.zepQuery;

    // Zepto doesn't have outerHeight
    $.fn.outerHeight = $.fn.outerHeight || $.fn.height;
}());
