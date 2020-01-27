
// on.js

//window.onresize = function(ev) {
//}

window.onhashchange = function(ev) {

  var u = new URL((ev && ev.newURL) || window.location.href);
  var hs = u.hash.split('/');

  var m = FourCorners;
  //if (hs[0] === 'xxx') m = xxx;

  H.hide('.container > .navigation-context');

  m.show(hs);
};

H.onDocumentReady(function() {

  H.hide('.navigation-context');
  H.unhide('#four-corners');

  FourCorners.init();

  onhashchange();
});

