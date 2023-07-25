// ==UserScript==
// @name         Azzy Bot - Azzy2
// @homepage     https://discord.gg/AmUVTBST
// @updateURL    https://github.com/Froxcey/Place2023/raw/master/placeAzzy_azzy2.user.js
// @downloadURL  https://github.com/Froxcey/Place2023/raw/master/placeAzzy_azzy2.user.js
// @version      1.0
// @description  try to take over the world!
// @author       Froxcey
// @match        https://garlic-bread.reddit.com/embed*
// @connect      githubusercontent.com
// ==/UserScript==

setTimeout(() => {
  window.postMessage({ type: "addTask", name: "azzy2" });
}, 100);
