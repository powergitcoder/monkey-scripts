// ==UserScript==
// @name         olevod ads remover
// @namespace    http://tampermonkey.net/
// @version      1.0.6
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

        var debug = true;
        var rightSidebar = document.querySelector("div.pc-content > div.right .img_bg");

        if (rightSidebar != null) {
            clearInterval(intervalID);

            for (var i = 0; i < 10; i++) {
                var tmp = $(".img_bg");
                if (tmp != null) {
                    tmp.remove();
                    if (debug) console.log("img_bg removed");
                }
            }

            GM_addStyle(`
                .pc-player-content>.right {
                    min-width: 260px;
                }
            `);

            $("div.search.pc-search").remove();
            $(".pc-sdier").remove();
            $(".el-image__inner").remove();
            if (debug) console.log("interval cleared");
        } else {
            if (debug) console.log("found no right sidebar");
        }

    }, 500);

})();
