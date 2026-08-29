#!/usr/bin/env node
// Closeout patch: T-013 transmission + LX-013 lesson + path-mesh membership + NOW note.
const fs = require("fs");
const path = require("path");
const p = path.resolve(__dirname, "..", "assets", "js", "data.js");
let src = fs.readFileSync(p, "utf8");
const EOL = src.includes("\r\n") ? "\r\n" : "\n";
const log = [];
if (src.includes("slug: 'model-fleet'")) { console.log("SKIP: T-013 already present"); process.exit(0); }

// ---- 1) T-013 article: append at END of ARTICLES array (oldest position, newest-first ordering) ----
const A_START = src.indexOf("window.POZIVERSE.ARTICLES = [");
const A_END = src.indexOf("window.POZIVERSE.CATEGORIES", A_START);
if (A_START < 0 || A_END < 0) { console.error("FATAL: ARTICLES bounds"); process.exit(1); }
let art = src.slice(A_START, A_END);
const artClose = art.lastIndexOf("];");
if (artClose < 0) { console.error("FATAL: ARTICLES close"); process.exit(1); }
const t013 = `  {
    slug: 'model-fleet',
    title: 'One Model, One Job: <em>The Model Fleet</em>',
    deck: 'Five profiles, five cloud models, one topology. What a year of routing LLMs taught me about building an agent fleet where every model does the one job it is actually good at.',
    category: 'Agents',
    tags: ['agents', 'routing', 'fleet', 'ollama', 'orchestration'],
    date: '2026-08-29',
    readTime: 7,
    glyph: '13',
    art: 'art-4',
    excerpt: 'Five profiles, five models, one topology: orchestrator, specialist, sweeper, interface. The fleet doctrine, the build story, and the three honest mistakes it taught.',
    number: 'T-013',
    level: 'PRACTITIONER',
    objective: { verb: 'design', condition: 'a multi-model agent fleet', criteria: 'assign each model a role matched to its verified strengths, with documented failover and a concurrency budget' },
    prereqs: ['llm-routing-mesh'],
    next: [],
    lessonSlug: 'lx-013',
    body: \`
      <p>The routing field guide ended with a rule: pin models per profile, let infrastructure do failover, do not build a router agent. This is what happened when I followed it. Five cloud models, five agent profiles, one topology &mdash; a fleet where every model does the one job it is verifiably best at.</p>
      <h2>The fleet map</h2>
      <p>Each profile is the unit of isolation: its own config, sessions, skills, and memory. One profile, one focus, no role contamination. The brain sits closest to the operator &mdash; extended reasoning, dev work, the voice of the mesh. A long-horizon coordinator decomposes big missions and hands them off. A coding specialist reads repos and ships patches. A high-throughput sweeper eats background triage in bulk. A multimodal edge handles screenshots, documents, and the translation between modalities and text-only agents. Five profiles, one shape: <strong>orchestrator, specialist, sweeper, interface</strong>.</p>
      <figure class="stat-row">
        <div class="stat"><div class="value">5</div><div class="label">Profiles, one per model</div></div>
        <div class="stat"><div class="value">3</div><div class="label">Concurrent calls allowed</div></div>
        <div class="stat"><div class="value">4</div><div class="label">Calls a parent-plus-fanout needs</div></div>
      </figure>
      <h2>Why not one central orchestrator</h2>
      <p>Because every model has a different input/output character, and forcing them through one pipe adds latency and noise exactly where the fleet can least afford it. The dispatcher is already a per-tick dequeuer; routing happens in the tool queue, not in a model. The brain stays at the interface and says two things: the mission is starting, and the mission is done with these results. Everything in between belongs to the specialists.</p>
      <h2>The build story &mdash; including the parts that broke</h2>
      <p>The first build session shipped one profile live, scaffolded three more, and smoke-tested the models through a shared launcher. Then the honest part: the gateway process lived inside a subagent's process group, so when the subagent reaped, the gateway died with it &mdash; end-to-end multi-agent missions only worked while a foreground session held the light. The post-mortem gave three options and a rule that now sounds obvious: a daemon must be held by something that outlives the session that started it.</p>
      <p>Three mistakes went into the vault, because that is where mistakes become runbooks. I shipped leaf skills before testing the kanban roundtrip &mdash; and trust-but-probe caught me. The verifier itself had a bug: an unsatisfiable check that always failed while the artifact was fine. And I claimed a behavioral self-test was done when only two of five scenarios had actually run. Passing artifact-shape tests is not passing behavior tests. That sentence is the whole skill.</p>
      <h2>The doctrine, compressed</h2>
      <ul>
        <li>Orchestrator: the smartest <em>fast</em> model &mdash; one great call beats five cheap ones at the sequential bottleneck.</li>
        <li>Workers: the fast workhorse &mdash; cost and latency multiply across fan-out.</li>
        <li>Specialists: the big models, deliberately, when their whole job is the hard part.</li>
        <li>Concurrency: know the ceiling, budget the parent, make the parent yield.</li>
        <li>Failover: infrastructure's job. Routing semantics: a dispatch-time lookup table, not an agent.</li>
      </ul>
      <p>The fleet is not finished &mdash; fleets never are. But the doctrine is stable, the profiles are on disk, and the next model that shows up with a verified strength already has a shape to fit. That is what a year of routing buys you: not a smarter stack, a legible one.</p>
    \`
  },
`;
art = art.slice(0, artClose) + t013 + art.slice(artClose);
src = src.slice(0, A_START) + art + src.slice(A_END);
log.push("T-013 added");

