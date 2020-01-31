
// kanji.js

var Kanji = (function() {

  "use strict";

  var self = this;

  var elt = null;

  // protected functions

  var onToKana = function() {

    H.forEach(elt, '.onyomi .reading', function(e) {
      var t = H.text(e);
      e.textContent =
        wanakana.isKatakana(t) ?
        wanakana.toHiragana(t) :
        wanakana.toKatakana(t);
    });
  };

  var findKanji = function(lit) {

clog(window.lgdata.kanji);
    return window.lgdata.kanji.items.find(function(k) { return k.lit === lit; });
  };

  var clean = function() {

    H.clean(elt, '.onyomi');
    H.clean(elt, '.kunyomi');
    H.clean(elt, '.info');
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

    var infoe = H.elt(elt, '.info');
      //
    var m = function(k, v) {
      var e = H.create(infoe, '.entry', {}, '');
      H.create(e, '.key', {}, '' + k);
      H.create(e, '.value', {}, '' + v);
      return e;
    };
      //
    m('grade', k.grd);
    m('jlpt', k.jlpt);
    m('freq', k.frq || '>2500');
  };

  this.init = function() {

    elt = H.elt('#kanji');

    H.on(elt, '.onyomi', 'click', onToKana);
  };

  // done.

  return this;

}).apply({}); // end Kanji

