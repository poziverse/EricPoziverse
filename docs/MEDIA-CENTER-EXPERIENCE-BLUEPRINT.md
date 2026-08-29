# From the Poziverse — Media Center Experience Blueprint

> **Version:** 1.0 · **Date:** 2026-08-27 · **Status:** fully fleshed plan, build-ready
> **Scope:** design, animation, and nuance specification for the six new media-center surfaces
> **Basis:** the approved blog (Cosmic Editorial / "transmission log") + MEDIA-CENTER-STRATEGY.md (v1)
> **Method:** brainstormed per the brainstorming skill; specialized design passes for motion, surface
> experience, and adversarial research cross-check; synthesized and reviewed.
>
> **The one-line test for everything in this document:** *does it feel like a live station, run by one
> honest operator, at the edge of the frontier?* If not, it is cut.

---

# Part I — Foundations

## 1. Experience thesis

The approved blog works because a fiction is held consistently: a transmission log from the
edge of the AI frontier. The media center extends that fiction from *reading* to *receiving*.
The site stops being a page you visit and becomes a **station you tune into**:

- signals arrive (**Broadcast**),
- you watch them (**Watch / Field Reports**),
- you read the correspondence (**Reply Threads**),
- you verify the claims (**Receipts / Downloads**),
- you take the equipment home (**The Library**),
- and the operator is always on duty (**Now**).

Design, animation, and nuance all serve that fiction. Motion is signal behavior, not
decoration; honesty is the aesthetic; the receipt is the trust signature.

## 2. Brand extension rules

1. **Vocabulary is system, not sprinkles.** New nouns enter only through the existing
   grammar: transmissions (essays), field reports (vlogs), reply threads (responses),
   receipts (build logs), the library (equipment). No per-page metaphors.
2. **Numbering is continuous across types.** One global Field Log: `T-###` (Transmission), `FR-###` (Field Report), `RT-###` (Reply Thread), `LB-###` (Library artifact), receipts citing their source entry (`SHIPPED IN T-014`). Every mono tag renders `{TYPE}-{NUM}`; shelf kickers like `SKILL / 01` are shelf-local indices, always labeled as such and never colliding with log numbers; the whole media center reads
   as one continuous log.
3. **The accent stays scarce.** Emerald = open/live/primary action; amber = attention only
   (live, in-review, closed mesh, pending, stale); danger red = failure. Per screen: max 2 emerald moments + 1 primary amber moment. Amber ledger: the budget applies to hero/primary moments; grid-level status chips (IN REVIEW / PRE-RELEASE / pending dots) render dim (40-50% amber) and are exempt - a grid is a status board, not a hero. Enforced by component defaults.
4. **Every surface earns exactly one hero moment.** Never two competing signature effects
   on one screen.
5. **Receipts everywhere.** Any claim that can show proof shows proof: real versions, real
   dates, real licenses, real links. Unbuilt = "on the bench," never a dead button.
6. **Anti-slop floor.** No emoji UI (inline SVG only); no invented metrics (absence is
   silence, never zeros); asymmetric over uniform grids; no decorative gradients; no bounce
   easing.

## 3. Experience principles

1. **Signal first, chrome second** — content is the interface; glass and borders recede as
   density rises.
2. **Motion = meaning** — every animation encodes state or story: *acquiring, locking,
   decoding, verifying, live.*
3. **One idea, five surfaces, one canonical entry** — Transmission → Field Report → Reply
   Thread → Receipt → Library entry, all linking back to the canonical log entry.
4. **Honesty as aesthetic** — loading says "acquiring signal," empty says "first
   transmission pending," closed says "on the bench — built, running, not yet public."
5. **Keyboard is a first-class remote** — every surface operable without a mouse; focus
   rings per the accent; media has transcripts.
6. **Performance is part of the fiction** — a station that stutters breaks the fantasy
   (see Part V contract).

## 4. The Field Log content model

**Canonical entry anatomy** (every type renders this spine):
`kicker (TYPE · NN) → serif headline (em accent allowed) → deck → meta-line (date ·
duration/read · tags) → art signature → body/player → receipt row → thread links`.

| Type | Surface | Body format |
|---|---|---|
| Transmission (`T-`) | blog essay | existing article template |
| Field Report (`FR-`) | watch.html | facade player + chapters + transcript + twin-essay panel |
| Reply Thread (`RT-`) | replies.html | 7-beat editorial body + creator card + receipts |
| Receipt (`R-`) | inside entries | build log + artifact links + "what changed" list |
| Library item | library.html | artifact card: copy-prompt pane + provenance + license |

**Visitor journeys:**
- *First arrival (from a social clip):* home → Broadcast strip confirms legitimacy →
  featured Field Report → one scroll reveals the log's depth → Direct uplink captures.
