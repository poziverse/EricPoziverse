#!/usr/bin/env node
// Pack #3: deepen 3 production articles + FR-002 reserved video entry.
const fs = require("fs");
const path = require("path");
const p = path.resolve(__dirname, "..", "assets", "js", "data.js");
let src = fs.readFileSync(p, "utf8");
const EOL = src.includes("\r\n") ? "\r\n" : "\n";
const log = [];

// append HTML to an article body (insert before the body-closing backtick)
function appendToBody(slug, htmlText) {
  mustOnce(`slug: '${slug}'`, `slug ${slug}`);
  const si = src.indexOf(`slug: '${slug}'`);
  const bOpen = src.indexOf("`", si);
  const bClose = src.indexOf("`", bOpen + 1);
  if (bOpen < 0 || bClose < 0) { console.error(`FATAL ${slug}: body backticks`); process.exit(1); }
  const html = htmlText.split(EOL).map(l => "      " + l).join(EOL);
  src = src.slice(0, bClose) + EOL + html + EOL + "    " + src.slice(bClose);
  log.push(`deepened ${slug}`);
}
function mustOnce(s, label) { const n = src.split(s).length - 1; if (n !== 1) { console.error(`FATAL ${label}: ${n} occurrences`); process.exit(1); } }

// 1) agent-native-video — the capability manifest
appendToBody("agent-native-video", [
  '<h2>The capability manifest</h2>',
  '<p>Since that transmission shipped, the studio grew a discipline most creator stacks skip: a live-verified capability manifest. Every tool the studio can use &mdash; the video engines, the animation libraries, the ten text-to-speech providers, the encode pipeline &mdash; is inventoried with a status, a use-when, and a verification date. Nothing is &ldquo;supposed to work.&rdquo; It either verified live on the day, or it says so.</p>',
  '<p>The manifest also encodes the economics: a per-session spend gate, free providers first, paid fallback only with a written justification, and no upload to any platform without explicit permission. Capability without a budget is how agent projects die; the manifest makes the budget a first-class row in the table.</p>',
].join(EOL));

// 2) openmontage — advanced use cases
appendToBody("openmontage", [
  '<h2>Three productions beyond the template</h2>',
  '<p>The intake research mapped where an agentic studio goes once templates stop being enough. Reference-driven production: paste a video, get a grounded plan &mdash; content, pacing, structure &mdash; and then two or three <em>differentiated</em> concepts, never carbon copies. Atelier mode for hero work: art direction, motion principles, engine mechanics &mdash; under one rule, reuse engine knowledge, never creative components. And documentary montage: real archival footage from public collections, indexed by image embeddings, matched to the scene plan by meaning instead of filename.</p>',
  '<p>The distinctness review might be the most transferable idea in the stack: before a render ships, ask whether the video could belong to any other product. If the answer is yes, it is not finished.</p>',
].join(EOL));

// 3) youtube-creator-stack — the 4-channel network
appendToBody("youtube-creator-stack", [
  '<h2>The four-channel network</h2>',
  '<p>The creator stack now runs as a planned network rather than a single channel: a primary lessons line with a membership funnel, a students line tuned for non-technical learners, a builder log for the self-hosting crowd, and a brand tenant for Glassy. Four publish slots a week, twelve shorts, one mesh-level pipeline routing all of it through a single API identity with per-channel brand overlays.</p>',
  '<p>The interesting constraint is not volume &mdash; it is that all four channels share one infrastructure layer. Crons per channel, a daily thumbnail refresh, a weekly analytics rollup, and a brand spec per tenant: the mesh treats channels as configuration, not as four separate businesses.</p>',
].join(EOL));

// 4) FR-002 reserved entry
const V_START = src.indexOf("window.POZIVERSE.VIDEOS = [");
const V_END = src.indexOf("window.POZIVERSE.REPLIES", V_START);
if (V_START < 0 || V_END < 0) { console.error("FATAL: VIDEOS bounds"); process.exit(1); }
let vid = src.slice(V_START, V_END);
const vClose = vid.lastIndexOf("];");
if (vClose < 0) { console.error("FATAL: VIDEOS close"); process.exit(1); }
const fr002 = `,
  {
    id: "fr-002",
    number: 2,
    youtubeId: null,
    title: 'The Agent-Native Video Stack: <em>Manim, HyperFrames, and the New Render Pipeline</em>',
    deck: 'The video twin of the production-stack transmission — a live capability manifest, title-card evals, and a deterministic render, narrated over the studio doing the work.',
    category: 'Creation',
    date: '2026-08-29',
    duration: '10:00',
    posterArt: 'art-2',
    glyph: '02',
    chapters: [
      { time: '00:00', label: 'Cold open: the manifest, live-verified' },
      { time: '01:10', label: 'Title cards: the eval that picked the engine' },
      { time: '03:20', label: 'HyperFrames: HTML in, MP4 out' },
      { time: '05:40', label: 'Voice: ten providers, one quota gate' },
      { time: '08:00', label: 'The stack, assembled end-to-end' }
    ],
    waveformSeed: 2,
    format: 'voice-over',
    transcriptUrl: null,
    twinSlug: 'agent-native-video',
    status: 'reserved'               // reserved | live
  }
`;
vid = vid.slice(0, vClose) + fr002 + vid.slice(vClose);
src = src.slice(0, V_START) + vid + src.slice(V_END);
log.push("FR-002 reserved");

const tmp = p + ".tmp";
fs.writeFileSync(tmp, src, "utf8");
fs.renameSync(tmp, p);
console.log("PATCHED:", log.join(" | "));
