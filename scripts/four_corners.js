
// fourcorners.js

var FourCorners = (function() {

  "use strict";

  //var self = this;

  var elt = null;

  var map = null;

  // protected functions

  var toCode = function(sel) {

    var t = H.text(elt, sel);
    return t === '' ? '-' : map[t];
  };

  var reshow = function() {

    var s =
      toCode('.box.nw') + toCode('.box.ne') +
      toCode('.box.sw') + toCode('.box.se') +
      '.' + toCode('.box.ese');

    window.location.hash = '#four-corners/' + s;
  };

  var cornerClick = function(ev) {

    H.removeClass(elt, '.corners .box', '.selected');

    Box.select(ev);
  };

  var nineClick = function(ev) {

    var n = Box.get(ev);
    var c = H.elt(elt, '.corners .selected');

    if ( ! c) return;

    c.textContent = n.textContent;

    reshow();
  };

  var kanjiClick = function(ev) {

    window.location.hash = '#kanji/' + Box.getText(ev);
  };

  // public functions

  this.show = function(hs) {

    H.unhide(elt);

    var list = H.elt(elt, '.list');
    H.remove(list, '.box');

    var code = hs[1] || '----.-';

    var e = H.elt(elt, '.box.nw'); var c = code[0];
    e.textContent = map[c]; H.setAtt(e, '-lg-i', c);
    e = H.elt(elt, '.box.ne'); c = code[1];
    e.textContent = map[c]; H.setAtt(e, '-lg-i', c);
    e = H.elt(elt, '.box.sw'); c = code[2];
    e.textContent = map[c]; H.setAtt(e, '-lg-i', c);
    e = H.elt(elt, '.box.se'); c = code[3];
    e.textContent = map[c]; H.setAtt(e, '-lg-i', c);
    e = H.elt(elt, '.box.ese'); c = code[5];
    e.textContent = map[c]; H.setAtt(e, '-lg-i', c);

    if (code === '----.-') return;

    var pat = '^' + code.replace('.', '\\.').replace(/-/g, '.') + '$';

    lgdata.kanji.forEach(function(k) {
      var fc = k.qcs && k.qcs.four_corner;
      if ( ! fc) return;
      if (fc.match(pat)) H.create(list, '.box.kanji', {}, k.lit);
    });

    H.on(list, '.box.kanji', 'click', kanjiClick);
  };

  this.init = function() {

    elt = H.elt('#four-corners');

    map = {};
    H.forEach(elt, '.nine', function(e) {
      var t = H.text(e);
      var i = H.getAtt(e, '-lg-i');
      map[t] = i;
      map[i] = t;
    });

    H.on(elt, '.corners .box', 'click', cornerClick);
    H.on(elt, '.nines .box', 'click', nineClick);
  };

  // done.

  return this;

}).apply({}); // end FourCorners

