
// fourcorners.js

var FourCorners = (function() {

  "use strict";

  //var self = this;

  var elt = null;

  // protected functions

  var cornerClick = function(ev) {
    H.removeClass(elt, '.corners .box', '.selected');
    var b = Box.select(ev);
clog(b);
  };
  var nineClick = function(ev) {
  };

  // public functions

  this.init = function() {

    elt = H.elt('#four-corners');

    H.on(elt, '.corners .box', 'click', cornerClick);
    H.on(elt, '.nines .box', 'click', nineClick);
  };

  // done.

  return this;

}).apply({}); // end FourCorners

