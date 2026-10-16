/* 하위 페이지 공통 상단 메뉴. 새 페이지는 <header data-site-nav></header> 와 이 스크립트(+site-nav.css)만 넣으면 됩니다. */
(function () {
  var header = document.querySelector('header[data-site-nav]');
  if (!header) return;
  var lang = document.documentElement.lang || 'en';
  var T = {
    ko: { home: '/', hist: '/history/', yt: '/youtube/', help: '도움말', homeLabel: '홈' },
    en: { home: '/index-en.html', hist: '/history/index-en.html', yt: '/youtube/index-en.html', help: 'Help', homeLabel: 'Home' },
    es: { home: '/index-es.html', hist: '/history/index-es.html', yt: '/youtube/index-en.html', help: 'Ayuda', homeLabel: 'Inicio' },
    ja: { home: '/index-ja.html', hist: '/history/index-ja.html', yt: '/youtube/index-en.html', help: 'ヘルプ', homeLabel: 'ホーム' },
    'zh-CN': { home: '/index-zh.html', hist: '/history/index-zh.html', yt: '/youtube/index-en.html', help: '帮助', homeLabel: '首页' }
  };
  var t = T[lang] || T.en;
  var home = header.getAttribute('data-site-nav-home') || t.home;
  var path = location.pathname;
  var cur = path.indexOf('/history/') === 0 ? 'history' : path.indexOf('/youtube/') === 0 ? 'youtube' : path.indexOf('/help/') === 0 ? 'help' : '';
  var search = header.querySelector('.searchbox');
  function link(key, href, label) {
    return '<a href="' + href + '"' + (cur === key ? ' aria-current="page"' : '') + '>' + label + '</a>';
  }
  header.innerHTML = '<div class="wrap"><nav>' +
    '<a class="brand" href="' + home + '"><span class="mark">GR</span>GigaRoute AI</a>' +
    '<div class="links">' + link('history', t.hist, 'History') + link('youtube', t.yt, 'YouTube') + link('help', '/help/', t.help) + '</div>' +
    '<div class="nav-right"><a class="nav-home" href="' + home + '">' + t.homeLabel + '</a></div></nav></div>';
  if (search) header.querySelector('.nav-right').insertAdjacentElement('afterbegin', search);
})();
