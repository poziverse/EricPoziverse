#!/usr/bin/env node
// directory-build.js — builds the search index + adopts the glossary. Run after any directory change.
const fs = require("fs");
const path = require("path");
const DIR = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727/data/directory";
const records = [];
for (const f of fs.readdirSync(DIR).filter(x => x.endsWith(".json") && x !== "glossary.json" && !x.includes("index") && ["services.json","tools.json","skills.json","resources.json"].includes(x))) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  for (const r of (j.records || [])) records.push(r);
}
// word index: word (lowercase, len>=3) -> ids
const index = {};
const stop = new Set(["the","and","for","with","that","this","from","are","was","not","you","your","can","its","into","when","has","had","one","all","but","out","how","what","why","who","run","use","may","also","new","get","top","key","own","per","via"]);
for (const r of records) {
  const text = [r.name, r.plain, ...(r.tags || []), ...(r.aliases || [])].join(" ").toLowerCase();
  for (const w of new Set(text.match(/[a-z][a-z0-9'-]{2,}/g) || [])) {
    if (stop.has(w)) continue;
    (index[w] = index[w] || []).push(r.id);
  }
}
// trim per-word lists to 40
for (const w of Object.keys(index)) if (index[w].length > 40) index[w] = index[w].slice(0, 40);
const counts = { records: records.length, indexWords: Object.keys(index).length };
const byKind = {}; const byStatus = {}; const byCategory = {};
for (const r of records) { byKind[r.kind] = (byKind[r.kind] || 0) + 1; byStatus[r.status] = (byStatus[r.status] || 0) + 1; byCategory[r.category] = (byCategory[r.category] || 0) + 1; }
fs.writeFileSync(path.join(DIR, "directory.index.json"), JSON.stringify({ generatedAt: new Date().toISOString(), counts, byKind, byStatus, byCategory, index }, null, 1));
// adopt glossary
const glossarySrc = "C:/Users/gener/.openclaw-autoclaw/workspace/.cluster/plain-language-pass-20260829/glossary.json";
if (fs.existsSync(glossarySrc)) fs.copyFileSync(glossarySrc, path.join(DIR, "glossary.json"));
console.log("directory built:", counts.records, "records,", counts.indexWords, "index words · glossary adopted");
