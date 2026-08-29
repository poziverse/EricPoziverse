/* ============================================================
   FROM THE POZIVERSE — interactivity engine
   Theme, stars, ticker, search/filter, reveals, tilt, newsletter,
   reading progress, and all data-driven rendering.
   ============================================================ */
(function () {
  'use strict';

  var A = (window.POZIVERSE && window.POZIVERSE.ARTICLES) || [];
  var CATS = (window.POZIVERSE && window.POZIVERSE.CATEGORIES) || [];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function artHTML(art, glyph) {
    return '<div class="art-inner ' + (art || 'art-1') + '">' +
      '<span class="art-orb o-a"></span><span class="art-orb o-b"></span>' +
      '<span class="art-dot" style="left:18%;top:64%"></span>' +
      '<span class="art-dot" style="left:62%;top:30%;width:6px;height:6px"></span>' +
      '<span class="art-glyph">' + (glyph || '') + '</span></div>';
  }
  function fmtDate(iso) {
    var d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  function barsFor(min) {
    var n = Math.min(5, Math.max(2, Math.round(min / 1.6)));
    var s = '';
    for (var i = 1; i <= 5; i++) {
      s += '<i' + (i <= n ? ' class="live"' : '') + ' style="height:' + (5 + i * 2) + 'px"></i>';
    }
    return s;
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function href(slug) { return 'article.html?id=' + encodeURIComponent(slug); }

  /* ---------- theme ---------- */
  var themeBtn = $('.theme-toggle');
  var saved = null;
  try { saved = localStorage.getItem('poziverse-theme'); } catch (e) {}
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeBtn) themeBtn.setAttribute('aria-pressed', 'true');
  }
  if (themeBtn) {
    console.log('[DBG] themeBtn', Object.prototype.toString.call(themeBtn), themeBtn.tagName, 'addEventListener:', typeof themeBtn.addEventListener, 'html:', (themeBtn.outerHTML || '').slice(0, 80));
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      var apply = function () { document.documentElement.setAttribute('data-theme', next); themeBtn.setAttribute('aria-pressed', next === 'light'); };
      if (document.startViewTransition && !reduceMotion) {
        document.startViewTransition(apply);
      } else { apply(); }
      try { localStorage.setItem('poziverse-theme', next); } catch (e) {}
    });
  }

  /* ---------- stars canvas ---------- */
  var canvas = $('.stars-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var stars = [];
    var W, H, DPR = Math.min(window.devicePixelRatio || 1, 2);
    var raf = null;
    function size() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seed();
    }
    function seed() {
      stars = [];
      var n = Math.floor((W * H) / 5200);
      for (var i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.15 + 0.25,
          a: Math.random() * 0.6 + 0.2,
          tw: Math.random() * 0.02 + 0.004,
          ph: Math.random() * Math.PI * 2,
          tint: Math.random() < 0.12 ? (Math.random() < 0.5 ? '16,185,129' : '245,184,75') : '233,237,240'
        });
      }
      stars.sort(function (a, b) { return a.r - b.r; });
    }
    var meteors = [];
    function spawnMeteor() {
      meteors.push({ x: Math.random() * W * 0.7 + W * 0.2, y: -20, vx: (Math.random() * 2.4 + 2.6), vy: (Math.random() * 1.2 + 1.2), life: 1 });
    }
    var lastMeteor = 0;
    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var a = s.a * (0.55 + 0.45 * Math.sin(t * s.tw * 0.016 + s.ph));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + s.tint + ',' + a.toFixed(3) + ')';
        ctx.fill();
      }
      if (!reduceMotion && t - lastMeteor > 9000) { spawnMeteor(); lastMeteor = t; }
      for (var m = meteors.length - 1; m >= 0; m--) {
        var mt = meteors[m];
        mt.x += mt.vx; mt.y += mt.vy; mt.life -= 0.016;
        if (mt.life <= 0 || mt.x > W + 60 || mt.y > H + 60) { meteors.splice(m, 1); continue; }
        var grad = ctx.createLinearGradient(mt.x, mt.y, mt.x - mt.vx * 9, mt.y - mt.vy * 9);
        grad.addColorStop(0, 'rgba(52,211,153,' + (0.7 * mt.life).toFixed(2) + ')');
        grad.addColorStop(1, 'rgba(52,211,153,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(mt.x, mt.y);
        ctx.lineTo(mt.x - mt.vx * 9, mt.y - mt.vy * 9);
        ctx.stroke();
      }
      raf = requestAnimationFrame(frame);
    }
    size();
    frame(performance.now());
    window.addEventListener('resize', size);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && raf) { cancelAnimationFrame(raf); raf = null; }
      else if (!raf) { frame(performance.now()); }
    });
  }

  /* ---------- hero ticker + clock ---------- */
  var clock = null;
  var clockTimer = null;
  function tickClock() {
    if (!clock) return;
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    clock.textContent = p(d.getUTCHours()) + ':' + p(d.getUTCMinutes()) + ':' + p(d.getUTCSeconds()) + ' UTC';
  }
  function startClock() {
    if (!clock || clockTimer) return;
    tickClock();
    clockTimer = setInterval(tickClock, 1000);
  }
  var transNo = $('.transmission-no');
  if (transNo) {
    var start = new Date('2026-08-12T00:00:00Z').getTime();
    var n = Math.floor((Date.now() - start) / 86400000) + 1;
    transNo.textContent = 'TRANSMISSION ' + String(Math.max(1, n)).padStart(3, '0');
  }

  /* ---------- data-driven rendering: index ---------- */
  function renderFeatured() {
    var feat = $('.feature-card');
    if (!feat || !A.length) return;
    var a = A[0];
    feat.innerHTML =
      '<div class="feature-art"><div class="art-inner ' + a.art + '">' +
      '<span class="art-orb o-a"></span><span class="art-orb o-b"></span>' +
      '<span class="art-dot" style="left:20%;top:60%"></span>' +
      '<span class="art-glyph">' + (a.glyph || '') + '</span></div></div>' +
      '<div class="feature-body"><span class="kicker">' + esc(a.category) + ' · Featured transmission</span>' +
      '<h3>' + a.title + '</h3>' +
      '<p class="excerpt">' + esc(a.excerpt) + '</p>' +
      '<div class="meta-line"><span>' + fmtDate(a.date) + '</span><span class="dot"></span><span>' + a.readTime + ' min read</span><span class="dot"></span><span class="tag">' + a.tags.slice(0, 2).map(esc).join(' · ') + '</span></div>' +
      '<a class="read-more" href="' + href(a.slug) + '">Open transmission <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></a></div>';
  }

  function renderHeroPanel() {
    var panel = $('.hero-panel');
    if (!panel || !A.length) return;
    var a = A[0];
    panel.innerHTML =
      '<div class="hp-head"><span class="hp-title">Latest transmission</span><span class="hp-clock"></span></div>' +
      '<div class="hp-art"><div class="art-inner ' + a.art + '">' +
      '<span class="art-orb o-a"></span><span class="art-dot" style="left:22%;top:58%"></span>' +
      '<span class="art-glyph" style="font-size:clamp(72px,10vw,120px)">' + (a.glyph || '') + '</span></div></div>' +
      '<h3>' + a.title + '</h3><p>' + esc(a.excerpt) + '</p>' +
      '<a class="hp-link" href="' + href(a.slug) + '">Read it <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></a>';
    clock = $('.hp-clock');
    startClock();
  }

  function cardHTML(a, sizeClass, i) {
  var searchText = (a.title + ' ' + a.excerpt + ' ' + a.tags.join(' ') + ' ' + a.category).toLowerCase().replace(/<[^>]+>/g, '');
  var isWide = sizeClass === 'wide', isSmall = sizeClass === 'small';
  return '<article class="card card--' + sizeClass + ' tilt reveal" data-type="transmission" data-tags="' + esc(a.tags.join(' ')) + '" data-search="' + esc(searchText) + '" data-cat="' + esc(a.category) + '" data-v="' + (i % 3 === 0 ? 'left' : (i % 3 === 1 ? 'right' : 'zoom')) + '" style="--d:' + (i * 55) + 'ms" data-slug="' + a.slug + '">' +
    '<div class="card-art"><div class="art-inner ' + a.art + '">' +
    '<span class="art-orb o-a"></span><span class="art-dot" style="left:20%;top:60%"></span>' +
    '<span class="art-glyph" style="font-size:' + (isSmall ? 'clamp(84px,12vw,140px)' : 'clamp(110px,16vw,200px)') + '">' + (a.glyph || '') + '</span>' +
    '</div><span class="signal-bars">' + barsFor(a.readTime) + '</span></div>' +
    '<div class="card-body"><span class="kicker">' + esc(a.category) + '</span>' +
    '<h3>' + a.title + '</h3>' +
    '<p class="excerpt">' + esc(a.excerpt) + '</p>' +
    '<div class="meta-line"><span>' + fmtDate(a.date) + '</span><span class="dot"></span><span>' + a.readTime + ' min</span></div></div>' +
    '<a class="card-link" href="' + href(a.slug) + '" aria-label="' + esc(a.title.replace(/<[^>]+>/g, '')) + '"></a></article>';
  }

  function renderGrid() {
  var grid = $('.archive-grid');
  if (!grid) return;
  var entries = [];
  A.forEach(function (a) { entries.push({ type: 'transmission', date: a.date, a: a }); });
  var V = (window.POZIVERSE.VIDEOS || [])[0];
  if (V) entries.push({ type: 'video', date: V.date, v: V });
  var RT = (window.POZIVERSE.REPLIES || [])[0];
  if (RT) entries.push({ type: 'reply', date: '2026-08-27', r: RT });
  entries.sort(function (x, y) { return new Date(y.date) - new Date(x.date); });
  var pattern = ['wide', 'small', 'small', 'tall', 'tall', 'tall', 'wide', 'small', 'small', 'tall', 'tall', 'tall', 'wide', 'small', 'small'];
  var html = '';
  entries.forEach(function (e, i) { html += entryCard(e, pattern[i % pattern.length], i); });
  html += '<article class="card card--tall reveal subscribe-tile" data-v="zoom" style="--d:660ms" data-role="page">' +
    '<div class="card-body" style="justify-content:center;text-align:center;align-items:center;gap:0">' +
    '<span class="kicker" style="margin-bottom:14px">Stay in the loop</span>' +
    '<h3 style="font-size:30px">One signal,<br><em style="font-style:italic;color:var(--accent-bright)">weekly</em>.</h3>' +
    '<p class="excerpt" style="max-width:30ch;margin:14px 0 22px">Field notes from the mesh, straight to your inbox.</p>' +
    '<a class="btn btn-ghost" href="#newsletter" style="padding:11px 20px;font-size:14px">Subscribe</a></div></article>';
  grid.innerHTML = html;
  bindTilt(grid);
  }

