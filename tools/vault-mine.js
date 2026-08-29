#!/usr/bin/env node
// tools/vault-mine.js — zone-targeted vault search with rubric pre-scoring.
// Usage: node tools/vault-mine.js <zone-relative-path> [--keywords kw1,kw2] [--limit N] [--out file.md]
// Scores every .md note in the zone (and one subdir level) on the plan's rubric heuristics:
//   signal (uniqueness: headings, custom structure), proof (code blocks, links to repos/renders),
//   teachability (heading hierarchy, lists), freshness (mtime), privacy (via privacy-scan rules),
//   effort (size). Output: compact ranked markdown table. Read-only; never modifies the vault.
const fs = require("fs");
const path = require("path");

const VAULT = "C:/Users/gener/.Obsidian-Starter-Vault";
const args = process.argv.slice(2);
const zone = args[0];
if (!zone) { console.error("usage: node tools/vault-mine.js <zone> [--keywords a,b] [--limit N] [--out file.md]"); process.exit(1); }
const kwIdx = args.indexOf("--keywords");
const keywords = kwIdx >= 0 ? args[kwIdx + 1].split(",").map(s => s.toLowerCase()) : [];
const limIdx = args.indexOf("--limit");
const limit = limIdx >= 0 ? parseInt(args[limIdx + 1], 10) : 25;
const outIdx = args.indexOf("--out");
const outFile = outIdx >= 0 ? args[outIdx + 1] : null;

const PRIVACY = [
  [/sk-[A-Za-z0-9_-]{16,}/, "api key (sk-)"],
  [/ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}/, "github token"],
  [/AKIA[0-9A-Z]{16}/, "aws key"],
  [/AIza[0-9A-Za-z_-]{30,}/, "google key"],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, "slack token"],
  [/Bearer\s+[A-Za-z0-9._-]{25,}/i, "bearer token"],
  [/password\s*[:=]\s*\S+/i, "password literal"],
  [/api[_-]?key\s*[:=]\s*['"]?[A-Za-z0-9_-]{16,}/i, "api key assignment"],
];

function privacyScore(text) {
  const hits = [];
  for (const [re, label] of PRIVACY) if (re.test(text)) hits.push(label);
  if (/\b(192\.168|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7]))\.\d{1,3}\.\d{1,3}\b/.test(text)) hits.push("private/tailnet IP");
  if (/\.env\b/.test(text)) hits.push(".env reference");
  return { score: hits.length ? 0 : 5, hits: [...new Set(hits)] };
}

function walk(dir, depth, acc) {
  if (depth < 0) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if ([".obsidian", ".trash", ".git", ".smart-env", "node_modules", "__pycache__"].includes(e.name)) continue;
      walk(p, depth - 1, acc);
    } else if (e.name.toLowerCase().endsWith(".md")) {
      acc.push(p);
    }
  }
}

const root = path.join(VAULT, zone);
if (!fs.existsSync(root)) { console.error(`FATAL: zone not found: ${root}`); process.exit(1); }
const files = [];
walk(root, 1, files); // zone root + one subdir level per plan's targeted-mining model

const rows = [];
for (const f of files) {
  let text = "";
  try { text = fs.readFileSync(f, "utf8"); } catch { continue; }
  const rel = path.relative(VAULT, f).replace(/\\/g, "/");
  const stat = fs.statSync(f);
  const lines = text.split(/\r?\n/);
  const headings = lines.filter(l => /^#{1,3}\s/.test(l)).length;
  const codeFences = (text.match(/```/g) || []).length / 2;
  const listItems = lines.filter(l => /^\s*([-*]|\d+\.)\s/.test(l)).length;
  const fm = text.startsWith("---") ? text.split("---")[1] || "" : "";
  const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const title = titleMatch ? titleMatch[1] : path.basename(f, ".md");
  const priv = privacyScore(text);
  const kwHit = keywords.filter(k => text.toLowerCase().includes(k)).length;
  const kwBoost = keywords.length ? (kwHit / keywords.length) * 2 : 1;
  const proof = Math.min(5, Math.round(codeFences + (text.match(/https?:\/\/(github|gist)/g) || []).length ? 1 : 0) + (codeFences > 0 ? 2 : 0));
  const teach = Math.min(5, Math.round(headings / 2 + (listItems > 5 ? 2 : 0)));
  const freshDays = (Date.now() - stat.mtimeMs) / 86400000;
  const fresh = freshDays < 30 ? 5 : freshDays < 90 ? 4 : freshDays < 180 ? 3 : 2;
  const signal = Math.min(5, 1 + Math.round(headings / 3) + (text.length > 4000 ? 1 : 0));
  const effort = text.length > 12000 ? "L" : text.length > 4000 ? "M" : "S";
  const total = kwBoost * ((signal + proof + teach + fresh + priv.score) / 5);
  rows.push({ rel, title, bytes: text.length, headings, code: codeFences, kw: `${kwHit}/${keywords.length}`, proof, teach, fresh, priv: priv.score, privHits: priv.hits, signal, effort, total: Math.round(total * 100) / 100 });
}
rows.sort((a, b) => b.total - a.total);
const top = rows.filter(r => r.priv === 5).slice(0, limit);
const blocked = rows.filter(r => r.priv !== 5);

const lines = [
  `# Vault mine — zone: ${zone}${keywords.length ? ` · keywords: ${keywords.join(", ")}` : ""}`,
  `Scanned ${rows.length} notes (${files.length} in scope). Privacy-blocked: ${blocked.length}. Showing top ${top.length} by rubric.`,
  "",
  "| # | score | title | note | bytes | kw | signal/proof/teach/fresh/priv | effort | privacy hits |",
  "|---|---|---|---|---|---|---|---|---|",
  ...top.map((r, i) => `| ${i + 1} | ${r.total} | ${r.title.slice(0, 60)} | ${r.rel} | ${r.bytes} | ${r.kw} | ${r.signal}/${r.proof}/${r.teach}/${r.fresh}/5 | ${r.effort} | ${r.privHits.join(", ") || "—"} |`),
];
if (blocked.length) lines.push("", `## Privacy-blocked (never publish without redaction)`, ...blocked.slice(0, 10).map(r => `- ${r.rel} — ${r.privHits.join(", ")}`));
const md = lines.join("\n");
if (outFile) { fs.writeFileSync(outFile, md, "utf8"); console.log(`wrote ${outFile}`); }
console.log(md);
