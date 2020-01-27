
// fourcorners.js

var FourCorners = (function() {

  "use strict";

  //var self = this;

  var elt = null;

  // protected functions

  var lookup = function() {

    H.remove(elt, '.list .box');

    var pat = H.text(elt, '.display');

    if (pat === '----.-') return;

    pat = '^' + pat.replace('.', '\\.').replace(/-/g, '.') + '$';

    var list = H.elt(elt, '.list');

    lgdata.kanji.forEach(function(k) {
      var fc = k.qcs && k.qcs.four_corner;
      if ( ! fc) return;
      if (fc.match(pat)) H.create(list, '.box', {}, k.lit);
    });
  };

  var compute = function() {

    var s =
      (H.getAtt(elt, '.box.nw', '-lg-i') || '-') +
      (H.getAtt(elt, '.box.ne', '-lg-i') || '-') +
      (H.getAtt(elt, '.box.sw', '-lg-i') || '-') +
      (H.getAtt(elt, '.box.se', '-lg-i') || '-') +
      '.' +
      (H.getAtt(elt, '.box.ese', '-lg-i') || '-');

    H.setText(elt, '.display', s);

    lookup();
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
    H.setAtt(c, '-lg-i', H.getAtt(n, '-lg-i'));

    compute();
  };

  // public functions

  this.init = function() {

    elt = H.elt('#four-corners');

    H.on(elt, '.corners .box', 'click', cornerClick);
    H.on(elt, '.nines .box', 'click', nineClick);

    compute();
  };

  // done.

  return this;

}).apply({}); // end FourCorners

