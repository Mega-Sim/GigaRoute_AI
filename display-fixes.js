(() => {
  const impactCopy = {
    ko: {
      title: '8GB RAM 사무용 노트북 하나로 1,100대 AMHS를 21.6배속 시뮬레이션.',
      eyebrow: '8GB OFFICE LAPTOP BENCHMARK',
      context: '11th Gen Intel Core i5-1130G7 · 8GB RAM · 내장 GPU · Windows x64',
      metrics: [
        ['21.6초', '실제 1초 동안 진행되는 시뮬레이션 시간'],
        ['약 101.9 Job/s', '실제 실행시간 기준 평균 완료 Job'],
        ['2분 47초', '1시간 시뮬레이션 완료 시간']
      ],
      note: '101.9 Job/s는 실측 완료 Job 17,018건 ÷ 실제 실행시간 166.981초로 계산한 파생 지표이며, 엔진 내부 이벤트 처리량(events/s)을 의미하지 않습니다.'
    },
    en: {
      title: '1,100 AMHS vehicles at 21.6× realtime on an 8 GB office laptop.',
      eyebrow: '8 GB OFFICE LAPTOP BENCHMARK',
      context: '11th Gen Intel Core i5-1130G7 · 8 GB RAM · integrated GPU · Windows x64',
      metrics: [
        ['21.6 sec', 'Simulated time advanced per 1 real second'],
        ['~101.9 jobs/s', 'Average completed jobs per real execution second'],
        ['2 min 47 sec', 'Wall time for a 1-hour simulation']
      ],
      note: '101.9 jobs/s is derived from 17,018 completed jobs ÷ 166.981 seconds of wall time. It is not an internal engine events/s measurement.'
    },
    'zh-CN': {
      title: '仅用 8 GB 内存办公笔记本，以 21.6× 实时倍率模拟 1,100 辆 AMHS Vehicle。',
      eyebrow: '8 GB 办公笔记本实测',
      context: '11th Gen Intel Core i5-1130G7 · 8 GB RAM · 集成显卡 · Windows x64',
      metrics: [
        ['21.6 秒', '每 1 秒实际时间推进的仿真时间'],
        ['约 101.9 Job/s', '按实际执行时间计算的平均完成 Job'],
        ['2分47秒', '完成 1 小时仿真的实际用时']
      ],
      note: '101.9 Job/s = 17,018 个已完成 Job ÷ 166.981 秒实际执行时间。该数值不是引擎内部 events/s 指标。'
    },
    es: {
      title: '1.100 Vehicles AMHS a 21,6× en un portátil de oficina con solo 8 GB de RAM.',
      eyebrow: 'BENCHMARK EN PORTÁTIL DE OFICINA DE 8 GB',
      context: '11th Gen Intel Core i5-1130G7 · 8 GB RAM · GPU integrada · Windows x64',
      metrics: [
        ['21,6 s', 'Tiempo simulado avanzado por cada segundo real'],
        ['~101,9 Jobs/s', 'Jobs completados de media por segundo real de ejecución'],
        ['2 min 47 s', 'Tiempo real para simular 1 hora']
      ],
      note: '101,9 Jobs/s se deriva de 17.018 Jobs completados ÷ 166,981 segundos de ejecución real. No representa eventos internos del motor por segundo.'
    },
    ja: {
      title: '8 GB RAMの事務用ノートPC 1台で、1,100台のAMHSを21.6倍速シミュレーション。',
      eyebrow: '8 GB 事務用ノートPC 実測',
      context: '11th Gen Intel Core i5-1130G7 · 8 GB RAM · 内蔵GPU · Windows x64',
      metrics: [
        ['21.6秒', '実時間1秒で進むシミュレーション時間'],
        ['約101.9 Job/s', '実行時間基準の平均完了Job'],
        ['2分47秒', '1時間シミュレーションの実行時間']
      ],
      note: '101.9 Job/sは完了Job 17,018件 ÷ 実行時間166.981秒から算出した派生指標で、エンジン内部のevents/s測定値ではありません。'
    }
  };

  const roundPublicPerformance = () => {
    const section = document.querySelector('#engine-performance');
    if (!section) return false;
    section.querySelectorAll('h2,strong,p,span').forEach((el) => {
      if (el.children.length) return;
      el.textContent = el.textContent.replace(/21\.559/g, '21.6').replace(/21,559/g, '21,6');
    });
    return true;
  };

  const enhancePerformance = () => {
    const section = document.querySelector('#engine-performance');
    if (!section) return false;

    const lang = document.documentElement.lang || 'en';
    const copy = impactCopy[lang] || impactCopy.en;
    const heading = section.querySelector('.performance-head h2');
    const lead = section.querySelector('.performance-lead');
    if (!heading || !lead) return false;

    heading.textContent = copy.title;
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
      lead.insertAdjacentElement('afterend', block);
    }

    if (!document.querySelector('#performance-impact-style')) {
      const style = document.createElement('style');
      style.id = 'performance-impact-style';
      style.textContent = `
        #engine-performance .performance-head{align-items:start}
        #engine-performance .performance-head h2{max-width:15ch}
        #engine-performance .performance-impact{grid-column:1/-1;margin-top:4px;padding:22px;border:1px solid rgba(55,96,145,.22);border-radius:22px;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(225,238,250,.94));box-shadow:0 16px 36px rgba(42,60,82,.10)}
        #engine-performance .performance-impact-topline{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:14px}
        #engine-performance .performance-impact-eyebrow{color:var(--brand);font-size:11px;font-weight:950;letter-spacing:.08em}
        #engine-performance .performance-impact-context{color:var(--muted);font-size:11px;font-weight:800;line-height:1.45}
        #engine-performance .performance-impact-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
        #engine-performance .performance-impact-metric{min-width:0;padding:18px;border-radius:16px;background:rgba(255,255,255,.90);border:1px solid rgba(55,96,145,.12)}
        #engine-performance .performance-impact-metric strong{display:block;color:var(--brand);font-size:clamp(26px,3vw,40px);line-height:1;letter-spacing:-.045em;white-space:nowrap}
        #engine-performance .performance-impact-metric span{display:block;margin-top:8px;color:var(--ink);font-size:12px;font-weight:850;line-height:1.45}
        #engine-performance .performance-impact-note{margin:12px 2px 0;color:var(--muted);font-size:10.5px;line-height:1.55}
        @media(max-width:760px){#engine-performance .performance-head h2{max-width:none}#engine-performance .performance-impact{padding:16px}#engine-performance .performance-impact-grid{grid-template-columns:1fr}#engine-performance .performance-impact-metric strong{white-space:normal}}
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
