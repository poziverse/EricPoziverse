#!/usr/bin/env node
// Library batch #2: 10 artifact cards from the canonical skill catalog trees.
const fs = require("fs");
const path = require("path");
const p = path.resolve(__dirname, "..", "assets", "js", "data.js");
let src = fs.readFileSync(p, "utf8");
const EOL = src.includes("\r\n") ? "\r\n" : "\n";
const LIB_START = src.indexOf("window.POZIVERSE.LIBRARY = [");
const LIB_END = src.indexOf("window.POZIVERSE.NOW", LIB_START);
if (LIB_START < 0 || LIB_END < 0) { console.error("FATAL: LIBRARY bounds"); process.exit(1); }
let lib = src.slice(LIB_START, LIB_END);
if (lib.includes("humanizer")) { console.log("SKIP: batch #2 already applied"); process.exit(0); }

const card = (id, title, kind, summary, body, ver, prov, receiptLabel, receiptUrl, art) =>
`  {
    id: "${id}",
    title: "${title}",
    kind: "${kind}",
    summary: "${summary}",
    body: "${body}",
    version: "${ver}",
    updated: "2026-08-29",
    license: { spdx: "CC BY-SA 4.0", label: "CC BY-SA 4.0", url: "" },
    status: "published",
    provenance: ["SOURCE: vault ${prov}", "TENANT: EricPoziverse", "GATE: privacy-scan clean 2026-08-29"],
    receipt: { label: "${receiptLabel}", url: "${receiptUrl}" },
    featured: false,
    art: "${art}"
  }`;

