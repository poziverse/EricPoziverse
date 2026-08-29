#!/usr/bin/env node
// Importer: resources — starter set of guides, runbooks, and reference docs worth pointing learners to.
const fs = require("fs");
const path = require("path");
const OUT = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727/data/directory";
fs.mkdirSync(OUT, { recursive: true });
const today = "2026-08-29";

const R = (id, name, plain, description, tags, category, appearsIn, source) => ({
  id: "resource-" + id, kind: "resource", name, plain, description,
  tags, category, level: "foundation", status: "live",
  appearsIn: appearsIn || [], related: [], aliases: [],
  provenance: { source, verified: today }, links: [], updated: today, extra: {},
});

const records = [
R("network-topology-doc", "The Network Topology Document", "The one document that started it all: what the system is and where everything lives.",
 "Written a year ago, it answers a simple question: what is this system, and where does everything live? It maps four computers, their roles, and the services on each. Updated as the mesh grows.", ["network", "map"], "infrastructure", ["article:year-of-the-mesh"], "vault 01_System/00_Core"),
R("creator-research-index", "Creator Research Index", "The index of followed creators - profiles, videos, and transcripts - that feeds public reviews.",
 "Six active creators with per-video notes and transcripts. This research feeds the Reply Threads: every public review starts here, and the fairness check reads these notes first.", ["research", "creators"], "creation", ["article:agent-native-video"], "vault 03_Knowledge/07_External/Followed-Creators"),
R("mission-control-runbooks", "Mission Control Runbooks", "The fix-it instructions written by real incidents - each failure became a rule.",
 "Every dashboard incident ended with a runbook line: what broke, what fixed it, and the rule it taught. This collection is why the same problem rarely happens twice.", ["operations", "runbooks"], "infrastructure", ["article:mission-control"], "vault 02_Projects/mission-control-lab"),
R("content-studio-manifest", "Content Studio Capability Manifest", "A live-checked list of every video tool the studio can use, with test dates.",
 "Each tool has a status, a use-when, and the date it last passed a real test. The manifest also carries the budget rules: a spending cap per session, free tools first, paid tools only with a written reason.", ["video", "manifest"], "creation", ["article:agent-native-video"], "vault 02_Projects/content-creation"),
R("vault-ontology-map", "The Vault Ontology Map", "The street plan for 5,500+ notes: five folders, four rules, and a metric that matters.",
 "The map keeps the knowledge base findable for humans and AI agents alike. Its metric is not the note count - it is time-to-find: can any note be pulled in seconds?", ["knowledge", "organization"], "craft", ["article:vault-ontology"], "vault root"),
R("plain-language-rules", "The Plain-Language Rules", "The editorial contract that keeps every page readable for first-time learners.",
 "Grade 8.5 or below. Short sentences. Everyday words. Numbers and links never change. Technical terms get a plain-language gloss the first time they appear. Every section of the site was rewritten under this contract.", ["editorial", "standards"], "craft", ["article:design-vocabulary"], "website project docs"),
R("fr001-production-brief", "Field Report 001 Production Brief", "The shot list, script skeleton, and quality gates for the first video episode.",
 "Voice-over over real screen captures. Five chapters, each mapped to a live surface of the mesh. Includes the honesty gates: synthetic voice disclosed, no invented metrics, receipts required.", ["video", "production"], "creation", ["article:agent-native-video"], "website project docs/FR-001-PRODUCTION-BRIEF.md"),
R("swarm-operations-guide", "Swarm Operations Guide", "How eleven named agents divide the work - and what each one is never allowed to touch.",
 "The roster and the rules: a planner decomposes missions, a knowledge-manager is the only vault writer, a coding pair reviews its own work up to five rounds, then a human reads instead of a silent failure.", ["agents", "operations"], "infrastructure", ["article:hermes-always-on"], "vault 01_System/05_Operations"),
R("model-fleet-build-log", "Model Fleet Build Log", "The verified build story of the five-profile fleet - including the parts that broke.",
 "What shipped, what failed, and the three honest mistakes: trust-but-probe, a verifier with its own bug, and a claimed self-test that was only half-run. Every mistake became a vault note.", ["agents", "fleet"], "infrastructure", ["article:model-fleet"], "vault 02_Projects/proxiverse"),
R("orchestration-tiering-research", "Model Orchestration Tiering Research", "The benchmark study that decided which model gets which job.",
 "Verified numbers from live model cards: coding above 80 on SWE-bench, the best GPQA Diamond in the pool, one-second delegation. Plus the literature: cost cuts up to 72% by matching difficulty to the model.", ["ai", "research"], "infrastructure", ["article:llm-routing-mesh"], "vault 02_Projects/hermes-optimization"),
R("design-elevation-guide", "Design Elevation Guide", "How pages go from functional to calm, high-contrast, and calm-motion by rule.",
 "The craft guide behind the Learning Annex's design path: measurable contrast, motion budgets, two typefaces, and whitespace as a feature.", ["design", "craft"], "craft", ["article:design-vocabulary"], "vault 00_System"),
R("creator-stack-blueprint", "Creator Stack Blueprint", "The 2026 tool landscape for a solo creator - scored, decided, and priced.",
 "Sixty-plus tools reviewed, about twenty rejected on purpose, two pipeline shapes chosen, and a $85/month starter set. The plan supplies the tools; the human publishes.", ["creation", "stack"], "creation", ["article:youtube-creator-stack"], "vault 02_Projects/youtube-channel-management-2026-07-28"),
];

fs.writeFileSync(path.join(OUT, "resources.json"), JSON.stringify({ kind: "resource", records }, null, 1));
console.log("resources imported:", records.length);
