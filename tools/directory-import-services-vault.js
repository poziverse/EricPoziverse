#!/usr/bin/env node
// Importer: services from the VAULT intake documents (Machine-Inventory.md + 0RELIANCE-COM-SERVICE-STATUS.md).
// One normalized signature. No private IPs - containers are identified by CT number and name (public-safe).
const fs = require("fs");
const path = require("path");
const OUT = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727/data/directory";
fs.mkdirSync(OUT, { recursive: true });
const today = "2026-08-29";

const S = (id, name, plain, description, tags, host, status, source, appearsIn) => ({
  id: "service-" + id, kind: "service", name, plain, description,
  tags: [...tags, "mesh"], category: "infrastructure",
  level: "foundation", status, appearsIn: appearsIn || [], related: [], aliases: [],
  provenance: { source, verified: source.includes("Machine-Inventory") ? "2026-07-26 (vault)" : "2026-07-06 (vault)" },
  links: [], updated: today, extra: { host },
});

const records = [
S("hermes-gateway-wsl", "Hermes Gateway (The Brain)",
  "The always-on gateway that schedules the brain's work and connects it to everything.",
  "The Hermes gateway is the scheduler and connection hub of the primary brain. Every timed job, health check, and conversation flows through it. It runs in a Linux layer on the desktop and is held by a startup task that survives reboots.",
  ["agents", "core", "scheduling"], "desktop (WSL2)", "live",
  "vault 01_System/02_Infrastructure/Machine-Inventory.md",
  ["article:hermes-always-on"]),
S("hermes-workspace-ui", "Hermes Workspace UI",
  "The daily-driver web interface for working with the brain.",
  "The browser workspace where the operator talks to the agents, reads their reports, and watches the swarm work. It runs on the brain and serves port 3000.",
  ["agents", "interface"], "desktop (WSL2)", "live",
  "vault 01_System/02_Infrastructure/Machine-Inventory.md", []),
S("hermes-dashboard-wsl", "Hermes Dashboard (WSL)",
  "The brain's own status dashboard: jobs, sessions, and system state.",
  "A status view served by the brain showing what is scheduled, what ran, and what the swarm is doing right now. It complements Mission Control with agent-level detail.",
  ["agents", "monitoring"], "desktop (WSL2)", "live",
  "vault 01_System/02_Infrastructure/Machine-Inventory.md", []),
S("hermes-desktop-app", "Hermes Desktop App",
  "The desktop companion app - a thin client to the brain.",
  "The official Hermes desktop app on Windows. A thin client that reaches the brain over SSH, deliberately lightweight: no local plug-ins or databases, so the brain stays the single source of state.",
  ["agents", "interface"], "desktop (Windows)", "live",
  "vault 01_System/02_Infrastructure/Machine-Inventory.md", ["article:hermes-always-on"]),
S("hermes-swarm", "The Swarm",
  "Eleven named agents with strict roles: planner, researcher, note-keeper, builder, reviewer, and more.",
  "The swarm is the agent roster. An orchestrator decomposes missions; a researcher, strategist, builder, reviewer, and tester do the work; a knowledge-manager is the only vault writer; an ops-watch, a maintainer, and an inbox-triage keep the lights on; and a coding team runs a real supervisor loop. Four run always-on, the rest on demand. Every role has things it is never allowed to touch.",
  ["agents", "roster"], "desktop (WSL2)", "live",
  "vault 01_System/02_Infrastructure/Machine-Inventory.md",
  ["article:year-of-the-mesh", "article:hermes-always-on"]),

S("npm-proxy", "Nginx Proxy Manager",
  "The public front door: TLS certificates and routing for 25 services.",
  "Nginx Proxy Manager terminates TLS and routes public hostnames to the right container. A live audit verified 25 of 25 proxy hosts healthy and cleaned 31 stale rows. Public names like litellm.0reliance.com land here first.",
  ["network", "public"], "CT 133", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md", []),
S("ollama-stack", "The CT 122 App Stack",
  "A 16-port stack of self-hosted apps: AI serving, notes, automation, vector search, and image generation.",
  "One container running sixteen connected apps: Ollama for AI serving, Memos for notes, n8n for automation, OpenWebUI for chat, Trilium and Linkding for knowledge, Qdrant for vector search, ComfyUI for images, Langflow, Pipecat, a browser tool, a wiki, Storm, Fabric, and Maestro. The Swiss-army container of the cluster.",
  ["self-hosted", "apps"], "CT 122", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md",
  ["article:year-of-the-mesh"]),
S("litellm-ct123", "LiteLLM (CT 123)",
  "The model traffic controller on its own container, with a public hostname.",
  "Runs LiteLLM behind its own public hostname. One address in front of many model providers, automatic failover between them, and the routing rules documented in the field guide. It is the backup path when Ollama Cloud runs dry.",
  ["ai", "routing"], "CT 123", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md",
  ["article:llm-routing-mesh"]),
S("honcho-ct107", "Honcho Memory Server",
  "The long-term memory service that lets agents remember between conversations.",
  "Honcho stores cross-session context for the agents. The mesh's memory is three-layered - session state with each agent, Honcho for cross-session context, and the vault for project facts - and Honcho is the middle layer.",
  ["memory", "agents"], "CT 107", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md",
  ["article:hermes-always-on"]),
S("gitea-mesh", "Gitea (CT 201)",
  "A self-hosted code server - the mesh's private GitHub.",
  "Gitea stores the mesh's repositories on home hardware, LAN-only by choice. Version control stays local-first: the same workflows as any big platform, on machines you control.",
  ["code", "self-hosted"], "CT 201", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md",
  ["article:year-of-the-mesh"]),
S("mail-mesh", "Mail Server (CT 105)",
  "A self-hosted mail server: sending and receiving via Maddy, with SnappyMail webmail.",
  "Maddy handles sending and receiving mail, and SnappyMail provides the web interface. Self-hosting email is the mesh's most old-school flex - and its most demanding service.",
  ["mail", "self-hosted"], "CT 105", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md", []),
S("synapse-mesh", "Synapse (CT 204)",
  "A self-hosted chat server speaking the Matrix protocol, LAN-only.",
  "Synapse serves Matrix chat on the local network. Part of the self-hosted communication layer alongside the mail server.",
  ["chat", "self-hosted"], "CT 204", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md", []),
S("stacks-mesh", "Media Stack (CT 205)",
  "The self-hosted media management stack: VPN, indexers, and download automation.",
  "A media stack with VPN, Prowlarr, Transmission, and companions - the media-automation shelf of the cluster.",
  ["media", "self-hosted"], "CT 205", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md", []),
S("proxmox-backup", "Proxmox Backup Server (CT 106)",
  "The backup tier: point-in-time snapshots of the containers that hold everything together.",
  "PBS backs up the Proxmox containers so any box can be restored. The quiet insurance policy of the whole cluster - and the reason experiments are cheap.",
  ["backup", "safety"], "CT 106", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md", []),
S("tools-gateway", "Tools Gateway (CT 402)",
  "The LAN-only gateway container for internal tools.",
  "A landing container for internal tools that stay off the public internet. LAN-only by design.",
  ["tools", "gateway"], "CT 402", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md", []),
S("tsidp", "Tailscale Identity Provider (CT 104)",
  "An identity provider for the private network - device sign-ins without a third party.",
  "Runs the Tailscale identity flow so devices and services can prove who they are inside the tailnet. One more piece of the self-hosted identity layer.",
  ["identity", "network"], "CT 104", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md", []),
S("docker-apps-ct132", "Docker Apps (CT 132)",
  "A container host for personal apps: notes, docs, quick capture, and a command center.",
  "Four personal apps on one container: EricNotes, a doc editor, Blinko for quick capture, and a command center UI. The shelf that keeps experiments off the production boxes.",
  ["apps", "self-hosted"], "CT 132", "live",
  "vault 01_System/02_Infrastructure/0RELIANCE-COM-SERVICE-STATUS.md", []),
S("hud-mesh", "HUD Mesh (retired)",
  "The old heads-up-display container - retired and documented.",
  "CT 203 was destroyed and its role absorbed elsewhere. Kept in the directory as an honest retired record: the fleet's history is part of its map.",
  ["retired"], "CT 203", "resting",
  "vault 01_System/02_Infrastructure/Machine-Inventory.md", []),
];

// dedupe against existing services.json
const svcPath = path.join(OUT, "services.json");
const existing = JSON.parse(fs.readFileSync(svcPath, "utf8"));
const existingIds = new Set((existing.records || []).map(r => r.id));
const fresh = records.filter(r => !existingIds.has(r.id));
existing.records = [...existing.records, ...fresh];
fs.writeFileSync(svcPath, JSON.stringify(existing, null, 1));
console.log("vault services imported:", fresh.length, "| skipped (already present):", records.length - fresh.length);
fresh.forEach(r => console.log("  +", r.id, "(" + (r.extra ? r.extra.host : "") + ", " + r.status + ")"));
