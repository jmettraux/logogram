
// kanji.js

var Kanji = (function() {

  "use strict";

  var self = this;

  var elt = null;

  // protected functions

  // public functions

  this.show = function(hs) {

clog('kanji', hs);
    H.unhide(elt);
  };

  this.init = function() {

    elt = H.elt('#kanji');
  };

  // done.

  return this;

}).apply({}); // end Kanji

