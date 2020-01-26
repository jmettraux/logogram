/* h-1.2.0.min.js | MIT license: http://github.com/jmettraux/h.js/LICENSE.txt */var H=function(){var f=this;this.VERSION="1.2.0";this.toArray=function(b){return Array.prototype.slice.call(b)};var x=function(b){return b.replace(/\[-([-_a-zA-Z0-9]+)(=|\])/g,"[data-$1$2")},u=function(b,d,a){d=x(d);return a?b.querySelectorAll(d):b.querySelector(d)},y=function(b,d){d||(d=b,b=document);b||(b=document);"string"===typeof b&&(b=u(document,b));return[b,d]},h=function(b,d){var a=y(b,d),c=a[0];d=a[1];if("string"!==typeof d)return d;if(a=d.match(/^\^([^ ]+)(.*)$/))c=f.closest(c,a[1]),d=a[2].trim();
return c?d?u(c,d):c:null},p=function(b,d){var a=y(b,d),c=a[0];d=a[1];a=null;if("string"===typeof d){if(a=d.match(/^\^([^ ]+)(.*)$/))c=f.closest(c,a[1]),d=a[2].trim();a=0<d.length?u(c,d,!0):[c]}else a=[d];for(var c=[],e=0,g=a.length;e<g;e++)c.push(a[e]);return c};this.elt=function(b,d){return h(b,d)};this.elts=function(b,d){return p(b,d)};this.count=function(b,d){return p(b,d).length};this.forEach=function(b,d,a){"function"===typeof d&&(a=d,d=null);b=p(b,d);b.forEach(a);return b};this.map=function(b,
d,a){"function"===typeof d&&(a=d,d=null);return p(b,d).map(a)};this.tdim=function(b,d){var a=h(b,d);if(!a)return null;for(var c=0,e=0,g=a;g;)c+=g.offsetLeft,e+=g.offsetTop,g=g.offsetParent;return{top:e,bottom:e+a.offsetHeight,left:c,right:c+a.offsetWidth,height:a.offsetHeight,width:a.offsetWidth}};this.dim=function(b,d){var a=h(b,d);return a?{top:a.offsetTop,bottom:a.offsetTop+a.offsetHeight,left:a.offsetLeft,right:a.offsetLeft+a.offsetWidth,height:a.offsetHeight,width:a.offsetWidth}:null};this.bdim=
function(b,d){var a=h(b,d);if(!a)return null;var c=a.getBoundingClientRect(),e=f.elt("body").getBoundingClientRect();return{top:c.top-e.top,bottom:e.bottom-c.bottom,left:c.left-e.left,right:e.right-c.right,height:a.offsetHeight,width:a.offsetWidth}};this.path=function(b,d){var a=h(b,d);if(!a)return null;if(a.id)return"#"+a.id;var c=f.path(a.parentElement),e=a.nodeName.toLowerCase(),g=f.classArray(a),g=0<g.length?"."+g.join("."):"",k=a.getAttribute("name"),k=k?'[name="'+k+'"]':"";if(""!==g||""!==k)return c+
" > "+e+g+k;for(e=0;a;)1===a.nodeType&&e++,a=a.previousSibling;return c+" > :nth-child("+e+")"};var z=function(b,d,a,c,e){e||(e=c,c=a,a=d,d=document);c=Array.isArray(c)?c:[c];d=p(d,a);for(a=0;;a++){var g=d[a];if(!g)break;c.forEach(function(a){"on"===b?g.addEventListener(a,e):g.removeEventListener(a,e)})}};this.on=function(b,d,a,c){z("on",b,d,a,c)};this.off=function(b,d,a,c){z("off",b,d,a,c)};this.toNode=function(b,d){if("string"!==typeof b)return d?f.elt(b,d):b;var a=document.createElement("div");
a.innerHTML=b;a=a.children[0];return d?f.elt(a,d):a};var A=function(b,d,a){return function(c){"load"===b?console.log([d+" "+a,c]):console.log([d+" "+a+" connection problem",c])}},G=function(b){if("object"!==typeof b)return!1;for(var d in b)if("string"!==typeof b[d]||!d.match(/^[A-Z][A-Za-z0-9-]+$/))return!1;return!0};this.request=function(b,d,a,c,e){var g,k,f;if(5<=arguments.length)g=a,k=c,f=e;else if(4===arguments.length)G(a)?g=a:k=a,f=c;else if(3===arguments.length)f=a;else throw"not enough arguments for H.request";
"function"===typeof f&&(f={onok:f});g||(g={});var l=new XMLHttpRequest;l.open(b,d,!0);for(var h in g)l.setRequestHeader(h,g[h]);k&&(h=typeof k,g=g["Content-Type"]||"/json",k.constructor.toString().match(/FormData/)||(g.match(/\/json\b/)||"string"!==h?(l.setRequestHeader("Content-Type","application/json; charset=UTF-8"),k="string"===h?k:JSON.stringify(k)):k=k.toString()));l.onload=function(){var a={status:l.status,request:l,data:null};try{a.data=JSON.parse(l.responseText)}catch(c){}if(f.onok&&200===
l.status)f.onok(a);else(f.onload||A("load",b,d))(a)};l.onerror=f.onerror||A("error",b,d);l.send(k)};this.upload=function(b,d,a,c){c||(c=a,a={});var e=new FormData,g;for(g in a)e.append(g,a[g]);var k=Array.isArray(d),h=k?d:[d],l=0;h.forEach(function(a){for(var c=a.files,b=0,d=c.length;b<d;b++){l+=1;for(var g=c[b],d=null,f=0,h=a.attributes.length;f<h;f++){var t=a.attributes.item(f);if(t.name.match(/^data-(.*-)?lang$/)){d=t.value;break}}f="file-";if(d||k)f=f+a.name+"-";d&&(f=f+d+"-");f+=b;e.append(f,
g,g.name)}});if(1>l)return 0;var m=c.onok;c.onok=function(a){!1!==c.clear&&h.forEach(function(a){a.value=""});m(a)};f.request("POST",b,e,c);return l};this.matches=function(b,d,a){a||(a=d,d=b,b=null);b=h(b,d);if(b.matches)return b.matches(a);if(b.matchesSelector)return b.matchesSelector(a);if(b.msMatchesSelector)return b.msMatchesSelector(a);throw"H.js got fed something that doesn't respond to .matches() or .matchesSelector()";};this.closest=function(b,d,a){a||(a=d,d=b,b=null);b=h(b,d);a=x(a);return f.matches(b,
a)?b:b.parentElement?f.closest(b.parentElement,a):null};this.style=function(b,d){var a=h(b,d),c={},e=null;if(window.getComputedStyle){for(var e=window.getComputedStyle(a,null),a=0,g=e.length;a<g;a++){var f=e[a],t=f.replace(/-([a-za])/g,function(a,c){return c.toUpperCase()});c[t]=e.getPropertyValue(f)}return c}if(e=a.currentStyle){for(f in e)c[f]=e[f];return c}if(e=a.style)for(f in e)a=e[f],"function"!==typeof a&&(c[f]=a);return c};this.hasc=this.hasClass=function(b,d,a){a||(a=d,d=b,b=null);b=h(b,
d);"."===a[0]&&(a=a.substring(1));try{return b.classList?b.classList.contains(a):(new RegExp("\\b"+a+"\\b")).test(b.className)}catch(c){return!1}};this.isHidden=function(b,d){var a=f.toArray(arguments);a.push(".hidden");return f.hasClass.apply(null,a)};var v=function(b,d,a,c,e){f.forEach(b,d,function(b){var d=("function"===typeof a?a(b):a)?c:e;d&&d(b)})},B=function(b,d,a){"."===d[0]&&(d=d.substring(1));b.classList["r"===a?"remove":"add"](d)},r=function(b,d){var a=b[0],c=b[1],e=b[2],g=b[3];if(2>b.length)throw"at least 2 arguments required";
return 2===b.length?{sta:a,sel:null,nam:c,las:d}:3<b.length?{sta:a,sel:c,nam:e,las:g}:"string"===typeof e&&e.match(/^\.?[^ ]+$/)?{sta:a,sel:c,nam:e,las:d}:{sta:a,sel:null,nam:c,las:e}},m=function(b,d,a,c,e){var g=function(b){B(b,a,"a")},f=function(b){B(b,a,"r")},h=g,l=f;"ra"===e?(h=f,l=g):"a"===e?l=null:"r"===e&&(h=f,l=null);v(b,d,c,h,l)};this.addc=this.addClass=function(b,d,a,c){var e=r(arguments,!0);m(e.sta,e.sel,e.nam,e.las,"a")};this.remc=this.remClass=this.removeClass=function(b,d,a,c){var e=
r(arguments,!0);m(e.sta,e.sel,e.nam,e.las,"r")};this.togc=this.toggle=this.toggleClass=function(b,d,a){a||(a=d,d=b,b=null);m(b,d,a,function(b){return!f.hasClass(b,a)},"ar")};this.setc=this.setClass=function(b,d,a,c){var e=r(arguments,!0);m(e.sta,e.sel,e.nam,e.las,"ar")};this.renameClass=function(b,d,a,c){c||(c=a,a=d,d=b,b=null);v(b,d,function(b){return f.hasClass(b,a)},function(b){f.removeClass(b,a);f.addClass(b,c)},null)};this.classArray=function(b,d){for(var a=f.elt(b,d),c=a.classList||a.className.split(" "),
e=[],g=0,c=a.classList.length;g<c;g++)e.push(a.classList[g]);return e};var n=function(b,d){var a=b[0],c=b[1],e=b[2];if(1===b.length)return{sta:a,sel:null,las:d};if(2<b.length)return{sta:a,sel:c,las:e};if(2===b.length)return"string"===typeof c?{sta:a,sel:c,las:d}:{sta:a,sel:null,las:c};throw"called without arguments";},q=function(b,d){var a=n(b,d);a.elt=f.elt(a.sta,a.sel);a.elt&&(a.v="value"in a.elt?a.elt.value:void 0,a.v&&(a.v=a.v.trim()),a.t=a.elt.textContent.trim(),a.tov=C(a.v)?a.t:a.v);return a};
this.show=function(b,d,a){var c=n(arguments,!0);m(c.sta,c.sel,".shown",c.las,"ar")};this.unshow=function(b,d,a){var c=n(arguments,!0);m(c.sta,c.sel,".shown",c.las,"ra")};this.hide=function(b,d,a){var c=n(arguments,!0);m(c.sta,c.sel,".hidden",c.las,"ar")};this.unhide=function(b,d,a){var c=n(arguments,!0);m(c.sta,c.sel,".hidden",c.las,"ra")};var D=function(b,d,a,c){var e=function(a){a.removeAttribute("disabled")},g=function(a){a.setAttribute("disabled","disabled")};v(b,d,a,"e"===c?e:g,"e"===c?g:e)};
this.enable=function(b,d,a){var c=n(arguments,!0);D(c.sta,c.sel,c.las,"e")};this.disable=function(b,d,a){var c=n(arguments,!0);D(c.sta,c.sel,c.las,"d")};this.cenable=function(b,d,a){var c=n(arguments,!0);m(c.sta,c.sel,".disabled",c.las,"ra")};this.cdisable=function(b,d,a){var c=n(arguments,!0);m(c.sta,c.sel,".disabled",c.las,"ar")};this.isDisabled=function(b,d){var a=h(b,d);return"string"===typeof a.getAttribute("disabled")||f.hasClass(a,".disabled")};this.setAtt=function(b,d,a,c){4>arguments.length&&
(c=a,a=d,d=null);"-"===a.slice(0,1)&&(a="data"+a);p(b,d).forEach(null===c?function(b){b.removeAttribute(a)}:function(b){b.setAttribute(a,c)});return c};this.remAtt=function(b,d,a){var c=r(arguments,void 0);"-"===c.nam.slice(0,1)&&(c.nam="data"+c.nam);p(c.sta,c.sel).forEach(function(a){a.removeAttribute(c.nam)})};this.getAtt=function(b,d,a){var c=r(arguments,void 0),e=/(.*\[([-_a-zA-Z0-9]+)\].*)+/,g=c.sel&&c.sel.match(e),e=c.nam&&c.nam.match(e);!c.sel&&c.nam&&e?(c.sel=c.nam,c.nam=e[e.length-1]):g&&
(c.las=c.nam,c.nam=g[g.length-1]);g=f.elt(c.sta,c.sel);if(!g)return c.las;c.nam&&"-"===c.nam.substr(0,1)&&(c.nam="data"+c.nam);g=g.getAttribute(c.nam);return null===g?c.las:g};var E=[!1,null,void 0,NaN,""];this.getAtti=function(b,d,a){var c=f.getAtt.apply(null,arguments),c=parseInt(""+c,10);return-1<E.indexOf(c)?null:c};this.getAttf=function(b,d,a){var c=f.getAtt.apply(null,arguments),c=parseFloat(""+c);return-1<E.indexOf(c)?null:c};this.text=function(b,d){var a=q(arguments);if(!a.elt)throw"elt not found, no text";
var c=a.elt.textContent.trim();return""===c&&a.las?a.las:c};this.texti=function(b,d){var a=q(arguments);if(!a.elt)throw"elt not found, no text";var c=a.elt.textContent.trim();""===c&&(c=""+a.las);return parseInt(c,10)};this.textf=function(b,d){var a=q(arguments);if(!a.elt)throw"elt not found, no text";var c=a.elt.textContent.trim();""===c&&(c=""+a.las);return parseFloat(c)};this.get=function(b,d){var a=f.toArray(arguments),c=!0;"boolean"===typeof a[a.length-1]&&(c=a.pop());a=(a=(a=f.elt.apply(null,
a))?a.value:null)?a.trim():"";return!1===c&&0===a.length?null:a};var w=function(b){"string"===typeof b&&(b=b.toLowerCase());return!0===b||"true"===b||"yes"===b};this.isTrue=w;var C=function(b){return null===b||void 0===b};this.isVoid=C;this.getb=function(b,d){var a=f.toArray(arguments),c=null;"boolean"===typeof a[a.length-1]&&(c=a.pop());a=f.get.apply(null,a).toLowerCase();return null!==c&&""===a?c:w(a)};this.getf=function(b,d){var a=f.toArray(arguments),c=a[a.length-1],e=null;"number"===typeof c&&
(e=a.pop());null!==e&&a.push(!1);a=f.get.apply(null,a);if(null===a){if(!1===c)return a;if(e)return e;a="0.0"}return parseFloat(a)};this.geti=function(b,d){var a=f.toArray(arguments),c=a[a.length-1],e=null;"number"===typeof c&&(e=a.pop());null!==e&&a.push(!1);a=f.get.apply(null,a);if(null===a){if(!1===c)return a;a=e?""+e:"0"}return parseInt(a,10)};this.getj=function(b,d){var a=void 0,c=f.toArray(arguments),e=c[c.length-1];2<c.length?a=c[2]:1<c.length&&"string"!==typeof e&&(a=c.pop());c=f.get.apply(null,
c);try{return JSON.parse(c)}catch(g){return a}};this.set=function(b,d,a){var c=f.toArray(arguments),e=c.pop(),e=null===e||void 0===e?"":""+e;if(c=f.elt.apply(null,c))c.value=e;return e};this.setText=function(b,d,a){var c=f.toArray(arguments),e=c.pop();if(c=f.elt.apply(null,c))c.textContent=e;return e};this.tov=this.textOrValue=function(b,d){var a=q(arguments);if(!a.elt)throw"elt not found, no text or value";return""===a.tov&&"string"===typeof a.las?a.las:a.tov};this.tovb=function(b,d){var a=q(arguments);
if(a.elt)return w(a.tov||""+a.las);throw"elt not found, no text or value";};this.tovi=function(b,d){var a=q(arguments);if(a.elt)return parseInt(a.tov||""+a.las,10);throw"elt not found, no text or value";};this.tovf=function(b,d){var a=q(arguments);if(a.elt)return parseFloat(a.tov||""+a.las);throw"elt not found, no text or value";};this.capitalize=function(b){return b.charAt(0).toUpperCase()+b.slice(1)};this.decapitalize=function(b){return b.charAt(0).toLowerCase()+b.slice(1)};this.toCamelCase=function(b,
d){b=b.replace(/([_-][a-z])/g,function(a){return a.substring(1).toUpperCase()});return d?f.capitalize(b):b};this.prepend=function(b,d,a){a||(a=d,d=b,b=null);b=h(b,d);b.parentNode.insertBefore(a,b)};this.postpend=function(b,d,a){a||(a=d,d=b,b=null);b=h(b,d);b.parentNode.insertBefore(a,b.nextSibling)};this.remove=function(b,d,a){var c=n(arguments,!0);p(c.sta,c.sel).forEach(function(a){("function"===typeof c.las?c.las(a):c.las)&&a.parentElement.removeChild(a)})};this.clean=function(b,d,a){b=h(b,d);a&&
"."!==a[0]&&(a="."+a);if(a)f.forEach(b,a,function(a){a.parentElement.removeChild(a)});else for(;b.firstChild;)b.removeChild(b.firstChild);return b};this.onDocumentReady=function(b){"loading"!=document.readyState?b():document.addEventListener("DOMContentLoaded",b)};this.makeGrower=function(b){var d=function(a){var b=[];a.replace(/([#.][^#.]+)/g,function(a){b.push({k:a[0],n:a.substring(1,a.length)})});return b};return function(){for(var a=document.createElement(b),c=0,e=arguments.length;c<e;c++){var g=
arguments[c];if(!1===g)return null;if(null!==g){var f="string"===typeof g;if(!f||"."!==g[0]&&"#"!==g[0]||g.match(/^\s*$/))if(f)a.appendChild(document.createTextNode(g));else if(void 0!==g.nodeType&&void 0!==g.innerHTML)a.appendChild(g);else if("object"===typeof g)for(var h in g)a.setAttribute("-"===h.slice(0,1)?"data"+h:h,g[h]);else a.appendChild(document.createTextNode(""+g));else d(g).forEach(function(b){"#"===b.k?a.id=b.n:a.classList.add(b.n)})}}return a}};this.create=function(b){var d=null,a=
1;"object"===typeof b&&b.tagName&&(a=2,d=b,b=arguments[1]);var a=Array.prototype.slice.call(arguments,a),c=b.match(/^([a-zA-Z0-9]+)?([.#].+)$/);c&&(b=c[1]||"div",a.unshift(c[2]));a=f.makeGrower(b).apply(null,a);d&&d.appendChild(a);return a};var F="var "+"a abbr address area article aside audio b base bdi bdo blockquote br button canvas caption cite code col colgroup datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hr i iframe img input ins kbd keygen label legend li main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul video wbr".split(" ").map(function(b){return b+
'=H.makeGrower("'+b+'")'}).join(",")+";";this.grow=function(b){b=b.toString().trim();b=b.substring(b.indexOf("{")+1,b.lastIndexOf("}"));return eval(F+b)};this.makeTemplate=function(b){return eval("("+b.toString().replace(/\{/,"{"+F)+")")};this.delay=function(b,d){var a=null;return function(){var c=arguments;window.clearTimeout(a);a=window.setTimeout(function(){d.apply(this,c)},b)}};this.makeWorker=function(b,d){var a=b.toString(),c=d,a=(c=void 0===c||!!c)?"self.addEventListener('message', "+a+", false);":
a.substring(a.indexOf("{")+1,a.lastIndexOf("}")),e=document&&document.location&&document.location.href;if(e){var f=e.lastIndexOf("/");0>f&&(f=e.length-1);e=e.substring(0,f)+"/";a='var rootUrl = "'+e+'";'+a}a=new Blob([a]);c=new Worker(window.URL.createObjectURL(a));c.on=function(a,b){c.addEventListener(a,b,!1)};return c};return this}.apply({});
/* minified from commit 028b4eb on Wed Nov 13 14:39:05 JST 2019 */

// common.js

window.clog = console.log;


// container.js

var Container = (function() {

  "use strict";

  var self = this;

  // protected functions

  var resize = function() {

    var p = getComputedStyle(document.documentElement).getPropertyValue('--portrait-slots');
    var l = getComputedStyle(document.documentElement).getPropertyValue('--landscape-slots');

    var w = H.dim('#container').width;
    w = w / ([ 0, 180 ].includes(window.orientation) ? p : l);
clog([ p, l, w ]);

    document.documentElement.style.setProperty('--box-w', '' + w + 'px');
  };

  // public functions

  this.resize = function() {

    resize();
  };

  this.init = function() {

    self.resize();
  };

  // done.

  return this;

}).apply({}); // end Container


// on.js

window.onresize = function(ev) {

  Container.resize();
}

H.onDocumentReady(function() {

  H.hide('.navigation-context');
  H.unhide('#four-corners');

  Container.init();
});

