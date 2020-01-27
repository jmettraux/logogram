
// on.js

//window.onresize = function(ev) {
//}

window.onhashchange = function(ev) {

  H.hide('.module');

  var u = new URL((ev && ev.newURL) || window.location.href);
  var hs = u.hash.split('/');

  var m = FourCorners;
  if (hs[0] === '#kanji') m = Kanji;

  m.show(hs);
};

H.onDocumentReady(function() {

  Kanji.init();
  FourCorners.init();

  onhashchange();
});

