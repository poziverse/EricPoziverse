#!/usr/bin/env node
// tools/enrich-head.js — inject premium head metadata into every page:
// favicon, apple-touch, theme-color, manifest, Open Graph, Twitter cards, canonical.
// Idempotent: skips pages that already carry og:site_name. Reads <title> + meta description.
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://e16kyyq6.autoclawai.space"; // regenerate with final domain when published
const PAGES = ["index.html","watch.html","replies.html","downloads.html","library.html","now.html","about.html","article.html","annex.html","club.html","signin.html","account.html"];

for (const page of PAGES) {
  const p = path.join(ROOT, page);
  let src = fs.readFileSync(p, "utf8");
  if (src.includes('property="og:site_name"')) { console.log(`${page}: SKIP (already enriched)`); continue; }
  const titleMatch = src.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch) { console.error(`FATAL ${page}: no <title>`); process.exit(1); }
  const title = titleMatch[1].trim().replace(/\s+/g, " ");
  const descMatch = src.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const desc = descMatch ? descMatch[1] : "Notes from the edge of the AI frontier.";
  const ogType = page === "article.html" ? "article" : "website";
  const ogImage = `${SITE}/assets/og/og-default.jpg`;
  const block = [
    `  <link rel="icon" type="image/svg+xml" href="/favicon.svg">`,
    `  <link rel="apple-touch-icon" href="/icon-192.png">`,
    `  <meta name="theme-color" content="#0a0a0f">`,
    `  <link rel="manifest" href="/manifest.webmanifest">`,
    `  <meta property="og:site_name" content="From the Poziverse">`,
    `  <meta property="og:title" content="${title.replace(/"/g, "&quot;")}">`,
    `  <meta property="og:description" content="${desc.replace(/"/g, "&quot;")}">`,
    `  <meta property="og:type" content="${ogType}">`,
    `  <meta property="og:url" content="${SITE}/${page}">`,
    `  <meta property="og:image" content="${ogImage}">`,
    `  <meta name="twitter:card" content="summary_large_image">`,
    `  <meta name="twitter:title" content="${title.replace(/"/g, "&quot;")}">`,
    `  <meta name="twitter:description" content="${desc.replace(/"/g, "&quot;")}">`,
    `  <meta name="twitter:image" content="${ogImage}">`,
    `  <link rel="canonical" href="${SITE}/${page}">`,
  ].join("\n");
  const tEnd = src.indexOf("</title>") + "</title>".length;
  src = src.slice(0, tEnd) + "\n" + block + src.slice(tEnd);
  // WebSite JSON-LD on the home page
  if (page === "index.html") {
    const jsonld = `  <script type="application/ld+json">\n  {"@context":"https://schema.org","@type":"WebSite","name":"From the Poziverse","url":"${SITE}/","description":"Notes from the edge of the AI frontier - field reports on agents, local-first software, and the machine-readable future.","author":{"@type":"Person","name":"Eric Poziverse"}}\n  </script>`;
    const headClose = src.indexOf("</head>");
    src = src.slice(0, headClose) + jsonld + "\n" + src.slice(headClose);
  }
  const tmp = p + ".tmp";
  fs.writeFileSync(tmp, src, "utf8");
  fs.renameSync(tmp, p);
  console.log(`${page}: enriched`);
}
