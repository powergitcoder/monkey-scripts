// ==UserScript==
// @name         olevod ads remover
// @namespace    http://tampermonkey.net/
// @version      v1.0.0
// @description  remove unusefull ads from oledvod website
// @author       Power Ricky
// @require      https://code.jquery.com/jquery-3.7.1.min.js#sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=
// @match        https://www.olevod.tv/player/vod/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=olevod.tv
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	var debug = false;
    setInterval(function(){

        var adSidebar = document.querySelector("#pane-first > div.tab-live");
        if(adSidebar != null){
            if(debug) console.log("remove ad sidebar");
            adSidebar.remove();
        } else {
            if(debug) console.log("found no ad sidebar");
        }

    }, 500);

})();
