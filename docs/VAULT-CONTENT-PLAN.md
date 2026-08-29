# Vault → Platform Content Plan (methodical mining & organization)
**Date:** 2026-08-29 · Owner: EricPoziverse · Executing agent: m32 (content) + main (tooling)
**Vault:** `C:\Users\gener\.Obsidian-Starter-Vault` — **5,606 notes** (scanned 2026-08-29)
**Target:** From the Poziverse (`website-059e76f15f2587ffd57a0727`) — every section loaded with vault-grounded, receipt-backed content.

---

## 0. Principle (unchanged from the site's own contracts)

**"One idea, five surfaces" + "no receipt, no publish."** We are not filling a website; we
are promoting the best of 5,606 notes into public, teachable, proven form. Everything ships
through the fairness gate, the privacy gate, and the receipt rule. No vault note is copied
verbatim — each is *distilled* into its public form by an agent, approved by Eric.

## 1. What the vault actually holds (scanned ground truth)

| Zone | Notes | Content gold |
|---|---|---|
| `05_Agent_Work/02_Skills` | **2,454** | The Library's raw ore — public-safe skills & prompts |
| `02_Projects` | **1,298** | Build logs & runbooks → Transmissions, lessons, Watch twins: `mission-control-lab` (70), `proxiverse` (84), `content-creation` (98), `open-jarvis` (66), `poziverse-dashboard` (60), `orelai-template` (54), `wiki-pipeline` (45), `hermes-optimization` (30), `okf` (33), `pozi-loop-forge` (22), `tokenomics` (24), `legal-stack` (23), `songbook-tool` (15) |
| `01_System/02_Infrastructure` | **782** | Mesh/infra doctrine → The Mesh path, GPU offload, routing lessons |
| `00_Context` | 372 | Watcher reports, plans → Now-page notes, receipts |
| `03_Knowledge` | 342 | `07_External/Followed-Creators` (223) → Reply Threads; `01_AI_ML` (35), `06_Productivity` (25) → glossary & knowledge notes |
| `00_System/skills` | 30 | Curated skill shortlist already gated once |
| `06_Archive` + `.hermes/plans` | 84 | Historical receipts ("what the year changed") |

**Off-limits zones (never mined for public content):** `04_Personal`, `00_Human`, `待办`,
`.hermes` internals, anything with credentials. Enforced by the privacy gate below.

## 2. Strategy choice (three ways to mine)

| | **S1. Full audit first** | **S2. Section packs (recommended)** | **S3. Automation firehose** |
|---|---|---|---|
| Method | Score all 5,606 notes before publishing anything | Define each section's "content pack", mine only the zones that feed it, ship weekly | Agent auto-distills + publishes on a cadence |
| Pros | Complete map, no stone unturned | Content ships from week 1; feedback shapes later packs | Maximum volume |
| Cons | Weeks of mining before anything ships; map goes stale; decision fatigue | Zone view, not global view | Slop risk — violates the anti-slop floor |
| Verdict | Overkill | **Do this** | Rejected |

**S2 with an audit backstop:** a lightweight full-vault tag/title index (no full reads) is
generated once for search — the ~30-min mechanical pass — but all deep reading is
pack-driven.

## 3. Per-section content packs (what "amazing" means, and how many)

| Site section | Content pack definition | Source zones | 30-day target | 90-day target |
|---|---|---|---|---|
| **Field Log (Transmissions)** | Deep essay (1,200–1,800 w) + receipts + objective/prereqs/thread links | `02_Projects` build logs, `01_System/02_Infrastructure` | 4 new (T-013..T-016) + deepen T-001..T-006 with real receipt links | 12 new; every transmission has ≥2 working receipts |
| **Learning Annex** | Per lesson: full teaching body, run-along exercise, checkpoint (2–3 Q), completion receipt rule | path-mesh ← `proxiverse`, `02_Infrastructure`; path-production ← `content-creation`, `hermes-hyperframes`; path-craft ← `00_System/pozi-design-system`, `glassy-mvp`, `design-elevation` | path-mesh 4 lessons fully built | all 12 lessons fully built + capstone briefs per path |
| **Library (skills/prompts)** | Artifact card: provenance, license (CC BY-SA), "copy prompt", tested-on note, honesty status | `05_Agent_Work/02_Skills` (2,454), `00_System/skills` (30) | 10 artifacts | 25–30 artifacts, organized by the 3 path themes |
| **Downloads (projects)** | Real project card: version, license, changelog, "what's inside" | `github-poziverse-repos`, `orelai-template`, `songbook-tool`, `marketplace-watcher`, `tools-gateway` | 3 cards with real releases | 6 cards |
| **Watch (Field Reports)** | Video twin: script from transmission + b-roll from capture pipeline (exists) + transcript page | transmissions + `hermes-hyperframes` | FR-001 live | FR-002..FR-004 live |
| **Reply Threads** | 7-beat drafts from creator research, fairness-gated | `03_Knowledge/07_External/Followed-Creators` (223) | RT-001 drafted + gated | RT-001..RT-003 live, RT-004..006 nominated |
| **Now / Club / Events** | Weekly receipt note; digest content for members; EV logistics | weekly pipeline, `00_Context/_watchers` | Now updated weekly | member digest v1 |

