# The Mesh Directory — a beginner-first knowledge base for everything in the system
**Plan v1 · 2026-08-29 · Owner: EricPoziverse · Executing: main agent (+ M3+ for content)**
**Status: plan — build starts on approval**

---

## 1. What this is, in one paragraph

One organized, plain-language database of **every service, skill, tool, and resource** in the
Poziverse — written so a complete beginner can understand each entry. It feeds the whole
platform: article tags, context chips, related links, the glossary, page enrichment, and
ultimately the site's AI assistant ("Ask the Mesh"). It will be exposed as an **MCP server**,
so any agent or tool can query it. One record per thing. One place to update. Fast to query.
Easy to grow.

## 2. Why now (the problem it solves)

Today the ecosystem knowledge lives in scattered places: the vault (5,606 notes), the site's
data.js, the skill catalog mirror (412 SKILL.md files), service docs in TOOLS.md, and this
conversation. Three costs of that:

1. **The site repeats itself.** Every article re-explains what a tailnet or a watchdog is,
   with slightly different words. A canonical record means the glossary, the chips, and the
   related links all come from one source.
2. **The AI assistant has no ground truth.** "Ask the Mesh" needs a trusted, beginner-friendly
   corpus with receipts. A structured directory is that corpus — with citations built in.
3. **Growth has no front door.** New skills, tools, and services arrive weekly. Without a
   schema and an intake command, each new thing is a manual edit in five places.

## 3. Design principles

1. **Beginner first** — every record's `plain` and `description` fields follow the
   plain-language contract (grade ≤ 8.5, friendly teacher tone). The technical detail lives in
   `detail`, linked but not required reading.
2. **One record per entity** — a canonical id per service/skill/tool/resource. Aliases for
   search. No duplicate records.
3. **Flat files, in memory** — a single `directory.json` (estimated 300–600KB at current
   scale) plus a generated search index. Reads are instant; no database server needed.
4. **Growth without schema changes** — core fields are fixed; everything optional lives in an
   `extra` object. New kinds can be added later without breaking existing records.
5. **Privacy gate always** — every imported record passes `privacy-scan.js` (no IPs, tokens,
   private hostnames) before it can become public content.

## 4. The data model

Four kinds. One shape. Core fields fixed, extras open.

```json
{
  "id": "service-dashboard-server",
  "kind": "service",
  "name": "Dashboard Server",
  "plain": "The home page of the studio: one screen that shows every service at a glance.",
  "description": "Short beginner description: what it is, what it does for you, why it matters. 3-6 sentences.",
  "detail": "Optional deeper technical paragraph for the curious. Linked, not required.",
  "tags": ["automation", "monitoring"],
  "category": "infrastructure",
  "level": "foundation",
  "status": "live",
  "appearsIn": ["article:year-of-the-mesh", "lesson:lx-006", "page:club.html"],
  "related": ["service-kanban-api", "tool-ollama"],
  "aliases": ["MC dashboard", "mission control dashboard"],
  "glossary": "kanban",
  "provenance": { "source": "vault 02_Projects/mission-control-ii", "verified": "2026-08-29" },
  "links": [{ "label": "Live dashboard", "url": "https://..." }],
  "updated": "2026-08-29"
}
```

| Field | Rule |
|---|---|
| `id` | `kind-slug`, permanent once created |
| `kind` | `service` · `skill` · `tool` · `resource` (more can be added later) |
| `plain` | ONE sentence, grade ≤ 8.5 — the card headline everywhere |
| `description` | 3–6 short sentences for beginners |
| `detail` | optional technical depth |
| `tags` / `category` / `level` | controlled vocabularies (small, fixed lists) |
| `appearsIn` | where the entity is discussed on the site (reverse index for "related") |
| `related` | ids of connected entities (the graph) |
| `glossary` | optional link to a glossary term |
| `status` | `live` · `beta` · `planned` · `resting` — honest states, per the site doctrine |
| `provenance` | where the record came from (vault path, catalog path) + verification date |

**The four kinds, concretely:**

| Kind | What it covers | Current scale (inventory, below) |
|---|---|---|
| `service` | Running pieces of the mesh: dashboard-server, kanban-api, Pulse, caddy, today-bridge, jarvis, a2a, marketplace-watcher, Gitea, NATS… | ~15 always-on services |
| `skill` | Everything in the canonical skill catalog (the 200 privacy-clean SKILL.md files) + the 21 published Library artifacts | ~200 importable now, 412 total |
| `tool` | Software and engines named across the site: Ollama, vLLM, LiteLLM, HyperFrames, Manim, Remotion, Motion Canvas, FFmpeg, Opus Clip, WebGPU Whisper, ElevenLabs, yutu, Rive, LottieFiles, Impeccable, OpenClaw, Hermes, Glassy, OpenMontage, Mission Control, Pulse, Gitea, n8n, Tailscale, WireGuard, Proxmox… | ~40 named across 13 articles |
| `resource` | Guides, blueprints, runbooks, and reference docs worth pointing learners to | ~50 starter set from the vault |

## 5. Where it lives

```
website project/
  data/directory/
    directory.json        ← the one source of truth (all records)
    directory.index.json  ← generated search index (tags, aliases, words)
    glossary.json         ← derived FROM directory records (kind: term)
  tools/
    directory-validate.js  ← schema + link checker (fails loudly)
    directory-build.js     ← builds the index + glossary from directory.json
    directory-import-*.js  ← importers (services, skills, tools, resources)
  mcp/
    directory-mcp.js       ← the MCP server (reads directory.json, in memory)
```

The directory is versioned in the site's GitHub repo (EricPoziverse) — every change is a
commit, and the deploy pipeline already ships the folder.

