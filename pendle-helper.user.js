// ==UserScript==
// @name         Pendle Yield Helper
// @namespace    http://tampermonkey.net/
// @version      v1.0.1
// @description  Show Pendle PT Token TRUE APR
// @author       Power Ricky
// @match        https://app.pendle.finance/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js#sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://cdn.jsdelivr.net/npm/moment@2.30.1/moment.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

var toInsertHTML = '<div id="tm-box" class="pp-alert border min-h-10 rounded-xl text-base px-4 py-2 mt-4"><ol id="tm-insert"></ol></div>'

function showPTInfo (jNode) {
    // 定义正则表达式模式，匹配当前market
    const url = new URL(window.location.href)

    const parts = url.pathname.split('/')

    if (parts.length != 5) {
        console.log("未能成功解析 Market Address");
        return;
    }

    console.log(`Market Address: ${parts[3]} on ${window.ethereum.chainId}`);

    window.ethereum.request({
        "method": "eth_chainId",
        "params": []
    }).then(function(chainId){
        fetch(`https://api-v2.pendle.finance/core/v1/${parseInt(chainId, 16)}/markets/${parts[3]}`).then(function(response) {
            // 检查响应状态
            if (!response.ok) {
                throw new Error('网络错误：' + response.status);
            }
            // 返回 JSON 格式的响应数据
            return response.json();
        })
            .then(function(data) {
            // 打印响应数据
            var accountingAsset = data.accountingAsset;
            var pt = data.pt;
            var yt = data.yt;
            var underlysingAssetText = `<li class="text-l font-semibold">${accountingAsset.simpleSymbol} $${accountingAsset.price.usd.toFixed(4)}</li>`;
            var ptText = `<li>${pt.simpleSymbol} 💰 ${pt.price.acc.toFixed(4)} ${accountingAsset.simpleSymbol} 💵 $${pt.price.usd.toFixed(4)}</li>`;
            var ytText = `<li>${yt.simpleSymbol} 💰 ${yt.price.acc.toFixed(4)} ${accountingAsset.simpleSymbol} 💵 $${yt.price.usd.toFixed(4)}</li>`;

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
    });

}

(function() {
    'use strict';
    waitForKeyElements("span[data-test='expires-in']", showPTInfo);
})();
