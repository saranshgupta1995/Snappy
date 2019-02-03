"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (globalScope) {

    var BASE_GLOBALS = ["parent", "top", "frames", "location", "self", "window", "document", "customElements", "history", "locationbar", "menubar", "personalbar", "scrollbars", "statusbar", "toolbar", "navigator", "origin", "external", "screen", "innerWidth", "innerHeight", "visualViewport", "outerWidth", "outerHeight", "devicePixelRatio", "clientInformation", "styleMedia", "isSecureContext", "performance", "crypto", "indexedDB", "webkitStorageInfo", "sessionStorage", "localStorage", "chrome", "speechSynthesis", "applicationCache", "caches", "prop", "PERSISTENT"];
    var snaps = {};

    globalScope.snappyOrigHash = 'pikachu';

    var allPropertiesOf = function allPropertiesOf(val) {
        return Object.getOwnPropertyNames(val);
    };

    var isNM = function isNM(val) {
        return !['object', 'function'].includes(typeof val === "undefined" ? "undefined" : _typeof(val)) || !val;
    };

    var isObjectNM = function isObjectNM(val) {
        var props = allPropertiesOf(val);
        var res = true;
        props.forEach(function (prop) {
            if (!BASE_GLOBALS.includes(prop)) if (val[prop] && !isNM(val[prop])) {
                if (typeof val[prop] === 'function' || !isObjectNM(val[prop])) {
                    res = false;
                }
            }
        });
        return res;
    };

    globalScope.countProps = function (hash, newScope) {
        hash = hash.replace('.', '-');
        snaps[hash + "props"] = allPropertiesOf(newScope);
    };

    globalScope.takeSnap = function (hashKey) {
        var newScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalScope;
        var skipSnapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


        if (newScope.snappyOrigHash === 'pikachu') {
            skipSnapping = [].concat(BASE_GLOBALS, _toConsumableArray(skipSnapping));
        }
        var keyValues = {};
        for (var prop in newScope) {
            if (!skipSnapping.includes(prop)) if (isNM(newScope[prop])) {
                keyValues[prop] = newScope[prop];
            } else if (typeof newScope[prop] !== 'function') {
                globalScope.takeSnap(hashKey + "." + prop, newScope[prop], []);
            } else {}
        }
        globalScope.countProps(hashKey + '.', newScope);
        if (allPropertiesOf(keyValues).length) {
            snaps[hashKey + '.'] = keyValues;
        }
    };

    globalScope.showAllSnaps = function () {
        return JSON.parse(JSON.stringify(snaps));
    };

    globalScope.getSnap = function (hashKey) {
        return snaps[hashKey];
    };

    globalScope.restoreSnap = function (hashKey) {
        var newScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalScope;


        var allHashes = allPropertiesOf(snaps).filter(function (x) {
            return x.startsWith(hashKey + ".");
        });
        allHashes.forEach(function (hash) {
            var currentSnapSet = snaps[hash];
            var cleanHash = hash.slice(0, hash.length - 1);
            var projectedScope = newScope;
            var allSnaps = allPropertiesOf(currentSnapSet);
            var cleanHashArray = cleanHash.split('.');
            cleanHashArray = cleanHashArray.slice(1, cleanHashArray.length);
            cleanHashArray.forEach(function (propLevel) {
                projectedScope = projectedScope[propLevel];
            });
            allSnaps.forEach(function (snap) {
                projectedScope[snap] = currentSnapSet[snap];
            });
            var allProps = allPropertiesOf(projectedScope);
            allProps.forEach(function (prop) {
                var propHash = '';
                if (hash.includes('.')) propHash = hash.replace('.', '-');else propHash = hash + '-';
                if (!snaps[propHash + "props"].includes(prop)) {
                    delete projectedScope[prop];
                }
            });
        });
    };
})(undefined);