## 4. The mining rubric (score every candidate note 0–5, six axes)

1. **Signal** — differentiated knowledge a stranger can't get elsewhere (unique builds > general summaries)
2. **Proof** — does a receipt exist (repo, runbook, screenshot, metric)?
3. **Teachability** — can it become a lesson/exercise with a measurable objective?
4. **Freshness** — still true today? (notes older than ~6 months need re-verification)
5. **Privacy safety** — zero credentials, zero private IPs/hosts, zero personal data after redaction?
6. **Effort-to-publish** — distillation cost (S/M/L)

**Advance rule:** weighted score ≥ 3.5 AND privacy = 5 AND proof ≥ 3 → shortlist. Anything
with proof < 3 can still ship as "in composition" honest state — never as fake-complete.

## 5. The pipeline (every piece of content, every time)

```
MINE (agent)      targeted zone query → candidate list w/ rubric pre-scores
  ↓
TRIAGE (Eric)     10-min weekly batch: approve / nominate / park (kanban move)
  ↓
DISTILL (agent)   vault note → public form per pack definition (draft, never publish)
  ↓
GATES (agent+Eric)
  · privacy scan: keys/tokens/private IPs/personal data → hard block, rework
  · fairness gate (Reply Threads only): "would the creator thank us?"
  · receipt rule: every claim links proof; missing proof → honest state
  · voice pass: engineer-poet tone, no slop phrasing
  ↓
APPROVE (Eric)    final read (the only mandatory human gate)
  ↓
PUBLISH (agent)   data.js edit → tools/refresh-inline-data.js → gen-feed (rebuild due)
                  → sitemap regen → tools/smoke-test.js → deploy bump
  ↓
LEDGER            log item + receipts in the content ledger (kanban card closed)
```

**Cadence:** Monday mine → Tuesday triage → Wed/Thu distill + gates → Friday publish +
receipts. Eric's total load: ~30–60 min/week.

## 6. Tooling to build (one-time, small)

- [ ] `tools/vault-mine.js` — zone-targeted search + rubric pre-scoring (reuses `build_index.py` frontmatter parsing; vault path already known)
- [ ] `tools/privacy-scan.js` — regex gate: API keys, tokens, `192.168.*`/`100.*` hosts, emails, `.env` refs — runs before any draft is shown to Eric
- [ ] `tools/gen-feed.js` — reconstruct (still missing; RSS is frozen at v1)
- [ ] `tools/gen-sitemap.js` — sitemap from `data.js` + article slugs (auto lastmod)
- [x] `tools/refresh-inline-data.js` + `tools/smoke-test.js` — done 2026-08-28
- [ ] **Kanban board**: ct207 kanban API, list `content-pipeline`, cards = pack items (one card per essay/lesson/artifact, status = mine/triage/draft/gates/approve/live)
- [ ] Content ledger doc: `02_Projects/content-creation/CONTENT-LEDGER.md` in the vault (mirror of kanban, for Eric's native surface)

## 7. The first two weeks (concrete)

**Week 1 — Education core:**
1. Build the 5 tools above (~half a day, agent)
2. Mine path-mesh: `proxiverse` + `02_Infrastructure` zones → 4 lesson bodies + checkpoints
3. Library batch #1: rubric-scan `00_System/skills` (30 curated) + safest 200 of `02_Skills` → first 10 artifact cards
4. Friday: publish pack #1 (lessons LX-001..004 deepened + 10 library cards) + smoke test

**Week 2 — Proof & correspondence:**
1. Deepen T-001..T-003 receipt links from `mission-control-lab` + `proxiverse` zones
2. Draft RT-001 (Cole Medin — research already in hand) through the fairness gate
3. Triage FR-002 topic from `content-creation` zone; storyboard FR-001 edit from existing footage
4. Friday: publish pack #2

## 8. Governance

- Plan owner: Eric. Executing: m32 for content, main for tooling.
- Monthly review: pack velocity, rubric distribution, library queue depth, adjust 90-day targets.
- This doc lives in the project `docs/` and is mirrored into the vault at
  `02_Projects/content-creation/` — the vault copy is canonical for Eric, the project copy
  is canonical for the build.
