!function(n){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=n,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(i){var a=["parent","top","frames","location","self","window","document","customElements","history","locationbar","menubar","personalbar","scrollbars","statusbar","toolbar","navigator","origin","external","screen","innerWidth","innerHeight","visualViewport","outerWidth","outerHeight","devicePixelRatio","clientInformation","styleMedia","isSecureContext","performance","crypto","indexedDB","webkitStorageInfo","sessionStorage","localStorage","chrome","speechSynthesis","applicationCache","caches","prop","PERSISTENT"],c={};i.snappyOrigHash="pikachu";var u=function(e){return Object.getOwnPropertyNames(e)},f=function(e){return!["object","function"].includes(void 0===e?"undefined":r(e))||!e};i.countProps=function(e,t){e=e.replace(".","-"),c[e+"props"]=u(t)},i.takeSnap=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:i,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:[];"pikachu"===t.snappyOrigHash&&(n=[].concat(a,function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(n)));var r={};for(var o in t)n.includes(o)||(f(t[o])?r[o]=t[o]:"function"!=typeof t[o]&&i.takeSnap(e+"."+o,t[o],[]));i.countProps(e+".",t),u(r).length&&(c[e+"."]=r)},i.showAllSnaps=function(){return JSON.parse(JSON.stringify(c))},i.getSnap=function(e){return c[e]},i.restoreSnap=function(t){var a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:i;u(c).filter(function(e){return e.startsWith(t+".")}).forEach(function(n){var t=c[n],e=n.slice(0,n.length-1),r=a,o=u(t),i=e.split(".");(i=i.slice(1,i.length)).forEach(function(e){r=r[e]}),o.forEach(function(e){r[e]=t[e]}),u(r).forEach(function(e){var t="";t=n.includes(".")?n.replace(".","-"):n+"-",c[t+"props"].includes(e)||delete r[e]})})}}(void 0)}]);