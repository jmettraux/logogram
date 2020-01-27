
// box.js

var Box = (function() {

  "use strict";

  //var self = this;

  // protected functions

  // public functions

  this.select = function(ev_or_elt) {

    var e = ev_or_elt.target ? ev_or_elt.target : ev_or_elt;
    e = H.elt(e, '^.box');

    if (H.hasClass(e, '.blank')) return null;

    H.addClass(e, '.selected');
    return e;
  };

  // done.

  return this;

}).apply({}); // end Box