- *The returner:* Now → what changed → newest Reply Thread → new Library artifact.
- *The peer (another creator):* lands on a Reply Thread episode → the Handoff beat returns
  them to their own video with more context → they subscribe to the correspondence.

---

# Part II — Design system extension

## 5. Motion tokens (append to `:root`)

```css
:root {
  /* durations */
  --dur-instant: 100ms;   /* press-down transform only */
  --dur-reveal: 700ms;    /* existing page reveal, tokenized */
  --dur-boot: 900ms;      /* one-shot mechanical draws: thread spine, stamp settle */

  /* easings — no bounce anywhere; --ease-spring reserved for ≤2px lifts */
  --ease-decode: cubic-bezier(0.85, 0, 0.15, 1); /* decisive symmetric: wipes, stamps, spine */
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);       /* accelerate out: dismissals */
  --ease-linear: linear;                          /* scroll-linked + marquee only */

  /* distances */
  --rise-s: 8px;  --rise-m: 18px;  --rise-l: 26px;  --drift-y: 90px;

  /* staggers */
  --stagger-s: 35ms;  --stagger-m: 55ms;  --stagger-l: 70ms;
  --stagger-xl: 90ms; --decode-stagger: 40ms;

  /* ambient loop periods (nothing loops faster) */
  --loop-pulse: 2.2s; --loop-bars: 1.8s; --loop-sweep: 1.6s;
  --loop-marquee: 44s; --loop-float: 9s;
}
```

**Duration law:** 150ms all state feedback / 100ms press transforms / 200-300ms entering UI / 300-500ms component transitions AND all scroll/hover-triggered reveals (hard cap 500ms) / 520-700ms reserved exclusively for initial page-load entry / ambient loops at 1.8s or slower.
· 300–500ms component transitions · 520–700ms reserved for load-in of page blocks (never
scroll/hover-triggered) · nothing between 500–700ms · ≥1.8s ambient loops only.

## 6. Shared component primitives (defined once, used everywhere)

**Download button** — default `Download vX.Y.Z` + tray SVG → hover accent-bright, −2px →
focus-visible emerald outline → press scale .985 (100ms) → loading `checking release…` with
pulse-dot + `aria-busy` → failure: one `RETRY` attempt, then degrade to ghost link "release data unavailable - open GitHub." Never a dead end: unpublished projects use the Closed Mesh state instead.

**Copy prompt button** — default `Copy prompt` + clipboard SVG → hover border emerald →
press 2px lift via `--ease-spring` (the reserved exception) → copied: swap to check SVG +
`Copied to clipboard`, emerald fill, revert 2s, announced via `role="status"` → error: red
label `Copy failed — select manually` + auto-expand raw body for manual selection.

**License badge** — mono text chip (`MIT`, `CC BY-SA 4.0`, `CUSTOM`) + status dot
(emerald permissive / amber conditions / faint custom); color never alone. The badge is an `<a href="license-url">` (a real link); `aria-describedby` may point to a local explanation only.

**Version chip** — `v1.2.0` faint-bordered pill; variants: released (default) · `IN REVIEW`
(amber dim) · `ON THE BENCH` (faint) · `PRE-RELEASE` (amber outline).

**Receipt chip** — mono `RECEIPT ↗` link with seal SVG; pending variant = amber dot +
`RECEIPT PENDING`, non-interactive text. Every badge is a real link or an honest pending.

**Stars rule** — rendered only when real (build-time GitHub fetch); loading = skeleton dashes; fetch failure or unknown = row omitted entirely. Never a dash that reads as zero, never fabricated. Verify `--muted` >= 4.5:1 against its token pair at build time instead of trusting hardcoded ratios.

**Shared state vocabulary (all surfaces):** "signal acquiring" shimmer (loading) · dashed
`empty-state` with honest copy (empty) · degrade-to-link (error) · reserved/dormant (launch
week) · stale (amber `DUE FOR AN HONEST UPDATE` after 45 days).

## 7. Art system rules

- Reuse `art-1…art-12` signatures; new artifacts get deterministic signatures seeded by id
  (`hash(id) % 12 + 1`), never random per load.
- Platform glyphs, play buttons, tray/clipboard/check/seal icons: inline SVG, 1.5–1.8px
  stroke, `currentColor`.
- Video posters are the art signatures (zero external poster fetches; YouTube thumbnails
  only as an optional enhancement, never load-bearing).

---

# Part III — Surface specifications

## 8. The Broadcast Strip (home)

**User job:** see which channels are live and route to the right platform in one click.

