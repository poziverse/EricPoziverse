#!/usr/bin/env node
// Add glossary terms for the stack apps and tools named in the directory.
const fs = require("fs");
const path = require("path");
const DIR = "C:/Users/gener/.openclaw-autoclaw/agents/m32/workspace/projects/website-059e76f15f2587ffd57a0727/data/directory";
const SRC = "C:/Users/gener/.openclaw-autoclaw/workspace/.cluster/plain-language-pass-20260829/glossary.json";
const ADD = [
["Qdrant", "A vector database - it stores the numeric 'meaning' of documents so software can search by ideas instead of exact words."],
["n8n", "A visual automation tool - drag-and-drop workflows that connect services, surveyed for the mesh and set aside in favor of script-first automation."],
["OpenWebUI", "A self-hosted chat interface for AI models - a private, browser-based front end for locally served models."],
["ComfyUI", "A node-based image-generation studio - each step of making an image is a box you connect to the next."],
["Memos", "A lightweight self-hosted note-taking app in the mesh's app stack."],
["Trilium", "A self-hosted hierarchical note-taking app in the mesh's app stack."],
["Linkding", "A self-hosted bookmark manager - saves and tags links privately."],
["Langflow", "A visual builder for AI workflows - chain models and tools together as diagrams."],
["Pipecat", "A framework for real-time voice and video AI agents."],
["SnappyMail", "A web-based email reader - the browser interface for the mesh's self-hosted mail."],
["Matrix", "An open chat protocol - the standard that the mesh's Synapse server speaks."],
["LangGraph", "The framework behind the coding team: a supervisor hands work to a builder, a reviewer checks it, and the loop repeats until it passes."],
["Honcho", "The memory service that lets agents remember between conversations - the middle layer of the three-tier memory."],
];
const g = JSON.parse(fs.readFileSync(path.join(DIR, "glossary.json"), "utf8"));
let added = 0;
for (const [term, gloss] of ADD) {
  if (!g.glossary.some(x => x.term.toLowerCase() === term.toLowerCase())) { g.glossary.push({ term, gloss }); added++; }
}
fs.writeFileSync(path.join(DIR, "glossary.json"), JSON.stringify(g, null, 1));
fs.writeFileSync(SRC, JSON.stringify(g, null, 1));
console.log("glossary terms added:", added, "| total:", g.glossary.length);
