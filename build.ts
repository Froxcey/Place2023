#! /opt/homebrew/bin/bun

import Obfuscator from "javascript-obfuscator";

let input = await Bun.file("placeAzzy-source.user.js").text();

var obfuscationResult = Obfuscator.obfuscate(input, {
  optionsPreset: "medium-obfuscation",
}).getObfuscatedCode();

let output = input.split("// Begin")[0] + obfuscationResult;

Bun.write("placeAzzy.user.js", output);
