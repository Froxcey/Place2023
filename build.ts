#! /opt/homebrew/bin/bun

import Obfuscator from "javascript-obfuscator";

let input = await Bun.file("placeAzzy-source.user.js").text();

var obfuscationResult = Obfuscator.obfuscate(input, {
  optionsPreset: "medium-obfuscation",
}).getObfuscatedCode();
let output = input.split("// Begin")[0] + obfuscationResult + "\n";
Bun.write("placeAzzy.user.js", output);

let version = input.split("// @version")[1].split("\n")[0].trim();
Bun.write("version.txt", version);
