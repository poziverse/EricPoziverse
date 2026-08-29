#!/usr/bin/env node
// tools/privacy-scan.js — hard privacy gate for any text destined for the public site.
// Usage: node tools/privacy-scan.js <file> | cat via stdin. Exit 0 = safe, 1 = BLOCKED.
// Blocks: API keys, tokens, password literals, private/tailnet IPs, .env references,
// personal-data markers. This is the plan's hard gate — a BLOCKED file must be redacted
// and re-scanned before any draft reaches Eric.
const fs = require("fs");

const RULES = [
  [/sk-[A-Za-z0-9_-]{16,}/, "OpenAI-style API key (sk-)"],
  [/ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}/, "GitHub token"],
  [/AKIA[0-9A-Z]{16}/, "AWS access key"],
  [/AIza[0-9A-Za-z_-]{30,}/, "Google API key"],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, "Slack token"],
  [/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/, "JWT"],
  [/Bearer\s+[A-Za-z0-9._-]{25,}/i, "Bearer token"],
  [/(password|passwd|pwd)\s*[:=]\s*['"]?[^\s'"]{6,}/i, "password literal"],
  [/api[_-]?key\s*[:=]\s*['"]?[A-Za-z0-9_-]{16,}/i, "API key assignment"],
  [/secret\s*[:=]\s*['"]?[A-Za-z0-9_-]{16,}/i, "secret assignment"],
  [/\b(192\.168|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7]))\.\d{1,3}\.\d{1,3}\b/, "private/tailnet IP address"],
  [/\b10\.(0|1[0-7])\.\d{1,3}\.\d{1,3}\b/, "private 10.x IP"],
  [/\.env\b/, ".env reference"],
  [/BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/, "private key block"],
];

const input = process.argv[2] ? fs.readFileSync(process.argv[2], "utf8") : fs.readFileSync(0, "utf8");
const hits = [];
const lines = input.split(/\r?\n/);
lines.forEach((line, i) => {
  for (const [re, label] of RULES) {
    if (re.test(line)) hits.push(`L${i + 1}: ${label} — ${line.trim().slice(0, 90)}`);
  }
});
if (hits.length) {
  console.log(`BLOCKED — ${hits.length} finding(s):`);
  hits.slice(0, 25).forEach(h => console.log("  " + h));
  process.exit(1);
}
console.log("SAFE — no privacy findings.");
