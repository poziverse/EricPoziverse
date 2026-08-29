#!/usr/bin/env node
// Char-level junction fixer v2: ensure a comma separates array entries around the two new objects.
const fs = require("fs");
const path = require("path");
const p = path.resolve(__dirname, "..", "assets", "js", "data.js");
let src = fs.readFileSync(p, "utf8");
let fixes = 0;

function ensureCommaBefore(marker) {
  const mi = src.indexOf(marker);
  if (mi < 0) { console.error("FATAL: marker not found: " + marker); process.exit(1); }
  const objStart = src.lastIndexOf("{", mi);
  if (objStart < 0) { console.error("FATAL: no opening brace before " + marker); process.exit(1); }
  let i = objStart - 1;
  while (i >= 0 && /\s/.test(src[i])) i--;
  if (src[i] === "}" || src[i] === "]") {
    src = src.slice(0, i + 1) + "," + src.slice(i + 1);
    return true;
  }
  if (src[i] === ",") return false;
  console.error(`FATAL: unexpected char '${src[i]}' before ${marker}`);
  process.exit(1);
}

if (ensureCommaBefore("slug: 'model-fleet'")) fixes++;
if (ensureCommaBefore("id: 'lx-013'")) fixes++;
console.log("junction fixes:", fixes);
const tmp = p + ".tmp";
fs.writeFileSync(tmp, src, "utf8");
fs.renameSync(tmp, p);
