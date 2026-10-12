(function () {
  'use strict';
  var idx = null, pending = null;
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
  function search(q) {
    var toks = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!toks.length) return [];
    var out = [];
    idx.forEach(function (e) {
      var s = 0;
      for (var i = 0; i < toks.length; i++) {
        var t = toks[i];
        if (e.h.indexOf(t) < 0) return;
        if (e.tl === t) s += 20; else if (e.tl.indexOf(t) === 0) s += 10; else if (e.tl.indexOf(t) >= 0) s += 6; else s += 1;
      }
      out.push([s, e]);
    });
    out.sort(function (a, b) { return b[0] - a[0]; });
    return out.slice(0, 40).map(function (x) { return x[1]; });
  }
  function snippet(t) { return t.length > 150 ? t.slice(0, 147) + '...' : t; }
  function bind(box) {
    var input = box.querySelector('input'), res = box.querySelector('.results'), cur = -1;
    function hide() { res.hidden = true; cur = -1; }
    function show(list) {
      res.textContent = '';
      if (!list.length) {
        var d = document.createElement('div'); d.className = 'empty'; d.textContent = 'No results'; res.appendChild(d);
      }
      list.forEach(function (e) {
        var a = document.createElement('a'); a.className = 'hit'; a.href = e.u;
        var b = document.createElement('b'); b.textContent = e.t;
        var c = document.createElement('span'); c.className = 'cat'; c.textContent = e.c;
        var s = document.createElement('span'); s.className = 'snip'; s.textContent = snippet(e.p);
        a.appendChild(b); a.appendChild(c); a.appendChild(s); res.appendChild(a);
      });
      res.hidden = false; cur = -1;
    }
    function run() {
      var q = input.value.trim();
      if (!q) { hide(); return; }
      load().then(function () { if (input.value.trim() === q) show(search(q)); });
    }
    input.addEventListener('input', run);
    input.addEventListener('focus', function () { load(); if (input.value.trim()) run(); });
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
})();
