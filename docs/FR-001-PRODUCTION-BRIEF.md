# FR-001 Production Brief — "A Year of Building the Poziverse Mesh"

**Format decision (2026-08-28): voice-over over mesh footage.** No on-camera host. The voice
carries the piece; the screens carry the proof. Target 10–12 min, matching the reserved
chapter map in `data.js` (`VIDEOS[0]`). Twin: T-001 (`article.html?id=year-of-the-mesh`).

## Pipeline (per lesson LX-002, the stack we already teach)

1. **Headers & transitions** — HyperFrames renders the section headers from the brand spec
   (the experiment already logged on the Now page). One render pass, reused for clips.
2. **Voice-over** — ElevenLabs VO from the script skeleton below (or operator-read; the
   synthetic voice must be disclosed in the description per the honesty contract).
3. **Screen capture** — record the live surfaces list below (OBS or Playwright CDP capture).
   3–4 s per cut minimum; longer holds on anything the narration names.
4. **Edit** — assemble per chapter map; waveform motif from `waveformSeed: 1`.
5. **Repurpose** — Opus Clip → 60s verticals for TikTok/IG (Broadcast strip teaser);
   X thread from the chapter claims.

## Chapter map → shot list (what we have vs what to capture)

| # | Chapter | On screen | Status |
|---|---|---|---|
| 0 | 00:00 Cold open: the station comes online | Mission Control boot → fleet tiles go green (`mission-control.html`) | **capture** |
| 1 | 01:20 The four hosts, on the graph | `CT207_TOPOLOGY.md` diagram + Pulse fleet view (`100.94.66.60` dashboard) | **capture** (diagram exists as doc — render to slide) |
| 2 | 03:45 What the agents run themselves | Kanban board live tasks; agent-chat streaming a real reply; cron radar | **capture** |
| 3 | 06:10 The failures that became runbooks | Terminal: a real runbook from the vault; watchdog log; TOOLS.md excerpt | **capture** (runbooks exist as text — screen them) |
| 4 | 09:30 Year two: what changes | Content viewer SIGNALS view; this site's Field Log; roadmap beats | **capture** |

**Existing assets:** evidence stills (dashboard/viewer screenshots in workspace
`DELIVERY/`), the topology doc, live surfaces above, the transmission text itself.
**No video files exist yet** — everything above is a capture task, which is the point:
the mesh is the footage library.

## Script skeleton (from T-001 body — 5 beats, ~1,400 words VO)

1. **Cold open** — "Twelve months ago I wrote the document that started all of this. The
   question was simple: what is this system, and where does everything live?"
2. **The four hosts** — the table as a moment: 26 LXCs, 15 services, 17 devices. "The
   entire compute footprint fits on a small table."
3. **What the agents run** — cron jobs, watchdogs, dashboards that heal themselves. "The
   boring parts of my life now have a staff."
4. **Failures → runbooks** — one concrete failure story (pick from the vault), the runbook
   it became, the rule it taught. "Every fix became a note; every note became a habit."
5. **Year two** — the media center as the public face of the mesh; close on "uptime is
   typography." Handoff: read the full transmission (link in description).

## Fairness / honesty gates

- No invented metrics on screen; only live dashboard reads or documented numbers (26/15/17).
- Synthetic VO disclosed if used. All claims must have receipts (T-001 already ships them).
- When live: set `VIDEOS[0].youtubeId`, `status: 'live'`, `transcriptUrl`, and update
  `NOW.project.notes` — the Watch page facade activates automatically.

## Definition of done

- [ ] HyperFrames headers rendered (one pass, brand spec)
- [ ] VO recorded + disclosed
- [x] 5 chapter captures completed — 2026-08-28, `../../fr001-footage/` (ch0 mission-control 15.8s · ch1 pulse 9.9s · ch2 agent-chat 50.4s live stream · ch3 runbook 11.0s quick-cut shot · ch4 fieldlog 25.6s; 1920x1080 webm, Playwright headless page-video)
- [ ] Rough cut ≤ 12:00, chapters match `VIDEOS[0].chapters` timing
- [ ] 2–3 vertical clips exported (Opus Clip)
- [ ] YouTube upload → `youtubeId` set → Watch page goes live
- [ ] Transcript page shipped → linked via `transcriptUrl`
