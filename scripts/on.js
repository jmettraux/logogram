
// on.js

//window.onresize = function(ev) {
//}

H.onDocumentReady(function() {

  H.hide('.navigation-context');
  H.unhide('#four-corners');

  FourCorners.init();
});

