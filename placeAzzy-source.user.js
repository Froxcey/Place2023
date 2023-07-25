// ==UserScript==
// @name         Azzy Bot
// @homepage     https://discord.gg/AmUVTBST
// @updateURL    https://github.com/Froxcey/Place2023/raw/master/placeAzzy-source.user.js
// @downloadURL  https://github.com/Froxcey/Place2023/raw/master/placeAzzy-source.user.js
// @version      1.7.10
// @description  try to take over the world!
// @author       Froxcey
// @match        https://garlic-bread.reddit.com/embed*
// @connect      githubusercontent.com
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// Begin

(async function () {
  "use strict";

  const config = {
    tasks: [
      {
        name: "azzy",
        templateURL: "https://i.imgur.com/i4CYRKU.png",
        offsetX: 377,
        offsetY: 213,
      },
      {
        name: "floweyOnAzzy",
        templateURL: "https://i.imgur.com/4DzeLZS.png",
        offsetX: 376,
        offsetY: 193,
      },
      {
        name: "azzy2",
        templateURL: "https://i.imgur.com/e78QQ6d.png",
        offsetX: 285,
        offsetY: 490,
      },
      {
        name: "azzy3",
        templateURL: "https://i.imgur.com/PhP84pP.png",
        offsetX: 2102,
        offsetY: 1880,
      },
    ],
    updateCheckURL: "https://raw.githubusercontent.com/Froxcey/Place2023/master/version.txt",
  };

  // Initialisation
  let placeCanvas;
  let auth;
  let tasks = {
    azzy: true,
  };
  let singleMode = false;
  window.addEventListener("message", async (event) => {
    if (event.data.type == "addTask") {
      let template = config.tasks.filter((val) => {
        return val.name == event.data.name;
      });
      if (template.length == 0) return console.warn("[Azzy Bot]: Unknown task", event.data.name);
      console.log("[Azzy Bot]: Adding task ", template[0].name);
      fetchImage(template[0].templateURL)
        .then((img) => {
          templates.push({
            img,
            offsetX: template[0].offsetX,
            offsetY: template[0].offsetY,
            name: template[0].name,
          });
          tasks[event.data.name] = true;
        })
        .catch((err) => {
          console.error("[Azzy Bot]\nERROR: template failed to load", err);
        });
    }
    if (event.data.type == "singleMode") {
      console.log("[Azzy Bot]: Single mode enabled, all pixels will not be randomised.");
      singleMode = true;
    }
    if (event.data.type != "injectAuthHeaders") return;
    console.log("[Azzy Bot]: Hijacked an auth token");
    auth = event.data.headers.Authorization;
  });
  const backgroundGradient = `repeating-linear-gradient(20deg, rgb(138, 252, 103), rgb(138, 252, 103) 30px, rgb(255, 255, 90) 30px, rgb(255, 255, 90) 60px)`;
  function getButtonText() {
    return (
      document
        .querySelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed")
        .shadowRoot.querySelector("div > garlic-bread-share-container > div.bottom-controls > garlic-bread-status-pill")
        .shadowRoot.querySelector("button > div > div.main-text") ||
      document
        .querySelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed")
        .shadowRoot.querySelector("div > garlic-bread-share-container > div > garlic-bread-status-pill")
        .shadowRoot.querySelector("div > p") ||
      document
        .querySelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed")
        .shadowRoot.querySelector("div > garlic-bread-share-container > div.bottom-controls > garlic-bread-status-pill")
        .shadowRoot.querySelector("div > div.main-text")
    );
  }
  let templates = [];
  for (const template of config.tasks) {
    if (!tasks[template.name]) continue;
    let img = await fetchImage(template.templateURL);
    templates.push({
      img,
      name: template.name,
      offsetX: template.offsetX,
      offsetY: template.offsetY,
    });
  }
  function getCanvas() {
    console.log("[Azzy Bot]: Loading...");
    try {
      placeCanvas = document
        .querySelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed")
        .shadowRoot.querySelector("div > garlic-bread-share-container > garlic-bread-camera > garlic-bread-canvas")
        .shadowRoot.querySelector("div > canvas");
      setButtonStyle();
      function tilCanvasLoaded() {
        if (
          isCanvasAll(placeCanvas.getContext("2d").getImageData(0, 0, placeCanvas.width, placeCanvas.height), 0, 0, 0)
        ) {
          console.log("[Azzy Bot]: Waiting for canva to load...");
          setTimeout(() => {
            tilCanvasLoaded();
          }, 2000);
        } else {
          console.log(
            "[Azzy Bot]: Loaded, running tasks:",
            Object.keys(tasks).filter(function (k) {
              return tasks[k];
            })
          );
          initializeLoop();
        }
      }
      tilCanvasLoaded();
    } catch (error) {
      console.groupCollapsed("[Azzy Bot]: Load attempt failed");
      console.error(error);
      console.groupEnd();
      setTimeout(() => {
        getCanvas();
      }, 2000);
    }
  }
  getCanvas();

  function isCanvasAll(imageData, r, g, b) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 8) {
      if (r !== data[i] || g !== data[i + 1] || b !== data[i + 2]) return false;
    }
    return true;
  }

  function setButtonStyle() {
    let element =
      document
        .querySelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed")
        .shadowRoot.querySelector("div > garlic-bread-share-container > div > garlic-bread-status-pill")
        .shadowRoot.querySelector("div") ||
      document
        .querySelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed")
        .shadowRoot.querySelector("div > garlic-bread-share-container > div.bottom-controls > garlic-bread-status-pill")
        .shadowRoot.querySelector("button > div");

    element.style.color = "black";

    if (element.tagName == "BUTTON") {
      element.children[0].style.background = backgroundGradient;
      element.children[0].style.color = "black";
    } else {
      element.style.background = backgroundGradient;
      element.style.color = "black";
    }
  }

  async function initializeLoop() {
    placeCanvas = document
      .querySelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed")
      .shadowRoot.querySelector("div > garlic-bread-share-container > garlic-bread-camera > garlic-bread-canvas")
      .shadowRoot.querySelector("div > canvas");
    let placeMatrix = getPlaceMatrix();
    if (placeMatrix.length != 2000 || placeMatrix[0].length != 3000) {
      console.log(`[Azzy Bot]: Dimention updated to ${placeMatrix[0].length}x${placeMatrix.length}`);
      //alert("Current map size is incompatible with this bot. Please contact Froxcey to fix this issue.");
      //return;
    }
    let task = getRandomTask();
    let result;
    if (task) {
      result = await placePixel(task.x, task.y, task.expected);
      console.log("Result:", result);
    } else {
      console.log("[Azzy Bot]: No task to run, next check in 30sec...");
      result = { next: 30000 };
    }
    setTimeout(() => {
      initializeLoop();
    }, result.next || 30000);
    checkUpdate();
    setButtonStyle();
    getButtonText().innerText = "Azzy Bot!";
  }

  async function checkUpdate() {
    GM_xmlhttpRequest({
      method: "GET",
      url: config.updateCheckURL,
      onload: function (response) {
        let remoteVersion = response.responseText.split("\n")[0];
        if (remoteVersion != GM_info.script.version) {
          let updateType = response.responseText.split("\n")[1];
          console.log(`[Azzy Bot]: Found ${updateType} (${GM_info.script.version} => ${remoteVersion})`);
          showUpdate(GM_info.script.version, remoteVersion, GM_info.script.updateURL, updateType);
        }
      },
    });
  }

  function getRandomTask() {
    let diff = [];

    for (const template of templates) {
      if (!isChunkLoaded(template.offsetX, template.offsetY)) {
        console.log(`[Azzy Bot]: Area for project ${template.name} is not loaded, skipping.`);
        continue;
      }
      diff.push(
        ...compareMatrix(
          getPlaceMatrix(),
          imgTo2DArray(template.img),
          template.offsetX,
          template.offsetY,
          template.name
        )
      );
    }
    console.log("[Azzy Bot]: Tasks remaining:", diff);
    if (diff.length == 0) return null;
    return singleMode ? diff[0] : diff[Math.round(Math.random() * diff.length)];
  }

  function isChunkLoaded(x, y) {
    const chunkInfo = coordsToMap(x, y);
    const canvasChunkWidth = 1000;
    const canvasChunkHeight = 1000;
    const chunkTopLeftX = (chunkInfo.chunk % 3) * canvasChunkWidth;
    const chunkTopLeftY = Math.floor(chunkInfo.chunk / 3) * canvasChunkHeight;
    const chunkImageData = placeCanvas
      .getContext("2d")
      .getImageData(chunkTopLeftX, chunkTopLeftY, canvasChunkWidth, canvasChunkHeight);
    return !isCanvasAll(chunkImageData, 0, 0, 0);
  }

  // Colour mapping
  let colorMap = {
    "rgb(109, 0, 26)": 0,
    "rgb(190, 0, 57)": 1,
    "rgb(255, 69, 0)": 2,
    "rgb(255, 168, 0)": 3,
    "rgb(255, 214, 53)": 4,
    "rgb(255, 248, 184)": 5,
    "rgb(0, 163, 104)": 6,
    "rgb(0, 204, 120)": 7,
    "rgb(126, 237, 86)": 8,
    "rgb(0, 117, 111)": 9,
    "rgb(0, 158, 170)": 10,
    "rgb(0, 204, 192)": 11,
    "rgb(36, 80, 164)": 12,
    "rgb(54, 144, 234)": 13,
    "rgb(81, 233, 244)": 14,
    "rgb(73, 58, 193)": 15,
    "rgb(106, 92, 255)": 16,
    "rgb(148, 179, 255)": 17,
    "rgb(129, 30, 159)": 18,
    "rgb(180, 74, 192)": 19,
    "rgb(228, 171, 255)": 20,
    "rgb(222, 16, 127)": 21,
    "rgb(255, 56, 129)": 22,
    "rgb(255, 153, 170)": 23,
    "rgb(109, 72, 47)": 24,
    "rgb(156, 105, 38)": 25,
    "rgb(255, 180, 112)": 26,
    "rgb(0, 0, 0)": 27,
    "rgb(81, 82, 82)": 28,
    "rgb(137, 141, 144)": 29,
    "rgb(212, 215, 217)": 30,
    "rgb(255, 255, 255)": 31,
  };

  function refreshAuth() {
    console.log("[Azzy bot]: Refreshing auth token");
    window.parent.postMessage({ type: "refreshAuth" }, CLIENT_CONFIG.REDDIT_MESSAGE_TARGET);
  }

  async function placePixel(x, y, color) {
    if (!auth) {
      refreshAuth();
      return { success: false, reason: "Auth not set, try later", next: null };
    }

    console.log(`[Azzy Bot]: Placing pixel at (${x - 1500}, ${y - 1000}) with ${color}`);
    let mapCoords = coordsToMap(x, y);
    let colorIndex = colorMap[color];
    if (!colorIndex) return console.error(`${color} is not found in index mapping, please update`);
    let reqContent = {
      operationName: "setPixel",
      variables: {
        input: {
          actionName: "r/replace:set_pixel",
          PixelMessageData: {
            coordinate: {
              x: mapCoords.x,
              y: mapCoords.y,
            },
            colorIndex: colorIndex,
            canvasIndex: mapCoords.chunk,
          },
        },
      },
      query:
        "mutation setPixel($input: ActInput!) {\n  act(input: $input) {\n    data {\n      ... on BasicMessage {\n        id\n        data {\n          ... on GetUserCooldownResponseMessageData {\n            nextAvailablePixelTimestamp\n            __typename\n          }\n          ... on SetPixelResponseMessageData {\n            timestamp\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
    };
    let res = await fetch("https://gql-realtime-2.reddit.com/query", {
      headers: {
        authorization: auth,
        "content-type": "application/json",
        "apollographql-client-name": "garlic-bread",
        "apollographql-client-version": "0.0.1",
        Accept: "*/*",
      },
      body: JSON.stringify(reqContent),
      method: "POST",
      mode: "cors",
    });
    if (res.status == 401) {
      refreshAuth();
    }
    if (!res.ok) return { success: false, reason: res.statusText, next: null };
    let resBody = await res.json();
    if (resBody.errors) {
      if (resBody.errors[0].message == "Ratelimited") {
        return {
          success: false,
          reason: "Ratelimited",
          next: resBody.errors[0].extensions.nextAvailablePixelTs - new Date().getTime(),
        };
      }
      return {
        success: false,
        reason: resBody.errors[0].message,
        next: null,
      };
    }
    setPixelColor(x, y, color);
    return {
      success: true,
      next: resBody.data.act.data[0].data.nextAvailablePixelTimestamp - new Date().getTime(),
    };
  }

  function setPixelColor(x, y, color) {
    const ctx = placeCanvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }

  function coordsToMap(x, y) {
    let chunk = 0;
    if (x > 1999) {
      chunk += 2;
      x -= 2000;
    } else if (x > 999) {
      chunk++;
      x -= 1000;
    }
    if (y > 999) {
      chunk += 3;
      y -= 1000;
    }
    return {
      x,
      y,
      chunk,
    };
  }

  function compareMatrix(placeMatrix, template, offsetX, offsetY, templateName) {
    const differences = [];

    for (let y = 0; y < template.length; y++) {
      for (let x = 0; x < template[y].length; x++) {
        const templatePixel = template[y][x];
        if (templatePixel.a == 0) continue;

        const placeX = x + offsetX;
        const placeY = y + offsetY;

        const placePixel = placeMatrix[placeY][placeX];

        if (placePixel.r == templatePixel.r) continue;
        if (placePixel.g == templatePixel.g) continue;
        if (placePixel.b == templatePixel.b) continue;

        differences.push({
          x: placeX,
          y: placeY,
          coord: `(${placeX - 1500}, ${placeY - 1000})`,
          expected: `rgb(${templatePixel.r}, ${templatePixel.g}, ${templatePixel.b})`,
          found: `rgb(${placePixel.r}, ${placePixel.g}, ${placePixel.b})`,
          from: templateName,
        });
      }
    }

    return differences;
  }

  function getPlaceMatrix() {
    setButtonStyle();
    let ctx = placeCanvas.getContext("2d");
    let imageData = ctx.getImageData(0, 0, placeCanvas.width, placeCanvas.height);
    const matrix = [];
    const { data, width, height } = imageData;
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const pixelStartIndex = (y * width + x) * 4;
        const rgba = {
          r: data[pixelStartIndex],
          g: data[pixelStartIndex + 1],
          b: data[pixelStartIndex + 2],
        };
        row.push(rgba);
      }
      matrix.push(row);
    }
    return matrix;
  }

  function imgTo2DArray(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    function getPixelColor(imageData, x, y) {
      const index = (y * imageData.width + x) * 4;
      const r = imageData.data[index];
      const g = imageData.data[index + 1];
      const b = imageData.data[index + 2];
      const a = imageData.data[index + 3];
      // Return the color as an RGBA object
      return { r, g, b, a };
    }

    const pixelArray = [];

    // Loop through each pixel and store the RGBA values in the 2D array
    for (let y = 0; y < img.height; y++) {
      const row = [];
      for (let x = 0; x < img.width; x++) {
        const pixelColor = getPixelColor(imageData, x, y);
        row.push(pixelColor);
      }
      pixelArray.push(row);
    }

    return pixelArray;
  }
  function fetchImage(src) {
    console.log("[Azzy Bot]: Fetching template from", src);
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = "Anonymous";
      img.src = src;
    });
  }

  let doPlayStt = false;
  function playUpdateStt(version, type) {
    if ("speechSynthesis" in window) {
      var speech = new SpeechSynthesisUtterance(
        `Azzy bot update. ${type} version ${version} is now available. Please update immediately.`
      );
      speech.lang = "en-GB";
      speech.onend = () => {
        if (doPlayStt) playUpdateStt(version, type);
      };
      window.speechSynthesis.speak(speech);
    }
  }

  const showUpdate = (oldVer, newVer, url, type) => {
    clearUpdate();
    if (type == "Rapid response") {
      doPlayStt = true;
      playUpdateStt(newVer, type);
    } else if (type == "Update") {
      playUpdateStt(newVer, type);
    }
    let newElement = document.createElement("div");
    let boxStyle = `
    background-color: #eeeeee;
    text-align-last: center;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: #666666;
    margin-top: 15px;
    margin-bottom: 10px;
  `;
    newElement.id = "botUpdateMsg";
    newElement.innerHTML += `
    <h2 style="${boxStyle}">Update ${GM_info.script.name}!</h2>
    <p style="${boxStyle}"><span style="color: red;">${oldVer}</span> => <span style="color: green;">${newVer}</span><br /></p>
    <button onclick="window.open('${url}', '_blank');">Update Now</button><button class="botCloseBtn" style="float: right;">Dismiss</button>
  `;
    newElement.style.position = "absolute";
    newElement.style.right = "10px";
    newElement.style.bottom = "10px";
    newElement.style.backgroundColor = "yellow";
    newElement.style.background = "repeating-linear-gradient( 45deg, #000000, #000000 8px, #ebda44 8px, #ebda44 25px )";
    newElement.style.padding = "0 15px 15px 15px";
    newElement.style.borderRadius = "8px";
    newElement.style.boxShadow = "0 0 10px rgba(0,0,0,0.7)";
    newElement.getElementsByClassName("botCloseBtn")[0].addEventListener("click", () => {
      clearUpdate();
    });
    document.body.appendChild(newElement);
  };

  const clearUpdate = () => {
    doPlayStt = false;
    let element = document.getElementById("botUpdateMsg");
    if (element) element.parentNode.removeChild(element);
  };
})();
