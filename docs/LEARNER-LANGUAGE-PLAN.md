---
type: plan
title: "The Learner Pass — making 'GPU Offload' (and every piece after) teachable"
tags: [content-creation, poziverse, plan, language, learner-pass]
status: proposed
created: 2026-08-29
project: "[[content-creation]]"
mirror: "website project docs/LEARNER-LANGUAGE-PLAN.md"
pilot: "T-010 'GPU Offloading From a Windows Desktop to Proxmox' + LX-010 'GPU Offload: The Desktop as Inference Server'"
---

# The Learner Pass — language plan for expert-written content

**Date:** 2026-08-29 · Owner: EricPoziverse · Executing: m32 (content) + main (tooling)
**Trigger:** Eric's review — "the content is not written for learners but experts."
**Scope:** Pilot on the GPU Offload pair, then roll out as a reusable gate for all Learning Annex lessons and DEEP DIVE transmissions.

---

## 0. Reflection: the site promises teaching, the copy delivers a briefing

The Learning Annex contract — written by us — says: *"the craft, taught the way it was learned:
by building... full teaching body, run-along exercise, checkpoint."* The content plan's own
mining rubric scores every note on **Teachability**. The pipeline even has a **voice pass**.

The GPU Offload pair breaks that promise in five specific ways. Not because the writing is bad —
the voice is genuinely good ("the GPU does the night shift, and the morning finds the renders
waiting" is a keeper) — but because it assumes the reader already knows the vocabulary, the
hardware, and the field. It briefs experts; it doesn't teach builders.

**The one-sentence diagnosis:** *tone is not the problem; assumed knowledge is.* We don't need a
rewrite that dumbs anything down. We need a **learner pass**: add runway under the same voice.

---

## 1. Diagnosis with receipts (live copy, T-010 + LX-010)

| # | Problem | Receipt (current copy) | Cost to a learner |
|---|---|---|---|
| 1 | **Jargon on first contact** | Deck opens with four proper nouns: "Ollama for the easy path, vLLM for throughput, vLLama for the hybrid, TGI for the Hugging Face ecosystem." "Mesh", "inference server" never defined. | Paragraph 1 loses the reader; nothing downstream can land. |
| 2 | **No shared mental model** | The essay never says in one breath what actually happens (laptop asks → desktop GPU thinks → answer returns). | Reader executes steps without a picture; nothing transfers. |
| 3 | **Numbers without anchors** | "120–160 requests per second with 50–80ms time-to-first-token" — TTFT never spelled out, no sense of scale. | Reader can't judge if this is good, needed, or relevant to them. |
| 4 | **Option dump instead of decision help** | Four options as headers; no if-then guidance beyond one parenthetical. | Reader must already be an expert to choose. |
| 5 | **Expert benchmark as the only pass gate** | LX-010 checkpoint: "Sustained 100+ requests/sec with TTFT under 80ms." Prereq chain points to another DEEP DIVE (`hermes-always-on`). No materials list, no first win. | The lesson's first success is a production SLO. Learners quit at rung zero. |
| 6 | **Content gap introduced in distillation** | The vault source (verified 2026-06-17) has a full **security section** (subnet-scoped firewall, SSH tunnel, NGINX auth). The transmission dropped all of it — while telling readers to open firewall ports. | Both a friendliness and a safety gap. |

---

## 2. Who we're writing for (the reader contract)

**Sam.** Has a decent Windows PC with an NVIDIA GPU and a home network. Uses ChatGPT. Has never
served a model, never touched Proxmox, may not know Docker. Can install an app and copy-paste a
command; cannot yet debug a firewall or read an ML paper.

**Litmus test:** write every teaching section like a smart friend leaning over Sam's shoulder —
keep the poetry, add the runway. An expert skims past the runway in seconds; Sam needs it to
take the first step. Runway costs experts nothing and is life-or-death for learners.

---

## 3. Rewrite plan — T-010 "GPU Offloading From a Windows Desktop to Proxmox"

Keep the structure (why → options → pattern) and every line of voice worth keeping. Add five
blocks and re-tune the language. Section by section:

### 3.1 Deck — promise the outcome, not the toolbox

- **Now:** "The desktop as an inference server the whole mesh can reach: Ollama for the easy path, vLLM for throughput, vLLama for the hybrid, TGI for the Hugging Face ecosystem. A setup walkthrough with real numbers."
- **Proposed:** "Your GPU shouldn't sleep when you do. Turn the PC under your desk into a shared brain every computer in the house can ask — transcriptions overnight, renders before you're out of the shower. Four tools can do this; one of them is right for you."

### 3.2 New opening block: "What you'll build" + "What you need"

A two-part card above the fold: the build in one sentence, and a materials list with honest time
estimates — e.g. *a Windows PC with an NVIDIA GPU (8 GB+ VRAM), a second machine on the same
network, ~30 minutes, no paid software.* This is the run-along contract the Annex promises.

### 3.3 New mental-model paragraph (three sentences, no jargon)

> Here's the whole idea in one breath: your desktop's graphics card is brilliant at exactly one
> thing — running AI models. Your other machines aren't. So we install a small program on the
> desktop that listens for questions, and point everything else at it: laptop sends the question
> over the network, the GPU does the thinking, the answer comes back as text.

Every reader now knows what "inference server" means before the term appears.

### 3.4 Jargon ladder — gloss on first use, every time

Rules: spell out every acronym on first use; one-sentence gloss for every field term; no forward
references. Examples to apply:

- **TTFT** → "time-to-first-token — how long between pressing enter and the answer's first word appears."
- **Continuous batching / PagedAttention** → "vLLM's trick is how it shares GPU memory between everyone asking at once, and groups requests as they arrive — a dishwasher that never runs a half-empty load."
- **vLLama** → keep the existing gloss (it's already good) but move it before the tool is name-dropped in the deck.
- **Mesh** → "the set of machines in your house that can reach each other."

### 3.5 Numbers with anchors

Pair every metric with a "for scale" line:

> 120–160 requests/second — for scale: every agent in a five-machine lab hammering it all
> evening wouldn't register. 50–80ms TTFT means the answer starts appearing about as fast as a
> monitor refreshes.

### 3.6 Decision table instead of option dump

| If you want… | Use | Time to first answer |
|---|---|---|
| It working tonight | **Ollama** | ~15 min |
| Serving a whole lab at once | **vLLM** | ~1 hour |
| Ollama simplicity, vLLM speed | **vLLama** | ~30 min |
| Deep Hugging Face integration | **TGI** | ~1 hour + Docker |

Then keep the per-option sections as they are (they're the expert payload).

### 3.7 Restore the security section — in learner terms

From the vault source, re-distilled: *"You just opened a door into your PC. Three locks, in
order of effort: (1) restrict the firewall rule to your home subnet; (2) SSH tunnel from
outside; (3) put NGINX with basic auth in front."* ~80 words. Receipt rule satisfied, gap closed.

### 3.8 New closing sidebar: "Common first-run failures"

The three things that actually break on night one, from the runbook: connection refused
(firewall rule scoped wrong), model never loaded (pull didn't finish), wrong IP (DHCP moved the
desktop). Two lines each, fix included.

---

## 4. Rebuild plan — LX-010 "GPU Offload: The Desktop as Inference Server"

The lesson currently points at the transmission and grades a production benchmark. Rebuild to
the Annex contract: **teaching body + run-along exercise + checkpoints Sam can actually climb.**

**Objective (re-scaffolded, three rungs instead of one):**

1. **First win (the default pass):** get a chat answer on your laptop that was generated by the
   GPU in the tower across the room. Copy-paste commands provided. ~15 min.
2. **Make it real:** open it to the network safely (firewall scoped to subnet), swap in a better
   model. ~30 min.
3. **Stretch (the current capstone, now optional):** sustained load — 100+ req/s, TTFT under
   80ms — plus the throughput-per-watt reading as the MESH ARCHITECT receipt.

**Checkpoint questions (plain language, 2–3):**

- In one sentence: what does the desktop do, and what do the other machines do?
- Your laptop gets "connection refused." Name the first two things you'd check.
- What's the difference between when Ollama is the right choice and when vLLM is?

**Exercise summary (revised):** "Stand up Ollama on the desktop, get an answer from another
machine, then — if you're chasing the MESH ARCHITECT badge — swap to vLLM and drive sustained
load from a second host." Receipt stays: throughput log in the vault.

**Level honesty:** keep the DEEP DIVE label but add one line under it — *"Start here if you've
finished LX-005; skip to §Options if you already serve models."* Labels start meaning something.

---

## 5. The reusable Learner Pass (the checklist this pilot produces)

Ten rules. Each is one line to check, and becomes the operational definition of the rubric's
**Teachability** axis. Added to the GATES stage of the pipeline (next to the voice pass):

1. **One-breath rule** — after paragraph one, a stranger can say what this piece builds.
2. **Materials up front** — hardware, software, time, cost. No surprises at step 3.
3. **Acronyms die on first use** — spelled out, even in headings.
4. **Jargon ladder** — every field term glossed in one sentence where it first appears.
5. **Numbers get anchors** — every metric paired with "for scale…".
6. **Commands come with because** — one line under each command saying what it does.
7. **Decide for the reader** — if-then tables over option dumps.
8. **Failure section** — the 3 most common first-run errors, with fixes.
9. **Poetry in its place** — openers, closers, blockquotes; teaching sections stay one-idea-per-sentence.
10. **Stranger test** — one non-technical reader retells the goal back; if they can't, the opening gets reworked before Eric's approval.

**What this pass is NOT:** not dumbing down the voice, not deleting expert payload (numbers,
architecture detail, receipts), not lowering capstones. Adding runway under the same voice.

---

## 6. Pipeline & site mechanics (small)

- **GATES stage:** add `learner pass` beside `voice pass` in the VAULT-CONTENT-PLAN pipeline
  diagram. Checklist = §5. m32 self-applies; Eric still approves.
- **Progressive disclosure on DEEP DIVE transmissions:** a collapsed "New here? Start with the
  two-minute version" block at the top — one-paragraph plain-language summary + mental model.
  Experts never see it unless they open it. Keeps both audiences on one page.
- **Glossary tooltips (optional, week 3+):** the content plan already reserves a glossary from
  `03_Knowledge/01_AI_ML`. Link first-use jargon to glossary popups instead of inline glosses
  once the glossary exists. Start with ~12 terms harvested from this rewrite.
- **Freshness while we're in here:** the vault source is flagged `verified_live: 2026-06-17`
  (>2 months). Per the rubric's freshness axis, re-verify the throughput numbers, vLLama's repo
  state, and model names during the rewrite — the receipt rule applies to the new copy too.
- **Where changes land:** `assets/js/data.js` (T-010 deck + body, LX-010 objective/exercise/
  checkpoints), optional small CSS for the disclosure block in `article.html`/`annex.html`,
  then the standard publish chain (refresh-inline-data → smoke test → sitemap → deploy bump).

---

## 7. Rollout order

| When | What | Why this order |
|---|---|---|
| Week 1 | Pilot: rewrite T-010 + rebuild LX-010 through the full pipeline; stranger test before Eric's approval | The flagged piece proves the format |
| Week 2 | FOUNDATION lessons LX-001..003 get the learner pass first | They're the doors new readers actually enter |
| Week 3 | Remaining path-mesh pieces: LX-004, LX-005, LX-013 + DEEP DIVEs LX-011, LX-012 | Same problem, lower heat |
| Ongoing | Every new item ships with the learner pass in GATES | Stop the bleeding at the source |

**Success measure:** a non-technical reader completes LX-010 rung 1 unaided in one sitting — and
an expert still finds the throughput numbers, the four-way comparison, and the poetry intact.

---

*This doc: canonical copy in the website project `docs/`, mirrored to the vault
`02_Projects/content-creation/`. Update both on change, same as VAULT-CONTENT-PLAN.md.*
