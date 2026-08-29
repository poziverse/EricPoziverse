#!/usr/bin/env node
// Week-1 pack patch: 3 path-mesh article deepenings + 10 Library artifact cards.
const fs = require("fs");
const path = require("path");
const p = path.resolve(__dirname, "..", "assets", "js", "data.js");
let src = fs.readFileSync(p, "utf8");
const EOL = src.includes("\r\n") ? "\r\n" : "\n";
const log = [];
const mustOnce = (s, label) => { const n = src.split(s).length - 1; if (n !== 1) { console.error(`FATAL ${label}: ${n} occurrences`); process.exit(1); } };

// ---------- 1) article deepenings ----------
function insertAfterBodyAnchor(slug, anchor, html) {
  mustOnce(anchor, `anchor ${slug}`);
  const ai = src.indexOf(anchor);
  const closer = EOL + "    `";
  const ci = src.indexOf(closer, ai);
  if (ci < 0 || ci - ai > 400) { console.error(`FATAL ${slug}: body closer not near anchor (delta ${ci - ai})`); process.exit(1); }
  src = src.slice(0, ci) + EOL + html + src.slice(ci);
  log.push(`deepened ${slug}`);
}

insertAfterBodyAnchor("year-of-the-mesh", "Year two starts now.</p>", [
  '      <h2>What the agents actually run</h2>',
  '      <p>The swarm is not a metaphor on this mesh &mdash; it is a registry. Eleven named workers run the boring parts: an orchestrator that decomposes missions, a researcher, a strategist, a builder, a reviewer, a qa agent, a knowledge-manager that is the sole vault writer, an ops-watch that subscribes to mesh events, a maintainer, an inbox-triage, and a coding team that runs as a real supervisor loop &mdash; coder and reviewer, up to five iterations, three replans, then a human review instead of a silent failure. Every handoff lands in a shared checkpoint database, not in chat scrollback.</p>',
  '      <p>Memory is three-tiered for the same reason the storage is. Session state lives with the agent. Cross-session context lives in a dialectic memory layer. Project state &mdash; decisions, progress, checkpoints &mdash; lives here, in the vault, versioned like code. When one model talks to the next, the vault is the contract between them.</p>',
  '      <p>And the fleet itself is sorted by talent: one model for extended reasoning at the operator&#8217;s side, one long-horizon coordinator, a coding specialist, a high-throughput sweeper for background triage, and a multimodal edge for screenshots and documents. Five profiles, one topology &mdash; orchestrator, specialist, sweeper, interface. The brain talks to you; the fleet talks to the brain.</p>',
].join(EOL));

insertAfterBodyAnchor("llm-routing-mesh", "running a model economy.</p>", [
  '      <h2>The fleet, by the numbers</h2>',
  '      <p>Routing decisions here are benchmark-driven, not vibe-driven. Verified against live model cards and eval runs, not press releases: the coding specialist posts SWE-bench Verified above 80 with Terminal-Bench in the high sixties; the long-horizon coordinator holds the pool&#8217;s best SWE-bench Pro and the highest GPQA Diamond; the reasoning flagship trades speed for the strongest agentic coding score in the pool; the workhorse delegates at roughly one second per call, verified under concurrent load.</p>',
  '      <h2>What the literature says</h2>',
  '      <p>The research agrees with the practice. A 2026 graph multi-agent study cut inference cost up to 72% by routing difficulty instead of running the strong model on every call. A cascaded-debate study beat always-multi-agent setups by double digits using confidence-based escalation. And a router-collapse study named the failure mode I hit myself: routers silently converge to one tier &mdash; so design explicit fallbacks, never trust the router&#8217;s judgment alone.</p>',
  '      <h2>The local verdict</h2>',
  '      <p>So: the orchestrator gets the smartest fast model &mdash; one great call beats five cheap ones at the sequential bottleneck. Workers get the fast workhorse, because cost and latency multiply across fan-out. Specialists deliberately get the big models when their whole job is the hard part. And the concurrency ceiling is real: the cloud plan allows three parallel calls, a parent plus three children is four, so the parent yields while workers run. Pin models per profile. Let infrastructure do failover. Do not build a router agent.</p>',
].join(EOL));

insertAfterBodyAnchor("hermes-always-on", "and the runbook became the memory.</p>", [
  '      <h2>The orphan-process war</h2>',
  '      <p>For weeks the error log grew on a timer: another gateway instance already running, every fifteen to twenty seconds. The service was healthy; the log lied anyway. The root cause was ancestry &mdash; orphaned gateway and watchdog processes reparented to init by background jobs, fighting the real service for the port. The fix was a surgical kill loop keyed on parentage, not name: find every gateway process whose parent is init, terminate, escalate if it survives, verify. The lesson generalizes: when two copies of a daemon fight, check who their parents are before you check what they claim.</p>',
  '      <h2>What always-on actually requires</h2>',
  '      <p>Always-on is not &ldquo;leave it running.&rdquo; A gateway spawned inside a subagent dies when the subagent reaps &mdash; the whole process group goes with it. A script shim does not survive non-interactive contexts. The durable shape is a foreground launcher wired to a scheduled task that survives logon, watchdogs that stay silent when healthy and alert on non-zero exit, and failure limits that block a stuck task instead of retrying forever. Uptime is not a setting. It is a small collection of ancestors, each held by something that outlives the session that started it.</p>',
].join(EOL));

