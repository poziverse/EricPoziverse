#!/usr/bin/env node
// directory-validate.js — schema, uniqueness, link, privacy, and cross-reference checks. Fails loudly.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const DIR = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727/data/directory";
const PROJ = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727";
const KINDS = ["service", "skill", "tool", "resource"];
const STATUSES = ["live", "beta", "draft", "planned", "resting"];
let errors = []; let warns = [];

const records = [];
for (const f of fs.readdirSync(DIR).filter(x => x.endsWith(".json") && x !== "glossary.json" && !x.includes("index"))) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  for (const r of (j.records || [])) { records.push(r); r.__file = f; }
}
console.log("records:", records.length);

// unique ids
const ids = new Set();
for (const r of records) {
  if (ids.has(r.id)) errors.push(`duplicate id: ${r.id}`);
  ids.add(r.id);
}
// required fields + enums
for (const r of records) {
  for (const f of ["id", "kind", "name", "plain", "description"]) {
    if (r[f] === undefined || r[f] === null || r[f] === "") errors.push(`${r.id}: missing ${f}`);
  }
  if (!KINDS.includes(r.kind)) errors.push(`${r.id}: bad kind ${r.kind}`);
  if (!STATUSES.includes(r.status)) errors.push(`${r.id}: bad status ${r.status}`);
  if (typeof r.plain === "string" && r.plain.length > 160) warns.push(`${r.id}: plain longer than 160 chars (${r.plain.length})`);
}
// appearsIn resolves: article slugs against data.js, pages against real files
const dataSrc = fs.readFileSync(path.join(PROJ, "assets", "js", "data.js"), "utf8");
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(dataSrc, ctx);
const P = ctx.window.POZIVERSE;
const slugs = new Set((P.ARTICLES || []).map(a => a.slug));
const lessonIds = new Set((P.LESSONS || []).map(l => l.id));
const pageFiles = new Set(fs.readdirSync(PROJ).filter(f => f.endsWith(".html")));
for (const r of records) {
  for (const ref of (r.appearsIn || [])) {
    if (ref.startsWith("article:")) { const s = ref.slice(8); if (!slugs.has(s)) errors.push(`${r.id}: appearsIn unknown article slug "${s}"`); }
    else if (ref.startsWith("lesson:")) { const s = ref.slice(7); if (!lessonIds.has(s)) errors.push(`${r.id}: appearsIn unknown lesson "${s}"`); }
    else if (ref.startsWith("page:")) { /* page:club.html handled at build */ }
    else if (ref.endsWith(".html") || /\.html\?/.test(ref)) { const file = ref.split("?")[0]; if (!pageFiles.has(file)) warns.push(`${r.id}: appearsIn unknown page "${file}"`); }
    else if (ref === "library.html" || ref === "now.html" || ref === "club.html" || ref === "annex.html") { /* known page */ }
    else warns.push(`${r.id}: appearsIn unresolvable "${ref}"`);
  }
  for (const rel of (r.related || [])) if (!ids.has(rel)) warns.push(`${r.id}: related id not in directory: ${rel}`);
}
// privacy re-scan of public fields
const PRIVACY = [/sk-[A-Za-z0-9_-]{16,}/, /ghp_[A-Za-z0-9]{30,}/, /AKIA[0-9A-Z]{16}/, /\b(192\.168|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7]))\.\d{1,3}\.\d{1,3}\b/, /\.env\b/, /password\s*[:=]\s*\S+/i];
for (const r of records) {
  const t = JSON.stringify({ p: r.plain, d: r.description, n: r.name });
  for (const re of PRIVACY) if (re.test(t)) errors.push(`${r.id}: PRIVACY hit (${re.source.slice(0, 30)})`);
}
// stats
const byKind = {}; const byStatus = {};
for (const r of records) { byKind[r.kind] = (byKind[r.kind] || 0) + 1; byStatus[r.status] = (byStatus[r.status] || 0) + 1; }
console.log("by kind:", JSON.stringify(byKind));
console.log("by status:", JSON.stringify(byStatus));
console.log("errors:", errors.length, "| warnings:", warns.length);
if (errors.length) { console.log(errors.slice(0, 20).join("\n")); process.exit(1); }
if (warns.length) console.log(warns.slice(0, 10).join("\n"));
console.log("VALIDATE: OK");
