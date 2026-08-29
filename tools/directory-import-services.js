#!/usr/bin/env node
// Importer: services — parses the inventory report's service tables into directory records.
const fs = require("fs");
const path = require("path");
const WORK = "C:/Users/gener/.openclaw-autoclaw/workspace/.cluster/plain-language-pass-20260829";
const OUT = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727/data/directory";
fs.mkdirSync(OUT, { recursive: true });
const report = fs.readFileSync(path.join(WORK, "inventory-report.md"), "utf8");
const today = "2026-08-29";

const records = [];
// markdown table rows: | unit | **port** | description |
const re = /^\|\s*([a-zA-Z0-9._-]+(?:\.service)?)\s*\|\s*\*{0,2}([^|*]*?)\*{0,2}\s*\|\s*([^|]+)\|\s*$/gm;
let m;
while ((m = re.exec(report)) !== null) {
  const unit = m[1].replace(/\.service$/, "");
  const port = m[2].trim();
  const desc = m[3].trim().replace(/\b\d{1,3}(\.\d{1,3}){3}\b/g, "[private address]");
  if (!desc || desc.length < 10 || /---/.test(desc)) continue;
  const name = unit.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const plain = desc.split(/(?<=[.!?])\s+/)[0].replace(/\*\*/g, "");
  const id = "service-" + unit;
  if (records.some(r => r.id === id)) continue;
  records.push({
    id, kind: "service", name,
    plain: plain.length > 140 ? plain.slice(0, 137).replace(/\s\S*$/, "") + "…" : plain,
    description: desc.replace(/\*\*/g, ""),
    tags: ["mesh", (port && /\d/.test(port)) ? "networked" : "background"],
    category: "infrastructure",
    level: "foundation",
    status: "live",
    appearsIn: [],
    related: [],
    aliases: [],
    provenance: { source: "live systemctl inventory 2026-08-29", verified: today },
    links: port && /\d{4}/.test(port) ? [{ label: "Port " + port.replace(/\*\*/g, ""), url: "" }] : [],
    updated: today,
    extra: { port: port.replace(/\*\*/g, "") || null },
  });
}
// Pulse lives on its own host — enrich
const pulse = records.find(r => r.id === "service-pulse");
if (pulse) { pulse.plain = "The fleet health monitor: watches every machine and service and powers the health panels."; pulse.appearsIn = ["article:year-of-the-mesh"]; }

fs.writeFileSync(path.join(OUT, "services.json"), JSON.stringify({ kind: "service", records }, null, 1));
console.log("services imported:", records.length);
