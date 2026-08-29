# RT-001 DRAFT — "on Cole Medin's agent-safety field guide"
**Status: DRAFT — awaiting operator approval (the human gate). Do not flip `status: 'live'` until Eric signs off.**
**Fairness gate pre-check (all three pass):** would Cole thank us? Yes — praise is specific, divergence is our practice not his defect, links generous. Divergence from practice? Yes — the mesh runs it daily. Original linked in the first two lines? Will be at publish.

---

**1. THE PICK**

Cole Medin's *"How to Actually Run Your Coding Agent Safely (And Avoid the Horror Stories)"* — linked in the first two lines, always. Why it earned a response: he treats agent safety as an engineering problem with a working solution, not a fear post. That is rare and worth rewarding.

**2. THE CLAIM**

Restated fairly: an autonomous coding agent with full permissions is one bad command away from wrecking your machine — so contain it. A Docker sandbox gives the agent the autonomy it needs while keeping the blast radius off your host: file system access, port conflicts, and the Yolo-mode horror stories all stay inside the box.

**3. THE PRAISE**

He shows the failure mode *before* the fix — the horror stories first, so the sandbox lands as a solution to something you watched break. And the sandbox walkthrough is end-to-end: setup, the agent running inside it, the host verified untouched. *(Timestamp reference to be verified against the video at final read — do not publish with an unverified timestamp.)*

**4. THE DIVERGENCE**

This is what we do instead: on the mesh, the isolation unit is not a sandbox around one agent — it is the topology. One LXC per service. One profile per agent, with a toolset scoped to its role. Capability-limited credentials. A supervisor loop that escalates to a human instead of failing silently. Where Cole contains the blast radius in one container, the mesh distributes the same discipline across 26 LXCs — with watchdogs that stay silent when healthy and alert on non-zero exit, and an operations floor that can restart a failed service without me.

**5. THE RECEIPT**

The divergence runs in production: Mission Control's fleet tiles and restart API (the operations floor), the watchdog pattern (silent-on-healthy cron), the kanban dispatcher with a failure limit that blocks stuck tasks, and the four-host topology this site documents. Every claim in the piece links to the artifact.

**6. THE HANDOFF**

Generous link to Cole's channel (@ColeMedin) and the video; our twin piece: *Mission Control: Designing a Command Surface for an Agent Fleet* (T-006). If he responds — publicly or privately — the thread gets a "response received" state. Correspondence, not commentary.

**7. THE THREAD**

This argument continues in RT-002 (on memory: kill your MEMORY.md vs the vault ontology) and RT-003 (on always-on: cloud-simple vs the four-host mesh).

---

**Publish checklist:** [ ] Eric final read · [ ] timestamp for THE PRAISE verified · [ ] handoff links tested · [ ] flip `REPLIES[0].status` to `'live'` + set `date` · [ ] ledger line
