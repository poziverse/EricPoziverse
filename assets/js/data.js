window.POZIVERSE = window.POZIVERSE || {};
window.POZIVERSE.ARTICLES = [
  {
    "slug": "year-of-the-mesh",
    "title": "A Year of Building the <em>Poziverse Mesh</em>",
    "deck": "Four hosts, a seventeen-device tailnet, and a small fleet of agents that now run the boring parts of my life. What the first year taught me about infrastructure as a creative act.",
    "category": "Signal",
    "tags": [
      "mesh",
      "infrastructure",
      "proxiverse",
      "retrospective"
    ],
    "date": "2026-08-12",
    "readTime": 8,
    "glyph": "01",
    "art": "art-1",
    "featured": true,
    "excerpt": "Four hosts, one tailnet, a fleet of agents. Twelve months of the Proxiverse mesh, in one field report.",
    "number": "T-001",
    "level": "FOUNDATION",
    "objective": {
      "verb": "describe",
      "condition": "the four-host topology",
      "criteria": "label all 26 LXCs by service and traffic pattern"
    },
    "prereqs": [],
    "next": [
      "llm-routing-mesh"
    ],
    "lessonSlug": "lx-001",
    "body": "<p>One year ago I wrote the document that started all of this. It asked a simple question: <em>what is this system, and where does everything live?</em> The answer grew into what I call the mesh — my home network of small servers and helper programs that work as one team. Today it is four computers, 17 devices connected through one private network, 26 small service boxes, and a growing set of AI agents that run real work for me every day.</p>\n<p>The biggest lesson of the year: a personal computer setup can be a creative project, not just a pile of machines. When the dashboard, the notes, the schedules, and the AI helpers all belong to you, every choice becomes a design choice. Keeping the lights on becomes a craft.</p>\n<h2>The four hosts</h2>\n<p>The whole system fits on a small table:</p>\n<figure class=\"stat-row\">\n        <div class=\"stat\"><div class=\"value\">26</div><div class=\"label\">Service boxes on Proxmox</div></div>\n        <div class=\"stat\"><div class=\"value\">15</div><div class=\"label\">Services running all the time</div></div>\n        <div class=\"stat\"><div class=\"value\">17</div><div class=\"label\">Devices on my private network</div></div>\n      </figure>\n<ul>\n<li><strong>Proxmox server</strong> — the workhorse. Proxmox is free software that splits one big computer into many small, isolated ones. 26 of them, about 15 running at all times: automations, health monitoring, logins, backups, and the memory store.</li>\n<li><strong>WSL2 \"Brain\"</strong> — Linux running inside the Windows desktop. This is where the AI agents live: 21 tool plug-ins, 28 scheduled jobs, more than 35 learned skills.</li>\n<li><strong>Windows workstation</strong> — the desk setup, where the desktop app and the browser remote-control tools live.</li>\n<li><strong>ZimaCube</strong> — the thinking tier: 30+ app containers, currently resting.</li>\n</ul>\n<blockquote>The mesh is not a server farm. It is a studio with a heartbeat.</blockquote>\n<h2>What the year changed</h2>\n<p>The single biggest change: I now write the instructions for the machine instead of keeping them in my head. Every fix became a note, every note became a small script, and slowly the agents stopped needing me for the jobs I used to hate. A backup network path now survives outages of the main one. A small repeating check catches a used-up service allowance before it bites. And every decision is versioned — saved with a date, like code.</p>\n<p>There is no customer and no team here. It is one person and his agents, on a private network, doing the most interesting infrastructure project I know: building a system that maintains itself, so the evenings stay free for making things. Year two starts now.</p>\n<h2>What the agents actually run</h2>\n<p>The team is real, and it has a written roster. Eleven named helpers run the boring parts: a planner that breaks big jobs into steps, a researcher, a strategist, a builder, a reviewer, a tester, a note-keeper (the only one allowed to write to the vault), a health watcher, a tidier, an inbox sorter, and a coding pair that reviews its own work — up to five rounds, then a human looks instead of letting it fail quietly. Every handoff is saved to a shared checklist, not lost in chat.</p>\n<p>Their memory works in three layers, for the same reason the storage does. Short-term notes live with each agent. Longer context lives in a memory service. Project facts — decisions, progress, checkpoints — live here in the vault, saved with dates like code. When one model hands work to the next, the vault is the contract between them.</p>\n<p>And the fleet itself is sorted by talent. One model handles deep reasoning at my side. One coordinates long missions. One is the coding specialist. One sweeps through background work in bulk. One handles pictures and documents. Five helpers, one shape: planner, specialist, sweeper, front desk. The brain talks to you; the fleet talks to the brain.</p>"
  },
  {
    "slug": "agent-native-video",
    "title": "The Agent-Native Video Stack: Manim, HyperFrames, and the <em>New Render Pipeline</em>",
    "deck": "Programmatic animation engines are turning AI coding agents into video directors. The 2026 blueprint: four engines, three design-vocabulary skills, and one workflow that produces finished footage from a natural-language prompt.",
    "number": "T-002",
    "level": "FOUNDATION",
    "objective": {
      "verb": "ship",
      "condition": "a 90-second kinetic-type Field Report",
      "criteria": "using HyperFrames + ElevenLabs + Opus Clip end-to-end"
    },
    "prereqs": [],
    "next": [
      "openmontage"
    ],
    "lessonSlug": "lx-002",
    "category": "Creation",
    "tags": [
      "manim",
      "hyperframes",
      "remotion",
      "video",
      "agents"
    ],
    "date": "2026-08-04",
    "readTime": 7,
    "glyph": "02",
    "art": "art-2",
    "excerpt": "Four engines, three design-vocabulary skills, one workflow — the blueprint for agent-native visual production.",
    "body": "\n<p>A new way of making video is here. I call it agent-native video: films made by AI assistants that drive animation software. No one drags clips on a timeline by hand. The full plan lives in my vault. Its goal fits in one sentence: anyone on my network types an idea, and a professional video comes out.</p>\n<h2>Four engines to choose from</h2>\n<ul>\n<li><strong>Manim</strong> — the tool behind famous math explainer videos. Use it when the shot is about a formula or a diagram.</li>\n<li><strong>HyperFrames</strong> — turns ordinary web pages into finished MP4 video. AI assistants already write web pages, so this one fits them naturally.</li>\n<li><strong>Remotion</strong> — uses React, a popular web-app tool, to build video. You can test it like any other software.</li>\n<li><strong>Motion Canvas</strong> — a programmer's sketchpad for technical stories.</li>\n</ul>\n<h2>The quality layer nobody talks about</h2>\n<p>The engines are half the story. What separates generic AI output from professional work is not the AI model. It is design vocabulary — knowing the words for what looks good and why. Three ready-made skill packs give my agents that vocabulary. One from Anthropic teaches bold art direction. One called Impeccable lists 46 classic AI design mistakes to avoid. One from LottieFiles teaches real animation craft. Good video prompts need design words. Most people do not have them yet. Most AI assistants do not either.</p>\n<h2>The render loop becomes a compiler</h2>\n<p>With this stack, feedback gets fast. Change a scene. Render again in minutes. Look again. The slow loop of edit, export, check, repeat starts to feel like running software.</p>\n<h2>The surrounding ecosystem</h2>\n<p>Around the engines sits a plug-in world of more than 4,500 small servers that AI assistants can call. Six matter most here: one uploads to YouTube, one makes voices, one runs the math animations, one handles interactive graphics, one fetches research, one does web search. And the platform question keeps pointing at OpenClaw — 210,000+ stars and 5,700+ shared skills — running next to Hermes, not instead of it.</p>\n<p>The pipeline has seven steps: plan the scene, get a human's yes, render, make the voice, stitch, cut short versions, upload. No hand-made timeline work anywhere in the chain.</p>\n<h2>The capability manifest</h2>\n<p>Since this piece first shipped, the studio picked up a habit most creators skip: a checked list of every tool it can use. The video engines, the animation libraries, the ten voice providers, the file converters — each one has a status, a \"use this when,\" and the date it last passed a real test. Nothing is \"supposed to work.\" It either passed a test that day, or the list says so.</p>\n<p>The list also keeps the money honest. There is a spending cap per working session. Free tools get tried first. Paid tools need a written reason. And nothing gets uploaded without my explicit yes. A capability without a budget is how AI projects die — so the budget gets its own row in the table.</p>\n"
  },
  {
    "slug": "inside-glassy",
    "title": "Inside Glassy: A Local-First PKM With a <em>Design Language</em>",
    "deck": "SQLite storage, eight themes, WebGPU Whisper, an Obsidian bridge — and a brand spec so complete it ships as a system prompt. The story of building a neurodiversity-focused workspace that treats design as a feature, not a skin.",
    "category": "Product",
    "tags": [
      "glassy",
      "sqlite",
      "design-system",
      "local-first",
      "pkm"
    ],
    "date": "2026-07-28",
    "readTime": 7,
    "glyph": "03",
    "art": "art-3",
    "excerpt": "A brand spec that ships as a system prompt: Glassy’s neurodiversity-first design language, from tokens to daily pipeline.",
    "number": "T-003",
    "level": "FOUNDATION",
    "objective": {
      "verb": "configure",
      "condition": "the Glassy design tokens",
      "criteria": "set OKLCH values and verify WCAG AA contrast at 4.50:1"
    },
    "prereqs": [],
    "next": [
      "mission-control"
    ],
    "lessonSlug": "lx-003",
    "body": "\n<p>Glassy started as a personal note-taking tool. It became a small argument about design: an app that keeps your data on your own machine should still feel calm and beautiful. Not a spreadsheet with a dark mode bolted on. Under the hood it stays boring on purpose. Your notes live in one file you own, in a simple database, with nothing in the cloud. The surface is anything but boring.</p>\n<h2>Design for neurodiversity</h2>\n<p>The written brand guide says exactly who Glassy is for: people whose brains get overwhelmed easily. That constraint creates concrete rules, not vibes.</p>\n<ul>\n<li><strong>High contrast</strong> — text must pass the WCAG AA readability standard at minimum (the shared rulebook for readable screens). We aim for the stricter AAA level.</li>\n<li><strong>Calm motion</strong> — nothing flashes fast. Things ease in. Entries arrive 40 milliseconds apart.</li>\n<li><strong>Room to breathe</strong> — empty space is a real feature, not decoration.</li>\n<li><strong>Two typefaces maximum</strong> — one for headlines, one for reading. Never more.</li>\n</ul>\n<p>The colors use a modern format called OKLCH. It makes contrast easy to measure: a deep dark background, a layered panel color, a brand primary that passes the AA check at exactly 4.50:1, and a coral accent for emphasis. When the palette is this exact, everything matches — from an animated math scene to a web page.</p>\n<blockquote>The privacy story is not a feature list. It is a design rule that shapes everything else.</blockquote>\n<h2>The pipeline as a product</h2>\n<p>The content pipeline is written into the same brand guide: plan the scenes and colors. Get a human's approval — always. Render with the animation tools. Add the voice. Stitch with FFmpeg (a free media converter). Cut short versions with Opus Clip. Then upload. The privacy promise holds all the way: the speech-to-text runs in your browser on your own graphics chip, and the audio never leaves the machine.</p>\n<p>Local-first and beautiful are not in conflict. When you cannot lean on the cloud, you learn to lean on craft.</p>\n"
  },
  {
    "slug": "llm-routing-mesh",
    "title": "Routing LLMs Across the Mesh: A <em>Field Guide</em>",
    "deck": "The actual routing topology behind the mesh: Ollama for interactive chat, LiteLLM as the hub, MiniMax for scheduled jobs — and the failover chain that keeps everything alive when quotas go quiet.",
    "category": "Systems",
    "tags": [
      "llm",
      "litellm",
      "routing",
      "ollama",
      "minimax"
    ],
    "date": "2026-07-20",
    "readTime": 6,
    "glyph": "04",
    "art": "art-4",
    "excerpt": "The real topology: who serves what, the failover chain, and the lessons learned when cloud quotas die silently.",
    "number": "T-004",
    "level": "PRACTITIONER",
    "objective": {
      "verb": "configure",
      "condition": "the LiteLLM proxy failover chain",
      "criteria": "route 3 concurrent requests through LiteLLM to Ollama Cloud to Ollama local without error"
    },
    "prereqs": [
      "year-of-the-mesh"
    ],
    "next": [
      "hermes-always-on"
    ],
    "lessonSlug": "lx-004",
    "body": "\n<p>Once you run more than one AI model, the question changes. Not \"which model is best?\" — \"which model is best for this job?\" That is model routing. On my network it is a literal routing table: small, boring, and holding everything up.</p>\n<h2>Who runs what</h2>\n<ul>\n<li><strong>CT 207</strong> → Ollama Cloud — for live chat, when the account has allowance left. (Ollama runs AI models. Each \"CT\" is a numbered service box on my Proxmox server.)</li>\n<li><strong>CT 123</strong> → LiteLLM — a traffic controller in front of many models. One address, many backends, automatic switching when one fails.</li>\n<li><strong>CT 122</strong> → Ollama running locally — slower, but it always works.</li>\n<li><strong>CT 207 scheduled jobs</strong> → a separate provider account. Background work never eats the chat allowance.</li>\n</ul>\n<h2>The rules that keep it honest</h2>\n<pre><code># provider rules (from the runbook)\n- minimax-m3:\n    interactive: provider: minimax-oauth\n    cron: custom_providers: [minimax] + MINIMAX_API_KEY\n      base_url: https://api.minimax.io/anthropic\n- NEVER route cron M3 jobs through ollama-cloud\n  (quota exhaustion incident: 2026-07-25)\n- failover chain:\n  1. LiteLLM (CT 123) — most models\n  2. Ollama Cloud (CT 207) — interactive quota\n  3. Ollama local (CT 122) — always works</code></pre>\n<blockquote>The proxy is the one place where your infrastructure can have opinions.</blockquote>\n<h2>What the incidents taught us</h2>\n<p>Three lessons, all paid for in real downtime. Running out of paid allowance is silent — the server just replies \"slow down\" (error code 429) with no explanation. That is why a small check runs every fifteen minutes. Never redeploy a traffic controller when a healthy one already serves the same door. And use one-time sign-in links for interactive logins, fixed keys for scheduled jobs.</p>\n<p>The long game is a cost profile per helper — a ledger of tokens (the word-pieces models are billed for) spent per task type. The routing table keeps learning. That is the difference between running models and running a model economy.</p>\n<h2>The fleet, by the numbers</h2>\n<p>Routing decisions come from measured tests, not vibes. Verified against live model pages and test runs: the coding specialist scores above 80 on SWE-bench Verified (a standard test of fixing real software bugs) and in the high sixties on Terminal-Bench. The long-horizon coordinator holds the pool's best SWE-bench Pro score and the highest GPQA Diamond (a hard science quiz). The reasoning flagship trades speed for the strongest agentic coding score in the pool. The workhorse answers in about one second per call, tested under load.</p>\n<h2>What the research says</h2>\n<p>Studies agree with practice. A 2026 study on model teams cut computing cost by up to 72% by matching difficulty to the model. A debate study beat always-multi-model setups by double digits using confidence-based escalation. And a router-collapse study named the failure I hit myself: routers quietly settle on one favorite. So build explicit backups. Never trust the router's judgment alone.</p>\n<h2>The local verdict</h2>\n<p>So: the coordinator gets the smartest <em>fast</em> model. One great call beats five cheap ones at the step everything waits on. Workers get the fast workhorse — cost grows when you run many at once. Specialists get the big models on purpose, when their whole job is the hard part. And the concurrency ceiling is real: the cloud plan allows three calls at once. A parent plus three children is four. So the parent waits its turn. Pin models per profile. Let the plumbing do the switching. Do not build a router agent.</p>\n"
  },
  {
    "slug": "hermes-always-on",
    "title": "Hermes, the Always-On Agent: Architecture and <em>Hard-Won Lessons</em>",
    "deck": "A desktop agent that minds 15 cron jobs, watches the vault, and files the changelog while I sleep. The cron-and-watchdog pattern, the silent-failure traps, and what keeps breaking.",
    "category": "Agents",
    "tags": [
      "hermes",
      "agents",
      "cron",
      "mcp",
      "automation"
    ],
    "date": "2026-07-12",
    "readTime": 7,
    "glyph": "05",
    "art": "art-5",
    "excerpt": "Fifteen cron jobs, three job modes, one watchdog pattern — the always-on agent, dissected.",
    "number": "T-005",
    "level": "PRACTITIONER",
    "objective": {
      "verb": "deploy",
      "condition": "a watchdog cron job",
      "criteria": "silent on empty stdout, alert on non-zero exit, deliver non-empty stdout verbatim"
    },
    "prereqs": [
      "llm-routing-mesh"
    ],
    "next": [
      "gpu-offloading"
    ],
    "lessonSlug": "lx-005",
    "body": "<p>Hermes is what happens when you give an AI agent a schedule and a workspace and let it build a routine. The design is deliberately boring: the Hermes gateway — the program that connects the agent to everything — is also the scheduler. The Linux layer it runs on has no built-in scheduler of its own, so every timed job fires from that one gateway process. Fifteen jobs, checked weekly, each in one of three modes.</p>\n<h2>Three job modes</h2>\n<ul>\n<li><strong>Agent mode</strong> (the default) — the AI reads the prompt at the scheduled time and does the work. The morning briefing, the weekly audit.</li>\n<li><strong>Script mode</strong> — runs a script and returns what it prints. For jobs where an AI adds nothing.</li>\n<li><strong>No-agent mode</strong> — the script is the whole job, and its output is delivered word for word. This is how the health checks run.</li>\n</ul>\n<h2>The watchdog pattern</h2>\n<pre><code># silent-watchdog contract\n1. Script runs every N minutes\n2. Empty stdout = nothing to report (silence is health)\n3. Non-empty stdout = message delivered (quota hit, drift found)\n4. Non-zero exit = alert (a broken watchdog is never silent)</code></pre>\n<p>The Quota Watchdog runs every fifteen minutes, because running out of paid allowance happens silently — by the time scheduled jobs start getting \"slow down\" errors, you are already late. Log cleanup runs the same way. The pattern turns \"is everything fine?\" from a question you ask into a stream you subscribe to.</p>\n<blockquote>An agent's memory is only as good as its discipline. The vault is the discipline.</blockquote>\n<h2>What keeps breaking</h2>\n<p>The honest list from the logs: the gateway itself is the single point of failure — without it, no schedules, no health checks, no repairs fire. The Linux layer needs a start script after a reboot. A task assigned to anything but \"default\" sits untouched forever if that helper is not running. And scripts that build commands from text will bite you on quotation marks unless you use the safe form. Each failure became a runbook line, and the runbook became the memory.</p>\n<h2>The orphan-process war</h2>\n<p>For weeks the error log grew on a timer: \"another gateway instance already running,\" every fifteen to twenty seconds. The service was healthy; the log lied anyway. The root cause was family history — leftover gateway and watcher processes, cut loose by background jobs and re-adopted by the system, fighting the real service over the same port. The fix was a careful kill routine keyed on parentage, not name: find every gateway process whose parent is the system itself, end it, escalate if it survives, verify. The lesson generalizes: when two copies of a program fight, check who their parents are before you check what they claim.</p>\n<h2>What always-on actually requires</h2>\n<p>Always-on is not \"leave it running.\" A gateway started inside a temporary helper dies when that helper ends — the whole process family goes with it. A quick launcher script does not survive running without a terminal. The durable shape is a launcher wired to a startup task that survives reboots, health checks that stay silent when healthy and alert when they fail, and retry limits that block a stuck task instead of retrying forever. Uptime is not a setting. It is a small collection of ancestors, each held by something that outlives the session that started it.</p>"
  },
  {
    "slug": "mission-control",
    "title": "Mission Control: Designing a Command Surface for an <em>Agent Fleet</em>",
    "deck": "The iframe-shell SPA that runs a one-person operations floor — kanban, cron, vault, and nine proxied services behind one calm interface. Plus the invariants that keep it from rotting.",
    "category": "Agents",
    "tags": [
      "mission-control",
      "dashboard",
      "design",
      "daily-driver"
    ],
    "date": "2026-06-30",
    "readTime": 6,
    "glyph": "06",
    "art": "art-6",
    "excerpt": "The iframe-shell SPA at the top of every day: six topnav buttons, auto-rendered zones, nine viewports, zero rot.",
    "number": "T-006",
    "level": "PRACTITIONER",
    "objective": {
      "verb": "assemble",
      "condition": "a 9-iframe dashboard shell",
      "criteria": "topnav, sidebar, and viewport grid render 9 services with no broken frames"
    },
    "prereqs": [
      "inside-glassy"
    ],
    "next": [
      "webgpu-whisper"
    ],
    "lessonSlug": "lx-006",
    "body": "\n<p>Mission Control is the dashboard at the top of my day. One web page gathers the task board, the scheduled jobs, the notes vault, and nine other mesh services: the code server, the health monitors, the calendar, and more. It is the closest thing the Poziverse has to an operations floor.</p>\n<h2>The layout</h2>\n<p>The layout is fixed by design. A top bar with exactly six buttons: tasks, schedule, content library, knowledge graph, mindscape, utilities. No more, no less. A sidebar lists zones and services, built from a config file. Its utilities menu holds network health, open tasks, recent activity, and system locks. And a grid of nine service windows — small live views of other apps — sits in five columns that fold to four, three, then one as the screen shrinks.</p>\n<h2>The rules that stop rot</h2>\n<p>Dashboards rot. Mission Control fights rot with three hard rules. One: the outer shell is locked — 17 files, fingerprint-checked every day, changed only with careful small patches. Two: every update goes to both live locations, because two servers serve two copies. Three: the service windows connect through a special live-connection handler, because ordinary proxies cannot carry two-way traffic.</p>\n<blockquote>A command surface should feel like a cockpit: everything you need, nothing you have to search for.</blockquote>\n<h2>Frames, not copies</h2>\n<p>The design rule that survived every rebuild: Mission Control is a frame, not a copy. Each tool inside — the task board, the note atlas, the knowledge graph — ships and improves on its own. The dashboard just arranges the windows. When the Atlas notebook reader arrived, it joined as one more surface in an afternoon.</p>\n<blockquote>Green means nothing happened. That is the best news an operations floor can deliver.</blockquote>\n"
  },
  {
    "slug": "openmontage",
    "title": "OpenMontage: The First Open-Source <em>Agentic Video Studio</em>",
    "deck": "No Python orchestrator — the LLM agent IS the control plane. One hundred-plus tools, twelve production pipelines, and quality gates that treat editing like a build system.",
    "category": "Creation",
    "tags": [
      "openmontage",
      "video",
      "agents",
      "open-source"
    ],
    "date": "2026-06-18",
    "readTime": 7,
    "glyph": "07",
    "art": "art-7",
    "excerpt": "The agent is the control plane: 100+ tools, 12 pipelines, quality gates, budget governance — inside OpenMontage.",
    "number": "T-007",
    "level": "PRACTITIONER",
    "objective": {
      "verb": "run",
      "condition": "a 12-stage OpenMontage pipeline",
      "criteria": "complete 7 quality-gate checks with no pre-compose violations"
    },
    "prereqs": [
      "agent-native-video"
    ],
    "next": [
      "youtube-creator-stack"
    ],
    "lessonSlug": "lx-007",
    "body": "\n<p>OpenMontage is the first open-source video studio run by an AI agent. Its core idea is a little radical: the AI agent makes the decisions. The Python code only provides tools and memory. There is no automation script and no pipeline framework. Your coding assistant reads a task list, reads a directing guide, calls the tools, checks its own work, saves its progress, and pauses for your approval at every stage.</p>\n<h2>One hundred tools, three layers</h2>\n<p>The toolchain has three layers of knowledge: what exists (100+ tools and 12 task lists), how to use it well (conventions and quality bars), and how it works (82 deep technology guides). Every tool declares which guides relate to it. So the agent can go from \"what is available\" to \"how to do this well\" in one step.</p>\n<h2>Governance is the product</h2>\n<p>The interesting part is what stops quality from collapsing. A tool registry finds its own tools. A chooser scores options across seven dimensions. A cost tracker estimates, reserves, and settles the budget for every shot. The runtime is locked in at planning time — one engine for animated scenes, one for kinetic text, one for cuts — and cannot be swapped in secret. Checks run before any render that would break the delivery promise. A \"slideshow risk\" scorer reviews the plan on six dimensions before anything ships. And after rendering, a validator inspects the real file.</p>\n<blockquote>When editing becomes a build system, the render is just a compile step.</blockquote>\n<p>The bet: agent-made video will grow the way developer tools did — through public, combinable parts, not walled gardens. The boring half of video production is about to be automated. That means the fun half is about to get bigger.</p>\n<h2>Three productions beyond the template</h2>\n<p>The research mapped what comes after templates. Reference-driven production: paste a video you like, get a grounded plan — its content, pacing, and structure — then two or three <em>different</em> concepts, never copies. Atelier mode for the big pieces: art direction first, then motion principles, then engine settings — under one rule: reuse the engine knowledge, never the creative parts. And documentary montage: real archival footage from public collections, indexed so the computer finds clips by meaning instead of filename.</p>\n<p>The distinctness review may be the most useful idea in the stack. Before a video ships, ask: could it belong to any other product? If yes, it is not finished.</p>\n"
  },
  {
    "slug": "youtube-creator-stack",
    "title": "The 2026 Creator Stack: Tools We Actually <em>Run</em>",
    "deck": "Five layers, sixty-plus tools scored against one stack profile, ten creator archetypes, and a lean-start stack that costs about $85 a month. The blueprint that keeps the first channel from trial-and-error.",
    "category": "Creation",
    "tags": [
      "youtube",
      "creator",
      "stack",
      "content",
      "2026"
    ],
    "date": "2026-05-25",
    "readTime": 6,
    "glyph": "08",
    "art": "art-8",
    "excerpt": "Five layers, 60+ tools scored, 10 archetypes, a ~$85/mo lean start — the decisive creator stack map.",
    "number": "T-008",
    "level": "PRACTITIONER",
    "objective": {
      "verb": "stack",
      "condition": "a lean-start creator toolkit",
      "criteria": "select 5 tools across 5 layers totaling under $85 per month"
    },
    "prereqs": [
      "openmontage"
    ],
    "next": [
      "design-vocabulary"
    ],
    "lessonSlug": "lx-008",
    "body": "\n<p>The creator-stack plan exists for one reason: to know the 2026 tool landscape <em>before</em> the first channel, newsletter, and pipeline go live. Not six months of expensive trial and error later. Its charter is blunt: this plan supplies the tools. It does not publish for you.</p>\n<h2>The five layers</h2>\n<ul>\n<li><strong>Pre-production</strong> — research, scripting, and the vault as the idea engine.</li>\n<li><strong>Production</strong> — recording, voice, and the animation stack (HyperFrames, Manim, Rive).</li>\n<li><strong>Post-production</strong> — stitching, short clips, subtitles, translation.</li>\n<li><strong>Distribution</strong> — the newsletter as the home base, video as the amplifier.</li>\n<li><strong>Business operations</strong> — the analytics and ownership layer underneath.</li>\n</ul>\n<h2>Decisive, not comprehensive</h2>\n<p>Sixty-plus tools were reviewed and scored against this setup. About twenty were marked \"do not use\" on purpose — including some famous names. The plan's own words: we are not trying to be comprehensive. We are trying to be decisive. Ten creator patterns were mapped, so the first channel can copy something that already works. Two fully automated pipeline shapes came out of the study: one on open-source Python, one on a visual automation tool plus paid services.</p>\n<blockquote>Do not build a content pipeline. Build a knowledge pipeline with a content outlet.</blockquote>\n<p>Five trends mattered most: AI built into YouTube itself, self-hosted open tools, channels that never show a face, owning your own distribution, and toolchains for technical creators. The starter set for the first thirty days costs about $85 a month. Lean start. And the knowledge layer keeps paying off no matter which tools survive the year.</p>\n<h2>The four-channel network</h2>\n<p>The stack now runs as a planned network, not one channel: a main lessons line with a membership funnel, a students line for non-technical learners, a builder log for the self-hosting crowd, and a brand channel for Glassy. Four publish slots a week. Twelve short clips. One mesh-level pipeline routes everything through a single account, with a different visual style per channel.</p>\n<p>The interesting constraint is not the volume. It is that all four channels share one infrastructure. Schedules per channel. A daily thumbnail refresh. A weekly analytics summary. A written brand guide per tenant. The mesh treats channels as settings, not as four separate businesses.</p>\n"
  },
  {
    "slug": "webgpu-whisper",
    "title": "Whisper in the Browser: <em>WebGPU</em> Speech Transcription",
    "deck": "Running Whisper on the GPU inside your browser — no upload, no server, no transcript in someone else’s logs. How local speech transcription changes the notes game.",
    "number": "T-009",
    "level": "PRACTITIONER",
    "objective": {
      "verb": "transcribe",
      "condition": "a 60-second audio clip",
      "criteria": "achieve under 2x real-time on GPU with zero network egress"
    },
    "prereqs": [
      "mission-control"
    ],
    "next": [
      "vault-ontology"
    ],
    "lessonSlug": "lx-009",
    "category": "Product",
    "tags": [
      "webgpu",
      "whisper",
      "local-first",
      "privacy",
      "speech"
    ],
    "date": "2026-05-02",
    "readTime": 5,
    "glyph": "09",
    "art": "art-9",
    "excerpt": "Speech-to-text on the GPU inside your browser — no upload, no server, no transcript in someone else’s logs.",
    "body": "\n<p>Every local-first project has a moment where you realize the cloud feature you were about to add is the whole point. For Glassy, that moment was speech-to-text: transcription that runs entirely in your browser, on your own graphics chip, with the audio never leaving the machine.</p>\n<h2>Why it matters</h2>\n<p>Voice notes are the fastest way to capture an idea. But the moment transcription needs an upload, the transcript becomes someone else's data. Running Whisper (an open speech-to-text model) on your own machine flips that. The recording, the transcript, and the note it becomes all stay in your vault.</p>\n<blockquote>The privacy story is not a feature. It is the architecture.</blockquote>\n<h2>What WebGPU changed</h2>\n<p>AI in the browser was always possible. It was just too slow to feel real. WebGPU — a modern way for web pages to use your graphics chip — gave the browser a proper fast path. Whisper models that used to crawl now transcribe at close to real time. The result feels like magic. Underneath, it is the same discipline as the rest of the stack: the computing stays where the data lives.</p>\n<p>The next steps are the fun ones: labeling who is speaking, automatic tags, and transcripts that feed the vault's search the moment they finish. Voice becomes a first-class note, not a second-class attachment.</p>\n"
  },
  {
    "slug": "gpu-offloading",
    "title": "GPU Offloading From a Windows Desktop to <em>Proxmox</em>",
    "deck": "The desktop as an inference server the whole mesh can reach: Ollama for the easy path, vLLM for throughput, vLLama for the hybrid, TGI for the Hugging Face ecosystem. A setup walkthrough with real numbers.",
    "category": "Systems",
    "tags": [
      "gpu",
      "proxmox",
      "infrastructure",
      "virtualization"
    ],
    "date": "2026-04-14",
    "readTime": 7,
    "glyph": "10",
    "art": "art-10",
    "excerpt": "Four ways to turn the Windows desktop into the mesh’s inference server — with real throughput numbers.",
    "number": "T-010",
    "level": "DEEP DIVE",
    "objective": {
      "verb": "serve",
      "condition": "a vLLM endpoint from the desktop",
      "criteria": "sustain 100 plus requests per second with TTFT under 80ms"
    },
    "prereqs": [
      "hermes-always-on"
    ],
    "next": [],
    "lessonSlug": "lx-010",
    "body": "\n<p>A modern graphics card (GPU) is too expensive to sit idle while you sleep. The project: turn the Windows desktop into an AI answering server that every machine on the network can use. Transcription, video renders, and model questions run around the clock while the desk stays quiet.</p>\n<h2>Option 1 — Ollama (easiest, best first step)</h2>\n<p>Install Ollama. Download the models. Tell it to accept network connections. Open the port in the firewall. Then point everything at the desktop:</p>\n<pre><code>from langchain_ollama import ChatOllama\nllm = ChatOllama(\n    model=\"llama3.2\",\n    base_url=\"http://192.0.2.10:11434\"\n)</code></pre>\n<p>Dead simple, works immediately. Not built for many requests at once — fine for development.</p>\n<h2>Option 2 — vLLM (built for heavy load)</h2>\n<p>vLLM adds two clever tricks (continuous batching and smarter memory use) that make it the choice for many requests at once: about <strong>120–160 requests per second, with a 50–80ms wait for the first word</strong>. Any standard client can talk to it:</p>\n<pre><code>client = OpenAI(\n    base_url=\"http://192.0.2.10:8000/v1\",\n    api_key=\"***\"\n)</code></pre>\n<blockquote>Offloading is not about the hardware. It is about reclaiming the hours.</blockquote>\n<h2>Options 3 and 4 — the hybrids</h2>\n<p>vLLama combines Ollama's easy model management with vLLM's speed. It loads models on demand and unloads them after five minutes of quiet — the best of both for a single-GPU desk. TGI (Hugging Face's serving tool) drops in as a container when you want deep ties to that ecosystem and accept the extra weight.</p>\n<p>Whichever you choose, the pattern is the same: the GPU works the night shift, and the morning finds the renders waiting.</p>\n"
  },
  {
    "slug": "design-vocabulary",
    "title": "Packaging Taste: A <em>Motion-Design Meta-Skill</em>",
    "deck": "Anthropic frontend-design, Impeccable, and LottieFiles motion principles — auto-installed in the right order and exposed as one vocabulary. What \"taste as infrastructure\" actually looks like.",
    "category": "Craft",
    "tags": [
      "motion",
      "design",
      "skill",
      "taste"
    ],
    "date": "2026-03-22",
    "readTime": 6,
    "glyph": "11",
    "art": "art-11",
    "excerpt": "Three design-vocabulary layers, one auto-installing meta-skill, 46 anti-pattern detectors — taste as infrastructure.",
    "number": "T-011",
    "level": "DEEP DIVE",
    "objective": {
      "verb": "apply",
      "condition": "46 Impeccable anti-pattern checks",
      "criteria": "to an LLM-generated mock and remove every generic-AI default"
    },
    "prereqs": [
      "youtube-creator-stack"
    ],
    "next": [],
    "lessonSlug": "lx-011",
    "body": "\n<p>The hardest thing to give an AI agent is taste. Models can learn word patterns. But <em>feel</em> — the difference between a transition that lands and one that slides — has to be written down before it can be executed. The design-vocabulary skill is that writing-down: three layers, delivered as one package that installs itself.</p>\n<h2>The three layers</h2>\n<ul>\n<li><strong>Layer 1 · Anthropic's frontend-design guide</strong> — 277,000+ installs, and the foundation. It picks one bold visual direction before writing code. It avoids generic fonts. It builds clear color hierarchies. And it uses motion for polish — never for showing off.</li>\n<li><strong>Layer 2 · Impeccable</strong> — an open-source skill with 10,000+ stars. Its gift is a list of codified mistakes: 46 detectors for exactly the generic-AI defaults — the overused font, the purple gradient, the card inside a card.</li>\n<li><strong>Layer 3 · LottieFiles Motion Design</strong> — real animation craft from shipped products, installed with a single command.</li>\n</ul>\n<blockquote>Taste is not a vibe. It is a decision procedure you can write down.</blockquote>\n<h2>Why package it?</h2>\n<p>The package runs three install commands in the right order. Then any agent gets one shared vocabulary: type, color, spacing, motion, interaction, screen writing. The output stops looking generic. The package is safe to run again and again. And it scored a combined 14.0 in our evaluation (impact 4 + ease 5 + foundations 5, divided by risk 1).</p>\n<p>The source's conclusion is the thesis of this site: great design prompts need design vocabulary. Most people do not have it. Packaging taste as a skill is the natural endpoint of an agent-made studio. A render pipeline turns animation into a recipe. A skill turns judgment into one too.</p>\n"
  },
  {
    "slug": "vault-ontology",
    "title": "Vault Ontology: Keeping 5,500 Notes <em>Navigable</em>",
    "deck": "One vault, one git repo, four sources of truth, and a routing tree that has survived five thousand notes. The ontology that keeps a knowledge base from becoming a landfill.",
    "number": "T-012",
    "level": "DEEP DIVE",
    "objective": {
      "verb": "route",
      "condition": "a 100-note capture into the vault",
      "criteria": "using the 4 sources of truth with zero shadow directories"
    },
    "prereqs": [
      "webgpu-whisper"
    ],
    "next": [],
    "lessonSlug": "lx-012",
    "category": "Knowledge",
    "tags": [
      "obsidian",
      "ontology",
      "notes",
      "vault",
      "knowledge"
    ],
    "date": "2026-02-10",
    "readTime": 6,
    "glyph": "12",
    "art": "art-12",
    "excerpt": "One vault, one git repo, four sources of truth — the ontology that keeps a knowledge base from becoming a landfill.",
    "body": "\n<p>Every knowledge base starts as a clean grid and ends as a junk drawer — unless someone writes the map. The vault ontology is that map. It keeps more than 5,500 notes findable, for me and for a fleet of AI agents.</p>\n<h2>The philosophy</h2>\n<p>Four rules anchor everything. Copy them even at small scale:</p>\n<ul>\n<li><strong>One vault, one version history</strong> — no scattered folders across machines pretending to be a system.</li>\n<li><strong>Do not rebuild what exists</strong> — never re-invent what a tool already does. Connect through what is already there.</li>\n<li><strong>Code is the truth</strong> — rules live in saved files and skills, not in an agent's memory.</li>\n<li><strong>Four sources of truth</strong> — the map, the root index, the agent index, and the user guide. If it is not in one of those, it is not official.</li>\n</ul>\n<h2>The routing tree</h2>\n<p>Five top folders route everything: a context folder for notes that cut across projects, a projects folder for active work (each project gets the same four-part spine), a knowledge folder for reference material, an agent-work folder for anything the AI fleet produces, and an inbox where everything new lands first. The rules are simple: new documents start in the inbox and get sorted. Projects follow the spine. Skills get a catalog entry.</p>\n<blockquote>A vault is not a filing cabinet. It is a city, and the ontology is the street plan.</blockquote>\n<h2>The drift rules</h2>\n<p>Maps rot through neglect. So the rules aim at rot itself: when a document moves, delete the old path — never leave a shadow copy. Set the file-format rules on day one, not after months of invisible line-ending churn. And compare folder fingerprints regularly, because identical duplicates hide for months.</p>\n<p>The metric that matters is not the note count. It is time-to-find. When an agent can pull the right note in seconds, the vault is doing its job.</p>\n"
  },
  {
    "slug": "model-fleet",
    "title": "One Model, One Job: <em>The Model Fleet</em>",
    "deck": "Five profiles, five cloud models, one topology. What a year of routing LLMs taught me about building an agent fleet where every model does the one job it is actually good at.",
    "category": "Agents",
    "tags": [
      "agents",
      "routing",
      "fleet",
      "ollama",
      "orchestration"
    ],
    "date": "2026-08-29",
    "readTime": 7,
    "glyph": "13",
    "art": "art-4",
    "excerpt": "Five profiles, five models, one topology: orchestrator, specialist, sweeper, interface. The fleet doctrine, the build story, and the three honest mistakes it taught.",
    "number": "T-013",
    "level": "PRACTITIONER",
    "objective": {
      "verb": "design",
      "condition": "a multi-model agent fleet",
      "criteria": "assign each model a role matched to its verified strengths, with documented failover and a concurrency budget"
    },
    "prereqs": [
      "llm-routing-mesh"
    ],
    "next": [],
    "lessonSlug": "lx-013",
    "body": "<p>The routing field guide ended with a rule: give each model a fixed job, let the plumbing handle failures, and never build a router agent. This is what happened when I followed it. Five cloud models, five agent profiles, one shape — a fleet where every model does the one job it is measurably best at.</p>\n<h2>The fleet map</h2>\n<p>Each profile is an isolated setup: its own settings, sessions, skills, and memory. One profile, one focus, no mixed duties. The brain sits closest to me — deep reasoning, development work, the voice of the mesh. A long-horizon coordinator breaks big missions into steps and hands them off. A coding specialist reads repositories and ships fixes. A high-volume sweeper clears background work in bulk. A picture-and-documents edge handles anything that is not plain text. Five profiles, one shape: <strong>planner, specialist, sweeper, front desk</strong>.</p>\n<figure class=\"stat-row\">\n        <div class=\"stat\"><div class=\"value\">5</div><div class=\"label\">Profiles, one per model</div></div>\n        <div class=\"stat\"><div class=\"value\">3</div><div class=\"label\">Calls allowed at once</div></div>\n        <div class=\"stat\"><div class=\"value\">4</div><div class=\"label\">Calls a parent plus helpers needs</div></div>\n      </figure>\n<h2>Why not one central coordinator</h2>\n<p>Because every model has a different personality, and forcing them through one pipe adds waiting and noise exactly where the fleet can least afford it. The dispatcher already takes one task at a time off the board; routing happens in the task queue, not in a model. The brain says two things — the mission is starting, and the mission is done. Everything in between belongs to the specialists.</p>\n<h2>The build story — including the parts that broke</h2>\n<p>The first build session got one profile running, set up three more, and tested the models through a shared launcher. Then the honest part: the gateway process was started inside a temporary helper, so when that helper ended, the gateway died with it — full missions only worked while a live session held the connection open. The review afterwards offered three options and a rule that now sounds obvious: a background program must be held by something that outlives the session that started it.</p>\n<p>Three mistakes went into the vault, because that is where mistakes become instructions. I shipped small skills before testing the task board — and a simple re-check caught me. The checker itself had a bug: an impossible test that always failed while the work was fine. And I claimed a behavior test was complete when only two of five cases had actually run. Passing a shape test is not passing a behavior test. That sentence is the whole skill.</p>\n<h2>The doctrine, compressed</h2>\n<ul>\n<li>Planner: the smartest <em>fast</em> model — one great call beats five cheap ones at the step everything waits on.</li>\n<li>Workers: the fast workhorse — cost and waiting multiply when you run many at once.</li>\n<li>Specialists: the big models, on purpose, when their whole job is the hard part.</li>\n<li>Concurrency: know the ceiling, budget the parent, make the parent wait its turn.</li>\n<li>Failures: the plumbing's job. Choices: a lookup table, not another agent.</li>\n</ul>\n<p>The fleet is not finished — fleets never are. But the doctrine is stable, the profiles are on disk, and the next model that arrives with a proven strength already has a shape to fit. That is what a year of routing buys you: not a smarter stack — a legible one.</p>"
  }
];
window.POZIVERSE.CATEGORIES = [
  {
    "id": "Signal",
    "kicker": "Signal",
    "blurb": "Field reports & transmissions"
  },
  {
    "id": "Creation",
    "kicker": "Creation",
    "blurb": "Making things with agents"
  },
  {
    "id": "Agents",
    "kicker": "Agents",
    "blurb": "The fleet & how it runs"
  },
  {
    "id": "Systems",
    "kicker": "Systems",
    "blurb": "Infrastructure notes"
  },
  {
    "id": "Product",
    "kicker": "Product",
    "blurb": "Local-first software"
  },
  {
    "id": "Craft",
    "kicker": "Craft",
    "blurb": "Design & taste"
  },
  {
    "id": "Knowledge",
    "kicker": "Knowledge",
    "blurb": "Notes on notes"
  }
];
window.POZIVERSE.SOCIALS = [
  {
    "platform": "youtube",
    "label": "MAIN UPLINK",
    "handle": "@ericpoziverse",
    "url": "https://www.youtube.com/@ericpoziverse",
    "status": "reserved",
    "latest": null,
    "asOf": "2026-08-27",
    "art": "art-1"
  },
  {
    "platform": "instagram",
    "label": "DAILY FRAGMENTS",
    "handle": "@ericpoziverse",
    "url": "https://www.instagram.com/ericpoziverse",
    "status": "reserved",
    "latest": null,
    "asOf": "2026-08-27",
    "art": "art-2"
  },
  {
    "platform": "x",
    "label": "OPEN THREADS",
    "handle": "@ericpoziverse",
    "url": "https://x.com/ericpoziverse",
    "status": "reserved",
    "latest": null,
    "asOf": "2026-08-27",
    "art": "art-9"
  },
  {
    "platform": "tiktok",
    "label": "SHORT BURSTS",
    "handle": "@ericpoziverse",
    "url": "https://www.tiktok.com/@ericpoziverse",
    "status": "reserved",
    "latest": null,
    "asOf": "2026-08-27",
    "art": "art-6"
  }
];
window.POZIVERSE.VIDEOS = [
  {
    "id": "fr-001",
    "number": 1,
    "youtubeId": null,
    "title": "A Year of Building the <em>Poziverse Mesh</em>",
    "deck": "The film version of our first essay - four computers, one private network, and the agents that run the place. Told over real screen recordings from the studio.",
    "category": "Signal",
    "date": "2026-08-27",
    "duration": "12:00",
    "posterArt": "art-1",
    "glyph": "01",
    "chapters": [
      {
        "time": "00:00",
        "label": "Opening: the studio comes online"
      },
      {
        "time": "01:20",
        "label": "The four computers, drawn on screen"
      },
      {
        "time": "03:45",
        "label": "What the agents run themselves"
      },
      {
        "time": "06:10",
        "label": "The failures that became instruction manuals"
      },
      {
        "time": "09:30",
        "label": "Year two: what changes"
      }
    ],
    "waveformSeed": 1,
    "format": "voice-over",
    "transcriptUrl": null,
    "twinSlug": "year-of-the-mesh",
    "status": "reserved"
  },
  {
    "id": "fr-002",
    "number": 2,
    "youtubeId": null,
    "title": "The Agent-Native Video Stack: <em>Manim, HyperFrames, and the New Render Pipeline</em>",
    "deck": "The film version of our production-stack essay - the tool list, the title-card tests, and one render from start to finish, narrated over the studio doing the work.",
    "category": "Creation",
    "date": "2026-08-29",
    "duration": "10:00",
    "posterArt": "art-2",
    "glyph": "02",
    "chapters": [
      {
        "time": "00:00",
        "label": "Opening: the tool list, checked live"
      },
      {
        "time": "01:10",
        "label": "Title cards: the test that picked our engine"
      },
      {
        "time": "03:20",
        "label": "Web page in, video out"
      },
      {
        "time": "05:40",
        "label": "Voices: ten options, one spending cap"
      },
      {
        "time": "08:00",
        "label": "The whole stack, working together"
      }
    ],
    "waveformSeed": 2,
    "format": "voice-over",
    "transcriptUrl": null,
    "twinSlug": "agent-native-video",
    "status": "reserved"
  }
];
window.POZIVERSE.REPLIES = [
  {
    "id": "rt-001",
    "number": 1,
    "status": "in-composition",
    "date": null,
    "creator": {
      "name": "Cole Medin",
      "handle": "@ColeMedin",
      "channelUrl": "https://www.youtube.com/@ColeMedin",
      "art": "art-4"
    },
    "video": {
      "title": "How to Actually Run Your Coding Agent Safely (And Avoid the Horror Stories)",
      "url": "https://www.youtube.com/watch?v=zb2LyMro77M",
      "published": "2026-07-23"
    },
    "receipts": [],
    "twinSlug": "mission-control",
    "storyboard": [
      {
        "n": 1,
        "name": "THE PICK",
        "text": "The video that earned a response — and why."
      },
      {
        "n": 2,
        "name": "THE CLAIM",
        "text": "Their central idea, restated fairly in our own words."
      },
      {
        "n": 3,
        "name": "THE PRAISE",
        "text": "The one move they make brilliantly — timestamped."
      },
      {
        "n": 4,
        "name": "THE DIVERGENCE",
        "text": "This is what we do instead. From practice, not theory."
      },
      {
        "n": 5,
        "name": "THE RECEIPT",
        "text": "Proof of the counter-move: repo, runbook, render."
      },
      {
        "n": 6,
        "name": "THE HANDOFF",
        "text": "A generous link back to the creator, plus ours."
      },
      {
        "n": 7,
        "name": "THE THREAD",
        "text": "Prior episodes the argument continues from."
      }
    ]
  },
  {
    "id": "rt-002",
    "number": 2,
    "status": "in-composition",
    "date": null,
    "creator": {
      "name": "Matt Pocock",
      "handle": "@mattpocockuk",
      "channelUrl": "https://www.youtube.com/@mattpocockuk",
      "art": "art-5"
    },
    "video": {
      "title": "Kill your MEMORY.md",
      "url": "https://www.youtube.com/shorts/A0scuiiGBC4",
      "published": "2026-07-17"
    },
    "receipts": [],
    "twinSlug": "vault-ontology",
    "storyboard": [
      {
        "n": 1,
        "name": "THE PICK",
        "text": "The video that earned a response, and why."
      },
      {
        "n": 2,
        "name": "THE CLAIM",
        "text": "Their central idea, restated fairly in our own words."
      },
      {
        "n": 3,
        "name": "THE PRAISE",
        "text": "The one move they make brilliantly, timestamped."
      },
      {
        "n": 4,
        "name": "THE DIVERGENCE",
        "text": "This is what we do instead. From practice, not theory."
      },
      {
        "n": 5,
        "name": "THE RECEIPT",
        "text": "Proof of the counter-move: repo, runbook, render."
      },
      {
        "n": 6,
        "name": "THE HANDOFF",
        "text": "A generous link back to the creator, plus ours."
      },
      {
        "n": 7,
        "name": "THE THREAD",
        "text": "Prior episodes the argument continues from."
      }
    ]
  },
  {
    "id": "rt-003",
    "number": 3,
    "status": "in-composition",
    "date": null,
    "creator": {
      "name": "Wanderloots",
      "handle": "@Wanderloots",
      "channelUrl": "https://www.youtube.com/@Wanderloots",
      "art": "art-6"
    },
    "video": {
      "title": "24/7 Agentic AI: Safe, Secure, Always-On Hermes Agent (or OpenClaw)",
      "url": "https://www.youtube.com/shorts/WYpXfaf5FnA",
      "published": "2026-08-01"
    },
    "receipts": [],
    "twinSlug": "hermes-always-on",
    "storyboard": [
      {
        "n": 1,
        "name": "THE PICK",
        "text": "The video that earned a response, and why."
      },
      {
        "n": 2,
        "name": "THE CLAIM",
        "text": "Their central idea, restated fairly in our own words."
      },
      {
        "n": 3,
        "name": "THE PRAISE",
        "text": "The one move they make brilliantly, timestamped."
      },
      {
        "n": 4,
        "name": "THE DIVERGENCE",
        "text": "This is what we do instead. From practice, not theory."
      },
      {
        "n": 5,
        "name": "THE RECEIPT",
        "text": "Proof of the counter-move: repo, runbook, render."
      },
      {
        "n": 6,
        "name": "THE HANDOFF",
        "text": "A generous link back to the creator, plus ours."
      },
      {
        "n": 7,
        "name": "THE THREAD",
        "text": "Prior episodes the argument continues from."
      }
    ]
  }
];
window.POZIVERSE.DOWNLOADS = [
  {
    "id": "transmission-log",
    "name": "From the Poziverse - Transmission Log",
    "kind": "template",
    "tagline": "The whole site you're reading, in one file you can keep. No installs, no accounts.",
    "version": "v1.0.0",
    "releasedAt": "2026-08-27",
    "license": {
      "spdx": "MIT",
      "label": "MIT",
      "url": ""
    },
    "assetUrl": "downloads/transmission-log-template-v1.0.0.zip",
    "repoUrl": "",
    "demoUrl": "",
    "stars": null,
    "inside": [
      "One self-contained HTML file (styles, scripts, and fonts included)",
      "The color and type settings, in dark and light",
      "Twelve hand-built header designs",
      "A news feed and the templates that build it"
    ],
    "receipt": {
      "label": "Shipped with T-001",
      "url": "article.html?id=year-of-the-mesh"
    },
    "featured": true,
    "art": "art-1",
    "access": "free"
  },
  {
    "id": "editorial-response-skill",
    "name": "Editorial Response Skill",
    "kind": "skill",
    "tagline": "The seven-step format we use for public reviews - ready to paste into any AI assistant.",
    "version": "v1.0.0",
    "releasedAt": "2026-08-27",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "assetUrl": "",
    "repoUrl": "",
    "demoUrl": "",
    "stars": null,
    "inside": [
      "The seven fixed parts of a fair public review",
      "The fairness check: would the reviewed creator thank us?",
      "Proof rules: no claim without a link"
    ],
    "receipt": {
      "label": "Library LB-001",
      "url": "library.html"
    },
    "featured": true,
    "art": "art-3",
    "access": "member"
  },
  {
    "id": "mission-control-source",
    "name": "Mission Control — Source Bundle",
    "kind": "source",
    "tagline": "The dashboard that runs the operations floor - the shell, the styles, and the config.",
    "version": "v0.1.0",
    "releasedAt": "2026-08-27",
    "license": {
      "spdx": "AGPL-3.0",
      "label": "AGPL-3.0",
      "url": ""
    },
    "assetUrl": "",
    "repoUrl": "",
    "demoUrl": "",
    "stars": null,
    "inside": [
      "The locked outer shell (17 files, fingerprint-checked daily)",
      "The config that builds the sidebar and service grid",
      "A setup guide for both live locations"
    ],
    "receipt": null,
    "featured": false,
    "art": "art-6",
    "access": "patron"
  }
];
window.POZIVERSE.CLOSED_MESH = [
  {
    "id": "closed-glassy",
    "name": "Glassy",
    "statusLine": "Neurodiversity-focused AI workspace - public build on the roadmap",
    "requestMailto": "mailto:eric@example.com?subject=Request%20access%20to%20Glassy"
  },
  {
    "id": "closed-openmontage",
    "name": "OpenMontage",
    "statusLine": "Agentic video production system - capability review in progress",
    "requestMailto": "mailto:eric@example.com?subject=Request%20access%20to%20OpenMontage"
  },
  {
    "id": "closed-mission-control",
    "name": "Mission Control",
    "statusLine": "The operations floor for the mesh - it runs the mesh, so it stays in the mesh",
    "requestMailto": "mailto:eric@example.com?subject=Request%20access%20to%20Mission%20Control"
  }
];
window.POZIVERSE.LIBRARY = [
  {
    "id": "editorial-response",
    "title": "Editorial Response",
    "kind": "skill",
    "summary": "How we respond to other creators' work in public - fairly, with credit, and with proof.",
    "body": "This is the rulebook for our public replies to other creators. Three checks before writing: Would the other creator thank us for this? Is our different approach something we actually use? Is their video linked in the first two lines?\\n\\nThen seven fixed parts: name the video, restate their idea fairly, praise one specific thing, show what we do differently, prove it with a link, send readers back to them, and connect to our earlier replies. The different approach must come from our own work - never a theory, never an attack.",
    "version": "v1.0.0",
    "updated": "2026-08-27",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault - capability layer",
      "TENANT: EricPoziverse",
      "FIRST CONSUMER: this blog"
    ],
    "receipt": {
      "label": "RT-001 run of show",
      "url": "replies.html"
    },
    "featured": true,
    "art": "art-3"
  },
  {
    "id": "verify-before-write",
    "title": "Verify Before Write",
    "kind": "skill",
    "summary": "Check before you change: look at the real thing first, then edit. Includes the live test that catches silent breakage.",
    "body": "The iron rule: never type an ID, path, or setting from memory. Look at the real thing first. Then edit.\\n\\nThe key addition: every check needs one live test. Run the changed code. Compare the output. A check once passed while a badly indented block was silently unreachable. Only running the code caught it.\\n\\nOther traps covered: patch tools that corrupt text. Indentation that survives copying. And a checker that grades its own work instead of the work.",
    "version": "v1.60.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/verify-before-write.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-4",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "agent-ecosystem-loop",
    "title": "Agent Ecosystem Loop",
    "kind": "skill",
    "summary": "A six-step working rhythm for any task an AI agent handles: scope, check, plan, verify, do, document.",
    "body": "For any task that takes three or more steps: (1) SCOPE - say in one sentence what 'done' means. (2) AUDIT - look at what already exists; never build a duplicate. (3) PLAN - write the plan where the project can find it. (4) VERIFY FIRST - write the test before doing the work. (5) EXECUTE in order, running the test at each step. (6) DOCUMENT - write the report and update the notes.\\n\\nIncludes a list of 56 real mistakes to avoid - like a checker that grades its own work, important lines lost when a long conversation gets summarized, and fixes that quietly undo themselves on the next update.",
    "version": "v1.43.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/agent-ecosystem-loop.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-5",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "specialist-subagent-orchestrator",
    "title": "Specialist Subagent Orchestrator",
    "kind": "skill",
    "summary": "Give an AI assistant a dedicated job, its own tools, and clear limits - in four decisions.",
    "body": "When a domain earns its own helper, define four things. One: a one-sentence role. What it owns, and what it never touches. Two: the smallest toolset that role needs. Three: how deep it may hand work to others. Four: the proof it must show before saying done.\\n\\nThe shape that scales: a planner who talks to you. Specialists who do the domain work. Sweepers who clear bulk jobs. A front desk for pictures and documents. One helper, one focus.",
    "version": "v1.0.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/specialist-subagent-orchestrator.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-6",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "closed-network-threat-model",
    "title": "Closed-Network Threat Model",
    "kind": "skill",
    "summary": "Security thinking for a one-person private network: contain leaks calmly instead of panicking.",
    "body": "Use this whenever keys, passwords, or logins come up on a private network. The rule: when a secret leaks, do not start rotating everything. Contain it instead. Move the secret into a locked file or setting. Remove it from the leaking document. Update the ignore list. Or change how it travels.\\n\\nWhy: on a private network the real danger is carelessness and leftovers. Not an attacker racing you. Match the response to the real risk.",
    "version": "v1.0.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/closed-network-threat-model.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-7",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "cron-job-authoring-on-hermes",
    "title": "Cron Job Authoring",
    "kind": "skill",
    "summary": "Set up scheduled jobs on the mesh - and learn why the gateway, not the clock, is the real scheduler.",
    "body": "The pattern for repeating work has three parts. A small gate script decides whether the job should run. Healthy means it prints nothing. Then the work runs. Then the result goes to a chosen place: the site, a local file, or a chat message.\\n\\nThe debugging rule: the gateway program is the real scheduler. Not the system clock. When a job will not fire, check the gateway first. Its process. Its lock. Its heartbeat. Blame the schedule last. It pairs well with a health check that stays silent when healthy and alerts only on failure.",
    "version": "v1.0.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/cron-job-authoring-on-hermes.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-8",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "incident-commander",
    "title": "Incident Commander",
    "kind": "skill",
    "summary": "What to do when a service falls over: find the cause with evidence, fix it with a plan, write it down.",
    "body": "When a monitored service turns red: (1) work out what changed and when, and what else changed at the same moment. (2) Find the cause by reading the actual logs and process history - not by guessing. (3) Fix it with a written playbook, not improvisation.\\n\\nEvery incident ends with a new line in the runbook: what broke, what fixed it, and the rule it taught. The next incident starts faster because of it.",
    "version": "v1.0.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/incident-commander.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-9",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "drift-audit-multisource",
    "title": "Drift Audit, Multisource",
    "kind": "skill",
    "summary": "A six-point check that finds where the real system and the written description disagree.",
    "body": "Run this when the question is: is everything set up the way I think? Compare six sources. The files on disk. The programs running. The settings files. The live state. The written descriptions. The original intentions.\\n\\nReality drifts away from documentation in every system that changes. The output is a gap list: places where the docs say one thing and the machine says another. Fix one side or the other. Never leave them disagreeing.",
    "version": "v1.0.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/drift-audit-multisource.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-10",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "proxmox-mesh-monitor",
    "title": "Proxmox Mesh Monitor",
    "kind": "skill",
    "summary": "The emergency map: which numbered box runs what, who owns it, and where its fix instructions live.",
    "body": "A companion to the incident playbook. The map links every numbered container to three things: the service it runs, the person who owns it, and the instructions for fixing it.\\n\\nLoad it when a box crashes and someone needs to know what was lost. Load it when routing a service name to the right machine. Or load it when writing fix instructions before anything breaks. The rule it teaches: an emergency that starts with 'what was that box?' has already wasted five minutes. Write the map while everything is healthy.",
    "version": "v1.0.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/proxmox-mesh-monitor.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-11",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "stewarding-contentious-content",
    "title": "Stewarding Contentious Content",
    "kind": "skill",
    "summary": "Handle heated or legally risky material with redaction, credit, and a paper trail.",
    "body": "Some collected content is legally risky. Attacks, threats, accusations. When you handle it: remove what does not need to be shown. Credit every claim to its source. Link generously. Keep a record of where everything came from.\\n\\nThis pairs with our public review format. The fairness check asks whether the other creator would thank us. This skill governs the material itself. A quote without a source is a liability, not an argument.",
    "version": "v1.0.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/stewarding-contentious-content.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-12",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "browser-use-automation",
    "title": "Browser Use Automation",
    "kind": "skill",
    "summary": "A ladder for browser automation: start with the simplest tool, climb only when you must.",
    "body": "Pick the lightest layer that works. Layer 1: pull a static page as clean text. Layer 2: search for facts. Layer 3: drive a real browser for clicks and screenshots. Layer 4: let an AI figure out the steps when they are unknown. Layer 5: control the actual desktop. Only when nothing else works.\\n\\nStart at layer 1 or 2. Verified browser tricks: connect to a browser you already opened, and keep its logins. Save the session state for apps that live there. Give each video recording its own folder, so files never collide.",
    "version": "v1.5.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 00_System/skills/browser-use-automation.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "art-2",
      "url": "undefined"
    },
    "featured": false,
    "art": "undefined"
  },
  {
    "id": "humanizer",
    "title": "Humanizer",
    "kind": "skill",
    "summary": "Remove the 34 tells of AI-written text and put a real voice back in.",
    "body": "Load this when a draft reads machine-made. (1) Scan for the 34 known patterns that AI writing tools bake in. (2) Rewrite the problem spots - keep the meaning, keep the tone. (3) Add a person back into the prose; deleting tells is only half the job. (4) Final pass: ask what still sounds like a machine, answer honestly, revise once more.\\n\\nVoice calibration: show the editor a sample of writing you like, and it matches that voice instead of a generic one. Always shows the changes - never overwrites in silence.",
    "version": "v2.5.1",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/creative/humanizer/SKILL.md | BASED ON: github.com/blader/humanizer (MIT) by Siqi Chen",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "The voice pass on every published piece",
      "url": "library.html"
    },
    "featured": false,
    "art": "art-1"
  },
  {
    "id": "parallel-verification-swarm",
    "title": "Parallel Verification Swarm",
    "kind": "skill",
    "summary": "Prove a claim instead of accepting it: several helpers test at once, each one brings back evidence.",
    "body": "When someone says 'it works end to end', do not take their word for it. Send one helper per claim, each required to bring back proof: a file, an exit code, a screen, an output. Add one extra helper that checks the plan itself - separating 'does it work' from 'was the plan right'.\\n\\nEverything lands in one report: PASS, DEFERRED, or FAILED per claim, with the exact evidence. A deferral is an honest answer, not a failure to hide - it names the retry path.",
    "version": "v1.2.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/parallel-verification-swarm/SKILL.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "The pattern behind the deploy smoke test",
      "url": "library.html"
    },
    "featured": false,
    "art": "art-4"
  },
  {
    "id": "design-system-enforcement",
    "title": "Design System Enforcement",
    "kind": "skill",
    "summary": "Turn scattered, inconsistent pages into one design system - named tokens, shared parts, screenshots, and a test that fails on drift.",
    "body": "Six steps. Measure the mess. Name the colors and spacing as tokens. Define the buttons and cards. Fix the layout grids. Screenshot every page to prove it looks right. Add a checker that fails the build when someone breaks the rules.\\n\\nThe iron laws: use named tokens, never raw values. Use shared classes, never inline styles. Never claim pages work without screenshots. Bump file versions after template changes. Avoid panel wrappers that make a page look like a window inside a window. And watch for inline functions that quietly overwrite loaded ones. That bug shows no error message.",
    "version": "v1.3.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/software-development/design-system-enforcement/SKILL.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "The craft path's enforcement discipline",
      "url": "annex.html?lesson=lx-003"
    },
    "featured": false,
    "art": "art-5"
  },
  {
    "id": "loop-engineering",
    "title": "Loop Engineering",
    "kind": "skill",
    "summary": "Two ways to make AI work improve itself: a builder-critic loop for one big piece, and a bounded loop for recurring jobs.",
    "body": "The Gauntlet Loop: one prompt starts a build-critique-revise cycle. A fresh reviewer compares the real result against a fixed example of good. The engineered loop: triggers, saved state, tests, recovery, and a budget for work that repeats.\\n\\nThe smallest useful plan has three parts. An Objective: rebuild the pricing page so a first-time visitor can compare plans and check out on a phone. A Metric: no accessibility failures. No sideways scrolling on a phone. A fresh reviewer prefers our version. A Boundary: stop after four hours, a spending cap, three failed attempts, or anything needing passwords.\\n\\nDo not loop when success is a matter of taste with no reviewer. Do not loop when mistakes are expensive. And do not loop when one careful human pass costs less.",
    "version": "v1.0.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/software-development/loop-engineering/SKILL.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "The gauntlet behind capstone reviews",
      "url": "club.html"
    },
    "featured": false,
    "art": "art-6"
  },
  {
    "id": "git-disaster-recovery",
    "title": "Git Disaster Recovery",
    "kind": "skill",
    "summary": "When git says your commits are gone, they are almost certainly still on disk. The five-step recipe brings them back in about two minutes.",
    "body": "Warning signs: fewer commits than you remember making. A history entry you did not write. A folder full of files that suddenly look untracked. A helper ran an update and your work vanished.\\n\\nThe headline: do not rebuild. Recover. The commits survive inside git's storage. The recipe walks the history of history, finds the lost work, restores the branch, and checks it byte for byte. It also covers pulling one exact file from any past moment. And a tagging habit that stops the same accident from repeating.",
    "version": "v1.1.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/devops/git-disaster-recovery/SKILL.md | AUTHOR: Eric Poziverse with Hermes",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "Codified from a real recovery on this mesh",
      "url": "article.html?id=year-of-the-mesh"
    },
    "featured": false,
    "art": "art-7"
  },
  {
    "id": "plan-mode",
    "title": "Plan Mode",
    "kind": "skill",
    "summary": "Write a plan instead of diving in: small steps, each with a checkable done test, exact file paths, and commands you can paste.",
    "body": "Planning-only discipline: no building, no changes. The deliverable is the plan. Every step is small enough that finishing it can be verified by looking. Each step has exact paths, real commands with their expected output, the tests that prove it, and the risks said out loud.\\n\\nThe size rule: a step is bite-sized when finishing it can be checked by looking, not by faith. And a plan you cannot find later was never written. Plans go in a dated, findable place.",
    "version": "v2.1.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/software-development/plan/SKILL.md | PATTERN SOURCE: mattpocock/skills v1.1.0 S-1 retrofit",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "The discipline behind every transmission's build",
      "url": "annex.html"
    },
    "featured": false,
    "art": "art-8"
  },
  {
    "id": "research-ingest",
    "title": "Research Ingest",
    "kind": "skill",
    "summary": "The intake pipeline that turns outside content - videos, code, articles, papers - into organized, findable knowledge.",
    "body": "Every incoming item gets classified before it gets read deeply. A video becomes a transcript plus notes. A code repository becomes a decision: keep a copy, or just record where it lives. A long essay becomes a three-layer summary. A living catalog becomes a pointer page, not a stale copy. Product documentation becomes only the facts that change what you do.\\n\\nThe mirror-or-point decision comes first. Ask: is the source alive? If yes, do not copy it. Describe how to use it and what you already keep. The pipeline also carries its own lessons. Check that the folder you watch still exists. And know the difference between 'nothing new arrived' and 'I was watching a moved folder'.",
    "version": "v1.3.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/research/research-ingest/SKILL.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "The intake that feeds this whole platform",
      "url": "now.html"
    },
    "featured": false,
    "art": "art-9"
  },
  {
    "id": "surgical-string-replace-debugging",
    "title": "Surgical String-Replace Debugging",
    "kind": "skill",
    "summary": "Five ways careful text patching goes wrong - and the safety checks that catch every one of them.",
    "body": "Patching a file with a sequence of small replacements has three classic traps. A pattern that matches too much. Earlier edits shifting the positions of later ones. And shipping without counting your anchor points first.\\n\\nLater lessons: an insert that begins with its own anchor creates two copies of it. Hidden escape characters turn written line-breaks into real ones. A careless slice deletes everything in between.\\n\\nThe safety protocol: count your anchors before deploying. Check that the file size changed by a sane amount. Keep an untouched copy. Make the patched file prove it still parses before it ships.",
    "version": "v1.2.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/surgical-string-replace-debugging/SKILL.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "Learned patching this very site",
      "url": "library.html"
    },
    "featured": false,
    "art": "art-10"
  },
  {
    "id": "youtube-channel-management-on-mesh",
    "title": "YouTube Channel Management on Mesh",
    "kind": "skill",
    "summary": "The full video-publishing pipeline on home-run infrastructure - research to upload with no paid creator suite.",
    "body": "This is the publishing half of a creator business on a home network. The watching half studies other creators. Together they form one loop: watching informs what to publish. Publishing shows what to research next.\\n\\nThe skill covers one channel or several under one identity. Optional member monetization. Weekly automation. A consistent brand voice. All through the official video platform's API and self-hosted tools. The stack you do not buy is the point. The mesh replaces the creator software suite.",
    "version": "v2.0.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/devops/youtube-channel-management-on-mesh/SKILL.md",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "The pipeline the Watch page rides on",
      "url": "watch.html"
    },
    "featured": false,
    "art": "art-11"
  },
  {
    "id": "hyperframes-video",
    "title": "Hyperframes Video",
    "kind": "skill",
    "summary": "Make videos from web pages: write frames as HTML and CSS, render a finished MP4 that comes out identical every time.",
    "body": "HyperFrames turns web pages with animations into finished video files. That means video becomes code. You can review it, version it, and re-render it. The skill covers the file structure, the design file, reusable scene blocks, the checker, live preview, and the render pipeline.\\n\\nProduction lessons: confirm the project folder before composing. Older guides point at a path that no longer exists. The headless flag was removed, and old commands fail on it. Some transform settings on floating cards need explicit setup. Long renders need splitting. And parallel renders belong to the job runner, not to forgotten terminal windows.",
    "version": "v1.2.0",
    "updated": "2026-08-29",
    "license": {
      "spdx": "CC BY-SA 4.0",
      "label": "CC BY-SA 4.0",
      "url": ""
    },
    "status": "published",
    "provenance": [
      "SOURCE: vault 05_Agent_Work/02_Skills/catalog/creative/hyperframes-video/SKILL.md | TOOL: github.com/heygen-com/hyperframes",
      "TENANT: EricPoziverse",
      "GATE: privacy-scan clean 2026-08-29"
    ],
    "receipt": {
      "label": "The engine behind Field Report LX-002",
      "url": "annex.html?lesson=lx-002"
    },
    "featured": false,
    "art": "art-12"
  }
];
window.POZIVERSE.NOW = {
  "updated": "2026-08-28",
  "staleAfterDays": 45,
  "project": {
    "title": "The media center build-out",
    "status": "RUNNING",
    "since": "2026-08-04",
    "notes": [
      {
        "date": "2026-08-29",
        "text": "Packs 1-3 shipped: essays rewritten in plain language for new learners, 21 free resources published, and a new essay on the model fleet."
      },
      {
        "date": "2026-08-28",
        "text": "Decisions logged: sign-in handled by the platform; videos use recorded narration over screen captures; the free library stays open (shared-credit license)."
      },
      {
        "date": "2026-08-27",
        "text": "The broadcast strip and watch page shipped; the public-review format is designed and ready to write."
      },
      {
        "date": "2026-08-26",
        "text": "The experience guide is finished: motion rules, six page designs, and the honesty contracts."
      },
      {
        "date": "2026-08-20",
        "text": "Atlas moved to the shared server; the vault passed 5,519 notes."
      }
    ],
    "link": "downloads.html",
    "receipt": null
  },
  "read": {
    "title": "The Elements of Typographic Style",
    "author": "Robert Bringhurst",
    "why": "The 25th-anniversary edition - because good layout is part of good writing, and this book proves it page by page.",
    "link": "",
    "progress": null
  },
  "experiment": {
    "title": "Agent-native section headers",
    "hypothesis": "One brand guide can generate every section header for the channel - no hand-drawn animation needed.",
    "stack": [
      "HyperFrames",
      "Manim",
      "Hermes"
    ],
    "status": "RUNNING",
    "link": "article.html?id=agent-native-video",
    "receipt": null
  },
  "archive": [
    {
      "month": "2026-08",
      "line": "shipped the media center: broadcast strip, watch page, reply threads"
    },
    {
      "month": "2026-07",
      "line": "closed the loop on LLM routing + the quota watchdog pattern"
    },
    {
      "month": "2026-06",
      "line": "designed Mission Control's locked chrome and dual-location deploys"
    }
  ],
  "events": [
    "ev-001",
    "ev-002",
    "ev-003"
  ]
};
window.POZIVERSE.TIERS = [
  {
    "id": "free",
    "name": "Free",
    "price": {
      "amount": 0,
      "currency": "USD",
      "interval": "monthly"
    },
    "benefits": [
      "Every essay in the log - all of them, always",
      "Every learning path and lesson, free",
      "Our public reviews of other creators' work",
      "Free downloads (the site template and open skills)",
      "The newsletter - one short letter a week"
    ],
    "unlocks": [
      "All essays and video episodes",
      "All lessons in the Learning Annex",
      "Free-tier downloads (like the site template)"
    ],
    "cta": {
      "label": "You are here",
      "href": "index.html#newsletter",
      "disabled": true,
      "hint": "You're already here - no upgrade needed."
    },
    "accent": "emerald"
  },
  {
    "id": "member",
    "name": "Member",
    "price": {
      "amount": 9,
      "currency": "USD",
      "interval": "monthly"
    },
    "benefits": [
      "Your work reviewed by peers - two kind notes and one suggestion",
      "Live work sessions with Eric, building in real time",
      "Member discussions under every lesson and essay",
      "See new downloads before the public does",
      "Member-only downloads, delivered by private link"
    ],
    "unlocks": [
      "Member discussions under each lesson and essay",
      "Office-hours sessions and their recordings",
      "Early access to new downloads"
    ],
    "cta": {
      "label": "Become a member",
      "href": "signin.html",
      "hint": "Auth and billing run on the host. Sign in to subscribe."
    },
    "accent": "emerald"
  },
  {
    "id": "patron",
    "name": "Patron",
    "price": {
      "amount": 29,
      "currency": "USD",
      "interval": "monthly"
    },
    "benefits": [
      "The source files behind what we build",
      "A seat in the roadmap - your ideas shape what ships",
      "A direct line to Eric"
    ],
    "unlocks": [
      "Source files for projects and templates",
      "Patron-only build sessions",
      "Your name in the roadmap receipts"
    ],
    "cta": {
      "label": "Become a patron",
      "href": "signin.html",
      "hint": "Auth and billing run on the host. Sign in to subscribe."
    },
    "accent": "amber"
  }
];
window.POZIVERSE.MEMBERS = [];
window.POZIVERSE.DISCUSSIONS = [];
window.POZIVERSE.EVENTS = [
  {
    "id": "ev-001",
    "number": "EV-001",
    "type": "office-hours",
    "title": "Office Hours — Mesh Q&A",
    "date": "2026-09-12T18:00:00Z",
    "duration": 60,
    "tier": "member",
    "platform": "tbd",
    "fieldReportId": null,
    "status": "scheduled",
    "queueUrl": null
  },
  {
    "id": "ev-002",
    "number": "EV-002",
    "type": "build-along",
    "title": "Build-Along — HyperFrames Header Pipeline",
    "date": "2026-09-19T19:00:00Z",
    "duration": 90,
    "tier": "member",
    "platform": "tbd",
    "fieldReportId": null,
    "status": "scheduled",
    "queueUrl": null
  },
  {
    "id": "ev-003",
    "number": "EV-003",
    "type": "office-hours",
    "title": "Office Hours — Local-First Craft",
    "date": "2026-09-26T18:00:00Z",
    "duration": 60,
    "tier": "member",
    "platform": "tbd",
    "fieldReportId": null,
    "status": "scheduled",
    "queueUrl": null
  }
];
window.POZIVERSE.RECEIPT_GALLERY = [];
window.POZIVERSE.PATHS = [
  {
    "id": "path-mesh",
    "title": "The Mesh",
    "outcome": "After this path you can run your own small network of home servers and AI helpers.",
    "lessonIds": [
      "lx-001",
      "lx-004",
      "lx-005",
      "lx-010",
      "lx-013"
    ],
    "level": "PRACTITIONER",
    "capstone": {
      "id": "capstone-mesh",
      "title": "Build your own three-computer mesh with shared AI power",
      "description": "Three machines, a backup network path, one isolated service per job, and your desktop's graphics chip serving AI answers to the whole network.",
      "badge": "MESH ARCHITECT"
    },
    "art": "art-1"
  },
  {
    "id": "path-production",
    "title": "Agent-Native Production",
    "outcome": "After this path you can make videos with an AI assistant doing the production work.",
    "lessonIds": [
      "lx-002",
      "lx-007",
      "lx-008",
      "lx-011"
    ],
    "level": "PRACTITIONER",
    "capstone": {
      "id": "capstone-production",
      "title": "Ship a video made end-to-end by your own AI pipeline",
      "description": "Script it with the assistant, animate it with the math and web-page engines, add the voice, stitch it, cut the short versions - with a human approval gate at every stage.",
      "badge": "PRODUCTION OPERATOR"
    },
    "art": "art-2"
  },
  {
    "id": "path-craft",
    "title": "Local-First Craft",
    "outcome": "After this path you can build calm, local-first software that feels good to use.",
    "lessonIds": [
      "lx-003",
      "lx-006",
      "lx-009",
      "lx-012"
    ],
    "level": "PRACTITIONER",
    "capstone": {
      "id": "capstone-craft",
      "title": "Build a local-first app with speech-to-text in the browser",
      "description": "A notes app backed by a file you own, a bridge to your notes vault, a status dashboard, and speech transcription running on your own graphics chip.",
      "badge": "CRAFTSPERSON"
    },
    "art": "art-3"
  }
];
window.POZIVERSE.LESSONS = [
  {
    "id": "lx-001",
    "number": "LX-001",
    "title": "The Year of the Mesh",
    "level": "FOUNDATION",
    "path": "path-mesh",
    "objective": {
      "verb": "describe",
      "condition": "a four-computer home network",
      "criteria": "name all 26 service boxes and say what each one does"
    },
    "prereqs": [],
    "transmissionSlug": "year-of-the-mesh",
    "fieldReportId": "fr-001",
    "exercise": {
      "summary": "Open the health dashboard and draw the whole network on one page, naming every service box and the messages it sends.",
      "receipt": {
        "label": "Topology diagram in vault",
        "url": "article.html?id=year-of-the-mesh"
      }
    },
    "checkpoint": [
      "Drew the four computers and named all 26 service boxes",
      "Confirmed at least 15 services are reachable on the private network",
      "Found the backup network path that works when the main one is down",
      "Wrote one paragraph of instructions an agent could follow"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "01",
    "art": "art-1"
  },
  {
    "id": "lx-002",
    "number": "LX-002",
    "title": "The Agent-Native Video Pipeline",
    "level": "FOUNDATION",
    "path": "path-production",
    "objective": {
      "verb": "make",
      "condition": "a 90-second animated title sequence",
      "criteria": "using the web-page-to-video engine, a generated voice, and an auto-cutter, end to end"
    },
    "prereqs": [],
    "transmissionSlug": "agent-native-video",
    "fieldReportId": null,
    "exercise": {
      "summary": "Compose a 90-second title sequence as a web page, add a generated voice, render the video, and cut a short vertical version for social media.",
      "receipt": {
        "label": "Render archived in vault",
        "url": "article.html?id=agent-native-video"
      }
    },
    "checkpoint": [
      "Wrote the scene list and the design prompt",
      "Rendered the sequence and checked the video file",
      "Generated the voice and synced it to the pictures",
      "Cut a vertical short and uploaded it"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "02",
    "art": "art-2"
  },
  {
    "id": "lx-003",
    "number": "LX-003",
    "title": "Inside Glassy: Tokens and Themes",
    "level": "FOUNDATION",
    "path": "path-craft",
    "objective": {
      "verb": "set",
      "condition": "a color palette for an app",
      "criteria": "check that every text-and-background pair is easy to read (the official contrast rule)"
    },
    "prereqs": [],
    "transmissionSlug": "inside-glassy",
    "fieldReportId": null,
    "exercise": {
      "summary": "Pick the colors for a small app: background, panels, text, and one accent. Then measure every text-and-background pair to prove people can read it comfortably.",
      "receipt": {
        "label": "Theme snapshot in vault",
        "url": "article.html?id=inside-glassy"
      }
    },
    "checkpoint": [
      "Chose the palette and wrote the values down",
      "Measured every pair and hit the official contrast minimum",
      "Fixed any pair that failed and re-measured",
      "Saved the palette where the whole project can use it"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "03",
    "art": "art-3"
  },
  {
    "id": "lx-004",
    "number": "LX-004",
    "title": "LLM Routing Across the Mesh",
    "level": "PRACTITIONER",
    "path": "path-mesh",
    "objective": {
      "verb": "route",
      "condition": "AI requests across three providers",
      "criteria": "show a working backup chain when one provider runs out"
    },
    "prereqs": [
      "year-of-the-mesh"
    ],
    "transmissionSlug": "llm-routing-mesh",
    "fieldReportId": null,
    "exercise": {
      "summary": "Connect two AI providers behind one traffic controller, send three requests at once, and watch the controller switch to the backup when the first provider runs dry.",
      "receipt": {
        "label": "Failover runbook in vault",
        "url": "article.html?id=llm-routing-mesh"
      }
    },
    "checkpoint": [
      "Set up the traffic controller with two providers behind it",
      "Sent requests until the first provider hit its limit",
      "Watched the backup take over without errors",
      "Wrote the routing rules where the next person can find them"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "04",
    "art": "art-4"
  },
  {
    "id": "lx-005",
    "number": "LX-005",
    "title": "Hermes, the Always-On Agent",
    "level": "PRACTITIONER",
    "path": "path-mesh",
    "objective": {
      "verb": "schedule",
      "condition": "a health check for your AI setup",
      "criteria": "silent when healthy, an alert when something fails"
    },
    "prereqs": [
      "llm-routing-mesh"
    ],
    "transmissionSlug": "hermes-always-on",
    "fieldReportId": null,
    "exercise": {
      "summary": "Write a small check that runs every fifteen minutes: it prints nothing when the AI service is healthy and sends one clear alert the moment it is not.",
      "receipt": {
        "label": "Watchdog runbook in vault",
        "url": "article.html?id=hermes-always-on"
      }
    },
    "checkpoint": [
      "Scheduled the check and proved it runs on time",
      "Made it stay silent on healthy runs",
      "Made it alert on the first failure",
      "Wrote the runbook line for what the alert means"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "05",
    "art": "art-5"
  },
  {
    "id": "lx-006",
    "number": "LX-006",
    "title": "Mission Control: The Operations Floor",
    "level": "PRACTITIONER",
    "path": "path-craft",
    "objective": {
      "verb": "build",
      "condition": "one dashboard that shows all your services",
      "criteria": "nine live windows, updated automatically, no manual steps"
    },
    "prereqs": [
      "inside-glassy"
    ],
    "transmissionSlug": "mission-control",
    "fieldReportId": null,
    "exercise": {
      "summary": "Build a single page that shows your services as small live windows - task board, calendar, health - and opens each one full-size on click.",
      "receipt": {
        "label": "Shell deployed in vault",
        "url": "article.html?id=mission-control"
      }
    },
    "checkpoint": [
      "Embedded at least nine services in one page",
      "Made the grid fold down cleanly on small screens",
      "Added one-click full-size views",
      "Confirmed the page survives a reboot"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "06",
    "art": "art-6"
  },
  {
    "id": "lx-007",
    "number": "LX-007",
    "title": "OpenMontage: The Agentic Studio",
    "level": "PRACTITIONER",
    "path": "path-production",
    "objective": {
      "verb": "plan",
      "condition": "a video made by an AI assistant",
      "criteria": "using a written task list, a directing guide, and a human approval step"
    },
    "prereqs": [
      "agent-native-video"
    ],
    "transmissionSlug": "openmontage",
    "fieldReportId": null,
    "exercise": {
      "summary": "Write the task list and directing guide for a short video, then walk an AI assistant through it one approved stage at a time.",
      "receipt": {
        "label": "Render archived in vault",
        "url": "article.html?id=openmontage"
      }
    },
    "checkpoint": [
      "Wrote the task list with quality bars for each stage",
      "Walked the assistant through stage one with your approval",
      "Checked the output against the quality bars",
      "Saved the whole plan for the next video"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "07",
    "art": "art-7"
  },
  {
    "id": "lx-008",
    "number": "LX-008",
    "title": "The 2026 Creator Stack",
    "level": "PRACTITIONER",
    "path": "path-production",
    "objective": {
      "verb": "choose",
      "condition": "the tools for a small content business",
      "criteria": "a written short-list with prices and a reason for every pick"
    },
    "prereqs": [
      "openmontage"
    ],
    "transmissionSlug": "youtube-creator-stack",
    "fieldReportId": null,
    "exercise": {
      "summary": "Score ten content tools against your own needs, keep the five that fit, and write one line for each: what it does, what it costs, why it stayed.",
      "receipt": {
        "label": "Stack sheet in vault",
        "url": "article.html?id=youtube-creator-stack"
      }
    },
    "checkpoint": [
      "Listed the jobs the tools must do",
      "Scored ten tools against those jobs",
      "Kept five and wrote the reason for each",
      "Rejected the rest in writing too"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "08",
    "art": "art-8"
  },
  {
    "id": "lx-009",
    "number": "LX-009",
    "title": "Whisper in the Browser",
    "level": "PRACTITIONER",
    "path": "path-craft",
    "objective": {
      "verb": "run",
      "condition": "speech-to-text in your own browser",
      "criteria": "the audio never leaves your machine"
    },
    "prereqs": [
      "mission-control"
    ],
    "transmissionSlug": "webgpu-whisper",
    "fieldReportId": null,
    "exercise": {
      "summary": "Transcribe a one-minute voice note in the browser using your own graphics chip, and save the transcript straight into your notes.",
      "receipt": {
        "label": "Local transcript in vault",
        "url": "article.html?id=webgpu-whisper"
      }
    },
    "checkpoint": [
      "Ran the transcription with the network disconnected",
      "Confirmed the transcript matches the audio",
      "Saved the transcript as a note in your vault",
      "Wrote one line about where the audio went (nowhere)"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "09",
    "art": "art-9"
  },
  {
    "id": "lx-010",
    "number": "LX-010",
    "title": "GPU Offload: The Desktop as Inference Server",
    "level": "DEEP DIVE",
    "path": "path-mesh",
    "objective": {
      "verb": "share",
      "condition": "your desktop's graphics chip with the whole network",
      "criteria": "another machine gets an answer over the network"
    },
    "prereqs": [
      "hermes-always-on"
    ],
    "transmissionSlug": "gpu-offloading",
    "fieldReportId": null,
    "exercise": {
      "summary": "Set up the desktop as an AI answering server, open the firewall for it, and get an answer from another machine on your network.",
      "receipt": {
        "label": "Throughput log in vault",
        "url": "article.html?id=gpu-offloading"
      }
    },
    "checkpoint": [
      "Installed the serving software and pulled a model",
      "Opened the port and confirmed the firewall rule",
      "Got a real answer from a second machine",
      "Wrote the settings down for the next reboot"
    ],
    "badge": "MESH ARCHITECT",
    "status": "live",
    "glyph": "10",
    "art": "art-10"
  },
  {
    "id": "lx-011",
    "number": "LX-011",
    "title": "Design Vocabulary as a Skill",
    "level": "DEEP DIVE",
    "path": "path-production",
    "objective": {
      "verb": "write",
      "condition": "your own design vocabulary list",
      "criteria": "ten named likes and dislikes an AI can follow"
    },
    "prereqs": [
      "youtube-creator-stack"
    ],
    "transmissionSlug": "design-vocabulary",
    "fieldReportId": null,
    "exercise": {
      "summary": "Write your design taste as rules an AI can follow: ten things you love, ten you refuse, each with one example.",
      "receipt": {
        "label": "Cleaned mock in vault",
        "url": "article.html?id=design-vocabulary"
      }
    },
    "checkpoint": [
      "Listed ten likes with examples",
      "Listed ten refusals with examples",
      "Had an AI apply the list to a fresh page",
      "Marked which rules the AI followed correctly"
    ],
    "badge": "PRODUCTION OPERATOR",
    "status": "live",
    "glyph": "11",
    "art": "art-11"
  },
  {
    "id": "lx-012",
    "number": "LX-012",
    "title": "Vault Ontology: Routing at 5,500 Notes",
    "level": "DEEP DIVE",
    "path": "path-craft",
    "objective": {
      "verb": "organize",
      "condition": "a notes collection of 100+ notes",
      "criteria": "any note findable in under thirty seconds"
    },
    "prereqs": [
      "webgpu-whisper"
    ],
    "transmissionSlug": "vault-ontology",
    "fieldReportId": null,
    "exercise": {
      "summary": "Draw the folder map for your notes, move ten misplaced notes to their right homes, and write the routing rules on one page.",
      "receipt": {
        "label": "Vault snapshot in vault",
        "url": "article.html?id=vault-ontology"
      }
    },
    "checkpoint": [
      "Drew the folder map with five top areas",
      "Moved ten notes to their correct folders",
      "Wrote the routing rules on one page",
      "Found any note in under thirty seconds"
    ],
    "badge": "CRAFTSPERSON",
    "status": "live",
    "glyph": "12",
    "art": "art-12"
  },
  {
    "id": "lx-013",
    "number": "LX-013",
    "title": "The Model Fleet",
    "level": "PRACTITIONER",
    "path": "path-mesh",
    "objective": {
      "verb": "design",
      "condition": "a small team of AI helpers with different models",
      "criteria": "each model gets a job that matches its tested strengths, plus a written backup plan"
    },
    "prereqs": [
      "lx-004"
    ],
    "transmissionSlug": "model-fleet",
    "fieldReportId": null,
    "exercise": {
      "summary": "Set up two AI helper profiles on two different models, route one real task to each, and write the lookup table that decides which helper gets which task.",
      "receipt": {
        "label": "Fleet dispatch table in vault",
        "url": "article.html?id=model-fleet"
      }
    },
    "checkpoint": [
      "Checked each model's strengths against real test results, not ads",
      "Built two separate profiles and proved a task routes to each",
      "Wrote the lookup table with a backup path",
      "Wrote down the concurrent-call limit and the waiting rule"
    ],
    "badge": "module",
    "status": "live",
    "glyph": "13",
    "art": "art-4"
  }
];