function entryCard(e, sizeClass, i) {
  if (e.type === 'transmission') return cardHTML(e.a, sizeClass, i);
  var v = e.v, r = e.r;
  var live = e.type === 'video' && v.status === 'live' && v.youtubeId;
  var kicker = e.type === 'video'
    ? esc(v.category) + ' / FIELD REPORT' + (live ? '' : ' / IN PRODUCTION')
    : 'Peer review / IN COMPOSITION';
  var link = e.type === 'video' ? 'watch.html' : 'replies.html';
  var title = e.type === 'video'
    ? v.title
    : 'An open correspondence with the creators we <em style="font-style:italic;color:var(--accent-bright)">learn from</em>.';
  var excerpt = e.type === 'video' ? esc(v.deck) : 'The 7-beat format is on the bench: pick, claim, praise, divergence, receipt, handoff, thread. Episode one is in composition.';
  var art = e.type === 'video' ? v.posterArt : 'art-11';
  var glyph = e.type === 'video' ? (v.glyph || 'FR') : 'RT';
  var meta = e.type === 'video'
    ? fmtDate(v.date) + '</span><span class="dot"></span><span>' + esc(v.duration) + (live ? '' : ' planned')
    : 'In composition';
  return '<article class="card card--' + sizeClass + ' tilt reveal" data-type="' + e.type + '" data-tags="' + esc(e.type === 'video' ? 'field report video vlog mesh' : 'peer review reactions editorial') + '" data-search="' + esc((e.type === 'video' ? v.title + ' ' + v.deck + ' field report video watch' : 'reply thread peer review reactions editorial correspondence').toLowerCase()) + '" data-v="' + (i % 2 === 0 ? 'left' : 'right') + '" style="--d:' + (i * 55) + 'ms">' +
    '<div class="card-art"><div class="art-inner ' + art + '"><span class="art-orb o-a"></span><span class="art-dot" style="left:20%;top:60%"></span>' +
    '<span class="art-glyph" style="font-size:clamp(110px,16vw,200px)">' + glyph + '</span></div>' +
    '<span class="signal-bars">' + barsFor(e.type === 'video' ? (v.readTime || 6) : 5) + '</span></div>' +
    '<div class="card-body"><span class="kicker">' + kicker + '</span>' +
    '<h3>' + title + '</h3>' +
    '<p class="excerpt">' + excerpt + '</p>' +
    '<div class="meta-line"><span>' + meta + '</span></div></div>' +
    '<a class="card-link" href="' + link + '" aria-label="' + esc(title.replace(/<[^>]+>/g, '')) + '"></a></article>';
  }

  function renderClusters() {
    var root = $('.clusters');
    if (!root) return;
    var html = '';
    var used = {};
    CATS.forEach(function (cat) {
      var items = A.filter(function (a) { return a.category === cat.id; });
      if (!items.length || used[cat.id]) return;
      used[cat.id] = true;
      html += '<div class="cluster reveal"><div class="cluster-head"><span class="kicker">' + esc(cat.kicker) + '</span>' +
        '<h3><a class="cluster-cat-link" href="index.html?cat=' + encodeURIComponent(cat.id) + '#archive">' + esc(cat.blurb) + '</a></h3></div><div class="cluster-row">';
      items.slice(0, 3).forEach(function (a, i) {
        html += '<div class="cluster-item tilt"><span class="num">' + String(i + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0') + '</span>' +
          '<h4>' + a.title + '</h4>' +
          '<div class="meta-line"><span>' + fmtDate(a.date) + '</span><span class="dot"></span><span>' + a.readTime + ' min</span></div>' +
          '<a class="cluster-link" href="' + href(a.slug) + '" aria-label="' + esc(a.title.replace(/<[^>]+>/g, '')) + '"></a></div>';
      });
      html += '</div></div>';
    });
    root.innerHTML = html;
    bindTilt(root);
  }

  function renderTicker() {
    var track = $('.ticker-track');
    if (!track) return;
    var span = A.map(function (a) { return '<span>' + a.title.replace(/<[^>]+>/g, '') + '</span>'; }).join('');
    track.innerHTML = span + span;
  }

  /* ---------- search + filter ---------- */
  function bindSearch() {
  var input = $('#archive-search');
  var chipsRoot = $('.chips');
  if (!input || !chipsRoot) return;
  var count = $('.result-count');
  var activeTags = {};
  var activeType = null;
  var activeCat = null;
  var tagCount = {};
  A.forEach(function (a) { a.tags.forEach(function (t) { tagCount[t] = (tagCount[t] || 0) + 1; }); });
  var allTags = Object.keys(tagCount).sort(function (x, y) { return tagCount[y] - tagCount[x] || x.localeCompare(y); }).slice(0, 12);

  try {
    var params = new URLSearchParams(window.location.search);
    var tagParam = params.get('tag');
    if (tagParam && tagCount[tagParam]) activeTags[tagParam] = true;
    var catParam = params.get('cat');
    if (catParam && CATS.some(function (c) { return c.id === catParam; })) activeCat = catParam;
  } catch (e) {}

  var allChip = el('button', 'chip', 'All');
  allChip.type = 'button';
  allChip.setAttribute('data-role', 'all');
  allChip.setAttribute('aria-pressed', 'true');
  chipsRoot.appendChild(allChip);
  allChip.addEventListener('click', function () { activeTags = {}; activeType = null; activeCat = null; sync(); });

  [['transmission', 'Transmissions'], ['video', 'Field reports'], ['reply', 'Reply threads']].forEach(function (tc) {
    var c = el('button', 'chip', esc(tc[1]));
    c.type = 'button';
    c.setAttribute('data-role', 'type');
    c.setAttribute('data-type', tc[0]);
    c.setAttribute('aria-pressed', 'false');
    chipsRoot.appendChild(c);
    c.addEventListener('click', function () {
      activeType = activeType === tc[0] ? null : tc[0];
      activeTags = {};
      sync();
    });
  });

  allTags.forEach(function (t) {
    var c = el('button', 'chip', esc(t) + ' <span style="opacity:.55">' + tagCount[t] + '</span>');
    c.type = 'button';
    c.setAttribute('data-tag', t);
    c.setAttribute('aria-pressed', 'false');
    chipsRoot.appendChild(c);
    c.addEventListener('click', function () {
      if (activeTags[t]) delete activeTags[t]; else activeTags[t] = true;
      activeCat = null;
      sync();
    });
  });

  function sync() {
    var q = (input.value || '').trim().toLowerCase();
    var visible = 0;
    $$('.archive-grid .card').forEach(function (card) {
      if (card.getAttribute('data-role') === 'page') { card.style.display = 'none'; return; }
      var type = card.getAttribute('data-type') || 'transmission';
      var text = card.getAttribute('data-search') || '';
      var tags = (card.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean);
      var cat = card.getAttribute('data-cat') || '';
      var matchQ = !q || text.indexOf(q) !== -1;
      var tkeys = Object.keys(activeTags);
      var matchT = !tkeys.length || tkeys.every(function (t) { return tags.indexOf(t) !== -1; });
      var matchC = !activeCat || cat === activeCat;
      var matchType = !activeType || type === activeType;
      var show = matchQ && matchT && matchC && matchType;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    var empty = $('.empty-state');
    if (empty) empty.classList.toggle('on', visible === 0);
    var totalEntries = A.length + ((window.POZIVERSE.VIDEOS || [])[0] ? 1 : 0) + ((window.POZIVERSE.REPLIES || [])[0] ? 1 : 0);
    if (count) count.innerHTML = '<b>' + visible + '</b> of ' + totalEntries + ' log entries';
    var subTile = $('.subscribe-tile');
    if (subTile) subTile.style.display = (visible === 0 || activeType || q || Object.keys(activeTags).length || activeCat) ? 'none' : '';
    $$('.chips .chip').forEach(function (c) {
      var role = c.getAttribute('data-role');
      if (role === 'all') { c.setAttribute('aria-pressed', String(!activeType && !Object.keys(activeTags).length && !activeCat)); return; }
      if (role === 'type') { c.setAttribute('aria-pressed', String(c.getAttribute('data-type') === activeType)); return; }
      var t = c.getAttribute('data-tag');
      if (t) c.setAttribute('aria-pressed', String(!!activeTags[t]));
    });
  }
  function entries(total) { return total; }
  input.addEventListener('input', sync);
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
      input.select();
    }
    if (e.key === 'Escape' && document.activeElement === input) { input.value = ''; sync(); input.blur(); }
  });
  sync();

  // category pill: shows + dismisses the active category filter (from ?cat= deep links)
  var catPill = null;
  function ensureCatPill() {
    var existing = chipsRoot.querySelector('[data-role="cat"]');
    if (activeCat && !existing) {
      catPill = el('button', 'chip', '\u00d7 ' + esc(activeCat));
      catPill.type = 'button';
      catPill.setAttribute('data-role', 'cat');
      catPill.setAttribute('aria-pressed', 'true');
      catPill.setAttribute('aria-label', 'Clear category filter: ' + esc(activeCat));
      catPill.addEventListener('click', function () { activeCat = null; sync(); ensureCatPill(); });
      chipsRoot.insertBefore(catPill, chipsRoot.firstChild);
    } else if (!activeCat && existing) {
      existing.remove();
    }
  }
  ensureCatPill();
  var origSync = sync;
  sync = function () { origSync(); ensureCatPill(); };
  sync();
  }

  /* ---------- newsletter ---------- */
  function bindNewsletter() {
    var form = $('.nl-form');
    if (!form) return;
    var input = $('#nl-email');
    var msg = $('.nl-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = (input.value || '').trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (!ok) {
        input.setAttribute('aria-invalid', 'true');
        msg.className = 'nl-msg error';
        msg.textContent = 'That address does not look right — check it and try again.';
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      msg.className = 'nl-msg success';
      msg.innerHTML = '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2.5 8.5 3.5 3.5 7.5-8"/></svg> Signal received. First transmission lands soon.';
      form.querySelector('.nl-row').style.display = 'none';
      form.querySelector('.nl-note').style.display = 'none';
    });
    input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); msg.className = 'nl-msg'; msg.textContent = ''; });
  }

  /* ---------- reveals ---------- */
  function bindReveals() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(function (n) { n.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    $$('.reveal').forEach(function (n) { io.observe(n); });
    // Failsafe: force every reveal visible shortly after load, in case the
    // hosting environment never fires IntersectionObserver (embedded previews).
    setTimeout(function () {
      $$('.reveal:not(.in)').forEach(function (n) { n.classList.add('in'); });
    }, 1600);
  }

  /* ---------- tilt ---------- */
  function bindTilt(root) {
    if (reduceMotion || !finePointer) return;
    $$('.tilt', root).forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (px * 5).toFixed(2) + 'deg) rotateX(' + (-py * 4).toFixed(2) + 'deg) translateY(-3px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* ---------- broadcast strip ---------- */
  var PLATFORM_GLYPHS = {
    youtube: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.2" y="4.6" width="15.6" height="10.8" rx="3"/><path d="M8.6 7.6 12.4 10l-3.8 2.4Z" fill="currentColor" stroke="none"/></svg>',
    instagram: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.8" y="2.8" width="14.4" height="14.4" rx="4"/><circle cx="10" cy="10" r="3.4"/><circle cx="14.2" cy="5.8" r="0.9" fill="currentColor" stroke="none"/></svg>',
    x: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m3.5 3.5 13 13M16.5 3.5l-13 13"/></svg>',
    tiktok: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12.6 3v8.4a3.6 3.6 0 1 1-3.1-3.56"/><path d="M12.6 4.4c.5 1.9 1.9 3.2 3.9 3.4"/></svg>'
  };

  function renderBroadcast() {
    var root = $('#broadcast-strip');
    if (!root || !window.POZIVERSE.SOCIALS) return;
    var S = window.POZIVERSE.SOCIALS;
    var html = '';
    S.forEach(function (c, i) {
      var cls = 'channel-tile c-' + c.platform + (c.status === 'reserved' ? ' is-reserved' : '') + ' reveal';
      html += '<article class="' + cls + '" data-v="' + (i % 2 === 0 ? 'left' : 'right') + '" style="--d:' + (i * 70) + 'ms">';
      html += '<div class="channel-art"><div class="art-inner ' + c.art + '"><span class="art-orb o-a"></span><span class="art-dot" style="left:20%;top:60%"></span></div>';
      html += '<span class="channel-glyph">' + (PLATFORM_GLYPHS[c.platform] || '') + esc(c.platform.toUpperCase()) + '</span>';
      if (c.status === 'live') html += '<span class="signal-bars" style="right:14px;bottom:14px">' + barsFor(4) + '</span>';
      html += '</div>';
      html += '<div class="channel-body">';
      html += '<span class="ch-label">' + esc(c.label) + '</span>';
      html += '<span class="ch-handle">' + esc(c.handle) + '</span>';
      if (c.status === 'live' && c.latest) {
        html += '<span class="ch-teaser"><span class="ch-teaser-title">' + esc(c.latest.title) + '</span><br>' + fmtDate(c.latest.date) + '</span>';
      } else if (c.status === 'reserved') {
        html += '<span class="ch-teaser">First carrier pending — the uplink opens soon.</span>';
      } else if (c.status === 'dormant') {
        html += '<span class="ch-teaser">Last carrier: ' + esc(c.asOf) + '.</span>';
      }
      html += '<div class="channel-meta"><span class="asof">As of ' + esc(c.asOf) + '</span>';
      if (c.status !== 'reserved') {
        html += '<a class="ch-cta" href="' + esc(c.url) + '" target="_blank" rel="noopener">Follow' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 13 13 3M6 3h7v7"/></svg></a>';
      }
      html += '</div></div>';
      if (c.status !== 'reserved') html += '<a class="card-link" href="' + esc(c.url) + '" target="_blank" rel="noopener" aria-label="Open ' + esc(c.platform) + ' channel"></a>';
      html += '</article>';
    });
    root.innerHTML = html;
    bindTilt(root);
  }

  /* ---------- watch page ---------- */
  function renderWatch() {
    var root = $('.watch-root');
    if (!root) return;
    var v = (window.POZIVERSE.VIDEOS || [])[0];
    if (!v) { root.innerHTML = '<div class="empty-state on" style="display:block">No field reports yet.</div>'; return; }
    document.title = v.title.replace(/<[^>]+>/g, '') + ' — From the Poziverse';
    var live = v.status === 'live' && v.youtubeId;

    // player stage
    var stage;
    if (live) {
      stage = '<div class="player-stage" data-v="zoom"><div class="art-inner ' + v.posterArt + '">' +
        '<span class="art-orb o-a"></span><span class="art-glyph">' + (v.glyph || '') + '</span></div>' +
        '<button class="video-facade" type="button" aria-label="Play: ' + esc(v.title.replace(/<[^>]+>/g, '')) + ', ' + esc(v.duration) + '">' +
        '<span class="stage-reserved"><span class="sr-pill"><span class="pulse-dot"></span>SIGNAL ACQUIRED — PRESS PLAY</span></span></button>' +
        '<span class="stage-caption">FR-' + String(v.number).padStart(3, '0') + ' · ' + esc(v.duration) + '</span></div>';
    } else {
      stage = '<div class="player-stage" data-v="zoom"><div class="art-inner ' + v.posterArt + '">' +
        '<span class="art-orb o-a"></span><span class="art-orb o-b"></span>' +
        '<span class="art-dot" style="left:24%;top:58%"></span>' +
        '<span class="art-glyph">' + (v.glyph || '') + '</span></div>' +
        '<div class="stage-reserved">' +
        '<span class="sr-pill"><span class="pulse-dot"></span>FIELD REPORT IN PRODUCTION</span>' +
        '<h3>Capture pending — the studio rig is being wired.</h3>' +
        '<p>PLANNED DURATION ' + esc(v.duration) + ' · ' + v.chapters.length + ' CHAPTERS · CAPTIONS ON YOUTUBE</p>' +
        '<a class="btn btn-primary" href="index.html#newsletter">Notify me at launch</a>' +
        '</div>' +
        '<span class="stage-caption">FR-' + String(v.number).padStart(3, '0') + ' · PRE-PRODUCTION</span>' +
        '<span class="signal-sweep" aria-hidden="true"></span></div>';
    }

    // rail: run of show (planned chapters never fake-seek)
    var rail = '<aside class="watch-rail" aria-label="Signal index">' +
      '<div class="rail-tabs" role="tablist">' +
      '<button class="rail-tab" role="tab" aria-selected="true" data-tab="show">RUN OF SHOW</button>' +
      '<button class="rail-tab" role="tab" aria-selected="false" data-tab="script">TRANSCRIPT</button>' +
      '</div><div class="rail-body">';
    rail += '<div class="rail-panel" data-panel="show">';
    v.chapters.forEach(function (c) {
      rail += '<div class="planned-ch"><span class="t">' + esc(c.time) + '</span><span>' + esc(c.label) + '</span></div>';
    });
    rail += '<p class="rail-note">PLANNED RUN OF SHOW' + (live ? ' — SEEKS ACTIVATE WITH THE CARRIER' : ' — SEEKS ACTIVATE WHEN THE CARRIER IS LIVE') + '</p></div>';
    rail += '<div class="rail-panel" data-panel="script" hidden><p class="transcript-pending">TRANSCRIPT PENDING — CAPTIONS ON YOUTUBE.<br>THE OWNED TRANSCRIPT LANDS WITH THE CARRIER.</p></div>';
    rail += '</div></aside>';

    // twin panel
    var twin = A.find(function (x) { return x.slug === v.twinSlug; });
    var twinHtml = '';
    if (twin) {
      twinHtml = '<section class="twin-panel reveal" data-v="zoom" aria-label="Twin transmission">' +
        '<div class="twin-art"><div class="art-inner ' + twin.art + '"><span class="art-orb o-a"></span><span class="art-glyph">' + (twin.glyph || '') + '</span></div></div>' +
        '<div class="twin-body"><span class="kicker">Read the transmission</span><h3>' + twin.title + '</h3>' +
        '<p class="excerpt">' + esc(twin.excerpt) + '</p>' +
        '<a class="read-more" href="' + href(twin.slug) + '">Open T-' + String(twin.number || 1).padStart(3, '0') + ' <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></a></div></section>';
    }

    root.innerHTML =
      '<header class="watch-top reveal in">' +
      '<span class="kicker"><span class="pulse-dot"></span>FIELD REPORT FR-' + String(v.number).padStart(3, '0') + (twin ? ' · TWIN OF T-001' : '') + '</span>' +
      '<h1>' + v.title + '</h1>' +
      '<p class="deck">' + esc(v.deck) + '</p>' +
      '<div class="watch-meta"><span>' + fmtDate(v.date) + '</span><span class="dot"></span><span>' + esc(v.duration) + ' (planned)</span><span class="dot"></span><span>' + esc(v.category) + '</span></div>' +
      '</header>' +
      '<div class="watch-grid"><div class="player-col">' + stage + '</div>' + rail + '</div>' +
      (twin ? twinHtml : '') +
      '<section class="section" style="padding-top:0;padding-bottom:clamp(56px,8vh,96px)" aria-label="More field reports"><div class="wrap" style="padding-inline:0">' +
      '<div class="section-head" style="margin-bottom:24px"><div><span class="kicker">Playlist</span><h2 style=\'font-size:clamp(30px,4vw,44px);margin-top:10px\'>More <em>field reports</em></h2></div></div>' +
      '<div class="grid"><div class="watch-empty">' +
      '<div class="glyph" aria-hidden="true">01</div>' +
      '<h3>SIGNAL NOT YET RECEIVED</h3>' +
      '<p>FR-001 is in production — the first carrier transmits when the studio rig is wired. The uplink hears first.</p>' +
      '<a class="btn btn-ghost" href="index.html#newsletter">Get the launch signal</a></div></div>' +
      '</div></section>';

    // rail tabs
    $$('.rail-tab', root).forEach(function (tab) {
      tab.addEventListener('click', function () {
        $$('.rail-tab', root).forEach(function (t) { t.setAttribute('aria-selected', String(t === tab)); });
        $$('.rail-panel', root).forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== tab.getAttribute('data-tab'); });
      });
    });

    // facade (activates when a real youtubeId lands in data.js)
    if (live) {
      var facade = $('.video-facade', root);
      if (facade) facade.addEventListener('click', function () {
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + v.youtubeId + '?autoplay=1&rel=0&enablejsapi=1';
        iframe.title = v.title.replace(/<[^>]+>/g, '');
        iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;opacity:0;transition:opacity 280ms var(--ease-out);';
        var stageEl = $('.player-stage', root);
        stageEl.appendChild(iframe);
        requestAnimationFrame(function () { iframe.style.opacity = '1'; });
        var res = $('.stage-reserved', root);
        if (res) setTimeout(function () { if (res.parentNode) res.parentNode.removeChild(res); }, 300);
      });
    }
  }

  /* ---------- reply threads ---------- */
  function renderReplies() {
    var root = $('.replies-root');
    if (!root) return;
    var R = window.POZIVERSE.REPLIES || [];
    var ep = R.find(function (x) { return x.status === 'in-composition'; }) || R[0];
    var storyboard = '';
    (ep.storyboard || []).forEach(function (b) {
      storyboard += '<div class="beat-row"><span class="beat-name"><span class="n">0' + b.n + '</span>' + esc(b.name) + '</span>' +
        '<span class="beat-text">' + esc(b.text) + '</span>' +
        '<span class="beat-status">IN COMPOSITION — PUBLISHES AFTER THE FAIRNESS GATE</span></div>';
    });
    var creatorCard = ep.creator
      ? '<div class="about-card" style="margin-bottom:0"><div class="ac-head"><span class="avatar" aria-hidden="true">' + esc(ep.creator.name.slice(0, 2).toUpperCase()) + '</span><div><h3>' + esc(ep.creator.name) + '</h3><span class="kicker">' + esc(ep.creator.handle) + '</span></div></div></div>'
      : '<div class="bench-card" style="min-height:0"><span class="b-chip">CREATOR TBD</span><p>The first creator under review is being nominated by the operator. Nominations from the uplink carry extra weight.</p></div>';

    root.innerHTML =
      '<header class="replies-top reveal in">' +
      '<span class="kicker"><span class="pulse-dot"></span>REPLY THREADS</span>' +
      '<h1>An open correspondence with the creators we <em>learn from</em>.</h1>' +
      '<p class="deck">Public peer review, not reaction content. Every thread transforms, cites, and links the original — the divergence is always backed by a receipt from practice.</p>' +
      '</header>' +
      '<div class="floor-strip reveal in"><span class="seal"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="8" r="6.4"/><path d="m5.2 8.2 2 2 3.6-4"/></svg></span>EVERY THREAD TRANSFORMS, CITES, AND LINKS THE ORIGINAL — NEVER REPOSTS. WOULD THE REVIEWED CREATOR THANK US FOR THIS? THAT IS THE GATE.</div>' +
      '<section class="episode-panel reveal in" data-v="zoom" aria-label="Featured episode">' +
      '<div class="episode-head"><span class="episode-pill"><span class="pulse-dot"></span>REPLY THREAD #00' + ep.number + ' · IN COMPOSITION</span>' +
      '<span class="eh-note">FIRST CORRESPONDENCE · PUBLISHES AFTER THE FAIRNESS GATE</span></div>' +
      '<div class="episode-body"><h3>The format, made visible.</h3>' +
      '<p class="ep-deck">Every Reply Thread runs the same seven beats — a fixed editorial structure so the review stays fair, the praise stays specific, and the divergence always ships with proof. This is the run of show for episode one.</p>' +
      '<div class="storyboard">' + storyboard + '</div></div>' +
      '<div class="episode-foot"><span>EPISODE RT-001 · 7 BEATS · ' + (ep.receipts.length || 0) + ' RECEIPTS</span><span>THE BLOG IS THE FORMAT\'S FIRST CONSUMER</span></div>' +
      '</section>' +
      '<section class="section" style="padding-top:0;padding-bottom:clamp(56px,8vh,96px)" aria-label="Episode bench"><div class="wrap" style="padding-inline:0">' +
      '<div class="section-head" style="margin-bottom:24px"><div><span class="kicker">The bench</span><h2 style="font-size:clamp(30px,4vw,44px);margin-top:10px">Next <em>correspondences</em></h2></div></div>' +
      '<div class="bench-grid">' +
      '<div class="bench-card"><span class="b-chip">RT-002 · IN COMPOSITION</span><h4>Second thread in research</h4><p>Candidate videos are under fairness-gate review. The divergence must come from practice.</p></div>' +
      '<div class="bench-card"><span class="b-chip">RT-003 · ON THE BENCH</span><h4>Third thread queued</h4><p>Uplink nominations carry extra weight — reply to the newsletter to nominate a video.</p></div>' +
      '<div class="bench-card"><span class="b-chip">YOUR PICK?</span><h4>Nominate a video</h4><p>The strongest candidates explain something about AI or agents — and leave room for a different build.</p><a class="btn btn-ghost" href="index.html#newsletter" style="align-self:flex-start;padding:10px 18px;font-size:13.5px">Via the uplink</a></div>' +
      '</div></section>';
  }

  /* ---------- downloads / library / now ---------- */
  function dlCardHTML(d, featured) {
    var stars = d.stars != null ? '<span class="dot"></span><span>' + d.stars + ' stars</span>' : '';
    var actions = '<div class="card-actions">';
    if (d.assetUrl) actions += '<a class="btn btn-primary" style="padding:10px 18px;font-size:13.5px" href="' + esc(d.assetUrl) + '" download>Download ' + esc(d.version) + '</a>';
    if (d.repoUrl) actions += '<a class="btn btn-ghost" style="padding:10px 18px;font-size:13.5px" href="' + esc(d.repoUrl) + '" target="_blank" rel="noopener">GitHub</a>';
    if (d.demoUrl) actions += '<a class="hp-link" href="' + esc(d.demoUrl) + '">Live demo</a>';
    actions += '</div>';
    var inside = (d.inside || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    var receipt = d.receipt && !d.receipt.pending ? '<a class="hp-link" href="' + esc(d.receipt.url) + '">' + esc(d.receipt.label) + '</a>' : '<span class="asof">RECEIPT PENDING</span>';
    return '<article class="card card--' + (featured ? 'wide' : 'tall') + ' tilt reveal" data-v="zoom">' +
      '<div class="card-art"><div class="art-inner ' + d.art + '"><span class="art-orb o-a"></span><span class="art-dot" style="left:20%;top:60%"></span>' +
      '<span class="art-glyph">' + esc(d.kind.toUpperCase().slice(0, 2)) + '</span></div></div>' +
      '<div class="card-body"><span class="kicker">' + esc(d.kind.toUpperCase()) + '</span>' +
      '<h3>' + esc(d.name) + '</h3>' +
      '<p class="excerpt">' + esc(d.tagline) + '</p>' +
      '<ul class="inside-list">' + inside + '</ul>' +
      '<div class="meta-line"><span>' + esc(d.version) + '</span><span class="dot"></span><span>' + fmtDate(d.releasedAt) + '</span><span class="dot"></span><span>' + esc(d.license.label) + '</span>' + stars + '</div>' +
      actions +
      '<p class="prov-line">BUILT IN-HOUSE · ' + receipt + '</p></div></article>';
  }

  function renderDownloads() {
    if (!$('#downloads-grid') && !$('#manifest-rows') && !$('#closed-rows')) return;
    var D = window.POZIVERSE.DOWNLOADS || [];
    var grid = $('#downloads-grid');
    if (grid && D.length) {
      var html = dlCardHTML(D[0], true);
      for (var i = 1; i < D.length; i++) html += dlCardHTML(D[i], false);
      grid.innerHTML = html;
    }
    var manifest = $('#manifest-rows');
    if (manifest) {
      var kinds = {};
      D.forEach(function (d) { kinds[d.kind] = (kinds[d.kind] || 0) + 1; });
      var rows = Object.keys(kinds).map(function (k) { return '<div class="planned-ch"><span class="t">' + String(kinds[k]).padStart(2, '0') + '</span><span>' + esc(k.toUpperCase()) + '</span></div>'; }).join('');
      manifest.innerHTML = rows + '<div class="planned-ch"><span class="t">' + String(D.length).padStart(2, '0') + '</span><span>TOTAL PUBLIC</span></div>';
    }
    var lastRelease = D.length ? D.reduce(function (a, b) { return a.releasedAt > b.releasedAt ? a : b; }).releasedAt : null;
    var statusLine = $('#manifest-status');
    if (statusLine) statusLine.textContent = D.length + ' PUBLIC ARTIFACT' + (D.length === 1 ? '' : 'S') + (lastRelease ? ' \u00b7 LAST RELEASE ' + lastRelease.toUpperCase() : '');
    var dlCount = $('#dl-count');
    if (dlCount) dlCount.textContent = D.length + ' ARTIFACT' + (D.length === 1 ? '' : 'S') + ' ON THE SHELF';
    var closed = $('#closed-rows');
    if (closed && window.POZIVERSE.CLOSED_MESH) {
      closed.innerHTML = window.POZIVERSE.CLOSED_MESH.map(function (m) {
        return '<div class="closed-row"><div><div class="cr-name">' + esc(m.name) + '</div><div class="cr-status">' + esc(m.statusLine) + '</div></div>' +
          '<span class="asof">PRIVATE BUILD</span></div>';
      }).join('');
    }
    bindTilt($('#downloads-grid'));
  }

  function renderLibrary() {
    if (!$('#featured-artifact') && !$('#lineage-rows')) return;
    var L = window.POZIVERSE.LIBRARY || [];
    var feat = L.find(function (x) { return x.featured; }) || L[0];
    var pane = $('#featured-artifact');
    if (pane && feat) {
      pane.innerHTML =
        '<div class="fa-art"><div class="art-inner ' + feat.art + '"><span class="art-orb o-a"></span><span class="art-dot" style="left:22%;top:58%"></span>' +
        '<span class="art-glyph">' + esc(feat.kind.toUpperCase().slice(0, 2)) + '</span></div></div>' +
        '<div class="fa-body"><span class="kicker">' + esc(feat.kind.toUpperCase()) + ' / LB-001 · ' + esc(feat.version) + ' · ' + esc(feat.license.label) + '</span>' +
        '<h3>' + esc(feat.title) + '</h3><p class="summary">' + esc(feat.summary) + '</p></div>';
      var pp = $('.prompt-pane .pp-body');
      if (pp) pp.textContent = feat.body;
      var dl = $('#lib-download');
      if (dl) dl.setAttribute('href', 'assets/library/' + feat.id + '.md');
      var copyBtn = $('#lib-copy');
      if (copyBtn) copyBtn.addEventListener('click', function () {
        var done = function () {
          copyBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2.5 8.5 3.5 3.5 7.5-8"/></svg> Copied to clipboard';
          setTimeout(function () { copyBtn.textContent = 'Copy prompt'; }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(feat.body).then(done).catch(function () { done(); });
        } else {
          var ta = document.createElement('textarea');
          ta.value = feat.body;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    }
    var grid = $('#library-grid');
    if (grid) {
      var bench = L.filter(function (x) { return !x.featured; });
      var html = bench.map(function (x) {
        var st = x.status === 'in-review' ? 'IN REVIEW' : 'ON THE BENCH';
        return '<div class="bench-card"><span class="b-chip">LB-00' + (L.indexOf(x) + 1) + ' \u00b7 ' + st + '</span><h4>' + esc(x.title) + '</h4><p>' + esc(x.summary) + '</p></div>';
      }).join('');
      html += '<div class="bench-card"><span class="b-chip">NEXT SLOT</span><h4>The rest of the shelf is on the bench</h4><p>Prompts and blueprints earn their place by shipping first on this site. The next candidates are in review.</p></div>';
      grid.innerHTML = html;
    }
    var lineage = $('#lineage-rows');
    if (lineage) {
      lineage.innerHTML = L.map(function (x) {
        return '<tr><td>' + esc(x.title) + '</td><td>' + esc(x.provenance[0] || '') + '</td><td>' + esc((x.provenance[1] || '').replace('TENANT: ', '')) + '</td><td>' + esc((x.provenance[2] || '').replace('REVIEWED: ', '')) + '</td><td>' + esc(x.license.label) + '</td></tr>';
      }).join('');
    }
  }

  function renderNow() {
    var root = $('.now-root');
    if (!root) return;
    var N = window.POZIVERSE.NOW;
    if (!N) return;
    var notes = (N.project.notes || []).map(function (n) {
      return '<div class="nn"><span class="d">' + esc(n.date.slice(5)) + '</span><span>' + esc(n.text) + '</span></div>';
    }).join('');
    var exp = N.experiment ? '<div class="now-panel np-exp reveal" data-v="zoom"><div><span class="np-label">Current experiment</span><h3>' + esc(N.experiment.title) + '</h3><p class="np-why">' + esc(N.experiment.hypothesis) + '</p></div>' +
      '<div><span class="status-chip ' + (N.experiment.status === 'RUNNING' ? 'running' : 'paused') + '">' + (N.experiment.status === 'RUNNING' ? '<span class="pulse-dot"></span>' : '') + esc(N.experiment.status) + '</span>' +
      '<p style="font-family:var(--font-mono);font-size:11.5px;color:var(--faint);margin-top:10px;letter-spacing:0.04em">STACK: ' + esc(N.experiment.stack.join(' + ')) + '</p>' +
      '<p style="margin-top:12px"><a class="hp-link" href="' + esc(N.experiment.link) + '">Field notes <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></a></p></div></div>'
      : '<div class="now-panel np-exp reveal in"><div><span class="np-label">Current experiment</span><p class="np-why">Between experiments - the last one closed in the log.</p></div></div>';
    var prev = (N.archive || []).map(function (a) {
      return '<div class="prev-row"><span class="m">' + esc(a.month.toUpperCase()) + '</span><span>' + esc(a.line) + '</span><span class="r">' + esc(a.receipt || '') + '</span></div>';
    }).join('');
    root.innerHTML =
      '<section class="now-hero"><div class="wrap">' +
      '<span class="kicker"><span class="pulse-dot"></span>NOW / LOG UPDATED ' + esc(N.updated) + '</span>' +
      '<h1>What the <em>mesh</em> is doing right now</h1>' +
      '<p class="deck">A living answer, not a bio. This page changes when the work does. The practice is borrowed from the indie web: one page, current truth.</p>' +
      '<a class="nowref" href="https://nownownow.com/" target="_blank" rel="noopener">WHAT IS A NOW PAGE? EXTERNAL</a>' +
      '</div></section>' +
      '<section class="section" style="padding-top:0"><div class="wrap"><div class="now-stack">' +
      '<div class="now-panel np-project reveal" data-v="left"><span class="np-label">CURRENT PROJECT · SINCE ' + esc(N.project.since) + '</span>' +
      '<h3>' + esc(N.project.title) + '</h3>' +
      '<span class="status-chip running"><span class="pulse-dot"></span>' + esc(N.project.status) + '</span>' +
      '<div class="now-notes">' + notes + '</div></div>' +
      '<div class="now-panel np-read reveal" data-v="right"><span class="np-label">CURRENT READ</span>' +
      '<h3>' + esc(N.read.title) + '</h3>' +
      '<p class="np-why"><strong>' + esc(N.read.author) + '</strong> - ' + esc(N.read.why) + '</p>' +
      (N.read.progress ? '<p style="margin-top:12px;font-family:var(--font-mono);font-size:11.5px;color:var(--faint)">' + esc(N.read.progress) + '</p>' : '') + '</div>' +
      exp +
      '</div>' +
      '<div class="previously reveal"><h3>Previously on the log</h3>' + prev + '</div>' +
      '</div></section>';
  }

  /* ---------- article page ---------- */
  function renderArticle() {
    var root = $('.article-root');
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var a = A.find(function (x) { return x.slug === id; });
    if (!a) {
      root.innerHTML = '<div class="empty-state on" style="display:block;margin:12vh 0"><div class="glyph">?</div><h3>Transmission not found</h3><p>That signal may have been lost in the mesh.</p><p style="margin-top:18px"><a class="btn btn-primary" href="index.html">Return to base</a></p></div>';
      return;
    }
    document.title = a.title.replace(/<[^>]+>/g, '') + ' — From the Poziverse';
    var related = A.filter(function (x) { return x.slug !== a.slug; }).sort(function (x, y) {
      var xc = x.category === a.category ? 0 : 1, yc = y.category === a.category ? 0 : 1;
      return xc - yc || new Date(y.date) - new Date(x.date);
    }).slice(0, 3);

    root.innerHTML =
      '<header class="article-top reveal in">' +
      '<span class="kicker"><span class="pulse-dot"></span>' + esc(a.category) + ' · ' + fmtDate(a.date) + '</span>' +
      '<h1>' + a.title + '</h1>' +
      '<p class="deck">' + esc(a.deck) + '</p>' +
      '<div class="byline"><span class="avatar" aria-hidden="true">EP</span>' +
      '<span class="who"><b>Eric Poziverse</b><span>AI futurist · builder of the mesh</span></span>' +
      '<span class="sep"></span><span>' + a.readTime + ' min read</span>' +
      '<span class="sep"></span><span>From the Poziverse</span></div></header>' +
      '<div class="article-hero-art reveal in" data-v="zoom">' +
      '<div class="art-inner ' + a.art + '">' +
      '<span class="art-orb o-a"></span><span class="art-orb o-b"></span>' +
      '<span class="art-dot" style="left:22%;top:60%"></span>' +
      '<span class="art-glyph">' + (a.glyph || '') + '</span></div>' +
      '<span class="art-caption">' + esc(a.category) + ' · Fig. ' + (a.glyph || '') + ' — generated signature</span></div>' +
      '<div class="article-body">' + a.body + '</div>' +
      '<div class="tag-row">' + a.tags.map(function (t) { return '<span class="chip">#' + esc(t) + '</span>'; }).join('') + '</div>' +
      '<aside class="author-card"><span class="avatar" aria-hidden="true">EP</span>' +
      '<div><div class="role">Author</div><h3>Eric Poziverse</h3>' +
      '<p>Independent AI futurist and builder. Runs the Poziverse mesh — a small fleet of agents, one shared vault, and a local-first software studio. Writes from the edge of the AI frontier.</p></div></aside>' +
      '<section class="related"><h2>Keep <em>reading</em></h2><div class="related-grid">' +
      related.map(function (r) {
        return '<div class="related-card"><div class="rel-art"><div class="art-inner ' + r.art + '">' +
          '<span class="art-orb o-a"></span><span class="art-dot" style="left:24%;top:58%"></span>' +
          '<span class="art-glyph" style="font-size:clamp(60px,8vw,100px)">' + (r.glyph || '') + '</span></div></div>' +
          '<div class="rel-body"><span class="kicker">' + esc(r.category) + '</span>' +
          '<h3>' + r.title + '</h3>' +
          '<div class="meta-line"><span>' + fmtDate(r.date) + '</span><span class="dot"></span><span>' + r.readTime + ' min</span></div></div>' +
          '<a class="rel-link" href="' + href(r.slug) + '" aria-label="' + esc(r.title.replace(/<[^>]+>/g, '')) + '"></a></div>';
      }).join('') +
      '</div></section>';

    // reading progress
    var bar = $('.progress i');
    if (bar) {
      function prog() {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      }
      window.addEventListener('scroll', prog, { passive: true });
      prog();
    }
    bindReveals();
    bindTilt(root);
  }

  /* ---------- init ---------- */
  function init() {
    renderFeatured();
    renderHeroPanel();
    renderBroadcast();
    renderGrid();
    renderClusters();
    renderTicker();
    bindSearch();
    bindNewsletter();
    bindReveals();
    renderWatch();
    renderReplies();
    renderDownloads();
    renderLibrary();
    renderNow();
    renderArticle();
    // footer year
    $$('.foot-year').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
