// ==UserScript==
// @name         Azzy Bot - Top down
// @homepage     https://discord.gg/AmUVTBST
// @updateURL    https://github.com/Froxcey/Place2023/raw/master/placeAzzy_azzy-bg.user.js
// @downloadURL  https://github.com/Froxcey/Place2023/raw/master/placeAzzy_azzy-bg.user.js
// @version      1.0
// @description  try to take over the world!
// @author       Froxcey
// @match        https://garlic-bread.reddit.com/embed*
// @connect      githubusercontent.com
// ==/UserScript==

setTimeout(() => {
  window.postMessage({ type: "singleMode" });
}, 100);
