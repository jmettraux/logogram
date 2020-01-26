
// grid.js

var Area = {
};

var Grid = (function() {

  "use strict";

  var self = this;

  var boxWidth = 0;
  var boxHeight = 0;
  var borderWidth = 1; // px

  var orientation = 'portrait';

  var lgOrientation = 'euro';
  //var lgOrientation = 'asia';

  var areas = {};

  // protected functions

  var computeOrientation = function() {

    var o = window.orientation;
    return (o === 0 || o === 180) ? 'portrait' : 'landscape';
  };

  var reorganize = function() {
clog('reorganize');
  };

  var resize = function() {
clog('resize');
  };

  // public functions

  this.resize = function() {

    resize();

    var o = computeOrientation();
    if (o !== orientation) { orientation = o; reorganize(); }
  };

  this.init = function() {
    orientation = computeOrientation();
    self.resize();
  };

  // done.

  return this;

}).apply({}); // end Grid