**Reality contract:** a static site cannot honestly show live platform data (Instagram
oEmbed auth-gated; TikTok posters need an oEmbed round-trip; X timelines break). The strip
is therefore **Curated Snapshot Cards**: locally-generated art, manual/CI-refreshed latest
line, and a mono **`AS OF <date>`** stamp per tile. The limitation becomes the receipt
aesthetic. Zero platform `widget.js` ever loads.

**Layout (1440):** section head (`BROADCAST` kicker + H2 "Carried on *four* channels") →
12-col asymmetric matrix: YouTube **cols 1–6** (dominant, art 16/8.2) · Instagram **7–9** ·
X **10–12** · TikTok **7–12 low-wide strip** (16/4.4). One dominant + three satellites
mirrors audience weight without inventing numbers. Mono footnote: "all channels mirror back
to this log."

**Channel tile anatomy:** art region (signature + platform mono tag + signal-bars) → body
(platform kicker + handle + ≤90-char teaser + follow CTA).

| State | Treatment |
|---|---|
| Default | glass panel, per-platform signature (YT art-1, IG art-2, X art-9, TT art-6), tag `YOUTUBE — MAIN UPLINK` |
| Hover | −4px lift + border-strong, art zoom 1.06, CTA arrow +4px, bars brighten |
| Focus-visible | ring on stretched card-link + handle underline |
| Active | press −1px scale .99 |
| Dormant | art 60% opacity, bars static, teaser → `LAST CARRIER: 2026-07-02` |
| Reserved (launch) | kicker `CHANNEL RESERVED` + "First carrier pending — the uplink opens soon." |
| Error | degrades to plain external link, kicker `DIRECT ROUTE` |

**Data shape:** `socials: [{ platform, handle, url, status: live|dormant|reserved, latest:
{ title, date, href } | null, art }]`.

**Nuance:** teaser twin-tags (`FR-014 ▸ twin of T-021`) tie the strip into the log; platform
role labels in engineer-poet mono (`MAIN UPLINK`, `SHORT BURSTS`); the strip's single
emerald spend is the primary channel CTA; amber only in the live pulse.
**Responsive:** 1024 → 6/6 + 6/12 pairs; 640 → stacked (or horizontal scroll-snap rail).
**A11y:** section `aria-labelledby`; one stretched link per tile with full `aria-label`;
status by text, never color/animation alone; bars `aria-hidden`.

## 9. Watch (`watch.html` — Field Reports)

**User job:** watch the video twin of a Transmission with full context — chapters,
transcript, the essay it belongs to — then keep going down the playlist.

**Page order:** masthead (`FIELD REPORT FR-XXX` kicker + serif H1 + deck + byline with
duration) → player stage (cols 1–8) → chapter/transcript rail (cols 9–12, sticky) →
twin-Transmission panel → playlist grid → newsletter → footer.

**`facade-player`:** poster (art signature 16/9) + 72px glass play button + duration pill +
mono caption (`FR-014 — MESH FOOTAGE + SCREEN`). No iframe until click → swaps to `youtube-nocookie.com` iframe (`autoplay=1&rel=0&enablejsapi=1` + `origin` set to the site origin - required for chapter seek and `timeupdate` tracking), poster crossfades 280ms. Loading: the
**Signal Acquisition Boot** (signature moment S1, Part IV) — bounded: hides on real PLAYING
or 2.5s timeout, then a truthful static "LOADING PLAYER…". Error: poster stays, mono panel
`CARRIER UNAVAILABLE — OPEN ON YOUTUBE ▸`. Never a blank box.

