#!/usr/bin/env node
// tools/refresh-inline-data.js
// Rebuilds the inlined data.js snapshot inside every page's BUILD:SCRIPTS markers.
// Part of the missing V4.1 build tooling — run after editing assets/js/data.js, before deploy.
// Pages whose markers do NOT contain a data.js snapshot (club.html, annex.html load it
// externally) are left untouched. Fails loudly if a marker block looks wrong.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = fs.readFileSync(path.join(ROOT, "assets", "js", "data.js"), "utf8");
if (!DATA.includes("window.POZIVERSE.ARTICLES")) { console.error("FATAL: data.js does not look like the Poziverse data module"); process.exit(1); }

const PAGES = ["index.html", "watch.html", "replies.html", "downloads.html", "library.html", "now.html", "about.html", "article.html"];
const report = [];

for (const page of PAGES) {
  const p = path.join(ROOT, page);
  let src = fs.readFileSync(p, "utf8");
  const mStart = src.indexOf("<!--BUILD:SCRIPTS-START-->");
  const mEnd = src.indexOf("<!--BUILD:SCRIPTS-END-->");
  if (mStart < 0 || mEnd < 0 || mEnd < mStart) { console.error(`FATAL ${page}: BUILD:SCRIPTS markers not found`); process.exit(1); }
  const block = src.slice(mStart, mEnd);

  // first <script>...</script> inside the marker block
  const sOpen = block.indexOf("<script>");
  const sClose = block.indexOf("</script>", sOpen);
  if (sOpen < 0 || sClose < 0) { console.error(`FATAL ${page}: no script inside markers`); process.exit(1); }
  const inner = block.slice(sOpen + "<script>".length, sClose);
  if (!inner.includes("window.POZIVERSE.ARTICLES")) {
    report.push(`${page}: SKIP (first marker script is not data.js — external pattern)`);
    continue;
  }

  const newBlock = block.slice(0, sOpen + "<script>".length) + "\n" + DATA + "\n" + block.slice(sClose);
  const newSrc = src.slice(0, mStart) + newBlock + src.slice(mEnd);
  if (newSrc === src) { report.push(`${page}: SKIP (already current)`); continue; }
  const tmp = p + ".tmp";
  fs.writeFileSync(tmp, newSrc, "utf8");
  fs.renameSync(tmp, p);
  report.push(`${page}: REFRESHED (snapshot ${DATA.length} chars)`);
}
console.log(report.join("\n"));
