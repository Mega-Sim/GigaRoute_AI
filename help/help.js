(function () {
  'use strict';
  var idx = null, pending = null;
  var ko = null, koPending = null;
  var lang = 'en';
  var STORE = 'gr_help_lang';

  function pageKey() {
    var m = location.pathname.match(/([^\/]+?)(?:\.html)?$/);
    return m ? m[1] : '';
  }
  function norm(s) { return (s || '').replace(/\s+/g, ' ').trim(); }

  function loadKo() {
    if (ko) return Promise.resolve(ko);
    if (!koPending) {
      koPending = fetch('/help/ko.json?v=20261013-1').then(function (r) { return r.json(); }).then(function (j) { ko = j; return ko; });
    }
    return koPending;
  }

  /* ---------- search ---------- */
  function load() {
    if (idx) return Promise.resolve(idx);
    if (!pending) {
      pending = fetch('/help/search-index.json').then(function (r) { return r.json(); }).then(function (j) {
        idx = j.entries.map(function (e) {
          e.h = (e.t + ' ' + e.c + ' ' + e.p + ' ' + e.s + ' ' + e.r + ' ' + e.k + ' ' + e.n).toLowerCase();
          e.tl = e.t.toLowerCase();
          return e;
        });
        return idx;
      });
    }
    return pending;
  }
  function entryKey(e) {
    var m = e.u.match(/\/help\/([^#]+?)\.html#(.+)$/);
    return m ? m[1] + '#' + m[2] : '';
  }
  function koOf(e) {
    return lang === 'ko' && ko && ko.entries[entryKey(e)] || null;
  }
  function search(q) {
    var toks = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!toks.length) return [];
    var out = [];
    idx.forEach(function (e) {
      var s = 0;
      var k = koOf(e);
      var h = k ? e.h + ' ' + (k.p + ' ' + (k.n || '')).toLowerCase() : e.h;
      for (var i = 0; i < toks.length; i++) {
        var t = toks[i];
        if (h.indexOf(t) < 0) return;
        if (e.tl === t) s += 20; else if (e.tl.indexOf(t) === 0) s += 10; else if (e.tl.indexOf(t) >= 0) s += 6; else s += 1;
      }
      out.push([s, e]);
    });
    out.sort(function (a, b) { return b[0] - a[0]; });
    return out.slice(0, 40).map(function (x) { return x[1]; });
  }
  function snippet(t) { return t.length > 150 ? t.slice(0, 147) + '...' : t; }
  function uiText(s) { return lang === 'ko' && ko && ko.ui[s] || s; }
  function bind(box) {
    var input = box.querySelector('input'), res = box.querySelector('.results'), cur = -1;
    function hide() { res.hidden = true; cur = -1; }
    function show(list) {
      res.textContent = '';
      if (!list.length) {
        var d = document.createElement('div'); d.className = 'empty'; d.textContent = uiText('No results'); res.appendChild(d);
      }
      list.forEach(function (e) {
        var k = koOf(e);
        var a = document.createElement('a'); a.className = 'hit'; a.href = e.u;
        var b = document.createElement('b'); b.textContent = e.t;
        var c = document.createElement('span'); c.className = 'cat'; c.textContent = uiText(e.c);
        var s = document.createElement('span'); s.className = 'snip'; s.textContent = snippet(k ? k.p : e.p);
        a.appendChild(b); a.appendChild(c); a.appendChild(s); res.appendChild(a);
      });
      res.hidden = false; cur = -1;
    }
    function run() {
      var q = input.value.trim();
      if (!q) { hide(); return; }
      load().then(function () { if (input.value.trim() === q) show(search(q)); });
    }
    box._rerun = run;
    input.addEventListener('input', run);
    input.addEventListener('focus', function () { load(); if (lang === 'ko') loadKo(); if (input.value.trim()) run(); });
    input.addEventListener('keydown', function (ev) {
      var hits = res.querySelectorAll('.hit');
      if (ev.key === 'Escape') { hide(); input.blur(); return; }
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        if (!hits.length) return;
        ev.preventDefault();
        cur = (cur + (ev.key === 'ArrowDown' ? 1 : -1) + hits.length) % hits.length;
        hits.forEach(function (h, i) { h.classList.toggle('on', i === cur); });
        hits[cur].scrollIntoView({ block: 'nearest' });
      }
      if (ev.key === 'Enter' && hits.length) { ev.preventDefault(); (hits[cur >= 0 ? cur : 0]).click(); }
    });
    document.addEventListener('click', function (ev) { if (!box.contains(ev.target)) hide(); });
  }
  document.querySelectorAll('.searchbox').forEach(bind);
  document.addEventListener('keydown', function (ev) {
    var t = ev.target && ev.target.tagName;
    if (ev.key === '/' && t !== 'INPUT' && t !== 'TEXTAREA') {
      var i = document.querySelector('.searchbox input');
      if (i) { ev.preventDefault(); i.focus(); }
    }
  });

  /* ---------- language (en / ko) ---------- */
  function setHtml(el, html) {
    if (!('enHtml' in el.dataset)) el.dataset.enHtml = el.innerHTML;
    el.innerHTML = html;
  }
  function setText(el, text) {
    if (!('enHtml' in el.dataset)) el.dataset.enHtml = el.innerHTML;
    el.textContent = text;
  }
  function leadKo(t) {
    var m = t.match(/^(\d+) entries, for example: (.+?)(?:, and more)?\. Text is generated from the Help window of GigaRoute Simulation Studio\.$/);
    if (!m) return null;
    var more = /, and more\. Text is/.test(t) ? ' 등' : '';
    return m[1] + '개 항목 (예: ' + m[2] + more + '). 텍스트는 GigaRoute Simulation Studio의 Help 창에서 생성되었습니다.';
  }
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  function toKo() {
    var u = ko.ui, page = pageKey();
    // 항목 본문: Purpose / Notes만 한국어 (Syntax / Example / Related는 원문 유지)
    document.querySelectorAll('article.topic').forEach(function (a) {
      var e = ko.entries[page + '#' + a.id];
      if (!e) return;
      a.querySelectorAll('dl > dt').forEach(function (dt) {
        var label = norm(dt.textContent), dd = dt.nextElementSibling;
        if (label === 'Purpose') {
          setText(dt, u['Purpose']); setText(dd, e.p);
        } else if (label === 'Notes' && e.n) {
          setText(dt, u['Notes']); setText(dd, e.n);
        }
      });
    });
    // 일반 UI 텍스트
    document.querySelectorAll('h1, h2, .sub, .card b, .links a, main li, main p, .note').forEach(function (el) {
      if (el.closest('article.topic') || el.closest('noscript')) return;
      var t = norm(el.textContent);
      if (el.classList.contains('lead')) { var l = u[t] || leadKo(t); if (l) setText(el, l); return; }
      if (el.classList.contains('crumbs')) return;
      if (u[t]) setHtml(el, u[t]);
    });
    document.querySelectorAll('.card span').forEach(function (el) {
      var t = norm(el.textContent), m = t.match(/^(\d+) entries$/);
      if (m) setText(el, m[1] + '개 항목'); else if (u[t]) setText(el, u[t]);
    });
    document.querySelectorAll('.crumbs').forEach(function (el) {
      var last = el.lastChild;
      if (!last || last.nodeType !== 3) return;
      var t = norm(last.nodeValue).replace(/^\/\s*/, '');
      if (!u[t]) return;
      if (!('enHtml' in el.dataset)) el.dataset.enHtml = el.innerHTML;
      last.nodeValue = ' / ' + u[t];
    });
    document.querySelectorAll('.searchbox input').forEach(function (i) {
      if (!('enPh' in i.dataset)) i.dataset.enPh = i.placeholder;
      i.placeholder = u[i.dataset.enPh] || i.placeholder;
    });
    if (!document.documentElement.dataset.enTitle) document.documentElement.dataset.enTitle = document.title;
    var tm = document.documentElement.dataset.enTitle.match(/^(.*) \| GigaRoute AI Help$/);
    if (tm && u[tm[1]]) document.title = u[tm[1]] + ' | GigaRoute AI Help';
  }
  function toEn() {
    document.querySelectorAll('[data-en-html]').forEach(function (el) {
      el.innerHTML = el.dataset.enHtml; delete el.dataset.enHtml;
    });
    document.querySelectorAll('.searchbox input[data-en-ph]').forEach(function (i) {
      i.placeholder = i.dataset.enPh; delete i.dataset.enPh;
    });
    if (document.documentElement.dataset.enTitle) {
      document.title = document.documentElement.dataset.enTitle; delete document.documentElement.dataset.enTitle;
    }
  }
  function applyLang(l, save) {
    var p = l === 'ko' ? loadKo() : Promise.resolve(null);
    p.then(function () {
      toEn();
      lang = l;
      document.documentElement.lang = l;
      if (l === 'ko') toKo();
      document.querySelectorAll('.langsw button').forEach(function (b) {
        b.setAttribute('aria-pressed', b.dataset.lang === l ? 'true' : 'false');
      });
      document.querySelectorAll('.searchbox').forEach(function (b) { if (b._rerun) b._rerun(); });
      if (save) { try { localStorage.setItem(STORE, l); } catch (e) { /* 저장 불가 환경 */ } }
    });
  }
  function buildSwitch() {
    var navr = document.querySelector('.navr');
    if (!navr) return;
    var sw = document.createElement('div');
    sw.className = 'langsw'; sw.setAttribute('role', 'group'); sw.setAttribute('aria-label', 'Language / 언어');
    [['en', 'EN'], ['ko', '한국어']].forEach(function (x) {
      var b = document.createElement('button');
      b.type = 'button'; b.dataset.lang = x[0]; b.textContent = x[1];
      b.setAttribute('aria-pressed', x[0] === 'en' ? 'true' : 'false');
      b.addEventListener('click', function () { applyLang(x[0], true); });
      sw.appendChild(b);
    });
    var links = navr.querySelector('.links');
    if (links && links.nextSibling) navr.insertBefore(sw, links.nextSibling); else navr.appendChild(sw);
  }
  function initialLang() {
    var q = location.search.match(/[?&]lang=(en|ko)\b/);
    if (q) return [q[1], true];
    try { var s = localStorage.getItem(STORE); if (s === 'en' || s === 'ko') return [s, false]; } catch (e) { /* 무시 */ }
    return [/^ko\b/i.test(navigator.language || '') ? 'ko' : 'en', false];
  }
  buildSwitch();
  var init = initialLang();
  if (init[0] === 'ko') applyLang('ko', init[1]);
})();
