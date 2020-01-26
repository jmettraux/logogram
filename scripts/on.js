
// on.js

window.onresize = function(ev) {

  Grid.resize();
}

H.onDocumentReady(function() {

  Grid.init();
});

