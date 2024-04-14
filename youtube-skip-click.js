// ==UserScript==
// @name         Youtube Ads Skip Clicker
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  try to take over the world!
// @author       Power Ricky
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	  var debug = false;
    setInterval(function(){

        var skipAdBtn = document.querySelector("div.ytp-ad-text.ytp-ad-skip-button-text");
        if(skipAdBtn != null){
            if(debug) console.log("clicking on skip ads");
            skipAdBtn.click();
        } else {
            if(debug) console.log("found no ads: skipAdBtn=" + skipAdBtn);
        }

        var closeBannerBtn = document.querySelector("button.ytp-ad-overlay-close-button");
        if(closeBannerBtn != null && closeBannerBtn.offsetParent !== null){
            if(debug) console.log("clicking on close banner ad");
            closeBannerBtn.click();
        } else {
            if(debug) console.log("found no banner ads: skipBannerBtn=" + closeBannerBtn);
        }
    }, 300);

})();
