#!/usr/bin/env node
// tools/smoke-test.js — post-deploy verification for From the Poziverse.
// Usage: node tools/smoke-test.js [baseUrl]
//   baseUrl defaults to the preview URL. Checks: pages 200, data assertions
//   in the served home page snapshot, sitemap + robots + feed + asset 200.
const BASE = process.argv[2] || "https://e16kyyq6.autoclawai.space";
const checks = [];
let failed = 0;

async function head(path, expect = 200, contentTypePrefix = null) {
  const res = await fetch(BASE + path, { method: "HEAD" });
  let ok = res.status === expect;
  let note = "";
  if (ok && contentTypePrefix) {
    const ct = String(res.headers.get("content-type") || "");
    if (!ct.includes(contentTypePrefix)) { ok = false; note = ` (content-type ${ct})`; }
  }
  checks.push(`${ok ? "PASS" : "FAIL"} HEAD ${path} -> ${res.status}${note}`);
  if (!ok) failed++;
}

async function bodyContains(path, needle, label) {
  const res = await fetch(BASE + path);
  const text = await res.text();
  const ok = res.status === 200 && text.includes(needle);
  checks.push(`${ok ? "PASS" : "FAIL"} ${label} (${path} contains "${String(needle).slice(0, 40)}")`);
  if (!ok) failed++;
}

(async () => {
  for (const p of ["/", "/watch.html", "/replies.html", "/downloads.html", "/library.html", "/now.html", "/about.html", "/article.html", "/annex.html", "/club.html", "/signin.html", "/account.html"]) await head(p);
  await head("/sitemap.xml");
  await head("/robots.txt");
  await head("/feed.xml", 200, "xml");
  await head("/assets/js/data.js", 200, "application/");
  await head("/downloads/transmission-log-template-v1.0.0.zip", 200, "application/");
  await head("/favicon.svg", 200, "image/");
  await head("/icon-192.png", 200, "image/");
  await head("/icon-512.png", 200, "image/");
  await head("/manifest.webmanifest");
  await head("/assets/og/og-default.jpg", 200, "image/");

  // data assertions on the served home page (inlined snapshot must be current)
  await bodyContains("/", "window.POZIVERSE.ARTICLES", "home carries data snapshot");
  const res = await fetch(BASE + "/assets/js/data.js?cb=" + Date.now());
  const data = await res.text();
  for (const [needle, label] of [
    ["rt-003", "replies: rt-003 exists"],
    ["voice-over", "FR-001 voice-over format"],
    ["ev-003", "events: ev-003 exists"],
    ["CC BY-SA 4.0", "library open license"],
    ["Humanizer", "library batch #2 shipped"],
    ["never type an ID, path, or setting from memory", "plain-language rewrite live (v4)"],
    ["192.168.1.188", "SECURITY: leaked LAN IP stays gone (expect absent)"],
  ]) {
    const present = data.includes(needle);
    const wantPresent = label.indexOf("expect absent") < 0;
    const ok = wantPresent ? present : !present;
    checks.push(`${ok ? "PASS" : "FAIL"} data.js: ${label}`);
    if (!ok) failed++;
  }

  console.log(checks.join("\n"));
  console.log(failed ? `SMOKE: ${failed} FAILURE(S)` : "SMOKE: ALL PASS");
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error("SMOKE: RUNNER ERROR", e.message); process.exit(1); });
