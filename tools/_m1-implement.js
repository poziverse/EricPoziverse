#!/usr/bin/env node
// M1 implementation: canonical domain migration + JSON-LD + smoke additions.
const fs = require("fs");
const path = require("path");
const PROJ = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727";
const OLD = "e16kyyq6.autoclawai.space";
const NEW = "h4efyx8v.autoclawai.space";
const PAGES = ["index.html","watch.html","replies.html","downloads.html","library.html","now.html","about.html","article.html","annex.html","club.html","signin.html","account.html","404.html"];
const log = [];

// 1) canonical domain migration across pages + feed + sitemap + robots
for (const f of [...PAGES, "feed.xml", "sitemap.xml", "robots.txt"]) {
  const p = path.join(PROJ, f);
  if (!fs.existsSync(p)) { log.push(`skip ${f}: missing`); continue; }
  let s = fs.readFileSync(p, "utf8");
  const n = s.split(OLD).length - 1;
  if (n) { s = s.split(OLD).join(NEW); fs.writeFileSync(p, s, "utf8"); log.push(`${f}: ${n} domain refs migrated`); }
  else log.push(`${f}: no preview-domain refs`);
}

// 2) nginx: real 404 handling (try_files =404 + error_page)
const nginxPath = path.join(PROJ, "nginx.conf");
let nginx = fs.readFileSync(nginxPath, "utf8");
if (!nginx.includes("error_page 404")) {
  const before = nginx;
  nginx = nginx.replace(/(try_files[^;]*\/index\.html\s*;)/, "$1\n    error_page 404 /404.html;");
  // switch the SPA fallback to hard 404 so error_page engages
  nginx = nginx.replace(/try_files\s+\$uri\s+\$uri\.html\s+\/index\.html\s*;/, "try_files $uri $uri.html =404;");
  if (nginx === before) log.push("nginx: patterns not found (check manually)");
  else { fs.writeFileSync(nginxPath, nginx, "utf8"); log.push("nginx: error_page 404 wired + fallback tightened"); }
} else log.push("nginx: error_page already present");

// 3) Course JSON-LD on the Annex (3 learning paths)
const annexPath = path.join(PROJ, "annex.html");
let annex = fs.readFileSync(annexPath, "utf8");
if (!annex.includes('"@type":"Course"')) {
  const vm = require("vm");
  const ctx = { window: {} }; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(PROJ, "assets", "js", "data.js"), "utf8"), ctx);
  const P = ctx.window.POZIVERSE;
  const courses = (P.PATHS || []).map(pp => ({
    "@type": "Course", name: pp.title, description: strip(pp.outcome),
    provider: { "@type": "Organization", name: "From the Poziverse", sameAs: "https://h4efyx8v.autoclawai.space/" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "P4W" },
  }));
  const block = `  <script type="application/ld+json">\n  ${JSON.stringify({ "@context": "https://schema.org", "@graph": courses.map(c => ({ "@context": "https://schema.org", ...c })) }).replace(/</g, "\\u003c")}\n  </script>\n`;
  const headClose = annex.indexOf("</head>");
  annex = annex.slice(0, headClose) + block + annex.slice(headClose);
  fs.writeFileSync(annexPath, annex, "utf8");
  log.push("annex: Course JSON-LD injected (" + courses.length + " courses)");
} else log.push("annex: Course JSON-LD already present");

// 4) per-article Article JSON-LD — injected at render time by a small script added to article.html
const artPath = path.join(PROJ, "article.html");
let art = fs.readFileSync(artPath, "utf8");
if (!art.includes('id="article-jsonld"')) {
  const inject = `\n  <script id="article-jsonld">\n  (function () {\n    function refreshJsonLd() {\n      try {\n        var P = window.POZIVERSE || {};\n        var params = new URLSearchParams(location.search);\n        var slug = params.get("id");\n        var a = (P.ARTICLES || []).find(function (x) { return x.slug === slug; });\n        var el = document.getElementById("article-jsonld-data");\n        if (el) el.remove();\n        if (!a) return;\n        var data = { "@context": "https://schema.org", "@type": "Article", headline: (a.title || "").replace(/<[^>]+>/g, "").trim(), description: (a.excerpt || a.deck || "").replace(/<[^>]+>/g, "").trim(), datePublished: a.date, author: { "@type": "Person", name: "Eric Poziverse" }, mainEntityOfPage: location.href };\n        var s = document.createElement("script");\n        s.type = "application/ld+json";\n        s.id = "article-jsonld-data";\n        s.textContent = JSON.stringify(data);\n        document.head.appendChild(s);\n      } catch (e) {}\n    }\n    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", refreshJsonLd); else refreshJsonLd();\n    window.addEventListener("hashchange", refreshJsonLd);\n  })();\n  </script>`;
  const headClose = art.indexOf("</head>");
  art = art.slice(0, headClose) + inject + "\n" + art.slice(headClose);
  fs.writeFileSync(artPath, art, "utf8");
  log.push("article: per-article Article JSON-LD renderer injected");
} else log.push("article: JSON-LD renderer already present");

function strip(s) { return String(s || "").replace(/<[^>]+>/g, "").trim(); }

console.log("M1 DONE:", log.join(" | "));
