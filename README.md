# From the Poziverse — V5 (Blog + Media Center + Annex + Members Club)

A design-showcase blog, media center, learning annex, and members club for **Eric Poziverse** — an AI futurist's field notes from the edge of the AI frontier. Static site, host-handled auth.

## Version history

- **V5.1 (premium layer + content packs, 2026-08-29)** — **Discovery**: OG + Twitter cards, canonical URLs, 13 generated share images (default + 12 articles), favicon + icons + manifest, WebSite JSON-LD · **Content**: 3 path-mesh transmissions deepened with vault receipts; T-013 *One Model, One Job: The Model Fleet* + companion lesson LX-013; Library grown to 21 public artifacts (2 curated batches from the vault's 412-skill canonical mirror; privacy gate blocked 202) · **Tooling**: vault-mine, privacy-scan (caught + fixed a leaked LAN IP), gen-feed, gen-sitemap, enrich-head, 29-check smoke test with content-type + security-regression assertions · **Auth**: Option A (hosted) decided, vendor recommendation in `docs/AUTH-PROVIDER-DECISION.md` · **Media**: FR-001 set to voice-over format, production brief + 5 b-roll captures in `docs/FR-001-PRODUCTION-BRIEF.md` · **RT-001 draft** staged in `docs/RT-001-DRAFT.md` awaiting operator approval

- **V5 (Phases 7–10, current)** — **Learning Annex** (`annex.html`): three launch paths (The Mesh, Agent-Native Production, Local-First Craft), 12 lessons (LX-001..LX-012), filter chips (path + level + status), localStorage progress, "Resume where you left off", `?lesson=` detail panel with objective → transmission → field report → exercise → receipt → checkpoint · **Members Club** (`club.html`): three tier cards (Free / Member / Patron) with benefits, unlocks, CTA hints · **Sign-in** (`signin.html`): real email + password / magic-link form, posts to the host's auth API · **Account** (`account.html`): profile + contributions + discussions + RSVPs + subscription, fetches `/api/me` · **Now page events + patron roadmap seat**: EV-001..EV-003 scheduled · **Downloads tier-aware**: Free / Member / Patron CTAs, `requestMailto` on Closed Mesh band · **Articles retrofitted**: T-### kicker, level chip, "you will be able to" objective, prereq/next thread, Learn-this slot, twin Field Report link, discussion entry · **Index/Club nav + feature card** added
- **V4.1 (code review)** - fixed a build-system bug where the inliner collapsed $ to $ (broke all page rendering in strict previews: unstyled page, full-screen icons). Build is now marker-based and idempotent; every page is resource-free with graceful font fallbacks.
- **V1** — initial blog (archived: `../archive/from-the-poziverse-v1/`)
- **V2** — content deepened from the vault, About page, RSS, deep links, robustness hardening (archived: `../archive/from-the-poziverse-v2/`)
- **V2.1** — index.html made fully self-contained (inline CSS/JS/data/fonts) after embedded-preview breakage
- **V3 (Phase 3)** — **Broadcast strip** · **Watch page** (Field Reports with facade-player machinery) · **FR-001** in a designed IN PRODUCTION state · `socials[]` / `videos[]` data model · Watch in nav + social links in all footers
- **V3.1 (Phase 4)** — **Reply Threads** (`replies.html`): the 7-beat public-peer-review surface with the fairness-gate ethical strip, episode bench with honest IN COMPOSITION states, and the `REPLIES[]` data model
- **V4 (Phases 5–6)** — **Downloads** (`downloads.html`) · **The Library** (`library.html`) · **Now** (`now.html`) · **Field Log home**

## Run it

Open **`index.html`** in any modern browser — no server needed. Optional local server:

```bash
cd from-the-poziverse
python -m http.server 8080
# then open http://localhost:8080
```

For the Members Club surfaces (`signin.html`, `account.html`, gated downloads), the host must be wired — see §"Auth architecture" below.

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Self-contained home: hero + Broadcast strip + featured transmission + asymmetric archive grid + topic clusters + marquee + newsletter + Annex/Club feature card |
| `index.template.html` | **The canonical home template.** |
| `watch.html` | Field Reports page — renders from `VIDEOS[]` in `data.js`; facade player activates when a video goes live |
| `replies.html` | Reply Threads — the 7-beat public-peer-review surface; renders from `REPLIES[]` |
| `article.html` | Article template — renders from `ARTICLES[]` via `?id=<slug>`; includes T-kicker, level chip, "you will be able to" objective, prereq/next thread, Learn-this slot, twin Field Report link, discussion entry |
| `annex.html` | **Learning Annex** — three paths, 12 lessons, filters (path + level + status), localStorage progress, resume pill, `?lesson=` detail panel |
| `club.html` | **Members Club** — three tier cards (Free / Member / Patron), honest "Auth and billing on the host" explainer, EV-### events, receipt gallery preview, patron roadmap seat, member count (omitted under 50) |
| `signin.html` | **Sign-in** — real email + password / magic-link form, posts to the host's auth API |
| `account.html` | **Account** — profile + contributions + discussions + RSVPs + subscription; fetches `/api/me` |
| `downloads.html` | Supply-drop page with tier-aware CTAs (Free / Member / Patron), `requestMailto` on the Closed Mesh band |
| `library.html` | Library shelf with the Editorial Response skill as the first artifact |
| `now.html` | Indie-web heartbeat page + Events section (EV-001..EV-003) + Patron roadmap seat |
| `about.html` | About the operator |
| `feed.xml` | RSS 2.0 feed (articles) |
| `assets/css/style.css` | Design system |
| `assets/js/data.js` | **The content file** — `ARTICLES[]` (12, with `number`, `level`, `objective`, `prereqs`, `next`, `lessonSlug`) + `SOCIALS[]` + `VIDEOS[]` + `REPLIES[]` + `DOWNLOADS[]` (with `access`) + `CLOSED_MESH[]` (with `id`, `requestMailto`) + `LIBRARY[]` + `NOW{}` (with `events`) + `LESSONS[]` (12) + `PATHS[]` (3) + `TIERS[]` (3) + `MEMBERS[]` (empty) + `DISCUSSIONS[]` (empty) + `EVENTS[]` (3) + `RECEIPT_GALLERY[]` (empty) + `CATEGORIES[]` |
| `assets/js/main.js` | Interactivity: theme, starfield, search/filter, reveals, tilt, newsletter, reading progress, broadcast/watch/downloads/now renderers |
| `assets/fonts/` | Vendored woff2 fonts (Instrument Serif, Schibsted Grotesk, JetBrains Mono) |
| `nginx.conf` | FC nginx custom runtime config (port 9000, /code root, gzip, asset caching, SPA fallback) |

## Auth architecture (decided 2026-08-27)

**Decision: auth and billing run on the host.** The site ships the visual surface; the host (AutoClaw function-compute + AutoClaw runtime) provides auth + billing + member API.

Why this fits the v2 plan's FR-C04 framing (decision among three options): the host layer is in scope of this project from day one. The mesh ethos (data minimization, no third-party scripts on the public log, signed-link delivery) is preserved at the host boundary; the site itself stays a static file host. The trade-offs of the mesh-self-hosted option (operator uptime liability for verification, reset, dunning, deletion) are offloaded to the host layer where they belong.

**The contract:**

| Surface | Calls | Method |
|---|---|---|
| `signin.html` (password) | `/api/auth/signin` | `POST { email, password }` → `{ redirect }` |
| `signin.html` (magic link) | `/api/auth/magic` | `POST { email }` → `{ ok: true }` |
| `signin.html` (sign out) | `/api/auth/signout` | `POST` → redirect to `/` |
| `account.html` (load profile) | `/api/me` | `GET` (with session cookie) → `{ handle, email, bio, tier, joinedAt, contributions, discussions, rsvps, subscription }` |
| Gated download delivery | `/api/download/:id` | `GET` (with session cookie) → 302 to short-TTL signed URL |
| Tier change / cancel | `/api/billing/...` | managed by the host's billing adapter |

**Privacy floor (FR-C06):** email + handle only. No ad pixels. Third-party scripts are confined to `club.html`, `signin.html`, `account.html`; the rest of the site (`index.html`, `article.html`, `annex.html`, `watch.html`, etc.) stays zero-third-party. Gated downloads arrive via short-TTL signed links; CDN-cacheable public URLs are never used for member assets. On lapse, access downgrades to Free at period end; already-downloaded source files are kept (plain licensing).

**Cosmetic / honest states:** `signin.html` ships a real form that POSTs to the host's auth endpoints. When the endpoint is not wired (a 404 on `/api/auth/signin`), the form surfaces a clear "could not sign in" error — not a fake success. `account.html` populates from `/api/me`; without a session it renders placeholder values + a "session not established" status via aria-live. Both pages include a visible "On the host" label and the host note in code comments.

**Code reference:** the auth contract is documented in:
- `signin.html` — script-block header comment (§"FROM THE POZIVERSE — Sign-in (Phase 8, host-handled)")
- `account.html` — script-block header comment (§"FROM THE POZIVERSE — Account (Phase 8, host-handled)")
- `club.html` — hero status line "Auth and billing on the host" and the `.how-card` explainer

## Decision log (2026-08-28, operator-confirmed)

1. **Auth provider: Option A — hosted auth + membership provider.** The decision pad on `club.html` resolves; the host contract table above is the wiring spec. Vendor selection (magic link + billing + signed-link delivery + revocation, data-minimizing config) is the next sub-decision.
2. **Field Report format: voice-over over mesh footage.** No on-camera host. FR-001's chapters and deck in `data.js` are reframed; capture list lives in `docs/FR-001-PRODUCTION-BRIEF.md`. Existing assets only — screen captures of live mesh surfaces + terminal runbook demos; VO via the T-002 lesson stack (HyperFrames headers + ElevenLabs + Opus Clip).
3. **Library license: open.** Library artifacts stay openly licensed — CC BY-SA 4.0 for skills/prompts, MIT for the site template (already set in `data.js`). Provenance lines stay mandatory.
4. **First three Reply Threads nominated** from the followed-creators research (vault `03_Knowledge/07_External/Followed-Creators/`), all honestly `in-composition` until the fairness gate passes and beats are drafted:
   - **RT-001 → Cole Medin** — "How to Actually Run Your Coding Agent Safely…" — divergence: single-sandbox vs mesh-wide ops (26 LXCs, watchdogs, Mission Control auto-heal). Twin: T-006 Mission Control.
   - **RT-002 → Matt Pocock** — "Kill your MEMORY.md" — divergence: delete-chat-memory vs a structured 5,500-note vault ontology that *is* the memory. Twin: T-012 Vault Ontology.
   - **RT-003 → Wanderloots** — "24/7 Agentic AI: Always-On Hermes Agent" — divergence: one-host cloud agent vs the four-host mesh + watchdog pattern. Twin: T-005 Hermes, the Always-On Agent.

## Modify guide

| You want to… | Edit |
|---|---|
| Change articles / add one | `assets/js/data.js` → `ARTICLES[]`; rebuild |
| **Go live on a video** | `data.js` → `VIDEOS[]`: set `youtubeId` + flip `status: "live"` |
| **Go live on a Reply Thread** | `data.js` → `REPLIES[]`: fill `creator`, `video`, the 7 `beats`, flip `status: "live"` |
| Add a lesson | `data.js` → `LESSONS[]`; reference it from `ARTICLES[i].lessonSlug` |
| Add a path | `data.js` → `PATHS[]`; reference lessons by id |
| Update a tier | `data.js` → `TIERS[]` |
| Add an event | `data.js` → `EVENTS[]`; reference from `NOW.events` |
| Change article T-numbers | `data.js` → `ARTICLES[i].number` (newest first, T-001..T-012) |
| Wire the host auth | Implement `/api/auth/signin`, `/api/auth/magic`, `/api/auth/signout`, `/api/me`, `/api/billing/*` per the contract above |
| Colors / fonts / spacing | `style.css` tokens (` :root` dark, `[data-theme='light']` light) |
| Home structure | `index.template.html`, then rebuild |
| Search / animations | `assets/js/main.js` |
| RSS after content changes | `node ../.cluster/gen-feed.js` |

## Quality coverage

- Responsive: 1440 / 1024 / 640 breakpoints on every page; grids collapse; touch targets ≥ 44px
- States: default/hover/focus/active/disabled on all controls; empty/error/loading/empty states for the Annex filter, the Club tier matrix, the receipt gallery, the patron roadmap seat, the account page; honest `LESSON IN COMPOSITION` / `FIELD REPORT IN PRODUCTION` / `MEMBER ACCESS` / `REQUEST ACCESS` states
- Dark/light themes: token swap + View Transitions + localStorage persistence
- Motion: staggered reveals, tilt, marquee, pulse dots, starfield + meteors, signal sweep — all reduced or removed under `prefers-reduced-motion`
- Accessibility: landmarks, focus-visible rings, `aria-pressed`/`aria-live`/`aria-busy`/`role="alert"`/`role="status"`, contrast ≥ 4.5:1, status by text (never color alone)
- Encoding: all files UTF-8 clean
- Tier matrix validation: Free = full log + all paths/lessons; Member = capstone review + office hours + discussions + early receipts + member downloads; Patron = source files + roadmap seat + direct access (FR-C17)
- Honest metrics: member count omitted under 50 (FR-C14 / FR-C22)
- Gated content degrades gracefully: every member/patron download renders the honest "MEMBER ACCESS" or "REQUEST ACCESS" state to non-members (FR-C08 / FR-C19)

## Content

12 articles from the Poziverse vault (real topics, vault-grounded short bodies). FR-001 is the planned video twin of the flagship transmission — drop the real `youtubeId` into `data.js` when it ships. Three learning paths assemble from existing articles — 12 lessons ship without authoring any new content. Three events seed the calendar (EV-001..EV-003). Members Club and Members Club roadmap seat populate when the host is wired.