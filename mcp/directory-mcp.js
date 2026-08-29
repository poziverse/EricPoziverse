#!/usr/bin/env node
// directory-mcp.js — The Mesh Directory as an MCP server (zero dependencies).
// Transports: POST /mcp (MCP JSON-RPC 2.0, stateless streamable-HTTP) + simple REST under /api/*.
// Data: reads data/directory/*.json at startup; auto-reloads when files change (mtime check).
// Usage: node mcp/directory-mcp.js [--port 3210] [--host 127.0.0.1]
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "data", "directory");
const args = process.argv.slice(2);
const portIdx = args.indexOf("--port");
const hostIdx = args.indexOf("--host");
const PORT = portIdx >= 0 ? parseInt(args[portIdx + 1], 10) : 3210;
const HOST = hostIdx >= 0 ? args[hostIdx + 1] : "127.0.0.1";

const SERVER_INFO = { name: "mesh-directory", version: "1.0.0" };
const PROTOCOL_VERSION = "2025-03-26";

// ---------- data layer (mtime-triggered reload) ----------
let DATA = null; let DATA_MTIME = 0; let GLOSSARY = null;
function loadData(force) {
  try {
    let latest = 0;
    for (const f of ["services.json", "tools.json", "skills.json", "resources.json"]) {
      const st = fs.statSync(path.join(DIR, f)); if (st.mtimeMs > latest) latest = st.mtimeMs;
    }
    if (!force && DATA && latest === DATA_MTIME) return;
    DATA_MTIME = latest;
    const records = [];
    for (const f of ["services.json", "tools.json", "skills.json", "resources.json"]) {
      try { for (const r of JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")).records || []) records.push(r); } catch {}
    }
    DATA = { records, byId: new Map(records.map(r => [r.id, r])) };
    try { GLOSSARY = JSON.parse(fs.readFileSync(path.join(DIR, "glossary.json"), "utf8")).glossary || []; } catch { GLOSSARY = []; }
  } catch (e) { console.error("data load error:", e.message); }
}
loadData(true);
setInterval(() => loadData(false), 5000); // periodic refresh (mtime-check is near-free)

const stripTags = h => String(h || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const words = t => (String(t || "").toLowerCase().match(/[a-z][a-z0-9'-]{2,}/g) || []);

function search(params) {
  loadData(false);
  const q = String(params.query || "").toLowerCase();
  const kind = params.kind ? String(params.kind) : null;
  const tag = params.tag ? String(params.tag).toLowerCase() : null;
  const level = params.level ? String(params.level) : null;
  const qWords = words(q);
  const scored = [];
  for (const r of DATA.records) {
    if (kind && r.kind !== kind) continue;
    if (level && r.level !== level) continue;
    if (tag && !(r.tags || []).some(t => t.toLowerCase().includes(tag))) continue;
    let score = 0;
    const name = (r.name || "").toLowerCase();
    if (q && name.includes(q)) score += 6;
    for (const w of qWords) { if (name.includes(w)) score += 3; if ((r.plain || "").toLowerCase().includes(w)) score += 2; if ((r.description || "").toLowerCase().includes(w)) score += 1; if ((r.tags || []).some(t => t.toLowerCase().includes(w))) score += 2; if ((r.aliases || []).some(a => a.toLowerCase().includes(w))) score += 3; }
    if (q && score === 0) continue;
    if (!q && score === 0) score = 1; // unfiltered listing
    scored.push({ score, r });
  }
  scored.sort((a, b) => b.score - a.score || a.r.id.localeCompare(b.r.id));
  return scored.slice(0, (parseInt(params.limit, 10) || 10)).map(s => ({ id: s.r.id, kind: s.r.kind, name: s.r.name, plain: s.r.plain, status: s.r.status, tags: s.r.tags, score: s.score }));
}

function getRecord(params) {
  loadData(false);
  return DATA.byId.get(String(params.id || "")) || null;
}

function related(params) {
  const r = getRecord(params);
  if (!r) return null;
  const rels = (r.related || []).map(id => { const t = DATA.byId.get(id); return t ? { id: t.id, kind: t.kind, name: t.name, plain: t.plain } : null; }).filter(Boolean);
  const appears = (r.appearsIn || []);
  return { record: { id: r.id, name: r.name, plain: r.plain }, related: rels, appearsIn: appears };
}

function byPage(params) {
  loadData(false);
  let ref = String(params.page || params.id || "");
  if (!ref) return [];
  // accept "year-of-the-mesh" → "article:year-of-the-mesh"; "club" → "page:club.html"
  const tries = [ref];
  if (!ref.includes(":")) { tries.push("article:" + ref, "page:" + (ref.endsWith(".html") ? ref : ref + ".html"), "lesson:" + ref); }
  const out = [];
  for (const r of DATA.records) {
    for (const a of (r.appearsIn || [])) {
      if (tries.includes(a)) { out.push({ id: r.id, kind: r.kind, name: r.name, plain: r.plain, ref: a }); break; }
    }
  }
  return out;
}

function glossary() { loadData(false); return GLOSSARY; }

function stats() {
  loadData(false);
  const byKind = {}; const byStatus = {}; const byCategory = {};
  for (const r of DATA.records) { byKind[r.kind] = (byKind[r.kind] || 0) + 1; byStatus[r.status] = (byStatus[r.status] || 0) + 1; byCategory[r.category] = (byCategory[r.category] || 0) + 1; }
  return { records: DATA.records.length, byKind, byStatus, byCategory, glossaryTerms: GLOSSARY.length };
}

// ---------- MCP tools ----------
const TOOLS = [
  { name: "directory_search", description: "Search the Mesh Directory: every service, skill, tool, and resource of the Poziverse, described in plain language. Returns the top matches with id, kind, name, one-line summary, status, and tags.", inputSchema: { type: "object", properties: { query: { type: "string", description: "words to look for, e.g. 'video render' or 'tailnet'" }, kind: { type: "string", enum: ["service", "skill", "tool", "resource"], description: "optional filter by kind" }, tag: { type: "string", description: "optional tag filter" }, level: { type: "string", enum: ["foundation", "practitioner", "deep-dive"], description: "optional level filter" }, limit: { type: "number", description: "max results (default 10)" } }, required: ["query"] } },
  { name: "directory_get", description: "Get one full record by id (e.g. 'tool-ollama' or 'service-dashboard-server').", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  { name: "directory_related", description: "Get a record's neighborhood: related entities and the site pages it appears on.", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  { name: "directory_by_page", description: "List everything the directory knows about a given site page or article (by slug, e.g. 'year-of-the-mesh', or 'club').", inputSchema: { type: "object", properties: { page: { type: "string" } }, required: ["page"] } },
  { name: "directory_glossary", description: "The plain-language glossary: every technical term kept on the site, defined simply.", inputSchema: { type: "object", properties: {} } },
  { name: "directory_stats", description: "Directory statistics: record counts by kind, status, and category.", inputSchema: { type: "object", properties: {} } },
];

function callTool(name, args2) {
  switch (name) {
    case "directory_search": return search(args2 || {});
    case "directory_get": return getRecord(args2 || {});
    case "directory_related": return related(args2 || {});
    case "directory_by_page": return byPage(args2 || {});
    case "directory_glossary": return glossary();
    case "directory_stats": return stats();
    default: throw new Error("unknown tool: " + name);
  }
}

// ---------- MCP JSON-RPC handler ----------
function handleRpc(body) {
  const { id, method, params } = body;
  const isNotification = id === undefined || id === null;
  try {
    if (method === "initialize") {
      return { jsonrpc: "2.0", id, result: { protocolVersion: PROTOCOL_VERSION, capabilities: { tools: {} }, serverInfo: SERVER_INFO } };
    }
    if (method === "notifications/initialized") return null; // notification: no response body
    if (method === "ping") return { jsonrpc: "2.0", id, result: {} };
    if (method === "tools/list") return { jsonrpc: "2.0", id, result: { tools: TOOLS } };
    if (method === "tools/call") {
      const name = params && params.name;
      const result = callTool(name, (params && params.arguments) || {});
      const text = JSON.stringify(result, null, 1);
      return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: text === "null" ? "Not found. Check the id." : text }], isError: result === null } };
    }
    if (!isNotification) return { jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found: " + method } };
    return null;
  } catch (e) {
    if (isNotification) return null;
    return { jsonrpc: "2.0", id, error: { code: -32603, message: "Internal error: " + e.message } };
  }
}

// ---------- HTTP server ----------
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://" + (req.headers.host || "localhost"));
  const send = (code, body, type) => { res.writeHead(code, { "Content-Type": type || "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type, Authorization, Mcp-Session-Id", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" }); res.end(body); };
  if (req.method === "OPTIONS") { res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type, Authorization, Mcp-Session-Id", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" }); return res.end(); }
  const p = url.pathname;
  if (p === "/mcp" && req.method === "POST") {
    let raw = "";
    req.on("data", c => { raw += c; if (raw.length > 2e6) req.destroy(); });
    req.on("end", () => {
      try {
        const body = JSON.parse(raw);
        const resp = handleRpc(body);
        if (resp === null) { res.writeHead(202, { "Content-Type": "application/json" }); return res.end("{}"); }
        send(200, JSON.stringify(resp));
      } catch (e) { send(400, JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error: " + e.message } })); }
    });
    return;
  }
  if (p === "/mcp" && req.method === "GET") { res.writeHead(405, { "Content-Type": "application/json" }); return res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: "POST JSON-RPC messages to /mcp" } })); }
  if (p === "/api/search") return send(200, JSON.stringify(search({ query: url.searchParams.get("q") || "", kind: url.searchParams.get("kind") || undefined, tag: url.searchParams.get("tag") || undefined, limit: url.searchParams.get("limit") || 10 }), null, 1));
  if (p === "/api/get") { const r = getRecord({ id: url.searchParams.get("id") }); return send(r ? 200 : 404, JSON.stringify(r, null, 1)); }
  if (p === "/api/related") return send(200, JSON.stringify(related({ id: url.searchParams.get("id") }), null, 1));
  if (p === "/api/page") return send(200, JSON.stringify(byPage({ page: url.searchParams.get("page") }), null, 1));
  if (p === "/api/glossary") return send(200, JSON.stringify(glossary(), null, 1));
  if (p === "/api/stats") return send(200, JSON.stringify(stats(), null, 1));
  if (p === "/" || p === "/health") return send(200, JSON.stringify({ server: SERVER_INFO, mcp: "POST JSON-RPC to /mcp", rest: ["/api/search?q=", "/api/get?id=", "/api/related?id=", "/api/page?page=", "/api/glossary", "/api/stats"], records: stats().records }));
  send(404, JSON.stringify({ error: "not found" }));
});

server.listen(PORT, HOST, () => console.log(`mesh-directory MCP server on http://${HOST}:${PORT} — POST JSON-RPC to /mcp · REST under /api/* · records: ${stats().records}`));
