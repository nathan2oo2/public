/* Shared nav bar + side panel. Add <script src="shell.js"></script> at the end of <body>, after <main class="sx-main" id="sx-main">. */

(function () {
  var CSS="\n  .sx-shell {\n    --sx-bg: #1c1a17;\n    --sx-surface: #25221e;\n    --sx-line: #38342e;\n    --sx-text: #ece6dc;\n    --sx-muted: #a39a8c;\n    --sx-accent: #a8b88f;\n    --sx-hover: rgba(236, 230, 220, .07);\n    --sx-nav-h: 56px;\n    --sx-panel-w: 252px;   /* width of the panel itself */\n    --sx-side-w: 252px;    /* space the page reserves for it (0 when hidden) */\n    font-family: system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif;\n    color: var(--sx-text);\n  }\n  @media (prefers-color-scheme: light) {\n    .sx-shell {\n      --sx-bg: #f6f3ee;\n      --sx-surface: #ebe6dd;\n      --sx-line: #d9d2c5;\n      --sx-text: #2b2722;\n      --sx-muted: #766e61;\n      --sx-accent: #5b7345;\n      --sx-hover: rgba(43, 39, 34, .07);\n    }\n  }\n  .sx-shell *, .sx-shell *::before, .sx-shell *::after { box-sizing: border-box; }\n  .sx-shell button, .sx-shell input { font: inherit; color: inherit; }\n  .sx-shell a { color: inherit; text-decoration: none; }\n  .sx-shell svg { width: 24px; height: 24px; fill: currentColor; flex: none; }\n  .sx-shell :focus-visible { outline: 2px solid var(--sx-accent); outline-offset: 2px; }\n\n  /* ---------- top bar: [ left | centered search | right ] ---------- */\n  .sx-nav {\n    position: fixed; inset: 0 0 auto 0; height: var(--sx-nav-h); z-index: 30;\n    display: grid; grid-template-columns: 1fr minmax(0, 640px) 1fr; align-items: center; gap: 12px;\n    padding: 0 12px; background: var(--sx-bg); border-bottom: 1px solid var(--sx-line);\n  }\n  .sx-left  { display: flex; align-items: center; gap: 4px; justify-self: start; }\n  .sx-right { display: flex; align-items: center; gap: 2px; justify-self: end; }\n\n  .sx-icon-btn {\n    width: 40px; height: 40px; border: 0; border-radius: 50%; background: none;\n    display: grid; place-items: center; cursor: pointer; color: var(--sx-muted);\n  }\n  .sx-icon-btn:hover { background: var(--sx-hover); color: var(--sx-text); }\n\n  .sx-logo { font-weight: 700; font-size: 1.2rem; letter-spacing: .01em; padding: 0 6px; white-space: nowrap; }\n\n  .sx-search {\n    display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px; margin: 0;\n    background: var(--sx-surface); border: 1px solid var(--sx-line); border-radius: 999px;\n    color: var(--sx-muted);\n  }\n  .sx-search:focus-within { border-color: var(--sx-accent); color: var(--sx-text); }\n  .sx-search svg { width: 20px; height: 20px; }\n  .sx-search input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; }\n  .sx-search input::placeholder { color: var(--sx-muted); }\n\n  /* ---------- side panel ---------- */\n  .sx-side {\n    position: fixed; top: var(--sx-nav-h); bottom: 0; left: 0; width: var(--sx-panel-w); z-index: 20;\n    background: var(--sx-bg); border-right: 1px solid var(--sx-line);\n    padding: 12px; overflow: hidden auto;\n    transition: width .2s ease, transform .2s ease;\n  }\n  .sx-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }\n  .sx-item {\n    display: flex; align-items: center; gap: 14px; height: 44px; padding: 0 12px;\n    border-radius: 10px; color: var(--sx-text); white-space: nowrap;\n  }\n  .sx-item:hover { background: var(--sx-hover); }\n  .sx-item.sx-active { background: var(--sx-hover); color: var(--sx-accent); }\n  .sx-item svg { color: var(--sx-muted); }\n  .sx-item.sx-active svg { color: var(--sx-accent); }\n  .sx-count { margin-left: auto; font-variant-numeric: tabular-nums; color: var(--sx-muted); font-size: .9rem; }\n\n  .sx-scrim { display: none; }\n\n  /* ---------- page area (your content goes inside <main class=\"sx-main\">) ---------- */\n  .sx-main {\n    padding: calc(var(--sx-nav-h) + 24px) 24px 24px calc(var(--sx-side-w) + 24px); min-height: 100vh;\n    transition: padding-left .2s ease;\n  }\n\n  /* ---------- desktop: panel cycles full \u2192 icons \u2192 hidden ---------- */\n  @media (min-width: 769px) {\n    .sx-shell[data-mode=\"icons\"]  { --sx-panel-w: 68px; --sx-side-w: 68px; }\n    .sx-shell[data-mode=\"hidden\"] { --sx-side-w: 0px; }\n    .sx-shell[data-mode=\"hidden\"] .sx-side { transform: translateX(-100%); }\n\n    .sx-shell[data-mode=\"icons\"] .sx-item { justify-content: center; padding: 0; }\n    .sx-shell[data-mode=\"icons\"] .sx-label,\n    .sx-shell[data-mode=\"icons\"] .sx-count { display: none; }\n  }\n\n  /* ---------- mobile: panel hidden, opens from the menu button, closes on any tap ---------- */\n  @media (max-width: 768px) {\n    .sx-nav { grid-template-columns: auto minmax(0, 1fr) auto; gap: 8px; }\n    .sx-shell { --sx-side-w: 0px; }\n    .sx-side { transform: translateX(-100%); }\n    .sx-shell.sx-open .sx-side { transform: none; box-shadow: 8px 0 24px rgba(0,0,0,.35); }\n    .sx-shell.sx-open .sx-scrim {\n      display: block; position: fixed; inset: var(--sx-nav-h) 0 0 0; z-index: 10; background: rgba(0,0,0,.45);\n    }\n    .sx-main { padding-left: 16px; padding-right: 16px; }\n  }\n  @media (max-width: 560px) { .sx-hide-sm { display: none; } }\n  @media (max-width: 420px) { .sx-logo { font-size: 1.05rem; } }\n  @media (prefers-reduced-motion: reduce) { .sx-side, .sx-main { transition: none; } }\n\n.sx-shell{background:var(--sx-bg)}\n.sx-shell[data-theme=\"dark\"]{--sx-bg:#1c1a17;--sx-surface:#25221e;--sx-line:#38342e;--sx-text:#ece6dc;--sx-muted:#a39a8c;--sx-accent:#a8b88f;--sx-hover:rgba(236,230,220,.07)}\n.sx-shell[data-theme=\"light\"]{--sx-bg:#f6f3ee;--sx-surface:#ebe6dd;--sx-line:#d9d2c5;--sx-text:#2b2722;--sx-muted:#766e61;--sx-accent:#5b7345;--sx-hover:rgba(43,39,34,.07)}\n\nbutton.sx-item{width:100%;border:0;background:none;cursor:pointer;text-align:left;font:inherit}\n.sx-chev{width:20px;height:20px;margin-left:auto;transition:transform .2s}\n.sx-setbtn[aria-expanded=\"true\"] .sx-chev{transform:rotate(180deg)}\n.sx-setpanel{padding:4px 4px 8px 12px;display:grid;gap:2px}\n.sx-setpanel[hidden]{display:none}\n.sx-row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:40px;padding:0 8px;border-radius:10px;font-size:.92rem;cursor:pointer}\n.sx-row:hover{background:var(--sx-hover)}\n.sx-row.sx-mob{display:none}\n.sx-sw{appearance:none;-webkit-appearance:none;width:36px;height:20px;border-radius:10px;background:var(--sx-line);position:relative;cursor:pointer;flex:none;margin:0;transition:background .15s}\n.sx-sw::after{content:\"\";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--sx-text);transition:transform .15s}\n.sx-sw:checked{background:var(--sx-accent)}\n.sx-sw:checked::after{transform:translateX(16px);background:var(--sx-bg)}\n@media (max-width:768px){.sx-row.sx-mob{display:flex}}\n@media (min-width:769px){.sx-shell[data-mode=\"icons\"] .sx-chev,.sx-shell[data-mode=\"icons\"] .sx-setpanel{display:none}}\n";
  var HTML="<header class=\"sx-nav\">\n    <div class=\"sx-left\">\n      <button class=\"sx-icon-btn\" id=\"sx-burger\" aria-label=\"Toggle side panel\" aria-controls=\"sx-side\" aria-expanded=\"true\">\n        <svg viewBox=\"0 0 24 24\"><path d=\"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z\"/></svg>\n      </button>\n      <a class=\"sx-logo\" href=\"index.html\" id=\"sx-logo\">YourLogo</a>\n    </div>\n\n    <form class=\"sx-search\" id=\"sx-search\" role=\"search\">\n      <svg viewBox=\"0 0 24 24\"><path d=\"M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/></svg>\n      <input type=\"search\" name=\"q\" placeholder=\"Search\" aria-label=\"Search\" autocomplete=\"off\">\n    </form>\n\n    <div class=\"sx-right\">\n      <button class=\"sx-icon-btn sx-hide-sm\" data-action=\"apps\" aria-label=\"Apps\">\n        <svg viewBox=\"0 0 24 24\"><g><circle cx=\"5\" cy=\"5\" r=\"2\"/><circle cx=\"12\" cy=\"5\" r=\"2\"/><circle cx=\"19\" cy=\"5\" r=\"2\"/><circle cx=\"5\" cy=\"12\" r=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><circle cx=\"19\" cy=\"12\" r=\"2\"/><circle cx=\"5\" cy=\"19\" r=\"2\"/><circle cx=\"12\" cy=\"19\" r=\"2\"/><circle cx=\"19\" cy=\"19\" r=\"2\"/></g></svg>\n      </button>\n      <button class=\"sx-icon-btn\" data-action=\"account\" aria-label=\"Account\">\n        <svg viewBox=\"0 0 24 24\"><path d=\"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\"/></svg>\n      </button>\n    </div>\n  </header>\n\n  <aside class=\"sx-side\" id=\"sx-side\" aria-label=\"Menu\">\n    <ul class=\"sx-list\">\n      <li><a class=\"sx-item\" href=\"index.html\" data-nav=\"songbook\" title=\"Songbook\">\n        <svg viewBox=\"0 0 24 24\"><path d=\"M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z\"/></svg>\n        <span class=\"sx-label\">Songbook</span></a></li>\n      <li><a class=\"sx-item\" href=\"index.html?view=saved\" data-nav=\"saved\" title=\"Saved\">\n        <svg viewBox=\"0 0 24 24\"><path d=\"M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z\"/></svg>\n        <span class=\"sx-label\">Saved</span><span class=\"sx-count\" id=\"sx-saved\">0</span></a></li>\n      <li><a class=\"sx-item\" href=\"#playlists\" data-nav=\"playlists\" title=\"Playlists\">\n        <svg viewBox=\"0 0 24 24\"><path d=\"M3 10h11v2H3zm0-4h11v2H3zm0 8h7v2H3zm13-1v8l6-4z\"/></svg>\n        <span class=\"sx-label\">Playlists</span><span class=\"sx-count\" id=\"sx-playlists\">0</span></a></li>\n      <li><a class=\"sx-item\" href=\"#tools\" data-nav=\"tools\" title=\"Tools\">\n        <svg viewBox=\"0 0 24 24\"><path d=\"M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z\"/></svg>\n        <span class=\"sx-label\">Tools</span></a></li>\n      <li><a class=\"sx-item\" href=\"#about\" data-nav=\"about\" title=\"About\">\n        <svg viewBox=\"0 0 24 24\"><path d=\"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/></svg>\n        <span class=\"sx-label\">About</span></a></li>\n    <li><button class=\"sx-item sx-setbtn\" id=\"sx-setbtn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"sx-setpanel\" title=\"Settings\"><svg viewBox=\"0 0 24 24\"><path d=\"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z\"/></svg><span class=\"sx-label\">Settings</span><svg class=\"sx-chev\" viewBox=\"0 0 24 24\"><path d=\"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z\"/></svg></button><div class=\"sx-setpanel\" id=\"sx-setpanel\" hidden></div></li>\n    </ul>\n  </aside>\n\n  <div class=\"sx-scrim\" id=\"sx-scrim\"></div>\n\n  ";
  var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);
  var shell0=document.createElement('div'); shell0.className='sx-shell'; shell0.id='sx-shell'; shell0.dataset.mode='full'; shell0.innerHTML=HTML;
  var main0=document.getElementById('sx-main'); main0.parentNode.insertBefore(shell0,main0); shell0.appendChild(main0);

  var shell  = document.getElementById('sx-shell');
  var burger = document.getElementById('sx-burger');
  var scrim  = document.getElementById('sx-scrim');
  var side   = document.getElementById('sx-side');
  var mobile = window.matchMedia('(max-width: 768px)');
  var MODES  = ['full', 'icons', 'hidden'];
  var KEY    = 'sx-panel-mode';

  function emit(name, detail) {
    shell.dispatchEvent(new CustomEvent(name, { detail: detail, bubbles: true }));
  }

  /* ---- desktop: full → icons → hidden ---- */
  function setMode(mode, save) {
    if (MODES.indexOf(mode) < 0) mode = 'full';
    shell.dataset.mode = mode;
    if (!mobile.matches) {
      burger.setAttribute('aria-expanded', mode !== 'hidden');
      burger.title = 'Panel: ' + mode;
    }
    if (save) { try { localStorage.setItem(KEY, mode); } catch (e) {} }
    emit('sx:mode', { mode: mode });
  }

  /* ---- mobile: drawer ---- */
  function setOpen(open) {
    shell.classList.toggle('sx-open', open);
    if (mobile.matches) {
      burger.setAttribute('aria-expanded', open);
      burger.title = open ? 'Close menu' : 'Open menu';
    }
  }

  burger.addEventListener('click', function () {
    if (mobile.matches) {
      setOpen(!shell.classList.contains('sx-open'));
    } else {
      setMode(MODES[(MODES.indexOf(shell.dataset.mode) + 1) % MODES.length], true);
    }
  });
  scrim.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  mobile.addEventListener('change', function () {
    setOpen(false);
    burger.setAttribute('aria-expanded', mobile.matches ? 'false' : shell.dataset.mode !== 'hidden');
  });

  /* ---- side panel links (tapping one closes the drawer on mobile) ---- */
  side.addEventListener('click', function (e) {
    var a = e.target.closest('[data-nav]');
    if (!a) return;
    side.querySelectorAll('.sx-active').forEach(function (n) { n.classList.remove('sx-active'); });
    a.classList.add('sx-active');
    emit('sx:nav', { page: a.dataset.nav });
    setOpen(false);
  });

  /* ---- nav bar buttons + search ---- */
  shell.querySelectorAll('[data-action]').forEach(function (b) {
    b.addEventListener('click', function () { emit('sx:action', { action: b.dataset.action }); });
  });
  document.getElementById('sx-search').addEventListener('submit', function (e) {
    e.preventDefault();
    emit('sx:search', { query: this.q.value.trim() });
  });

  /* ---- start state ---- */
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  setMode(saved || 'full', false);
  burger.setAttribute('aria-expanded', mobile.matches ? 'false' : shell.dataset.mode !== 'hidden');

  /* ---- public API: set your own values from any script ---- */
  window.SiteShell = {
    setLogo:  function (text) { document.getElementById('sx-logo').textContent = text; },
    setStats: function (s) {
      if (s.saved     != null) document.getElementById('sx-saved').textContent     = s.saved;
      if (s.playlists != null) document.getElementById('sx-playlists').textContent = s.playlists;
    },
    setMode:  function (m) { setMode(m, true); },   // 'full' | 'icons' | 'hidden' (desktop)
    open:  function () { setOpen(true); },          // mobile drawer
    close: function () { setOpen(false); },
    el: shell
  };

  
  function refresh(){ var n=0; try{n=JSON.parse(localStorage.getItem('sb-saved')||'[]').length}catch(e){} SiteShell.setStats({saved:n,playlists:0}); }
  SiteShell.refresh = refresh; refresh();
  function applyTheme(t){ if(t) shell.dataset.theme=t; else delete shell.dataset.theme; }
  var th=null; try{th=localStorage.getItem('sb-theme')}catch(e){} applyTheme(th);
  SiteShell.toggleTheme = function(){
    var c=shell.dataset.theme||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
    var n=c==='dark'?'light':'dark'; applyTheme(n); try{localStorage.setItem('sb-theme',n)}catch(e){} return n;
  };
  var cur=document.body.dataset.nav; if(cur==='songbook'&&/view=saved/.test(location.search)) cur='saved';
  var el=cur&&shell.querySelector('[data-nav="'+cur+'"]'); if(el) el.classList.add('sx-active');

  /* ---- Settings (side panel): dark mode here, pages add their own with SiteShell.addSetting ---- */
  var setBtn = document.getElementById('sx-setbtn'), setPanel = document.getElementById('sx-setpanel');
  function openSettings(open) { setBtn.setAttribute('aria-expanded', open); setPanel.hidden = !open; }
  setBtn.addEventListener('click', function () {
    if (!mobile.matches && shell.dataset.mode === 'icons') { setMode('full', true); openSettings(true); return; }
    openSettings(setPanel.hidden);
  });
  function addRow(label, checked, onChange, cls) {
    var l = document.createElement('label'); l.className = 'sx-row' + (cls ? ' ' + cls : '');
    l.innerHTML = '<span></span><input type="checkbox" class="sx-sw">';
    l.firstChild.textContent = label;
    var i = l.querySelector('input'); i.checked = !!checked;
    i.addEventListener('change', function () { onChange(i.checked); });
    setPanel.appendChild(l);
  }
  function effTheme() { return shell.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); }
  addRow('Dark mode', effTheme() === 'dark', function (v) {
    var n = v ? 'dark' : 'light'; applyTheme(n); try { localStorage.setItem('sb-theme', n); } catch (e) {}
  });
  /* o = { id, label, def, on(value), mobile } : adds an on/off switch, remembers it, calls on() now and on every change */
  SiteShell.addSetting = function (o) {
    var key = 'sb-set-' + o.id, v = !!o.def;
    try { var raw = localStorage.getItem(key); if (raw !== null) v = raw === '1'; } catch (e) {}
    addRow(o.label, v, function (x) { try { localStorage.setItem(key, x ? '1' : '0'); } catch (e) {} o.on(x); }, o.mobile ? 'sx-mob' : '');
    o.on(v);
  };
})();
