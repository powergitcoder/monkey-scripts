// ==UserScript==
// @name         Pendle Yield Helper
// @namespace    http://tampermonkey.net/
// @version      2024-04-12
// @description  try to take over the world!
// @author       You
// @match        https://app.pendle.finance/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js#sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://cdn.jsdelivr.net/npm/moment@2.30.1/moment.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

var toInsertHTML = '<div id="tm-box" class="pp-alert border min-h-10 rounded-xl text-base px-4 py-2 mt-4"><ol id="tm-insert"></ol></div>'

function showPTInfo (jNode) {
    // 获取当前页面的 URL
    var currentURL = window.location.href;

    // 定义正则表达式模式，匹配当前market
    var regex = /\/markets\/([^\/]+)\/swap/;

    // 使用正则表达式匹配 URL
    var matches = currentURL.match(regex);

    // 如果有匹配项，则提取第一个捕获组的值
    if (matches && matches.length > 1) {
        var extractedString = matches[1];
        console.log("Market Address:", extractedString);
        fetch("https://api-v2.pendle.finance/core/v1/42161/markets/" + extractedString).then(function(response) {
            // 检查响应状态
            if (!response.ok) {
                throw new Error('网络错误：' + response.status);
            }
            // 返回 JSON 格式的响应数据
            return response.json();
        })
            .then(function(data) {
            // 打印响应数据
            var underlyingAsset = data.underlyingAsset;
            var pt = data.pt;
            var yt = data.yt;
            var underlysingAssetText = `<li class="text-l font-semibold">${underlyingAsset.simpleSymbol} $${underlyingAsset.price.usd.toFixed(4)}</li>`;
            var ptText = `<li>${pt.simpleSymbol} 💰 ${pt.price.acc.toFixed(4)} ${underlyingAsset.simpleSymbol} 💵 $${pt.price.usd.toFixed(4)}</li>`;
            var ytText = `<li>${yt.simpleSymbol} 💰 ${yt.price.acc.toFixed(4)} ${underlyingAsset.simpleSymbol} 💵 $${yt.price.usd.toFixed(4)}</li>`;

            const endDate = moment(data.expiry);
            const startDate = moment();
            const diffDays = endDate.diff(startDate, 'days');
            const remainingHours = endDate.diff(startDate, 'hours') - diffDays * 24;
            const daysText = `<li>${diffDays} day(s) and ${remainingHours} hour(s)</li>`;

            const netPTProfit = (1-pt.price.acc)/pt.price.acc;
            const apr = netPTProfit / diffDays * 365;

            var netPTProfitText = `<li class="text-xl font-semibold pp-text-shadow-green">PT Net Profit: ${(netPTProfit * 100).toFixed(5)}%, APR: ${(apr* 100).toFixed(5)}%</li>`;

            var insertedBoxObj = $("#tm-box");
            if (insertedBoxObj) {
                insertedBoxObj.remove();
            }
            $("#pp-app-view > div > div > div > div > div.flex").after(toInsertHTML);

            var stringsArray = [underlysingAssetText, ptText, ytText, daysText, netPTProfitText];

            var insertedObj = $("#tm-insert")
            // 使用 for 循环遍历字符串数组
            for (var i = 0; i < stringsArray.length; i++) {
                var currentString = stringsArray[i];
                insertedObj.append(`<li>${currentString}</li>`);
            }

        })
            .catch(function(error) {
            // 处理错误
            console.error('错误:', error);
        });
    } else {
        console.log("未找到匹配的部分");
    }

}

(function() {
    'use strict';
    waitForKeyElements("button[text='PT'] > span:contains('PT')", showPTInfo);
})();
