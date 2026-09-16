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

    if (!document.querySelector('#performance-impact-style')) {
      const style = document.createElement('style');
      style.id = 'performance-impact-style';
      style.textContent = `
        #engine-performance .performance-head{display:block!important}
        #engine-performance .performance-head h2{max-width:none!important;margin:0;font-size:clamp(38px,4.1vw,56px);line-height:1.12;letter-spacing:-.045em;word-break:keep-all}
        #engine-performance .performance-title-line{display:block;white-space:nowrap}
        #engine-performance .performance-impact{margin-top:28px;padding:22px;border:1px solid rgba(55,96,145,.22);border-radius:22px;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(225,238,250,.94));box-shadow:0 16px 36px rgba(42,60,82,.10)}
        #engine-performance .performance-impact-topline{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:14px}
        #engine-performance .performance-impact-eyebrow{color:var(--brand);font-size:11px;font-weight:950;letter-spacing:.08em}
        #engine-performance .performance-impact-context{color:var(--muted);font-size:11px;font-weight:800;line-height:1.45}
        #engine-performance .performance-impact-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
        #engine-performance .performance-impact-metric{min-width:0;padding:18px;border-radius:16px;background:rgba(255,255,255,.90);border:1px solid rgba(55,96,145,.12)}
        #engine-performance .performance-impact-metric strong{display:block;color:var(--brand);font-size:clamp(26px,3vw,40px);line-height:1;letter-spacing:-.045em;white-space:nowrap}
        #engine-performance .performance-impact-metric span{display:block;margin-top:8px;color:var(--ink);font-size:12px;font-weight:850;line-height:1.45}
        #engine-performance .performance-impact-note{margin:12px 2px 0;color:var(--muted);font-size:10.5px;line-height:1.55}
        @media(max-width:900px){#engine-performance .performance-title-line{white-space:normal}}
        @media(max-width:760px){#engine-performance .performance-head h2{font-size:clamp(31px,8vw,44px);line-height:1.16}#engine-performance .performance-impact{padding:16px;margin-top:20px}#engine-performance .performance-impact-grid{grid-template-columns:1fr}#engine-performance .performance-impact-metric strong{white-space:normal}}
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
