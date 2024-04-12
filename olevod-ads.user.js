// ==UserScript==
// @name         olevod ads remover
// @namespace    http://tampermonkey.net/
// @version      v1.0.0
// @description  remove unusefull ads from oledvod website
// @author       Power Ricky
// @require      https://code.jquery.com/jquery-3.7.1.min.js#sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @match        https://www.olevod.tv/player/vod/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=olevod.tv
// @grant        none
// ==/UserScript==

function removeAds(jNode) {
    $("#pane-first > div.tab-live").remove();
}

(function() {
    'use strict';
    waitForKeyElements("#pane-first > div.tab-live", removeAds, true);
})();
