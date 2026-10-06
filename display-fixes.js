(() => {
  const impactCopy = {
    ko: {
      titleLines: ['8.0GB RAM 사무용 노트북 하나로', '1,100대 AMHS를 21.6배속 시뮬레이션.'],
      eyebrow: '8.0GB OFFICE LAPTOP BENCHMARK',
      context: '11th Gen Intel Core i5-1130G7 · 8.0GB RAM · 내장 GPU · Windows x64',
      metrics: [
        ['21.6초', '실제 1.0초 동안 진행되는 시뮬레이션 시간'],
        ['약 101.9 Job/s', '실제 실행시간 기준 평균 완료 Job'],
        ['2.8분', '1.0시간 시뮬레이션 완료 시간']
      ],
      note: '101.9 Job/s는 공개 표기값 17,018.0건과 167.0초를 기준으로 한 파생 지표입니다. 원시 실측값은 저장소 문서에 보존하며, 엔진 내부 이벤트 처리량(events/s)을 의미하지 않습니다.'
    },
    en: {
      titleLines: ['One 8.0 GB RAM office laptop.', '1,100 AMHS vehicles at 21.6× simulation speed.'],
      eyebrow: '8.0 GB OFFICE LAPTOP BENCHMARK',
      context: '11th Gen Intel Core i5-1130G7 · 8.0 GB RAM · integrated GPU · Windows x64',
      metrics: [
        ['21.6 sec', 'Simulated time advanced per 1.0 real second'],
        ['~101.9 jobs/s', 'Average completed jobs per real execution second'],
        ['2.8 min', 'Wall time for a 1.0-hour simulation']
      ],
      note: '101.9 jobs/s is derived from the public display values of 17,018.0 completed jobs and 167.0 seconds. Raw measurements remain documented in the repository. This is not an internal engine events/s measurement.'
    },
    'zh-CN': {
      titleLines: ['仅用一台 8.0 GB RAM 办公笔记本电脑', '即可对 1,100 台 AMHS 进行 21.6× 倍速仿真。'],
      eyebrow: '8.0 GB 办公笔记本实测',
      context: '11th Gen Intel Core i5-1130G7 · 8.0 GB RAM · 集成显卡 · Windows x64',
      metrics: [
        ['21.6 秒', '每 1.0 秒实际时间推进的仿真时间'],
        ['约 101.9 Job/s', '按实际执行时间计算的平均完成 Job'],
        ['2.8 分钟', '完成 1.0 小时仿真的实际用时']
      ],
      note: '101.9 Job/s基于公开显示值17,018.0个已完成Job和167.0秒计算。原始实测值保留在仓库文档中；该数值不是引擎内部events/s指标。'
    },
    es: {
      titleLines: ['Un portátil de oficina con 8,0 GB de RAM.', '1.100 AMHS a una velocidad de simulación de 21,6×.'],
      eyebrow: 'BENCHMARK EN PORTÁTIL DE OFICINA DE 8,0 GB',
      context: '11th Gen Intel Core i5-1130G7 · 8,0 GB RAM · GPU integrada · Windows x64',
      metrics: [
        ['21,6 s', 'Tiempo simulado avanzado por cada 1,0 segundo real'],
        ['~101,9 Jobs/s', 'Jobs completados de media por segundo real de ejecución'],
        ['2,8 min', 'Tiempo real para simular 1,0 hora']
      ],
      note: '101,9 Jobs/s se deriva de los valores públicos mostrados: 17.018,0 Jobs completados y 167,0 s. Las mediciones originales permanecen documentadas en el repositorio. No representa eventos internos del motor por segundo.'
    },
    ja: {
      titleLines: ['8.0 GB RAM搭載の事務用ノートPC 1台で', '1,100台のAMHSを21.6倍速シミュレーション。'],
      eyebrow: '8.0 GB 事務用ノートPC 実測',
      context: '11th Gen Intel Core i5-1130G7 · 8.0 GB RAM · 内蔵GPU · Windows x64',
      metrics: [
        ['21.6秒', '実時間1.0秒で進むシミュレーション時間'],
        ['約101.9 Job/s', '実行時間基準の平均完了Job'],
        ['2.8分', '1.0時間シミュレーションの実行時間']
      ],
      note: '101.9 Job/sは公開表示値17,018.0件と167.0秒を基準にした派生値です。原始実測値はリポジトリ文書に保持し、エンジン内部のevents/s測定値ではありません。'
    }
  };

  const compareCopy = {
    'ko': {title: '시뮬레이션 속도 비교', sub: 'AutoMod 대비 · 1시간 시뮬레이션 Run 시 실제 소요 시간', c1: '반도체 OHT 500대 · 8,000 Job/hr', c2: '반도체 OHT 1,100대 · 18,000 Job/hr', a: 'AutoMod', g: 'GigaRoute AI', unit: '초', fail: '실행 불가', na: '측정 불가', cut: '소요 시간 96.5% 단축', note: '* 사내 비교 측정 자료 기준이며 AutoMod 1,100대 조건은 실행되지 않아 측정하지 못했습니다.'},
    'en': {title: 'Simulation Speed Comparison', sub: 'vs. AutoMod · actual wall time for a 1-hour simulation run', c1: 'Semiconductor OHT 500 vehicles · 8,000 jobs/hr', c2: 'Semiconductor OHT 1,100 vehicles · 18,000 jobs/hr', a: 'AutoMod', g: 'GigaRoute AI', unit: 'sec', fail: 'Could not run', na: 'Not measurable', cut: '96.5% less run time', note: '* Based on internal comparison measurements. The 1,100-vehicle case could not be run in AutoMod, so no value was measured.'},
    'zh-CN': {title: '仿真速度对比', sub: '对比 AutoMod · 运行1小时仿真的实际耗时', c1: '半导体 OHT 500台 · 8,000 Job/hr', c2: '半导体 OHT 1,100台 · 18,000 Job/hr', a: 'AutoMod', g: 'GigaRoute AI', unit: '秒', fail: '无法运行', na: '无法测量', cut: '耗时减少 96.5%', note: '* 基于内部对比测量数据。AutoMod 在 1,100 台条件下无法运行,因此未取得测量值。'},
    'es': {title: 'Comparación de velocidad de simulación', sub: 'Frente a AutoMod · tiempo real de una simulación de 1 hora', c1: 'OHT de semiconductores, 500 vehículos · 8.000 Jobs/h', c2: 'OHT de semiconductores, 1.100 vehículos · 18.000 Jobs/h', a: 'AutoMod', g: 'GigaRoute AI', unit: 's', fail: 'No se pudo ejecutar', na: 'No medible', cut: '96,5 % menos de tiempo', note: '* Basado en mediciones comparativas internas. El caso de 1.100 vehículos no pudo ejecutarse en AutoMod, por lo que no hay valor medido.'},
    'ja': {title: 'シミュレーション速度比較', sub: 'AutoMod 比 · 1時間シミュレーション実行の実所要時間', c1: '半導体 OHT 500台 · 8,000 Job/hr', c2: '半導体 OHT 1,100台 · 18,000 Job/hr', a: 'AutoMod', g: 'GigaRoute AI', unit: '秒', fail: '実行不可', na: '測定不可', cut: '所要時間 96.5% 短縮', note: '* 社内比較測定に基づきます。AutoMod は 1,100台条件を実行できず、測定値がありません。'},
  };

  const buildCompare = (c) => {
    const bar = (cls, h, val, label, inner = '') => `
      <div class="pc-col ${cls}">
        <div class="pc-val">${val}</div>
        <div class="pc-bar" style="--h:${h}">${inner}</div>
        <div class="pc-label">${label}</div>
      </div>`;
    const axis = '<div class="pc-grid" aria-hidden="true"><i></i><i></i><i></i><i></i></div>';
    return `
      <div class="performance-compare">
        <div class="pc-head"><h3>${c.title}</h3><p>${c.sub}</p></div>
        <div class="pc-charts">
          <figure class="pc-card" aria-label="${c.c1}">
            <figcaption>${c.c1}</figcaption>
            <div class="pc-plot">${axis}
              ${bar('is-old', 100, `2,854<small>${c.unit}</small>`, c.a)}
              ${bar('is-new', 3.8, `100<small>${c.unit}</small>`, c.g)}
              <span class="pc-badge">-96.5%<em>${c.cut}</em></span>
            </div>
          </figure>
          <figure class="pc-card" aria-label="${c.c2}">
            <figcaption>${c.c2}</figcaption>
            <div class="pc-plot">${axis}
              ${bar('is-old is-fail', 100, `<span class="pc-x">✕</span>`, c.a, `<b>${c.fail}</b><b>${c.na}</b>`)}
              ${bar('is-new', 5.6, `167<small>${c.unit}</small>`, c.g)}
            </div>
          </figure>
        </div>
        <p class="pc-note">${c.note}</p>
      </div>`;
  };

  const roundPublicPerformance = () => {
    const section = document.querySelector('#engine-performance');
    if (!section) return false;
    section.querySelectorAll('h2,strong,p,span').forEach((el) => {
      if (el.children.length) return;
      el.textContent = el.textContent
        .replace(/21\.559/g, '21.6')
        .replace(/21,559/g, '21,6')
        .replace(/166\.981/g, '167.0')
        .replace(/166,981/g, '167,0')
        .replace(/18,000(?![.\d])/g, '18,000.0')
        .replace(/18\.000(?![,\d])/g, '18.000,0')
        .replace(/17,018(?![.\d])/g, '17,018.0')
        .replace(/17\.018(?![,\d])/g, '17.018,0')
        .replace(/1,100(?![.\d])/g, '1,100.0')
        .replace(/1\.100(?![,\d])/g, '1.100,0')
        .replace(/8\.00 GB/g, '8.0 GB')
        .replace(/8,00 GB/g, '8,0 GB')
        .replace(/7\.70 GB/g, '7.7 GB')
        .replace(/7,70 GB/g, '7,7 GB');
    });
    return true;
  };

  const enhancePerformance = () => {
    const section = document.querySelector('#engine-performance');
    if (!section) return false;

    const lang = document.documentElement.lang || 'en';
    const copy = impactCopy[lang] || impactCopy.en;
    const head = section.querySelector('.performance-head');
    const heading = head?.querySelector('h2');
    if (!head || !heading) return false;

    heading.innerHTML = copy.titleLines
      .map(line => `<span class="performance-title-line">${line}</span>`)
      .join('');

    section.querySelector('.performance-lead')?.remove();
    section.querySelector('.performance-grid')?.remove();
    section.querySelector('.performance-machine')?.remove();

    if (!section.querySelector('.performance-impact')) {
      const block = document.createElement('div');
      block.className = 'performance-impact';
      const metrics = copy.metrics.map(([value, label]) => `
        <article class="performance-impact-metric">
          <strong>${value}</strong>
          <span>${label}</span>
        </article>`).join('');
      block.innerHTML = `
        <div class="performance-impact-topline">
          <span class="performance-impact-eyebrow">${copy.eyebrow}</span>
          <span class="performance-impact-context">${copy.context}</span>
        </div>
        <div class="performance-impact-grid">${metrics}</div>
        <p class="performance-impact-note">${copy.note}</p>`;
      head.insertAdjacentElement('afterend', block);
    }

    if (!section.querySelector('.performance-compare')) {
      const holder = document.createElement('div');
      holder.innerHTML = buildCompare(compareCopy[lang] || compareCopy.en).trim();
      const anchor = section.querySelector('.performance-impact');
      anchor.insertAdjacentElement('afterend', holder.firstChild);
      const compare = section.querySelector('.performance-compare');
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((es) => es.forEach(e => {
          if (e.isIntersecting) { compare.classList.add('in'); io.disconnect(); }
        }), { threshold: .25 });
        io.observe(compare);
      } else compare.classList.add('in');
    }

    if (!document.querySelector('#performance-impact-style')) {
      const style = document.createElement('style');
      style.id = 'performance-impact-style';
      style.textContent = `
        #engine-performance .performance-head{display:block!important}
        #engine-performance .performance-head{padding:22px;border:1px solid rgba(55,96,145,.22);border-radius:22px;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(225,238,250,.94));box-shadow:0 16px 36px rgba(42,60,82,.10)}#engine-performance .performance-head .kicker{margin:0 0 8px;color:var(--brand);font-size:13px;font-weight:950;letter-spacing:.08em}#engine-performance .performance-head h2{max-width:none!important;margin:0;color:var(--deep);font-size:clamp(20px,2.2vw,26px);font-weight:900;line-height:1.3;letter-spacing:-.04em;word-break:keep-all}
        #engine-performance .performance-title-line{display:block;white-space:nowrap}
        #engine-performance .performance-impact{margin-top:18px;padding:22px;border:1px solid rgba(55,96,145,.22);border-radius:22px;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(225,238,250,.94));box-shadow:0 16px 36px rgba(42,60,82,.10)}
        #engine-performance .performance-impact-topline{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:14px}
        #engine-performance .performance-impact-eyebrow{color:var(--brand);font-size:13px;font-weight:950;letter-spacing:.08em}
        #engine-performance .performance-impact-context{color:var(--muted);font-size:13px;font-weight:850;line-height:1.45}
        #engine-performance .performance-impact-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
        #engine-performance .performance-impact-metric{min-width:0;padding:18px;border-radius:16px;background:rgba(255,255,255,.90);border:1px solid rgba(55,96,145,.12)}
        #engine-performance .performance-impact-metric strong{display:block;color:var(--deep);font-size:clamp(20px,2.2vw,28px);font-weight:950;line-height:1;letter-spacing:-.04em;white-space:nowrap}
        #engine-performance .performance-impact-metric span{display:block;margin-top:8px;color:var(--ink);font-size:13px;font-weight:900;line-height:1.45}
        #engine-performance .performance-impact-note{margin:12px 2px 0;color:var(--muted);font-size:10.5px;line-height:1.55}
        #engine-performance .performance-compare{margin-top:18px;padding:26px 22px 20px;border:1px solid rgba(55,96,145,.22);border-radius:22px;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(225,238,250,.94));box-shadow:0 16px 36px rgba(42,60,82,.10)}
        #engine-performance .pc-head h3{margin:0;color:var(--deep);font-size:clamp(20px,2.2vw,26px);font-weight:900;line-height:1.3;letter-spacing:-.04em}
        #engine-performance .pc-head p{margin:6px 0 0;color:var(--muted);font-size:13px;font-weight:800}
        #engine-performance .pc-charts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:18px}
        #engine-performance .pc-card{margin:0;padding:18px 18px 14px;border-radius:18px;background:rgba(255,255,255,.92);border:1px solid rgba(55,96,145,.12)}
        #engine-performance .pc-card figcaption{color:var(--ink);font-size:14px;font-weight:900;text-align:center;letter-spacing:-.02em}
        #engine-performance .pc-plot{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:22px;height:290px;margin-top:16px;padding:30px 14px 0}
        #engine-performance .pc-grid{position:absolute;inset:30px 0 34px;display:flex;flex-direction:column;justify-content:space-between;pointer-events:none}
        #engine-performance .pc-grid i{display:block;border-top:1px dashed rgba(41,75,88,.14)}
        #engine-performance .pc-col{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:0}
        #engine-performance .pc-bar{position:relative;width:min(100%,92px);height:calc(var(--h) * 1.85px);min-height:7px;border-radius:12px 12px 4px 4px;transform-origin:bottom;transform:scaleY(0);transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}
        #engine-performance .performance-compare.in .pc-bar{transform:scaleY(1)}
        #engine-performance .pc-col.is-new .pc-bar{background:linear-gradient(180deg,var(--mint),var(--brand) 55%,var(--deep));box-shadow:0 10px 22px rgba(71,111,123,.28);transition-delay:.25s}
        #engine-performance .pc-col.is-old .pc-bar{background:linear-gradient(180deg,#c9cfdb,#a9b2c4);box-shadow:0 8px 18px rgba(42,60,82,.10)}
        #engine-performance .pc-col.is-fail .pc-bar{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:repeating-linear-gradient(135deg,rgba(167,165,201,.34) 0 8px,rgba(255,255,255,.55) 8px 16px);border:1.5px dashed rgba(122,118,170,.7);border-bottom:0}
        #engine-performance .pc-col.is-fail .pc-bar b{padding:3px 8px;border-radius:8px;background:rgba(255,255,255,.88);color:#6a65a0;font-size:12px;font-weight:900;white-space:nowrap}
        #engine-performance .pc-val{margin-bottom:8px;color:var(--deep);font-size:clamp(20px,2.2vw,28px);font-weight:950;letter-spacing:-.04em;line-height:1;white-space:nowrap}
        #engine-performance .pc-val small{margin-left:3px;font-size:.5em;font-weight:900;color:var(--muted)}
        #engine-performance .pc-x{color:#8b86bd;font-size:.9em}
        #engine-performance .pc-label{height:34px;display:flex;align-items:center;color:var(--ink);font-size:13px;font-weight:900}
        #engine-performance .pc-col.is-new .pc-label{color:var(--brand)}
        #engine-performance .pc-badge{position:absolute;right:6%;top:32%;display:flex;flex-direction:column;align-items:center;padding:8px 14px;border-radius:14px;color:#fff;font-size:clamp(20px,2.2vw,26px);font-weight:950;letter-spacing:-.04em;line-height:1.05;background:linear-gradient(135deg,var(--deep),var(--brand));box-shadow:0 12px 26px rgba(71,111,123,.32);opacity:0;transform:translateY(8px);transition:opacity .6s ease 1.1s,transform .6s ease 1.1s}
        #engine-performance .performance-compare.in .pc-badge{opacity:1;transform:none}
        #engine-performance .pc-badge em{font-style:normal;font-size:11px;font-weight:800;opacity:.9;letter-spacing:0}
        #engine-performance .pc-note{margin:12px 2px 0;color:var(--muted);font-size:10.5px;line-height:1.55}
        @media(prefers-reduced-motion:reduce){#engine-performance .pc-bar,#engine-performance .pc-badge{transition:none}}
        @media(max-width:760px){#engine-performance .performance-compare{padding:18px 14px 16px}#engine-performance .pc-charts{grid-template-columns:1fr}#engine-performance .pc-plot{height:250px;gap:14px}#engine-performance .pc-bar{height:calc(var(--h) * 1.5px)}#engine-performance .pc-badge{top:30%}}
        @media(max-width:900px){#engine-performance .performance-title-line{white-space:normal}}
        @media(max-width:760px){#engine-performance .performance-head h2{font-size:clamp(26px,6.4vw,36px);line-height:1.18}#engine-performance .performance-impact{padding:16px;margin-top:20px}#engine-performance .performance-impact-grid{grid-template-columns:1fr}#engine-performance .performance-impact-metric strong{white-space:normal}}
      `;
      document.head.appendChild(style);
    }

    return true;
  };

  const applyPerformanceFixes = () => {
    const rounded = roundPublicPerformance();
    const enhanced = enhancePerformance();
    return rounded && enhanced;
  };

  const apply = () => {
    if (applyPerformanceFixes()) return;
    requestAnimationFrame(() => {
      if (applyPerformanceFixes()) return;
      setTimeout(applyPerformanceFixes, 0);
    });
  };

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
})();
