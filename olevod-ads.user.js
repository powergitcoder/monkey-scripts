// ==UserScript==
// @name         olevod ads remover
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  remove unusefull ads from oledvod website
// @author       Power Ricky
// @require      https://code.jquery.com/jquery-3.7.1.min.js#sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=
// @match        https://www.olevod.tv/player/vod/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=olevod.tv
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    let intervalID;
    intervalID = setInterval(function(){

        var debug = false;
        var rightSidebar = document.querySelector("div.pc-content > div.right");

        if(rightSidebar != null){
            GM_addStyle(`
                .pc-player-content>.right {
                    min-width: 0px;
                }
            `);
            clearInterval(intervalID);
            if (debug) console.log("interval cleared");
            $("div.search.pc-search").remove();
            $(".pc-sdier").remove();
            
        } else {
            if (debug) console.log("found no right sidebar");
        }

    }, 500);

})();
