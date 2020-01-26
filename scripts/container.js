
// container.js

var Container = (function() {

  "use strict";

  //var self = this;

  // protected functions

  //var computeOrientation = function() {
  //  var o = window.orientation;
  //  return (o === 0 || o === 180) ? 'portrait' : 'landscape';
  //};

  var find = function(list, fun) {

    for (var i = 0, l = list.length; i < l; i++) {
      var e = list[i]; if (fun(e, i)) return e;
    }
    return null;
  };

  var sheet = find(
    document.styleSheets,
    function(s) { return s.href && s.href.match(/\/site.css/); });

  var resize = function() {

    //var sheet = document.styleSheets
    //  .find(function(s) { return s.href && s.href.match(/\/site.css/); });
//clog(sheet);

//clog(window.orientation);
    //var w = window.innerWidth;
    var w = H.dim('#container').width;
clog(w);

    if ([ 0, 180 ].includes(window.orientation)) { // portrait
      w = w / 8;
    }
    else { // landscape
      w = w / 16;
    }
    var h = w * 1.4;
clog(w, h);
    if (sheet.cssRules[0].selectorText === '.box') sheet.deleteRule(0);
    sheet.insertRule('.box { width: ' + w + 'px; height: ' + h + 'px; }', 0);
  };

  // public functions

  this.resize = function() {

    resize();
  };

  this.init = function() {

    self.resize();
  };

  // done.

  return this;

}).apply({}); // end Container

