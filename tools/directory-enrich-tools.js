#!/usr/bin/env node
// Enrichment: populate appearsIn on tool/service records by scanning the 13 article bodies
// for tool/service name mentions. Also adds two missing tool records (Qdrant, OpenWebUI).
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const DIR = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727/data/directory";
const PROJ = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727";
const today = "2026-08-29";

// load current directory records
const recs = {};
for (const f of ["services.json", "tools.json"]) {
  const p = path.join(DIR, f);
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  recs[f] = j;
}
const all = [...recs["services.json"].records, ...recs["tools.json"].records];

// load articles for mention scanning
const dataSrc = fs.readFileSync(path.join(PROJ, "assets", "js", "data.js"), "utf8");
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(dataSrc, ctx);
const P = ctx.window.POZIVERSE;
const strip = h => String(h || "").replace(/<[^>]+>/g, " ").toLowerCase();

// alias map: search terms per record id
const ALIASES = {
  "tool-ollama": ["ollama"], "tool-vllm": ["vllm"], "tool-litellm": ["litellm"],
  "tool-hyperframes": ["hyperframes", "hyperframes"], "tool-manim": ["manim"],
  "tool-remotion": ["remotion"], "tool-motion-canvas": ["motion canvas"],
  "tool-ffmpeg": ["ffmpeg"], "tool-opus-clip": ["opus clip"], "tool-webgpu": ["webgpu"],
  "tool-whisper": ["whisper"], "tool-elevenlabs": ["elevenlabs", "elevenlabs"],
  "tool-yutu": ["yutu"], "tool-rive": ["rive"], "tool-lottiefiles": ["lottiefiles", "lottie"],
  "tool-openclaw": ["openclaw"], "tool-mcp": ["MCP", "model context protocol"],
  "tool-playwright": ["playwright"], "tool-react": ["react"], "tool-github": ["github"],
  "tool-git": ["git,", "git "], "tool-hermes": ["hermes"], "tool-glassy": ["glassy"],
  "tool-openmontage": ["openmontage"], "tool-mission-control": ["mission control"],
  "tool-pulse": ["pulse"], "tool-gitea": ["gitea"], "tool-n8n": ["n8n"],
  "tool-tailscale": ["tailscale", "tailnet"], "tool-wireguard": ["wireguard"],
  "tool-proxmox": ["proxmox", "lxc", "lxcs"], "tool-nats": ["nats"], "tool-honcho": ["honcho"],
  "tool-claude": ["claude"], "tool-minimax-m3": ["minimax", "m3"], "tool-deepseek": ["deepseek"],
  "tool-vscode": ["vs code", "vscode"],
  "service-dashboard-server": ["mission control", "dashboard"],
  "service-kanban-api": ["kanban"], "service-caddy": ["caddy"],
  "service-today-bridge": ["today-bridge", "briefing"],
  "service-pulse-agent": ["pulse"], "service-nats": ["nats"],
  "service-hermes-gateway-wsl": ["hermes gateway"],
  "service-hermes-swarm": ["swarm", "orchestrator"],
  "service-npm-proxy": ["proxy manager", "front door"],
  "service-ollama-stack": ["ct 122", "app stack"],
  "service-litellm-ct123": ["litellm", "ct 123"],
  "service-honcho-ct107": ["honcho"], "service-gitea-mesh": ["gitea"],
  "service-mail-mesh": ["mail server", "maddy"], "service-tsidp": ["identity"],
  "service-hermes-desktop-app": ["desktop app"],
};

// scan: for each record, which articles mention it
let enriched = 0;
function enrich(list) {
  for (const r of list) {
    const terms = ALIASES[r.id];
    if (!terms) continue;
    const refs = new Set(r.appearsIn || []);
    for (const a of P.ARTICLES) {
      const body = strip(a.body) + " " + String(a.title || "").toLowerCase();
      for (const t of terms) {
        if (body.includes(t.toLowerCase())) { refs.add("article:" + a.slug); break; }
      }
    }
    const before = (r.appearsIn || []).length;
    r.appearsIn = [...refs].sort();
    if (r.appearsIn.length > before) enriched++;
  }
}
enrich(recs["services.json"].records);
enrich(recs["tools.json"].records);
// records without alias entries: try name-based match for tools
for (const r of recs["tools.json"].records) {
  if (r.appearsIn.length) continue;
  const nameL = (r.name || "").toLowerCase();
  if (nameL.length < 4) continue;
  for (const a of P.ARTICLES) {
    if (strip(a.body).includes(nameL)) { (r.appearsIn = r.appearsIn || []).push("article:" + a.slug); enriched++; break; }
  }
}

fs.writeFileSync(path.join(DIR, "services.json"), JSON.stringify(recs["services.json"], null, 1));
fs.writeFileSync(path.join(DIR, "tools.json"), JSON.stringify(recs["tools.json"], null, 1));
console.log("enriched appearsIn on", enriched, "records");

// new tool records: Qdrant + OpenWebUI
const NEW = [
{ id: "tool-qdrant", kind: "tool", name: "Qdrant", plain: "A vector database - it stores the numeric 'meaning' of documents so agents can search by ideas, not keywords.",
  description: "Qdrant runs inside the CT 122 app stack. When the vault-search service needs to find notes by meaning instead of exact words, Qdrant holds those meaning-vectors and answers fast. It is the reason 'find notes about routing' returns the right notes even when the word routing is absent.",
  tags: ["search", "ai", "self-hosted"], category: "infrastructure", level: "practitioner", status: "live",
  appearsIn: ["article:llm-routing-mesh"], related: ["tool-ollama", "service-ollama-stack"], aliases: ["vector database", "vector search"],
  provenance: { source: "vault 01_System/02_Infrastructure + CT 122 stack intake", verified: today }, links: [], updated: today, extra: {} },
{ id: "tool-openwebui", kind: "tool", name: "OpenWebUI", plain: "A self-hosted chat interface for AI models - your own private ChatGPT-style front end.",
  description: "OpenWebUI runs in the CT 122 app stack and gives every device on the network a clean chat interface to the local models. It pairs with the Ollama server on the same container: the models run locally, the interface runs in your browser, and nothing leaves the network.",
  tags: ["ai", "interface", "self-hosted"], category: "infrastructure", level: "foundation", status: "live",
  appearsIn: ["article:llm-routing-mesh"], related: ["tool-ollama", "service-ollama-stack"], aliases: ["chat ui", "web ui"],
  provenance: { source: "vault 01_System/02_Infrastructure + CT 122 stack intake", verified: today }, links: [], updated: today, extra: {} },
];
const tp = path.join(DIR, "tools.json");
const tj = JSON.parse(fs.readFileSync(tp, "utf8"));
for (const n of NEW) { if (!tj.records.some(x => x.id === n.id)) tj.records.push(n); else console.log("already present:", n.id); }
fs.writeFileSync(tp, JSON.stringify(tj, null, 1));
console.log("new tools added:", NEW.length, "| tools total:", tj.records.length);