## 6. The MCP server (the "maybe" that becomes real in P2)

A zero-dependency Node MCP server exposing the directory. In-memory JSON + prebuilt index:
every query answers in under a millisecond.

| Tool | What it answers |
|---|---|
| `directory.search(query, kind?, tag?, level?)` | ranked matches across names, summaries, tags, aliases |
| `directory.get(id)` | one full record + its related ids |
| `directory.related(id)` | the graph neighborhood |
| `directory.byPage(pageOrSlug)` | everything a given page discusses |
| `directory.glossary()` | all glossary terms with definitions |
| `directory.stats()` | counts by kind, category, level |

Transport decision (flagged): start **local stdio / tailnet-only HTTP** — the assistant and
the mesh agents are the first consumers. A public read-only endpoint is a later, separate
decision (it would also power site search without any backend on the page side).

## 7. How it feeds every surface (the point of the whole thing)

| Surface | Fed by | Mechanism |
|---|---|---|
| Glossary | directory records with `glossary` links | `directory-build.js` regenerates glossary.json (currently a hand-kept 69-term file) |
| Article/lesson tags | canonical `tags` | tag vocabulary converges over time |
| Context chips | `appearsIn` reverse index | "Also in this story: Pulse, LiteLLM" chips on articles |
| Related links | `related` graph | "Related" sections built from the graph, not hand-picked |
| Ask the Mesh (AI assistant) | MCP queries | RAG over records, each answer citing its record id + receipt |
| Learning Annex | `level` + `category` | lesson/path alignment checks |
| Downloads/Library | `status` + `provenance` | honest states stay automatic |

## 8. Ingestion pipeline (how a new thing enters)

```
DISCOVER (importer scans a source zone: systemctl, catalog/, data.js, vault folders)
  ↓
DRAFT (importer creates a record: plain + description auto-drafted from source, rubric-scored)
  ↓
PRIVACY GATE (privacy-scan.js — hard block on IPs/tokens/personal data)
  ↓
PLAIN PASS (rewrite per the plain-language contract; glossary terms marked)
  ↓
VALIDATE (directory-validate.js: schema, unique id, related ids exist, appearsIn resolves)
  ↓
APPROVE (Eric, one-line batch review)
  ↓
PUBLISH (directory-build.js → index + glossary; MCP picks it up on restart/refresh)
```

## 9. Build phases

| Phase | What ships | Effort |
|---|---|---|
| **P0 — Foundation** | schema doc, `directory-validate.js`, `directory-build.js`, empty `directory.json`, storage location, git versioning | ~half a day |
| **P1 — Importers + first records** | services importer (live systemctl + TOOLS.md), skills importer (catalog scan → 200 clean), tools importer (data.js + vault proper-nouns), plain-language pass per record, privacy gate | 2–3 sessions |
| **P2 — MCP server** | zero-dep Node MCP with the 6 tools above, tests, tailnet exposure | 1 session |
| **P3 — Site integrations** | glossary derivation, context chips, related links, tag convergence | 1–2 sessions |
| **P4 — Ask the Mesh** | assistant RAG over the directory MCP, receipts per answer | 1–2 sessions |
| **P5 — Growth loop** | add-entity command, weekly sync cron, stats card in Mission Control | 1 session |

## 10. Inventory (ground truth, verified 2026-08-29 by the inventory agent)

| Source | Ground truth |
|---|---|
| **Services** | 30 mesh-relevant units running on ct207 (of 40 total). Core: dashboard-server :3000, kanban-api :3002, marketplace-watcher :3100, jarvis :8000, a2a :8001, today-bridge :3180, caddy :8443, LangGraph trio :8102–8104, NATS bus, 2 vault-search services, godview-gateway :8050, herdr :7681, voice stack. Pulse verified healthy on CT103. |
| **Skills** | 419 SKILL.md files across 155 category folders. Giants: devops 140, software-development 43, creative 26, research 17, productivity 16, github 10, mlops 8. ~130 folders are single-skill. |
| **Published Library** | 21 ids confirmed in data.js (107,259 bytes, 16 POZIVERSE sections). |
| **Tools** | Grounded mention counts in the public articles: Ollama 18, Hermes 18, Glassy 17, OpenMontage 15, HyperFrames 13, Whisper 13, Rive 9, Proxmox 9. **Zero public mentions**: Tailscale, WireGuard, Gitea, NATS, Honcho, n8n, yutu — used daily, never explained. The directory is where they get their first beginner-facing records. |
| **Resources** | 02_Projects: 111 project folders · 01_System/02_Infrastructure: 782 notes · 03_Knowledge: 343 notes · 05_Agent_Work/02_Skills: 2,454 files (includes the 419 SKILL.md). |

**Finding that shaped P1:** the biggest gap is not volume — it is the seven tools used every day but never explained publicly. The directory's first batch prioritizes those.

## 11. Open decisions (defaults chosen; Eric can override)

1. **Repo name**: `EricPoziverse` (created 2026-08-29) also holds the directory — one repo for site + directory. Default: yes.
2. **MCP transport**: tailnet-only HTTP first; public read-only later. Default: tailnet.
3. **Ask the Mesh exposure**: answers cite records; no live system details beyond what the site already publishes. Default: published-corpus-only.
4. **Skill records**: all 200 clean skills imported, or only the ~40 most useful first? Default: top 40 first, then the long tail.

## 12. What this is NOT (YAGNI floor)

- Not a database server (flat files + memory are enough at this scale).
- Not a public API on day one.
- Not a second vault — it references the vault, never duplicates it.
- Not AI-generated filler — every record passes the same plain-language and honesty gates as the site.
