
// on.js

window.onresize = function(ev) {

  Container.resize();
}

H.onDocumentReady(function() {

  H.hide('.navigation-context');
  H.unhide('#four-corners');

  Container.init();
});