// ---------- 2) Library batch #1 ----------
const LIB_START = src.indexOf("window.POZIVERSE.LIBRARY = [");
const LIB_END = src.indexOf("window.POZIVERSE.NOW", LIB_START);
if (LIB_START < 0 || LIB_END < 0) { console.error("FATAL: LIBRARY bounds"); process.exit(1); }
let lib = src.slice(LIB_START, LIB_END);
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
    provenance: ["SOURCE: vault 00_System/skills/${id}.md", "TENANT: EricPoziverse", "GATE: privacy-scan clean 2026-08-29"],
    receipt: { label: "${receiptLabel}", url: "${receiptUrl}" },
    featured: false,
    art: "${art}"
  }`;
const cards = [
  card("verify-before-write", "Verify Before Write", "skill",
    "The Iron Law of editing machine-readable things: read the environment first, then write. Includes the rule that catches the most common verifier failure mode.",
    "IRON LAW: never write identifiers from memory without verifying against the live artifact. When to load: editing configs, schemas, deployed code, or anything an upstream consumes.\\n\\nTHE KEY RULE (v1.60): every surgical-patch verifier MUST include at least one behavioral check - run the changed code and assert expected output - not just static checks. Static checks once passed while an over-indented block was silently unreachable; only the behavioral check caught it.\\n\\nFailure modes covered: patch-tool corruption, indentation survival, verifier-as-changed-path (a verifier that passes by examining its own code), verified-live frontmatter forward references.",
    "v1.60.0", "annex.html?lesson=lx-001", "art-4"),
  card("agent-ecosystem-loop", "Agent Ecosystem Loop", "skill",
    "A 6-phase execution discipline for any non-trivial agent task: Scope, Audit, Plan, Iron-law Verify, Execute, Document - with a pitfall catalog earned from real missions.",
    "Run six phases, in order, for any task with 3+ tool calls across multiple substrates. (1) SCOPE: one sentence defining done. (2) AUDIT: read source, probe live - never build what is already built. (3) PLAN: write the master plan where the project can find it. (4) IRON-LAW VERIFY: write the verifier BEFORE executing. (5) EXECUTE in dependency order, re-running the verifier at each phase end. (6) DOCUMENT: session report, skill updates, memory writes.\\n\\nPitfall catalog (P-AE-1 to P-AE-56+), highlights: verifier-as-changed-path; context-compression corruption silently dropping critical lines; doc-based gap overstatement (docs say missing, live probe proves present); deploy-time regression (a prior fix reverts on the next deploy).",
    "v1.43.0", "annex.html?lesson=lx-001", "art-5"),
  card("specialist-subagent-orchestrator", "Specialist Subagent Orchestrator", "skill",
    "How to build a dedicated orchestrator subagent for a domain - role definition, toolsets, delegation depth, and the verification gates that keep it honest.",
    "When a domain earns a dedicated agent (legal, research, video, ops), define: (1) the role in one sentence - what it owns, what it never touches; (2) the toolset - the minimum set of tools the role needs, no more; (3) delegation depth and max concurrent children - how far down the tree it may spawn; (4) verification gates - what evidence it must produce before claiming done.\\n\\nThe topology that scales: orchestrator, specialist, sweeper, interface. The orchestrator talks to the operator; specialists do the domain work; sweepers handle volume; interfaces handle modality. One profile = one focus = no role contamination.",
    "v1.0.0", "annex.html?lesson=lx-005", "art-6"),
  card("closed-network-threat-model", "Closed-Network Threat Model", "skill",
    "A single-user, local-first security doctrine: no knee-jerk key rotation, no incident theater - contain by file permissions, redaction, and transport instead.",
    "Load this whenever reasoning about secrets, credentials, SSH keys, sudo, or auth on a closed single-user network. THE RULE: do not recommend key rotation as the default response to a leaked secret. Contain instead: move the secret to a mode-600 file or env var, redact the document that leaked it, update .gitignore, or change transport. 'Security incident' framing is over-escalation in a single-operator environment.\\n\\nWhy: on a closed network the threat is persistence and accidents, not attackers racing you to rotate. Match the response to the actual threat model, not to the loudest generic advice.",
    "v1.0.0", "article.html?id=year-of-the-mesh", "art-7"),
  card("cron-job-authoring-on-hermes", "Cron Job Authoring", "skill",
    "Authoring recurring jobs on an agent mesh: wake-gate scripts, scheduled prompts, delivery targets - and the debugging rule everyone learns the hard way.",
    "Pattern for recurring agent work: a wake-gate script decides whether the cron should do anything (silent exit when healthy - no output means no noise); a scheduled prompt for real work; an explicit delivery target (origin, local, telegram, all).\\n\\nTHE DEBUGGING RULE: the gateway is the scheduler, not cron. When a job will not fire, check the gateway first - its process, its lock, its dispatcher ticks - before blaming the schedule syntax. Pairs with: a watchdog that prints nothing when healthy and alerts on non-zero exit.",
    "v1.0.0", "annex.html?lesson=lx-005", "art-8"),
  card("incident-commander", "Incident Commander", "skill",
    "Autonomous incident detection, root-cause analysis, and structured remediation - the ops skill that pairs a monitoring feed with a runbook anchor per service.",
    "When a monitored service flips red: (1) detect and scope - what changed, when, what else changed at the same time; (2) root-cause with evidence, not guesses - read the actual logs and process ancestry; (3) remediate with a structured playbook, not improvisation.\\n\\nPairs with a mesh map that answers 'what just fell over' - CT ID to owner, service, and runbook anchor - before touching anything. The output of every incident is a runbook line: the failure, the fix, the rule it taught.",
    "v1.0.0", "article.html?id=hermes-always-on", "art-9"),
  card("drift-audit-multisource", "Drift Audit, Multisource", "skill",
    "A 6-source cross-check that finds where reality diverges from documentation: filesystem, processes, configs, runtime state, declarations, and intents.",
    "Run when the question is 'is my stack actually configured the way I think?' Cross-check six sources: (1) the filesystem, (2) running processes, (3) config files, (4) runtime state, (5) written declarations, (6) intents.\\n\\nReality diverges from documentation in every system that changes. The audit's product is the gap list: where docs say X and the machine says Y. Each gap becomes either a doc fix or a config fix - never both left disagreeing. Pre-deploy sanity check across substrate layers.",
    "v1.0.0", "article.html?id=year-of-the-mesh", "art-10"),
  card("proxmox-mesh-monitor", "Proxmox Mesh Monitor", "skill",
    "The incident-response map: container IDs to owners, services, and runbook anchors - so response starts with knowing what just fell over.",
    "A monitoring companion skill: map every container ID and VM name to its owner, the service it runs, and the runbook anchor for when it fails. Load it when an LXC or VM crashes and someone needs to know what it ran; when routing a service name to the right machine; or when building runbook anchors for incident response.\\n\\nThe rule it encodes: an incident response that starts with 'what was that box?' has already lost five minutes. The map is written while everything is healthy.",
    "v1.0.0", "article.html?id=hermes-always-on", "art-11"),
  card("stewarding-contentious-content", "Stewarding Contentious Content", "skill",
    "Handling legally consequential material - attacks, allegations, threats - with redaction, attribution, citation, and preserved provenance.",
    "When pulled content is legally consequential (character attacks, threats, allegations), guide careful handling: redact what does not need to ship, attribute every claim to its source, cite generously, preserve provenance end to end.\\n\\nPairs with public peer review: the fairness gate asks whether the reviewed creator would thank you; this skill governs the material itself. Citation-verify gate decisions apply to hostile content too - a quote without provenance is a liability, not an argument.",
    "v1.0.0", "replies.html", "art-12"),
  card("browser-use-automation", "Browser Use Automation", "skill",
    "The escalation ladder for browser work - extract, search, real browser, AI-driven, desktop - and the Playwright patterns verified in production.",
    "Pick the lightest layer that works: (L1) static extraction to clean markdown; (L2) search for facts; (L3) a real browser for JavaScript, clicks, and screenshots; (L4) AI-driven browser when the steps are unknown; (L5) desktop control only when the user's actual machine must be driven. Default to L1/L2.\\n\\nVerified Playwright patterns: connect over CDP to reuse an existing browser with its auth; storage_state captures localStorage for apps that live there; keyboard shortcuts map consistently on Windows; unique video-record directories per segment prevent collisions.",
    "v1.5.0", "annex.html?lesson=lx-001", "art-2"),
];
const tailAnchor = 'art: "art-3"';
mustOnceIn = (s, label) => { const n = lib.split(s).length - 1; if (n !== 1) { console.error(`FATAL ${label}: ${n} occurrences in LIBRARY block`); process.exit(1); } };
mustOnceIn(tailAnchor, "lib tail");
const tai = lib.indexOf(tailAnchor);
const closeIdx = lib.indexOf("]", tai);
if (closeIdx < 0) { console.error("FATAL: LIBRARY close not found"); process.exit(1); }
lib = lib.slice(0, closeIdx) + ",\n" + cards.join(",\n") + "\n" + lib.slice(closeIdx);
log.push(`library +${cards.length} cards`);
src = src.slice(0, LIB_START) + lib + src.slice(LIB_END);

const tmp = p + ".tmp";
fs.writeFileSync(tmp, src, "utf8");
fs.renameSync(tmp, p);
console.log("PATCHED:", log.join(" | "));
