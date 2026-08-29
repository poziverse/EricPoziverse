#!/usr/bin/env node
// Repair: extract the 10 batch-#2 cards misplaced inside verify-before-write's
// provenance array, and append them properly at the END of the LIBRARY array.
const fs = require("fs");
const path = require("path");
const p = path.resolve(__dirname, "..", "assets", "js", "data.js");
let src = fs.readFileSync(p, "utf8");
const EOL = src.includes("\r\n") ? "\r\n" : "\n";

// 1) locate the misplaced block: starts at the comma right after the first GATE string
const gate = '"GATE: privacy-scan clean 2026-08-29"';
const gi = src.indexOf(gate);
if (gi < 0) { console.error("FATAL: gate string not found"); process.exit(1); }
const hum = src.indexOf('id: "humanizer"', gi);
if (hum < 0) { console.error("FATAL: humanizer card not found after gate (already repaired?)"); process.exit(1); }
const iStart = src.lastIndexOf(",", hum);
// end: the hyperframes card's closing brace (art: "art-12" then EOL-spaces then })
const a12 = src.indexOf('art: "art-12"', hum);
if (a12 < 0) { console.error("FATAL: art-12 not found"); process.exit(1); }
const brace = src.indexOf("}", a12);
const iEnd = brace + 1;
const cardsText = src.slice(iStart + 1, iEnd); // the 10 card objects, comma-separated
if (!cardsText.includes('id: "humanizer"') || !cardsText.includes('id: "hyperframes-video"') || (cardsText.match(/id: "/g) || []).length !== 10) {
  console.error("FATAL: extracted cards look wrong — count:", (cardsText.match(/id: "/g) || []).length);
  process.exit(1);
}
// 2) remove from the provenance array
src = src.slice(0, iStart) + src.slice(iEnd);
// 3) append at the true end of the LIBRARY array
const LIB_START = src.indexOf("window.POZIVERSE.LIBRARY = [");
const LIB_END = src.indexOf("window.POZIVERSE.NOW", LIB_START);
let lib = src.slice(LIB_START, LIB_END);
const lastClose = lib.lastIndexOf("];");
if (lastClose < 0) { console.error("FATAL: LIBRARY close not found"); process.exit(1); }
lib = lib.slice(0, lastClose) + "," + EOL + cardsText.trim() + EOL + lib.slice(lastClose);
src = src.slice(0, LIB_START) + lib + src.slice(LIB_END);
// 4) sanity: humanizer must appear exactly twice (LIBRARY entry + nowhere else), and inside LIBRARY bounds
const libFinal = src.slice(src.indexOf("window.POZIVERSE.LIBRARY = ["), src.indexOf("window.POZIVERSE.NOW"));
if ((libFinal.match(/id: "humanizer"/g) || []).length !== 1) { console.error("FATAL: humanizer not singular in LIBRARY"); process.exit(1); }
if ((libFinal.match(/id: "/g) || []).length !== 21) { console.error("FATAL: LIBRARY id count != 21:", (libFinal.match(/id: "/g) || []).length); process.exit(1); }
const tmp = p + ".tmp";
fs.writeFileSync(tmp, src, "utf8");
fs.renameSync(tmp, p);
console.log("REPAIRED: 10 cards re-homed at LIBRARY end; provenance restored; 21 entries verified in-source");
