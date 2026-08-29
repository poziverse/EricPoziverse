#!/usr/bin/env node
// Importer: skills — scans the canonical catalog, privacy-gates, imports as drafts; published ones as live.
const fs = require("fs");
const path = require("path");
const OUT = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727/data/directory";
const CATALOG = "C:/Users/gener/.Obsidian-Starter-Vault/05_Agent_Work/02_Skills/catalog";
fs.mkdirSync(OUT, { recursive: true });
const today = "2026-08-29";

// privacy rules (mirror of tools/privacy-scan.js, compact)
const PRIVACY = [
  [/sk-[A-Za-z0-9_-]{16,}/, "api key"], [/ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}/, "github token"],
  [/AKIA[0-9A-Z]{16}/, "aws key"], [/AIza[0-9A-Za-z_-]{30,}/, "google key"],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, "slack token"], [/Bearer\s+[A-Za-z0-9._-]{25,}/i, "bearer token"],
  [/password\s*[:=]\s*\S+/i, "password"], [/api[_-]?key\s*[:=]\s*['"]?[A-Za-z0-9_-]{16,}/i, "api key assignment"],
  [/\b(192\.168|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7]))\.\d{1,3}\.\d{1,3}\b/, "private IP"], [/\.env\b/, ".env reference"],
];
function privacy(text) { for (const [re, label] of PRIVACY) if (re.test(text)) return label; return null; }

// published library ids (from data.js)
const dataSrc = fs.readFileSync("C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727/assets/js/data.js", "utf8");
const vm = require("vm");
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(dataSrc, ctx);
const published = new Map((ctx.window.POZIVERSE.LIBRARY || []).map(c => [c.id, c]));

const records = [];
let blocked = 0;
function walk(dir, rel, depth) {
  if (depth < 0) return;
  let entries; try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if ([".obsidian", "_archive", "node_modules"].includes(e.name)) continue;
      walk(p, rel + "/" + e.name, depth - 1);
    } else if (e.name === "SKILL.md") {
      let text = ""; try { text = fs.readFileSync(p, "utf8"); } catch { continue; }
      const cat = rel.replace("05_Agent_Work/02_Skills/catalog/", "").replace(/^\//, "").split("/")[0] || "uncategorized";
      const fm = text.startsWith("---") ? text.split("---")[1] || "" : "";
      const nameM = fm.match(/^name:\s*(.+)$/m);
      const descM = fm.match(/^description:\s*(.+)$/m);
      const name = (nameM ? nameM[1] : e.name.replace(/[-_]/g, " ")).trim();
      const desc = (descM ? descM[1] : "").trim();
      const skillId = path.basename(path.dirname(p));
      const pub = published.get(skillId);
      const plainFirst = (desc || name).split(/(?<=[.!?])\s+/)[0].slice(0, 140);
      const priv = privacy((name + " " + desc + " " + plainFirst));
      if (priv) { blocked++; continue; }
      records.push({
        id: "skill-" + skillId, kind: "skill", name: name.charAt(0).toUpperCase() + name.slice(1),
        plain: plainFirst.charAt(0).toUpperCase() + plainFirst.slice(1),
        description: desc || ("A skill from the " + cat + " collection. Full instructions in its catalog entry."),
        detail: null,
        tags: [cat, "skill"], category: cat,
        level: "practitioner", status: pub ? "live" : "draft",
        appearsIn: pub ? ["library.html", (pub.receipt && pub.receipt.url) || "library.html"] : [],
        related: [], aliases: [],
        glossary: null,
        provenance: { source: "vault " + rel + "/SKILL.md", verified: today },
        links: [], updated: today,
        extra: pub ? { libraryCard: true, license: (pub.license && pub.license.spdx) || null } : { importNote: "auto-imported draft — plain-language pass pending" },
      });
    }
  }
}
walk(CATALOG, "05_Agent_Work/02_Skills/catalog", 2);
// dedupe by id
const seen = new Set(); const clean = records.filter(r => !seen.has(r.id) && seen.add(r.id));
fs.writeFileSync(path.join(OUT, "skills.json"), JSON.stringify({ kind: "skill", records: clean }, null, 1));
console.log("skills imported:", clean.length, "| privacy-blocked:", blocked, "| live (published):", clean.filter(r => r.status === "live").length);