// ---- 2) LX-013 lesson: append at END of LESSONS array ----
const L_START = src.indexOf("window.POZIVERSE.LESSONS = [");
let lEnd = src.indexOf("window.POZIVERSE.", L_START + 10);
if (L_START < 0) { console.error("FATAL: LESSONS bounds"); process.exit(1); }
if (lEnd < 0) lEnd = src.length;
let les = src.slice(L_START, lEnd);
const lesClose = les.lastIndexOf("];");
if (lesClose < 0) { console.error("FATAL: LESSONS close"); process.exit(1); }
const lx013 = `  {
    id: 'lx-013',
    number: 'LX-013',
    title: 'The Model Fleet',
    level: 'PRACTITIONER',
    path: 'path-mesh',
    objective: { verb: 'design', condition: 'a multi-model agent fleet', criteria: 'assign each model a role matched to its verified strengths, with documented failover and a concurrency budget' },
    prereqs: ['lx-004'],
    transmissionSlug: 'model-fleet',
    fieldReportId: null,
    exercise: {
      summary: 'Stand up two agent profiles on two different models, route one real task through each, and write the dispatch-time lookup table that decides which profile gets which task type.',
      receipt: { label: 'Fleet dispatch table in vault', url: 'article.html?id=model-fleet' }
    },
    checkpoint: [
      'Verified each model&#8217;s strengths against live model cards and eval runs, not marketing pages',
      'Built two isolated profiles and proved a task routes to each correctly',
      'Wrote the dispatch-time lookup table with an explicit failover path',
      'Documented the concurrency ceiling and the parent-yield rule'
    ],
    badge: 'module',
    status: 'live',
    glyph: '13',
    art: 'art-4'
  },
`;
les = les.slice(0, lesClose) + lx013 + les.slice(lesClose);
src = src.slice(0, L_START) + les + src.slice(lEnd);
log.push("LX-013 added");

// ---- 3) path-mesh gains lx-013 ----
const pm = "lessonIds: ['lx-001', 'lx-004', 'lx-005', 'lx-010'],";
mustOnce = (s, label) => { const n = src.split(s).length - 1; if (n !== 1) { console.error(`FATAL ${label}: ${n} occurrences`); process.exit(1); } };
mustOnce(pm, "path-mesh lessonIds");
src = src.replace(pm, "lessonIds: ['lx-001', 'lx-004', 'lx-005', 'lx-010', 'lx-013'],");
log.push("path-mesh membership");

// ---- 4) NOW note ----
const noteAnchor = '{ date: "2026-08-28", text: "Decisions logged: hosted auth (Option A); Field Reports go voice-over over mesh footage; Library stays open (CC BY-SA / MIT); first three Reply Threads nominated from the followed-creators research." },';
mustOnce(noteAnchor, "NOW note anchor");
src = src.replace(noteAnchor, noteAnchor + EOL + `      { date: "2026-08-29", text: "Pack #1 + #2 shipped: three transmissions deepened with vault receipts, 21 Library artifacts live, OG/favicon/manifest layer, and T-013 The Model Fleet drafted from the fleet build logs." },`);
log.push("NOW note");

const tmp = p + ".tmp";
fs.writeFileSync(tmp, src, "utf8");
fs.renameSync(tmp, p);
console.log("PATCHED:", log.join(" | "));