const cards = [
  card("humanizer", "Humanizer", "skill",
    "Strip the 34 telltale patterns of AI-generated prose and add real voice - the anti-slop editing pass behind everything published here.",
    "Load when a draft needs to stop sounding machine-written. (1) Scan for the 34 known AI patterns - the ones statistical next-token prediction bakes in. (2) Rewrite the problem sections; keep the meaning, keep the intended tone. (3) Add soul: removing tells is half the job, the rewrite still needs a person in it. (4) Final pass: ask what still reads as obviously AI-generated, answer honestly, revise once more.\\n\\nVoice calibration: give the editor a sample of real writing you like and it matches that, not a generic register. Always shows the diff - never silently overwrites.",
    "v2.5.1", "05_Agent_Work/02_Skills/catalog/creative/humanizer/SKILL.md | BASED ON: github.com/blader/humanizer (MIT) by Siqi Chen", "The voice pass on every published piece", "library.html", "art-1"),
  card("parallel-verification-swarm", "Parallel Verification Swarm", "skill",
    "Dispatch N parallel subagents to verify a capability claim - each returns a verifiable artifact, the swarm returns PASS / DEFER / FAIL with evidence paths.",
    "When someone claims a pipeline works end-to-end, do not accept the claim - verify it with artifacts. Dispatch N leaf subagents in parallel, one per capability, each required to produce proof: a file path, an exit code, an output snippet, a render. Plus one extra agent that QAs the spec itself - separating 'does it work' from 'is the spec right'.\\n\\nAggregate into a single verification report: PASS / DEFER / FAIL per capability, exact evidence paths, one-line verdict each. A DEFER is an honest state, not a failure to hide - it names the retry path.",
    "v1.2.0", "05_Agent_Work/02_Skills/catalog/parallel-verification-swarm/SKILL.md", "The pattern behind the deploy smoke test", "library.html", "art-4"),
  card("design-system-enforcement", "Design System Enforcement", "skill",
    "Turn ad-hoc UI patchwork into a tokenized, audited, visually verified design system - the 6-phase transformation with Iron Laws.",
    "Six phases: audit the inconsistency, define tokens, define components, fix layout grids, visually verify every surface with screenshots, document and enforce with a CI audit script that exits non-zero on drift.\\n\\nIron Laws: tokens over raw values; classes over inline styles; visual verification is mandatory before claiming anything works; cache-bust assets after template changes; never build panel wrappers that make a page look like an iframe; and beware inline function declarations shadowing module bindings after a script src - the bug with no console errors.",
    "v1.3.0", "05_Agent_Work/02_Skills/catalog/software-development/design-system-enforcement/SKILL.md", "The craft path's enforcement discipline", "annex.html?lesson=lx-003", "art-5"),
  card("loop-engineering", "Loop Engineering", "skill",
    "The Gauntlet Loop and bounded loops: builder vs fresh-context critic vs a concrete reference bar - loops that stop on evidence, not on vibes.",
    "Two patterns, kept separate. The Gauntlet Loop: one orchestration prompt starts a build - criticise - revise run, where fresh-context critics compare the real artifact against a concrete reference bar. The engineered recurring loop: triggers, state, verification, recovery, budget.\\n\\nThe smallest useful design card has three elements: an Objective ('rebuild the pricing page so a first-time visitor can compare plans and check out on mobile'), a Metric ('no a11y violations, no horizontal overflow at 360px, a fresh critic prefers our hierarchy'), and a Boundary ('stop after four hours, a budget, three failed approaches, or any credential blocker').\\n\\nDo not loop when success is subjective with no reviewer, mistakes are irreversible, or one careful human pass is cheaper.",
    "v1.0.0", "05_Agent_Work/02_Skills/catalog/software-development/loop-engineering/SKILL.md", "The gauntlet behind capstone reviews", "club.html", "art-6"),
  card("git-disaster-recovery", "Git Disaster Recovery", "skill",
    "When git log is missing commits you definitely made, they are almost certainly still in the object store. The 5-step recipe recovers all of it in about two minutes.",
    "Triggers: fewer commits than you made; a reflog entry you did not author; a working tree full of untracked files that should be tracked; a sibling agent ran git pull and your work vanished.\\n\\nThe headline: do not rebuild - recover. The commits survive in the object store. The recipe walks the reflog, finds the dangling heads, restores the branch, and verifies byte-perfect. Includes byte-perfect single-file extraction from any historical commit and the prevention-tag strategy so the reset cannot happen silently again.",
    "v1.1.0", "05_Agent_Work/02_Skills/catalog/devops/git-disaster-recovery/SKILL.md | AUTHOR: Eric Poziverse with Hermes", "Codified from a real recovery on this mesh", "article.html?id=year-of-the-mesh", "art-7"),
  card("plan-mode", "Plan Mode", "skill",
    "Write an actionable plan instead of executing: bite-sized tasks with checkable done-when criteria on every step, exact paths, copy-pasteable commands with expected output.",
    "Planning-only discipline: no implementation, no mutating commands - the deliverable is the plan. Every step carries a done-when criterion you can actually check, exact file paths, complete code where relevant, verification steps, and the risks and open questions stated plainly.\\n\\nThe S-1 retrofit: bite-sized means each step is small enough that its completion is verifiable by inspection, not by faith. Plans live in a timestamped, findable location - a plan you cannot find later was never written.",
    "v2.1.0", "05_Agent_Work/02_Skills/catalog/software-development/plan/SKILL.md | PATTERN SOURCE: mattpocock/skills v1.1.0 S-1 retrofit", "The discipline behind every transmission's build", "annex.html", "art-8"),
  card("research-ingest", "Research Ingest", "skill",
    "The intake pipeline that turns external content - videos, repos, articles, papers, clippings - into filed, classified, retrievable vault knowledge.",
    "Every inbound item gets classified before it gets read deeply: YouTube extracts transcript and metadata; GitHub gets a mirror-or-reference decision; long-form essays get a three-layer summary (principles, components, pipeline); living catalogs get a reference page instead of a stale mirror; provider docs get action-relevant facts only.\\n\\nThe mirror-vs-file-vs-reference decision comes first: is the source alive? Then do not copy it - document how to query it and what you already keep. The pipeline also carries its own failure lessons: dead-path pre-flight, distinguishing 'zero new files' from 'watching a moved folder'.",
    "v1.3.0", "05_Agent_Work/02_Skills/catalog/research/research-ingest/SKILL.md", "The intake that feeds this whole platform", "now.html", "art-9"),
  card("surgical-string-replace-debugging", "Surgical String-Replace Debugging", "skill",
    "Five failure modes of sequential string-replace patching - regex greed, offset drift, duplicate anchors, escape corruption, distant slices - and the verification protocol that catches them all.",
    "When patching a single file with a sequence of targeted replacements, three things will eventually bite: regex greediness across nested structures; offset drift after a prior edit; and deploying without counting your anchors first. Later lessons: splicing an insert that begins with its own anchor creates two copies of it; byte-literal escapes turn \\\\r and \\\\n into real control bytes; and a distant slice-anchor deletes everything in between.\\n\\nThe protocol: count anchors before deploying, assert a sane size delta, keep a pristine mirror, and verify the patched file parses before it ships.",
    "v1.2.0", "05_Agent_Work/02_Skills/catalog/surgical-string-replace-debugging/SKILL.md", "Learned patching this very site", "library.html", "art-10"),
  card("youtube-channel-management-on-mesh", "YouTube Channel Management on Mesh", "skill",
    "The end-to-end creator publishing pipeline on self-hosted infrastructure - research, script, voice, video, thumbnail, upload, community, analytics - with zero SaaS creator stack.",
    "The publishing half of a creator business on a mesh, composed with the consumption half (competitor transcripts and creator intake) into a closed loop: consumption informs what to publish, publishing generates data for what to research next.\\n\\nCovers single channel or multi-channel network under one creator identity, optional membership-funnel monetization, weekly automation via cron, and brand-voice consistency - all through the Data API and self-hosted tooling. The stack you do not buy is the point: the mesh replaces the creator SaaS suite.",
    "v2.0.0", "05_Agent_Work/02_Skills/catalog/devops/youtube-channel-management-on-mesh/SKILL.md", "The pipeline the Watch page rides on", "watch.html", "art-11"),
  card("hyperframes-video", "Hyperframes Video", "skill",
    "HTML-to-video composition: author frames as HTML and CSS with seekable animations, render deterministic MP4s - the render engine behind the Field Reports.",
    "Hyperframes turns HTML, CSS, and seekable animations into deterministic MP4 video - which means video compositions become code: reviewable, versioned, re-renderable. The skill covers the composition structure, the design-system file, catalog blocks, lint, preview with live reload, and the render pipeline.\\n\\nProduction lessons: verify the project path before composing (stale paths in older docs are a trap); the headless flag was removed and old recipes fail on it; certain transform patterns on absolutely-positioned cards need explicit setup; renders past the timeout need splitting; and parallel renders belong to delegation, not background terminals.",
    "v1.2.0", "05_Agent_Work/02_Skills/catalog/creative/hyperframes-video/SKILL.md | TOOL: github.com/heygen-com/hyperframes", "The engine behind Field Report LX-002", "annex.html?lesson=lx-002", "art-12"),
];
const tailAnchor = 'art: "art-3"';
const tai = lib.indexOf(tailAnchor);
if (tai < 0) { console.error("FATAL: LIBRARY tail"); process.exit(1); }
const closeIdx = lib.indexOf("]", tai);
lib = lib.slice(0, closeIdx) + ",\n" + cards.join(",\n") + "\n" + lib.slice(closeIdx);
src = src.slice(0, LIB_START) + lib + src.slice(LIB_END);
const tmp = p + ".tmp";
fs.writeFileSync(tmp, src, "utf8");
fs.renameSync(tmp, p);
console.log("PATCHED: library batch #2, +10 cards (total " + (11 + 10) + ")");
