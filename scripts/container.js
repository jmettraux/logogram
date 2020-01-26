
// container.js

var Container = (function() {

  "use strict";

  var self = this;

  // protected functions

  var resize = function() {

    var w = H.dim('#container').width;
    w = w / ([ 0, 180 ].includes(window.orientation) ? 8 : 16);

    document.documentElement.style.setProperty('--box-w', '' + w + 'px');
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

