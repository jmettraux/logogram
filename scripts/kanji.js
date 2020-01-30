
// kanji.js

var Kanji = (function() {

  "use strict";

  var self = this;

  var elt = null;

  // protected functions

  var findKanji = function(lit) {

    return window.lgdata.kanji.find(function(k) { return k.lit === lit; });
  };

  var clean = function() {

clog(elt);
    H.clean(elt, '.onyomi');
    H.clean(elt, '.kunyomi');
  };

  // public functions

  this.show = function(hs) {

    clean();

//clog('kanji', hs);
    var lit = decodeURI(hs[1]);
    var k = findKanji(lit);
clog(k);

    H.unhide(elt);
    H.setText(elt, '.kanji', lit);

    if ( ! k) return;

    var one = H.elt(elt, '.onyomi');
    var kune = H.elt(elt, '.kunyomi');
    (k.rds.ja_on || []).forEach(
      function(r) { H.create(one, '.reading', {}, r); });
    (k.rds.ja_kun || []).forEach(
      function(r) { H.create(kune, '.reading', {}, r); });
  };

  this.init = function() {

    elt = H.elt('#kanji');
  };

  // done.

  return this;

}).apply({}); // end Kanji