**`chapter-rail` + `transcript-tab`:** segmented control `[ CHAPTERS | TRANSCRIPT ]`;
chapter rows = buttons that seek (`aria-current` on active); current chapter driven by
`timeupdate` polling; transcript rows are seek buttons with full labels ("Jump to 04:12 —
the routing demo"); empty chapters → `CONTINUOUS TRANSMISSION — NO CHAPTERS`; `transcriptUrl: null` → rail shows `TRANSCRIPT PENDING — CAPTIONS ON YOUTUBE`.

**`twin-panel`:** binds video ⇄ essay (`READ THE TRANSMISSION` + title + excerpt). Unpublished
twin → `TWIN TRANSMISSION IN COMPOSITION — SUBSCRIBE FOR CARRIER`.

**`playlist-card`:** existing `.card` + duration pill + `NOW PLAYING` state (emerald border,
mono tag). Launch-week grid empty state: `SIGNAL NOT YET RECEIVED — first Field Report in
production` + newsletter CTA.

**Data shape:** `videos: [{ id: "fr-014", youtubeId, title, deck, date, duration,
posterArt, chapters: [{time, label}], waveformSeed | null, transcriptUrl | null, twinSlug | null, status }]`.

**Nuance:** masthead kicker carries the twin binding (`FIELD REPORT FR-014 — TWIN OF
T-021`); receipt badges link build logs; stage captions in engineer-poet mono (`RECORDED IN
THE VAULT`); accent budget = NOW PLAYING border + play-button glow.
**Responsive:** 1024 stage stacks, rail → horizontal scroll-snap strip; 640 single column,
44px tap rows, chapters collapse into a disclosure.
**A11y:** facade is a real `<button aria-label="Play: {title}, {duration}">`; iframe gets
`title`; `aria-live` announces player/chapter changes; captions expected on all Field
Reports, owned transcript is the fallback; `prefers-reduced-motion` kills shimmer and
auto-scroll-follow.

## 10. Reply Threads (`replies.html`)

**User job:** read Eric's public peer review of a specific creator's video — fairly,
generously, with receipts — and follow the thread.

**Page order:** masthead (kicker `REPLY THREADS` + H1 *"An open correspondence with the
creators I learn from."*) → featured episode (full 7-beat spread) → index grid → ethical
floor strip → newsletter → footer.

**Layout (1440):** beats flow in **cols 1–7** (65ch measure); **creator card + receipt rail
sticky in cols 9–12**; episode-number pill (`REPLY THREAD #04`) in amber above H1 - the page's single primary amber moment (status-level amber dots exempt, per the amber ledger) Index grid: lead `--wide` span 6 + span-3s, then span-4s — never
uniform rows.

**The 7-beat episode template** — each beat `<section class="beat">` with fixed mono header
(`04 · THE DIVERGENCE`): Beat 1 The Pick (drop cap; creator + video link + why) · Beat 2 The
Claim (blockquote restatement, cite = creator) · Beat 3 The Praise (≥1 timestamped
reference) · Beat 4 **The Divergence** (accent lead-in "This is what I do instead."; pull
quote allowed) · Beat 5 The Receipt (artifact cards) · Beat 6 The Handoff (generous outbound
+ related Poziverse piece) · Beat 7 The Thread (2–3 prior episodes).

**`timestamp-ref` chip:** inline mono `▸ 07:42` deep-linking the creator's video (`?t=462s`);
visited gains a mono `✓` tick; unlinked → disabled chip `REFERENCE — OPEN VIDEO ON YOUTUBE`,
no fake timestamp.

**`creator-card`** (sticky rail): art-band avatar, serif name, mono handle, `WATCH THE
ORIGINAL ▸`, meta `EPISODE RT-004 · BEATS 7 · RECEIPTS 2`. Pre-publication →
`CORRESPONDENCE OPENING SOON — FIRST THREAD IN COMPOSITION`.

**`receipt-badge`:** `RECEIPT · REPO ▸` / `RENDER ▸` / `RUNBOOK ▸` — always a real link or
`RECEIPT PENDING — SHIPS WITH RT-005`. Never decorative-only.

**Ethical floor strip** under the index (mono, one line): `EVERY THREAD TRANSFORMS, CITES,
AND LINKS THE ORIGINAL — NEVER REPOSTS.`

**Fair-use codification (from research):** clips only when a video variant ships;
critique-proportionate excerpting; always timestamped; original linked in the first two
lines; pre-publication check — "would the reviewed creator plausibly thank me for this?" +
right-of-reply in The Thread.

**Data shape:** `replies: [{ id: "rt-004", number, creator: {name, handle, channelUrl, art},
video: {title, url, published}, status, date, beats: {pick, claim, praise:{html, refs:[{t,
note}]}, divergence, receipt:[{kind, label, url}], handoff:{toCreator, toPoziverse},
thread:[]}, twinSlug }]`.

**Responsive:** 1024 beats single-column, creator card unsticks above Beat 1, receipts →
inline badge row after Beat 5; 640 all-one-column, chips ≥44px tap.
**A11y:** beats are `section aria-label="Beat 4: The Divergence"`; timestamp refs are real
links with full labels; visited state adds a visually-hidden "visited" suffix to the label, not color alone.

## 11. Downloads (`downloads.html`)

**User job:** take a real, running piece of the Poziverse in under a minute — honest
metadata only.

**Page order:** compact hero (`SUPPLY DROP` kicker; H1 "Take the *tools* with you"; deck
"Everything here runs in production on this site first. Versions are real, licenses are
legible, every release carries its build log."; status line computed from data) + **Manifest
rail** (utility glass panel: counts by kind, "what shipped last" + date, releases link) →
toolbar (search `/`, license chips, sort, count line `N artifacts on the shelf`) → project
grid → **Closed Mesh band** → receipt strip → newsletter → footer.

**Project grid:** asymmetric cadence — featured `.card--wide` (span 6, taller art) → 3+3 →
4+4+4. Featured card = **the blog itself**: "take the transmission log template." Card =
signature art + name + tagline + version chip + license badge + stars (real only) + 3-line
"What's inside" (+`+k more` reveal) + actions (Download primary / GitHub ghost / demo text +
receipt chip) + provenance footer (`BUILT IN-HOUSE · SHIPPED IN T-014 · MIT`).

**Closed Mesh band** (non-public work): slim rows, amber left rule, `CLOSED MESH — REQUEST
ACCESS` mailto ghost; preferred variant for non-public builds: `Private build — public on
<milestone>` countdown card.

**Loading/error:** loading cards = art pulse + skeleton meta + `aria-busy`; metadata fetch
failure → card renders with repo link only + `role="status"` line. Empty filter result →
`∅ Nothing on this frequency` + Clear filters.

**Data shape:** `downloads: [{ id, name, kind, tagline, repoUrl, assetUrl, demoUrl, version,
releasedAt, license:{spdx,label,url}, stars: real|null, public, inside:[…],
receipt:{label,url}|{pending}, featured, art }]` + `closedMesh: [{ id, name, statusLine,
requestMailto }]`.

**Responsive:** 1024 hero stacks, cards span 6; 640 all span 12, stacked full-width actions,
manifest → 2-col mini-grid.
**A11y:** card overlay `aria-label="Download {name} v{version}"`; result count in
`aria-live="polite"`; chips `aria-pressed`; `role="status"` errors; contrast: `--muted`
6.9:1 on the dark bg, `--faint` decorative only.

## 12. The Library (`library.html`)

**User job:** copy and run a reusable prompt/skill/blueprint in ten seconds — lineage
attached to every item.

**Page order:** compact hero (`THE LIBRARY`; H1 "Prompts that *earned* their keep"; deck
about lineage) + **Lineage rail** (`PROVENANCE DOCTRINE`: sourced from the vault · reviewed
before publish · copy-paste, no signup) → kind chips (`ALL / PROMPT / SKILL / BLUEPRINT`) →
**featured artifact** (editorial split 0.9/1.1: art panel + kind kicker `SKILL / 01` + title
+ version chip + summary | **prompt pane**: mono `<pre>` clamped ~10 lines + `Copy prompt`
primary + `Download .md` ghost + `view raw` + receipt chip) → library grid (asymmetric: lead span 6 + two span 3, then 4/4/4 bands; ghost copy) → **bench row** (`ON THE BENCH` reserved slots naming their candidate kinds; one card
`FIRST ARTIFACT IN REVIEW` linking the Reply Threads doc) → **Lineage appendix table** →
newsletter → footer.

**First artifact:** the **Editorial Response skill** (the 7-beat structure from §10) —
`v0.9.0 IN REVIEW`, provenance `SOURCE: vault · capability layer · TENANT: EricPoziverse ·
FIRST CONSUMER: this blog`. The blog is the skill's first consumer; its receipt links Reply
Thread drafts.

**Copy interactions:** single `role="status"` live region per page announces "Prompt copied
to clipboard" / "Copy failed — body expanded for manual selection" (error auto-expands body,
focus returns to it). Hotkey `C` on featured-pane focus with visible kbd hint; ignored during
text selection. In-review items: copy/raw `aria-disabled` with explanatory
`aria-describedby` — never silently disabled.

**Data shape:** `library: [{ id, title, kind, summary, body, version, updated,
license:{spdx,label,url}, status: published|in-review|on-the-bench, provenance:[…],
receipt:{…}, featured, art }]`.

**Nuance:** provenance is a first-class visual — every card footer carries a one-line mono
lineage; receipt chain cites the entry that used the artifact first; pane footnote
`PASTE. ADAPT. RUN.`; amber = in-review only, emerald = published/copied.
**Responsive:** 1024 featured stacks, cards span 6, lineage table scrolls in a labelled
region; 640 all span 12, pane capped at max-height 320px with internal scroll, actions stack (Copy first).
**A11y:** panes `role="region" aria-label="Prompt body: {title}"`; table → mobile definition
list preserving order; kind chips announce pressed state.

## 13. Now (`now.html`)

**User job:** in thirty seconds — what is the Poziverse actually working on right now?
Dated, honest, receipted.

**Page order:** minimal hero (~40svh, quietest page — no orbit art; kicker `NOW / LOG UPDATED 2026-08-27` with amber pulse (the page's only amber; RUNNING renders emerald, PAUSED faint); H1 "What the *mesh* is doing right now"; deck naming
the indie-web convention; mono `WHAT IS A NOW PAGE? ↗`) → **Now stack** (asymmetric:
Current project span 7 with `SINCE` stamp + dated dotted log-line notes + receipt;
Current read span 5 with progress only if real; Current experiment span-12 slim band with
hypothesis + stack list + `RUNNING`/`PAUSED` chip) → **Previously on the log** archive rows
(month-stamped, each closing with a receipt number) → newsletter → footer.

**Honesty mechanics:** every panel footer carries `LOG UPDATED {date}` — the page dates
itself three times, which *is* the receipt for "current." Stale > 45 days → amber `DUE FOR
AN HONEST UPDATE` chip (indie-web norm). No experiment → "between experiments — the last one
closed in T-0XX." Read progress omitted unless real; no star ratings, one verdict line.

**Data shape:** `now: { updated, staleAfterDays: 45, project: { title, status, since,
notes:[{date, text, receipt}], link, receipt }, read: {…, progress|null}, experiment: {…} |
null, archive: [{ month, line, receipt }] }`.

**Responsive:** 1024 project/read stack, archive 2-col; 640 all span 12.
**A11y:** reading order = priority order at every breakpoint; status by text + chip (never
pulse alone); external links announce new-tab; decorative panels not focusable.

---

# Part IV — Motion system & signature moments

## 14. Motion philosophy

Motion is **signal behavior**: every moving element does something a transmission log would
actually do — acquire, lock, decode, verify, or stay live. Entry motion is directional and
typed (rise = data arriving; decode = opaque becoming legible; sweep = finding a lock).
Ambient motion is scarce: a thing pulses only when it is *live*. Scroll is the timeline of
the log: content arrives as it is received.

## 15. Entry choreography (UPLINK sequence, per page)

Shared: `opacity 0→1 + translateY(--rise-*)→0, --ease-out`, via the existing
`html.js .reveal` + `--d` mechanism + 1.6s failsafe. Staggers apply only within the first
viewport-height group (cap 12 items).

| t (ms) | Element | Spec |
|---|---|---|
| 0 | kicker/transmission pill | rise 16px, 520ms |
| 80 | H1 | rise 26px, 700ms |
| 620 | H1 `em` underline | scaleX 0→1, origin left, `--ease-decode`, 520ms |
| 160 | deck | rise 20px, 700ms |
| 240 | CTA row | rise 16px, 520ms |
| 320 | hero panel | rise 26px + zoom .97, 700ms; float loop starts 1020ms |
| 400+ | chips row | rise 12px, 280ms, stagger 40ms |

Per-surface deltas: **Watch** player shell at 280ms (26px + zoom), chapter rail 520ms (bars
fade as a group); **Reply Threads** spine draws at 200ms (`scaleY 0→1`, ease-decode, 900ms),
beats stagger 90ms; **Downloads** first card row 240ms (18px, stagger 70ms) with nested
"what's inside" items (8px, stagger 30ms); **Library** artifact preview clip-wipe decode 400ms
one-shot per card; **Now** status readout first, log lines stagger 120ms, timestamps arrive
after their content.

## 16. Scroll choreography

One shared `IntersectionObserver` per page (`rootMargin: 0px 0px -40px 0px`); one-shot
targets `unobserve()` on fire; failsafe retained; reduced-motion skips observation entirely.

Highlights: Broadcast tiles at strip 0.3 (rise 18px, 480ms, stagger 70ms; live dots start at delay+480ms — channels "go live" on arrival) · playlist cards 0.15/60ms · Reply beats 3-7 at 0.25 (rise 22px, 500ms; spine nodes light as it passes) · spine = scroll-linked `scaleY`
(rAF-coalesced passive listener) · Downloads nested lists 0.3/30ms · Library preview clip
wipes 0.3 · Now log lines 0.2 (experiment dot pulses only while intersecting) · Field Log
filter reflow via `document.startViewTransition` (guarded), outgoing 150ms fade-scale →
incoming 12px rise stagger 35ms · decode headlines at 0.35 (one at a time, queued).

## 17. The eight signature moments

| # | Moment | Surface | Concept / spec (compressed) |
|---|---|---|---|
| S1 | **Signal Acquisition Boot** | every player | Dead network time becomes the fiction: 1px emerald sweep traverses the shell (`--loop-sweep`), mono status cycles `ACQUIRING SIGNAL → LOCKING FREQUENCY → DECODING` (700ms/state), bars pulse. Bounded: hides on PLAYING or 2.5s. Reduced motion: static `SIGNAL ACQUIRED` badge. |
| S2 | **Decode-on-Scroll Headlines** | all section H2s | Headlines arrive as raw signal and resolve: mono scramble overlay locks 2 chars/40ms while real text fades in; <=480ms; one decode at a time; container reserves the line box. Reduced motion: direct appearance. |
| S3 | **The Thread Spine** | Reply Threads | The 7 beats hang on a literal 1px thread that draws downward with scroll (`scaleY = progress`); Divergence node carries a dim amber outline (ledger-exempt status mark); nodes light 150ms as the spine passes. Reduced motion: full-height line, nodes pre-lit. |
| S4 | **Star-Parallax + Constellations** | home | The existing starfield gains depth: two depth layers translate with scroll (−0.06/−0.14, clamped to `--drift-y`); over the Field Log, a few stars connect into faint constellations drawn once (900ms) when the archive is 0.2 visible. Rides the existing rAF — no new loop. Reduced motion: static field, constellations pre-drawn 0.35 opacity. |
| S5 | **Waveform Chapter Scrubber** | Watch | A static waveform under the player doubles as the chapter map — hover sweeps a highlight (150ms), click seeks via postMessage; ~60 static bars from per-video seed data; zero loops. Reduced motion: static bars; seek + tooltip preserved. |
| S6 | **The Receipt Stamp** | Downloads, RT Beat 5 | Every receipt slams in like a dated rubber stamp: scale 1.15/rotate −2°/opacity 0 → settle 260ms ease-decode + one-shot 4px shell dip. Reduced motion: badge shown settled. |
| S7 | **Live Frequency Bars** | Broadcast | Each tile's five mini bars fill bottom-up on arrival (60ms cascade); then only the most-recently-updated channel keeps pulsing — one live channel at a time, like a real console. Reduced motion: full-height static. |
| S8 | **Now-Page Status Readout** | Now | A mono `STATUS: <activity>` line cycles project/read/experiment with a terminal caret (4s cycle, pauses off-screen and on `visibilitychange`). Reduced motion: first status, static caret. |

## 18. Micro-interaction grammar

Platform tiles: -4px lift + border-strong 150ms, glyph brightens 150ms, mono `OPEN CHANNEL ↗`
slides in. Video cards: −4px lift + art zoom 1.06 (200ms), play ring opacity/scale 150ms,
mono `WATCH` label slides 4px. Download buttons: idle → **acquiring** (`::before` scaleX fill
900ms + `FETCHING`) → **received** (`✓ RECEIVED`, success, revert 1.6s) → failure `RETRY`
danger (never fake success). Copy buttons: 2px spring lift + `Copied to clipboard` swap +
icon pop (1→1.06→1). Filter chips: `aria-pressed` accent fill + count crossfade + grid
reflow. Press = 100ms transform + 150ms color, never color-only.

## 19. Reduced-motion map (summary)

Every animated element above has a static substitute (S1 static badge; S2 direct text; S3
full-height spine, nodes pre-lit; S4 static field + pre-drawn constellations; S5 static
waveform with working seek; S6 settled stamp; S7 full-height bars, no pulse; S8 first status,
static caret; reveals shown immediately; hover = color/border only; filter reflow instant;
home featured-panel crossfade rotation (8s) off). The existing global kill-switch (`durations → 0.001s`, loops → 1)
plus the `html.js .reveal` guard remain the floor.

---

# Part V — Reality contracts

## 20. Platform honesty contract

Only YouTube gets a live embed (faced, `youtube-nocookie.com`, `rel=0`,
`cc_load_policy=1`). Instagram, TikTok, and X are **Curated Snapshot Cards** (Part III §8):
local art + dated `AS OF` stamp + outbound links. Zero platform `widget.js`. The strip is
refreshed at build time (manual or CI weekly).

## 21. Performance contract

| Constraint | Rule |
|---|---|
| LCP | < 2.5s; hero poster preloaded; LCP never inside an iframe; never lazy-load the LCP element |
| Embeds | 100% click-to-load facades (~800ms LCP improvement documented; lite-embed renders ~224× faster than the raw player) |
| Canvas | one canvas/page; DPR ≤ 2; particles scale with viewport; rAF pauses on `visibilitychange` + IO-gated off-screen; parallax/constellations ride the existing loop |
| Marquee | CSS transform only; visible pause control (WCAG 2.2.2); reduced-motion static |
| JS | ≤ 50KB gzip total; motion additions ≤ 8KB gzip; no animation libraries |
| Motion runtime | transform/opacity only (color at 150ms allowed); ≤3 ambient loops per viewport; ≤6 will-change layers; clip-path only for the two one-shot decodes |
| Check | budget verified before every phase ship; regression blocks merge |

## 22. Cadence contract (tiered, honest)

1 Transmission/week is the only guaranteed beat. Field Reports biweekly until sustainable;
Reply Threads monthly at launch; Receipts bundle into Transmissions when needed. The log is
**timestamped, not scheduled** — gaps are fiction-compatible. The real cadence is published
on the Now page.

## 23. Licensing & provenance contract

Per-artifact license line on every card (CC BY 4.0 default for prompts/skills; repo license
verbatim for code). Provenance field mandatory: `original | derived from | inspired by`.
Exclusion list for third-party verbatim material (those never reach the shelf). Stars via
build-time fetch with `—` fallback. Takedown/contact path in the Library footer.

## 24. Discovery contract

Per-video VideoObject JSON-LD + video sitemap entries; watch/replies ship as static HTML
with full meta (never client-rendered); RSS extended with per-entry type; transcripts
published on-page (compliance + SEO + the Receipt culture). Analytics stance decided in
Phase 3 (privacy-respecting or none) with Library-download and outbound-click counting
before any KPI posture is claimed.

---

# Part VI — Build order & acceptance

## 25. Phases

- **Phase 3 — Broadcast + Watch**: snapshot-card strip; watch.html; Field Report entry type;
  facade player + S1; first vlog twin ("A Year of Building the Poziverse Mesh", `FR-001` ←
  `T-001` twin). Analytics stance decided.
- **Phase 4 — Reply Threads**: replies.html; episode template; **Editorial Response skill**
  authored as the first Library artifact (`LB-01 IN REVIEW`); 3 launch episodes drafted as
  essays first.
- **Phase 5 — Downloads + Library**: downloads.html (blog-as-download featured);
  library.html with the skill; licensing/provenance model live; receipt badge system.
- **Phase 6 — Now + Field Log home**: now.html; home archive becomes the type-filterable
  Field Log with global numbering; constellation signature (S4).

Each phase ships with: full state coverage, a11y pass, reduced-motion map, performance
budget check, and a self-contained `index.html` fallback for previews.

## 26. Acceptance criteria (the "striking" bar)

1. A first-time visitor can name the brand fiction after 10 seconds on any page.
2. Every surface has at least one screenshot-worthy moment (from the eight signatures).
3. Every animated element has a purpose and a reduced-motion substitute.
4. Every visible claim has a receipt one click away.
5. Zero console errors, zero layout shift, LCP < 2.5s on home and Watch.
6. The whole media center reads as one continuous numbered log.

---

# Appendix A — Data model summary (additions to `data.js`)

`socials[]` (platform, handle, url, status, latest, art) · `videos[]` (id, youtubeId, title,
deck, date, duration, posterArt, chapters[], transcriptUrl, twinSlug, status) · `replies[]`
(id, number, creator{}, video{}, status, date, beats{pick, claim, praise{refs},
divergence, receipt[], handoff, thread[]}, twinSlug) · `downloads[]` + `closedMesh[]` ·
`library[]` (id, title, kind, summary, body, version, updated, license, status,
provenance[], receipt, featured, art) · `now{}` (updated, staleAfterDays, project, read,
experiment, archive[]) · Field Log numbering: `T- / FR- / RT- / R-` in one counter.

# Appendix B — Research sources (key)

- Lite YouTube embed (facade, ~224× faster render): [paulirish/lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed)
- YouTube player params + privacy-enhanced mode: [developers.google.com](https://developers.google.com/youtube/player_parameters), [support.google.com](https://support.google.com/youtube/answer/171780?hl=en)
- Facade LCP effect (~800ms): [corewebvitals.io](https://www.corewebvitals.io/pagespeed/perfect-youtube-core-web-vitals)
- Instagram oEmbed auth-gating + Nov 2025 thumbnail removal: [developers.facebook.com](https://developers.facebook.com/documentation/instagram-platform/oembed), [iframely.com](https://iframely.com/updates/193071-facebook-and-instagram-oembed-thumbnail-deprecation)
- TikTok embed performance: [justinribeiro.com](https://justinribeiro.com/chronicle/2022/07/15/terrible-tiktok-embed-web-performance-and-my-imperfect-web-component-solution/)
- X timeline embed failures: [devcommunity.x.com](https://devcommunity.x.com/t/twitter-timeline-embed-not-working/183758)
- CSS scroll-driven animations: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations), [joshwcomeau.com](https://www.joshwcomeau.com/animation/scroll-driven-animations/)
- Fair-use code for online video: [cmsimpact.org](https://cmsimpact.org/code/code-best-practices-fair-use-online-video/)
- Video accessibility (captions/audio description/transcripts): [swarmify.com](https://swarmify.com/blog/video-accessibility-captions-wcag/), [section508.gov](https://www.section508.gov/create/synchronized-media/)
- WCAG 2.2.2 pause/stop/hide: [w3.org](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html)
- VideoObject structured data: [developers.google.com](https://developers.google.com/search/docs/appearance/structured-data/video)
- LCP guidance: [web.dev](https://web.dev/articles/lcp)
- /now convention: [nownownow.com](https://nownownow.com/), [sive.rs](https://sive.rs/now3)
- CC licenses & generative AI: [creativecommons.org](https://creativecommons.org/2023/08/18/understanding-cc-licenses-and-generative-ai/)

*End of blueprint.*
