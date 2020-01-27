
// box.js

var Box = (function() {

  "use strict";

  var self = this;

  // protected functions

  // public functions

  this.get = function(ev_or_elt) {

    return H.elt(
      ev_or_elt.target ? ev_or_elt.target : ev_or_elt,
      '^.box');
  };

  this.select = function(ev_or_elt) {

    var e = self.get(ev_or_elt);

    if (H.hasClass(e, '.blank')) return null;

    H.addClass(e, '.selected');
    return e;
  };

  // done.

  return this;

}).apply({}); // end Box

