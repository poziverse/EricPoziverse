#!/usr/bin/env node
// tools/gen-feed.js — rebuild feed.xml from the current data.js (RSS 2.0, articles only).
// Reconstructed missing build tool (was referenced by README, never checked in).
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://e16kyyq6.autoclawai.space"; // regenerate with final domain when published
const src = fs.readFileSync(path.join(ROOT, "assets", "js", "data.js"), "utf8");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(src, ctx);
const P = ctx.window.POZIVERSE;
if (!P || !P.ARTICLES) { console.error("FATAL: could not evaluate data.js"); process.exit(1); }

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = h => String(h).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const items = [...P.ARTICLES]
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
  .map(a => {
    const url = `${SITE}/article.html?id=${a.slug}`;
    const title = strip(a.title);
    const desc = strip(a.excerpt || a.deck || "");
    return `    <item>\n      <title>${esc(title)}</title>\n      <link>${url}</link>\n      <guid isPermaLink="true">${url}</guid>\n      <pubDate>${new Date(a.date + "T12:00:00Z").toUTCString()}</pubDate>\n      <description>${esc(desc)}</description>\n      ${(a.tags || []).map(t => `<category>${esc(t)}</category>`).join("")}\n    </item>`;
  })
  .join("\n");

const lastBuild = new Date(P.NOW?.updated ? P.NOW.updated + "T12:00:00Z" : Date.now()).toUTCString();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>From the Poziverse</title>
    <link>${SITE}/</link>
    <description>Notes from the edge of the AI frontier — field reports on agents, local-first software, and the machine-readable future.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

const out = path.join(ROOT, "feed.xml");
const tmp = out + ".tmp";
fs.writeFileSync(tmp, xml, "utf8");
fs.renameSync(tmp, out);
console.log(`feed.xml rebuilt: ${P.ARTICLES.length} items, lastBuildDate ${lastBuild}`);
