(() => {
  const EMAIL = 'support@gigaroute.ai';
  const DEMO_REPO = 'https://github.com/Mega-Sim/GigaRoute_AI_Simulation_Demo';
  const HEADER_WINDOWS_DOWNLOAD = `${DEMO_REPO}/releases`;
  const WINDOWS_DOWNLOAD = `${DEMO_REPO}/releases/tag/public-preview-526-windows`;
  const LINUX_DOWNLOAD = `${DEMO_REPO}/releases/tag/public-preview-526-linux`;
  const FAVICON = '/favicon.png?v=20260818-2';
  const locale = document.documentElement.lang || 'en';
  const performanceNavLabel = {
    en: 'Performance',
    ko: '제품성능',
    'zh-CN': '产品性能',
    es: 'Rendimiento',
    ja: '製品性能'
  }[locale] || 'Performance';
  const backToTopLabel = {
    en: 'Back to top',
    ko: '맨 위로',
    'zh-CN': '返回顶部',
    es: 'Volver arriba',
    ja: 'ページ上部へ戻る'
  }[locale] || 'Back to top';

  const copy = {
    en: {
      contact:{nav:'Contact',button:'Contact Sales',title:'Contact GigaRoute AI',intro:'For commercial licenses, product demos, PoC projects, technical support, AutoMod consulting, enterprise deployment, or partnerships, contact us at the email below.',emailLabel:'Business & support email',copy:'Copy email',copied:'Email copied',hours:'Business hours',hoursValue:'Monday–Friday, 09:00–18:00 KST',response:'Typical response',responseValue:'Within 1 business day',close:'Close'},
      performance:{kicker:'Measured engine benchmark',title:'21.559× measured realtime simulation on an office laptop with 8 GB RAM.',lead:'With 1,100 Vehicles and an 18,000 moves/hour workload, a 1-hour simulation completed in 166.981 seconds with 17,018 jobs completed.',metrics:[['21.559×','Realtime factor'],['1,100','Vehicles'],['17,018 / h','Completed jobs / simulated hour']],machineTitle:'Benchmark environment',machine:[['Environment','Office laptop PC with integrated GPU'],['CPU','11th Gen Intel Core i5-1130G7'],['RAM','8.00 GB (7.70 GB usable)'],['System','64-bit Windows · x64']],note:'Public benchmark summary as of Aug 30, 2026. Measured in mixed mode from one Release run. Performance varies with layout complexity, traffic density, simulation settings, and hardware.'},
      salesHint:'Public Preview available · Commercial licensing, PoC, and deployment by consultation',
      product:{kicker:'B2B simulation software',title:'Evaluate first. Deploy with the right commercial scope.',lead:'Start with the Public Preview, then move to a technical review, Demo or PoC, and a commercial license sized for your deployment. We do not publish fixed commercial pricing because fleet scale, sites, support, and customization requirements differ by project.',quoteNote:'Commercial licensing is quotation-based. Public Preview downloads remain available for evaluation.',flowTitle:'From evaluation to deployment',flow:[['01','Public Preview','Run the software and example layouts directly.'],['02','Technical Fit Review','Review your CAD, fleet scale, KPIs, and modeling requirements.'],['03','Demo / PoC','Validate the workflow against a representative customer scenario.'],['04','Commercial Deployment','Define license scope, support, customization, and rollout.']],cards:[
        {key:'workspace',status:'AVAILABLE',title:'GigaRoute Workspace',subtitle:'CAD & Model Preparation',desc:'Prepare DXF layouts, review connectivity and geometry issues, and build a clean simulation-ready modeling foundation.',tags:['DXF Import','Layout Review','Network Preparation'],cta:'Request Layout Review'},
        {key:'auto',status:'PUBLIC PREVIEW',title:'GigaRoute Auto Simulation',subtitle:'Commercial AMHS Simulation',desc:'CAD-based OHT, AGV, OHS and AMHS simulation with 2D/3D visualization, routing, traffic behavior, jobs, and KPI monitoring.',tags:['2D / 3D','Large Fleet','KPI','Up to 3,000 Vehicles'],cta:'Request Commercial License'},
        {key:'studio',status:'IN DEVELOPMENT',title:'GigaRoute Simulation Studio',subtitle:'Advanced Modeling & Logic',desc:'An advanced modeling environment for detailed control logic, custom events, reusable simulation logic, and engineering-grade scenario development.',tags:['Custom Logic','Event Modeling','Advanced Control'],cta:'Request Early Access'},
        {key:'enterprise',status:'PROJECT',title:'Enterprise & Custom',subtitle:'PoC, Integration & Engineering',desc:'Customer-specific simulation modeling, controller and workflow integration, custom development, migration support, and engineering consulting.',tags:['Demo / PoC','Custom Modeling','Integration','Support'],cta:'Request Demo / PoC'}
      ]}
    },
    ko: {
      contact:{nav:'문의',button:'영업 문의',title:'GigaRoute AI 문의',intro:'상용 라이선스, 제품 데모, PoC, 기술지원, AutoMod 컨설팅, 기업 배포 및 협업 문의는 아래 이메일로 연락해 주세요.',emailLabel:'비즈니스·고객지원 이메일',copy:'이메일 복사',copied:'복사되었습니다',hours:'업무시간',hoursValue:'평일 09:00~18:00 (한국시간)',response:'일반적인 회신',responseValue:'영업일 기준 1일 이내',close:'닫기'},
      performance:{kicker:'Simulation Engine 실측 성능',title:'8GB RAM 사무용 노트북에서 21.559배속 실측.',lead:'1,100대 Vehicle, 시간당 18,000 move 부하에서 1시간 시뮬레이션을 166.981초에 완료했고 17,018 Job이 완료됐습니다.',metrics:[['21.559×','실측 시뮬레이션 배속'],['1,100','Vehicle'],['17,018 / h','시뮬레이션 시간당 완료 Job']],machineTitle:'측정 환경',machine:[['실행환경','내장 GPU 사무용 노트북 PC'],['CPU','11th Gen Intel Core i5-1130G7'],['RAM','8.00 GB (7.70 GB 사용 가능)'],['시스템','64비트 Windows · x64']],note:'2026-08-30 기준 공개용 실측 요약입니다. mixed mode의 단일 Release Run에서 측정했습니다. 도면 복잡도, 교통 밀도, 시뮬레이션 설정과 하드웨어에 따라 성능은 달라질 수 있습니다.'},
      salesHint:'Public Preview 제공 · 상용 라이선스, PoC 및 기업 배포는 상담 후 진행',
      product:{kicker:'B2B 시뮬레이션 소프트웨어',title:'먼저 검증하고, 필요한 범위로 상용 배포합니다.',lead:'Public Preview로 직접 평가한 뒤 기술 검토, Demo 또는 PoC를 거쳐 고객 환경에 맞는 상용 라이선스로 전환합니다. Fleet 규모, Site, 지원 및 커스터마이징 범위가 프로젝트마다 다르므로 고정 상용 가격은 공개하지 않습니다.',quoteNote:'상용 라이선스는 견적 기반으로 제공하며 Public Preview 다운로드는 평가용으로 계속 제공합니다.',flowTitle:'평가에서 상용 배포까지',flow:[['01','Public Preview','프로그램과 예제 레이아웃을 직접 실행해 핵심 흐름을 확인합니다.'],['02','기술 적합성 검토','CAD, Vehicle 규모, KPI와 모델링 요구사항을 함께 검토합니다.'],['03','Demo / PoC','대표 고객 시나리오로 실제 적용 가능성을 검증합니다.'],['04','상용 라이선스·배포','라이선스 범위, 지원, 커스터마이징 및 배포 방식을 확정합니다.']],cards:[
        {key:'workspace',status:'제공 중',title:'GigaRoute Workspace',subtitle:'CAD & Model Preparation',desc:'DXF 레이아웃을 정리하고 연결성·형상 문제를 검토해 시뮬레이션 가능한 모델링 기반을 준비합니다.',tags:['DXF Import','Layout Review','Network Preparation'],cta:'레이아웃 검토 문의'},
        {key:'auto',status:'PUBLIC PREVIEW',title:'GigaRoute Auto Simulation',subtitle:'상용 AMHS Simulation',desc:'CAD 기반으로 OHT, AGV, OHS, AMHS의 경로·교통·작업을 2D/3D로 시뮬레이션하고 KPI를 확인합니다.',tags:['2D / 3D','Large Fleet','KPI','최대 3,000 Vehicles'],cta:'상용 라이선스 문의'},
        {key:'studio',status:'개발 중',title:'GigaRoute Simulation Studio',subtitle:'Advanced Modeling & Logic',desc:'세밀한 제어 로직, 사용자 이벤트, 재사용 가능한 시뮬레이션 로직과 고급 시나리오 개발을 위한 모델링 환경입니다.',tags:['Custom Logic','Event Modeling','Advanced Control'],cta:'Early Access 문의'},
        {key:'enterprise',status:'프로젝트',title:'Enterprise & Custom',subtitle:'PoC, Integration & Engineering',desc:'고객 환경별 시뮬레이션 모델링, 제어기·업무 흐름 연동, 맞춤 개발, 마이그레이션 및 엔지니어링 컨설팅을 제공합니다.',tags:['Demo / PoC','Custom Modeling','Integration','Support'],cta:'Demo / PoC 문의'}
      ]}
    },
    'zh-CN': {
      contact:{nav:'联系我们',button:'联系销售',title:'联系 GigaRoute AI',intro:'如需商业许可证、产品演示、PoC、技术支持、AutoMod 咨询、企业部署或合作，请通过以下邮箱联系我们。',emailLabel:'商务与支持邮箱',copy:'复制邮箱',copied:'邮箱已复制',hours:'工作时间',hoursValue:'周一至周五 09:00–18:00（韩国时间）',response:'通常回复时间',responseValue:'1 个工作日内',close:'关闭'},
      performance:{kicker:'Simulation Engine 实测性能',title:'8 GB 内存办公笔记本实测 21.559× 实时倍率。',lead:'在 1,100 辆 Vehicle、18,000 moves/小时的负载下，1 小时仿真用时 166.981 秒，并完成 17,018 个 Job。',metrics:[['21.559×','实测实时倍率'],['1,100','Vehicles'],['17,018 / h','每仿真小时完成 Job']],machineTitle:'测试环境',machine:[['运行环境','内置 GPU 办公笔记本电脑'],['CPU','11th Gen Intel Core i5-1130G7'],['RAM','8.00 GB（7.70 GB 可用）'],['系统','64 位 Windows · x64']],note:'截至 2026-08-30 的公开实测摘要。数据来自 mixed mode 的一次 Release Run。实际性能会随布局复杂度、交通密度、仿真设置和硬件变化。'},
      salesHint:'提供 Public Preview · 商业授权、PoC 与企业部署采用咨询与报价方式',
      product:{kicker:'B2B 仿真软件',title:'先验证，再按实际需求商业部署。',lead:'先使用 Public Preview 进行评估，再通过技术评审、Demo 或 PoC 进入商业授权。由于车队规模、站点、支持和定制范围因项目而异，我们不公开固定商业价格。',quoteNote:'商业许可证采用报价方式，Public Preview 继续提供评估下载。',flowTitle:'从评估到部署',flow:[['01','Public Preview','直接运行软件和示例布局。'],['02','技术适配评审','确认 CAD、Vehicle 规模、KPI 与建模需求。'],['03','Demo / PoC','以代表性客户场景验证适用性。'],['04','商业部署','确定许可证范围、支持、定制与上线方式。']],cards:[
        {key:'workspace',status:'可用',title:'GigaRoute Workspace',subtitle:'CAD & Model Preparation',desc:'整理 DXF 布局、检查连接和几何问题，并准备可用于仿真的建模基础。',tags:['DXF Import','Layout Review','Network Preparation'],cta:'申请布局评审'},
        {key:'auto',status:'PUBLIC PREVIEW',title:'GigaRoute Auto Simulation',subtitle:'商业 AMHS Simulation',desc:'面向 OHT、AGV、OHS、AMHS 的 CAD 驱动 2D/3D 仿真，覆盖路径、交通、任务与 KPI。',tags:['2D / 3D','Large Fleet','KPI','最高 3,000 Vehicles'],cta:'咨询商业许可证'},
        {key:'studio',status:'开发中',title:'GigaRoute Simulation Studio',subtitle:'Advanced Modeling & Logic',desc:'用于详细控制逻辑、自定义事件、可复用仿真逻辑和高级场景开发的建模环境。',tags:['Custom Logic','Event Modeling','Advanced Control'],cta:'咨询 Early Access'},
        {key:'enterprise',status:'项目制',title:'Enterprise & Custom',subtitle:'PoC, Integration & Engineering',desc:'提供客户专属仿真建模、控制器和工作流集成、定制开发、迁移支持及工程咨询。',tags:['Demo / PoC','Custom Modeling','Integration','Support'],cta:'申请 Demo / PoC'}
      ]}
    },
    es: {
      contact:{nav:'Contacto',button:'Contactar ventas',title:'Contactar con GigaRoute AI',intro:'Para licencias comerciales, demostraciones, PoC, soporte técnico, consultoría AutoMod, despliegue empresarial o colaboraciones, escríbanos al correo indicado.',emailLabel:'Correo comercial y de soporte',copy:'Copiar correo',copied:'Correo copiado',hours:'Horario de atención',hoursValue:'Lunes a viernes, 09:00–18:00 KST',response:'Tiempo de respuesta habitual',responseValue:'En 1 día laborable',close:'Cerrar'},
      performance:{kicker:'Rendimiento medido del Simulation Engine',title:'21,559× medido en un portátil de oficina con 8 GB de RAM.',lead:'Con 1.100 Vehicles y una carga de 18.000 moves/hora, una simulación de 1 hora terminó en 166,981 segundos y completó 17.018 Jobs.',metrics:[['21,559×','Factor de tiempo real'],['1.100','Vehicles'],['17.018 / h','Jobs completados / hora simulada']],machineTitle:'Entorno de medición',machine:[['Entorno','Portátil de oficina con GPU integrada'],['CPU','11th Gen Intel Core i5-1130G7'],['RAM','8,00 GB (7,70 GB utilizables)'],['Sistema','Windows de 64 bits · x64']],note:'Resumen público de medición al 30 de agosto de 2026. Medido en una ejecución Release en mixed mode. El rendimiento varía según la complejidad del layout, la densidad de tráfico, la configuración y el hardware.'},
      salesHint:'Public Preview disponible · Licencias comerciales, PoC y despliegue empresarial bajo consulta',
      product:{kicker:'Software de simulación B2B',title:'Evalúe primero y despliegue con el alcance comercial adecuado.',lead:'Comience con Public Preview y avance a una revisión técnica, Demo o PoC antes de definir la licencia comercial. No publicamos precios comerciales fijos porque la escala de flota, los sitios, el soporte y la personalización varían por proyecto.',quoteNote:'Las licencias comerciales se cotizan según el proyecto. Public Preview sigue disponible para evaluación.',flowTitle:'De la evaluación al despliegue',flow:[['01','Public Preview','Ejecute directamente el software y layouts de ejemplo.'],['02','Revisión técnica','Revise CAD, escala de Vehicles, KPI y requisitos de modelado.'],['03','Demo / PoC','Valide el flujo con un escenario representativo.'],['04','Despliegue comercial','Defina licencia, soporte, personalización y despliegue.']],cards:[
        {key:'workspace',status:'DISPONIBLE',title:'GigaRoute Workspace',subtitle:'CAD & Model Preparation',desc:'Prepare layouts DXF, revise problemas de conectividad y geometría y construya una base lista para simulación.',tags:['DXF Import','Layout Review','Network Preparation'],cta:'Solicitar revisión'},
        {key:'auto',status:'PUBLIC PREVIEW',title:'GigaRoute Auto Simulation',subtitle:'Simulación AMHS comercial',desc:'Simulación basada en CAD para OHT, AGV, OHS y AMHS con visualización 2D/3D, rutas, tráfico, trabajos y KPI.',tags:['2D / 3D','Large Fleet','KPI','Hasta 3.000 Vehicles'],cta:'Solicitar licencia comercial'},
        {key:'studio',status:'EN DESARROLLO',title:'GigaRoute Simulation Studio',subtitle:'Advanced Modeling & Logic',desc:'Entorno de modelado avanzado para lógica de control detallada, eventos personalizados y desarrollo de escenarios.',tags:['Custom Logic','Event Modeling','Advanced Control'],cta:'Solicitar Early Access'},
        {key:'enterprise',status:'PROYECTO',title:'Enterprise & Custom',subtitle:'PoC, Integration & Engineering',desc:'Modelado específico, integración de controladores y flujos, desarrollo personalizado, migración y consultoría de ingeniería.',tags:['Demo / PoC','Custom Modeling','Integration','Support'],cta:'Solicitar Demo / PoC'}
      ]}
    },
    ja: {
      contact:{nav:'お問い合わせ',button:'営業に相談',title:'GigaRoute AIへのお問い合わせ',intro:'商用ライセンス、製品デモ、PoC、技術サポート、AutoModコンサルティング、企業導入、協業については、以下のメールアドレスまでご連絡ください。',emailLabel:'営業・サポートメール',copy:'メールアドレスをコピー',copied:'コピーしました',hours:'営業時間',hoursValue:'平日 09:00～18:00（韓国時間）',response:'通常の返信時間',responseValue:'1営業日以内',close:'閉じる'},
      performance:{kicker:'Simulation Engine 実測性能',title:'8 GB RAM搭載の事務用ノートPCで21.559倍速を実測。',lead:'1,100台のVehicle、18,000 moves/時の負荷で、1時間のシミュレーションを166.981秒で完了し、17,018 Jobを完了しました。',metrics:[['21.559×','実測シミュレーション倍率'],['1,100','Vehicles'],['17,018 / h','シミュレーション1時間あたり完了Job']],machineTitle:'測定環境',machine:[['実行環境','内蔵GPUの事務用ノートPC'],['CPU','11th Gen Intel Core i5-1130G7'],['RAM','8.00 GB（使用可能 7.70 GB）'],['システム','64-bit Windows · x64']],note:'2026-08-30時点の公開用実測サマリーです。mixed modeの1回のRelease Runで測定しました。レイアウトの複雑度、交通密度、設定、ハードウェアにより性能は変動します。'},
      salesHint:'Public Preview 提供中 · 商用ライセンス、PoC、企業導入は個別相談・見積',
      product:{kicker:'B2Bシミュレーションソフトウェア',title:'まず評価し、必要な範囲で商用導入します。',lead:'Public Previewで評価した後、技術レビュー、DemoまたはPoCを経て商用ライセンスへ移行します。フリート規模、拠点、サポート、カスタマイズ範囲が案件ごとに異なるため、固定の商用価格は公開しません。',quoteNote:'商用ライセンスは見積方式です。Public Previewは評価用として引き続き提供します。',flowTitle:'評価から商用導入まで',flow:[['01','Public Preview','ソフトウェアとサンプルレイアウトを直接実行します。'],['02','技術適合レビュー','CAD、Vehicle規模、KPI、モデリング要件を確認します。'],['03','Demo / PoC','代表的な顧客シナリオで適用性を検証します。'],['04','商用導入','ライセンス範囲、サポート、カスタマイズ、展開方法を確定します。']],cards:[
        {key:'workspace',status:'提供中',title:'GigaRoute Workspace',subtitle:'CAD & Model Preparation',desc:'DXFレイアウトを整理し、接続性や形状の問題を確認してシミュレーション対応のモデリング基盤を準備します。',tags:['DXF Import','Layout Review','Network Preparation'],cta:'レイアウトレビュー相談'},
        {key:'auto',status:'PUBLIC PREVIEW',title:'GigaRoute Auto Simulation',subtitle:'商用 AMHS Simulation',desc:'OHT、AGV、OHS、AMHS向けのCADベース2D/3Dシミュレーションで、経路、交通、Job、KPIを確認できます。',tags:['2D / 3D','Large Fleet','KPI','最大3,000 Vehicles'],cta:'商用ライセンス相談'},
        {key:'studio',status:'開発中',title:'GigaRoute Simulation Studio',subtitle:'Advanced Modeling & Logic',desc:'詳細な制御ロジック、カスタムイベント、再利用可能なシミュレーションロジック、高度なシナリオ開発のための環境です。',tags:['Custom Logic','Event Modeling','Advanced Control'],cta:'Early Access相談'},
        {key:'enterprise',status:'プロジェクト',title:'Enterprise & Custom',subtitle:'PoC, Integration & Engineering',desc:'顧客別のシミュレーションモデリング、制御系・業務フロー連携、カスタム開発、移行支援、エンジニアリングコンサルティングを提供します。',tags:['Demo / PoC','Custom Modeling','Integration','Support'],cta:'Demo / PoC相談'}
      ]}
    }
  };

  const l = copy[locale] || copy.en;
  const t = l.contact;
  const perf = l.performance;
  const p = l.product;

  const makePlatformLink = (label, href, extraClass = '') => {
    const link = document.createElement('a');
    link.className = `btn platform-download ${extraClass}`.trim();
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    link.setAttribute('aria-label', `${label} download`);
    return link;
  };

  const applyPlatformLinks = () => {
    document.querySelectorAll('.actions a.github').forEach(link => {
      const windows = makePlatformLink('Windows', HEADER_WINDOWS_DOWNLOAD, 'windows-download');
      const linux = makePlatformLink('Linux', LINUX_DOWNLOAD, 'linux-download');
      link.before(windows, linux);
      link.remove();
    });
    document.querySelectorAll('.cta .hero-buttons a').forEach(link => {
      if (link.href === 'https://github.com/Mega-Sim/GigaRoute_AI' || link.href === DEMO_REPO || link.href === `${DEMO_REPO}/`) {
        const windows = makePlatformLink('Windows', WINDOWS_DOWNLOAD, 'windows-download');
        const linux = makePlatformLink('Linux', LINUX_DOWNLOAD, 'linux-download');
        link.before(windows, linux);
        link.remove();
      }
    });
  };

  const applyFavicon = () => {
    document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"]').forEach(link => link.remove());
    ['icon','shortcut icon'].forEach(rel => {
      const link = document.createElement('link');
      link.rel = rel;
      link.type = 'image/png';
      link.href = FAVICON;
      if (rel === 'icon') link.sizes = '64x64';
      document.head.appendChild(link);
    });
  };

  const applyPerformanceNavLink = () => {
    const links = document.querySelector('.links');
    if (!links || links.querySelector('a[href="#engine-performance"]')) return;
    const consulting = links.querySelector('a[href="#consulting"]');
    if (!consulting) return;
    const link = document.createElement('a');
    link.href = '#engine-performance';
    link.textContent = performanceNavLabel;
    consulting.before(link);
  };

  const applyBackToTopButton = () => {
    if (document.querySelector('.back-to-top')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-to-top';
    button.textContent = 'TOP';
    button.setAttribute('aria-label', backToTopLabel);
    button.title = backToTopLabel;
    const syncVisibility = () => button.classList.toggle('is-visible', window.scrollY > 360);
    button.addEventListener('click', () => {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.scrollTo({top: 0, behavior});
    });
    window.addEventListener('scroll', syncVisibility, {passive: true});
    document.body.appendChild(button);
    syncVisibility();
  };

  applyFavicon();
  applyPlatformLinks();
  applyPerformanceNavLink();
  applyBackToTopButton();

  const languageSelect = document.querySelector('.language-select');
  if (languageSelect) {
    [...languageSelect.options].forEach(option => {
      if (option.textContent.trim() === 'English') option.value = 'index-en.html';
    });
  }

  document.querySelectorAll('#pricing').forEach(section => section.remove());

  const style = document.createElement('style');
  style.textContent = `
    .platform-download{min-width:82px;padding:0 13px;white-space:nowrap}.linux-download{border-color:rgba(71,111,123,.22)}
    .back-to-top{position:fixed;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));z-index:900;display:grid;place-items:center;width:52px;height:52px;padding:0;border:1px solid rgba(55,96,145,.28);border-radius:50%;background:rgba(255,255,255,.94);color:var(--brand);box-shadow:0 14px 34px rgba(42,60,82,.2);font:900 12px/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.08em;cursor:pointer;opacity:0;visibility:hidden;transform:translateY(10px);transition:opacity .2s ease,transform .2s ease,visibility .2s ease}.back-to-top.is-visible{opacity:1;visibility:visible;transform:translateY(0)}.back-to-top:hover{border-color:rgba(55,96,145,.52);background:#fff;transform:translateY(-2px)}.back-to-top:focus-visible{outline:3px solid rgba(55,96,145,.28);outline-offset:3px}
    .sales-hint{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:8px 12px;border:1px solid rgba(55,96,145,.16);border-radius:999px;background:rgba(255,255,255,.7);color:var(--muted);font-size:12px;font-weight:800;line-height:1.4}.sales-hint:before{content:'';width:7px;height:7px;border-radius:50%;background:var(--brand);box-shadow:0 0 0 4px rgba(55,96,145,.10)}
    #engine-performance{padding:18px 0 86px;scroll-margin-top:var(--header-h,96px)}.performance-panel{padding:36px;border:1px solid rgba(255,255,255,.92);border-radius:32px;background:linear-gradient(145deg,rgba(232,240,250,.98),rgba(247,251,250,.95));box-shadow:var(--shadow)}.performance-head{display:grid;grid-template-columns:1.05fr .95fr;gap:32px;align-items:end}.performance-head h2{margin:0;font-size:clamp(34px,4.5vw,54px);line-height:1.05;letter-spacing:-.05em}.performance-lead{margin:0;color:var(--muted);font-size:16px;line-height:1.72}.performance-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:28px}.performance-metric{min-width:0;padding:22px;border:1px solid var(--line);border-radius:20px;background:rgba(255,255,255,.86)}.performance-metric strong{display:block;color:var(--ink);font-size:clamp(25px,3.2vw,38px);line-height:1;letter-spacing:-.045em;white-space:nowrap}.performance-metric span{display:block;margin-top:9px;color:var(--muted);font-size:12px;font-weight:800;line-height:1.45}.performance-machine{margin-top:14px;padding:22px;border:1px solid var(--line);border-radius:20px;background:rgba(255,255,255,.72)}.performance-machine h3{margin:0 0 14px;font-size:17px}.performance-specs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.performance-spec{min-width:0;padding:13px 14px;border-radius:14px;background:rgba(246,249,252,.92)}.performance-spec b{display:block;color:var(--brand);font-size:10px;letter-spacing:.055em;text-transform:uppercase}.performance-spec span{display:block;margin-top:6px;color:var(--ink);font-size:12px;font-weight:800;line-height:1.45;overflow-wrap:anywhere}.performance-note{margin:15px 0 0;color:var(--muted);font-size:11px;line-height:1.65}
    #products{padding:72px 0 86px}.b2b-panel{padding:36px;border:1px solid rgba(255,255,255,.9);border-radius:32px;background:linear-gradient(145deg,rgba(236,242,249,.97),rgba(255,255,255,.9));box-shadow:var(--shadow)}.b2b-head{display:grid;grid-template-columns:1fr .9fr;gap:30px;align-items:end;margin-bottom:28px}.b2b-head h2{margin:0;font-size:clamp(34px,4.5vw,54px);line-height:1.05;letter-spacing:-.05em}.b2b-lead{margin:0;color:var(--muted);font-size:16px;line-height:1.72}.b2b-quote-note{margin-top:12px;color:var(--ink);font-size:13px;font-weight:850;line-height:1.55}.b2b-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.b2b-card{display:flex;flex-direction:column;min-width:0;padding:24px;border:1px solid var(--line);border-radius:22px;background:rgba(255,255,255,.84)}.b2b-card.featured{border-color:rgba(55,96,145,.34);box-shadow:0 16px 36px rgba(42,60,82,.12);background:linear-gradient(155deg,rgba(255,255,255,.98),rgba(235,243,250,.92))}.b2b-card-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}.b2b-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:rgba(55,96,145,.09);color:var(--brand);font-weight:950;letter-spacing:-.04em}.b2b-status{padding:6px 9px;border:1px solid rgba(55,96,145,.15);border-radius:999px;background:rgba(255,255,255,.78);color:var(--brand);font-size:10px;font-weight:950;letter-spacing:.045em;text-transform:uppercase}.b2b-card h3{margin:0;font-size:23px;letter-spacing:-.025em}.b2b-subtitle{margin:6px 0 0;color:var(--brand);font-size:12px;font-weight:900}.b2b-desc{margin:15px 0 0;color:var(--muted);font-size:14px;line-height:1.65}.b2b-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:18px}.b2b-tags span{padding:6px 9px;border:1px solid var(--line);border-radius:999px;background:rgba(248,250,252,.92);color:var(--muted);font-size:11px;font-weight:800}.b2b-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:20px}.b2b-actions .btn{min-height:42px}.b2b-actions .platform-download{min-width:74px}.sales-flow{margin-top:24px;padding-top:24px;border-top:1px solid var(--line)}.sales-flow h3{margin:0 0 15px;font-size:18px}.sales-flow-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.sales-step{padding:16px;border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.7)}.sales-step b{display:block;color:var(--brand);font-size:11px;letter-spacing:.08em}.sales-step strong{display:block;margin-top:8px;font-size:14px}.sales-step p{margin:7px 0 0;color:var(--muted);font-size:12px;line-height:1.5}
    @media(max-width:1050px){.performance-head,.b2b-head{grid-template-columns:1fr}.performance-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.performance-specs{grid-template-columns:repeat(2,minmax(0,1fr))}.sales-flow-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.actions{width:100%;justify-content:flex-end;flex-wrap:wrap}.language-select{min-width:118px}.platform-download{min-width:0;padding:0 12px}.back-to-top{right:max(12px,env(safe-area-inset-right));bottom:max(12px,env(safe-area-inset-bottom));width:46px;height:46px}#engine-performance{padding:6px 0 58px}.performance-panel,.b2b-panel{padding:22px 18px}.performance-grid,.performance-specs,.b2b-grid,.sales-flow-grid{grid-template-columns:1fr}.b2b-actions .contact-trigger{width:100%}.performance-metric strong{white-space:normal}.sales-hint{border-radius:16px}}@media(prefers-reduced-motion:reduce){.back-to-top{transition:none}}
  `;
  document.head.appendChild(style);

  const hero = document.querySelector('.hero');
  if (hero && !hero.querySelector('.sales-hint')) {
    const heroCopy = hero.firstElementChild;
    const buttons = heroCopy?.querySelector('.hero-buttons');
    if (buttons) {
      const salesButton = document.createElement('a');
      salesButton.className = 'btn contact-trigger';
      salesButton.setAttribute('role','button');
      salesButton.setAttribute('tabindex','0');
      salesButton.textContent = t.button;
      buttons.appendChild(salesButton);
      const hint = document.createElement('div');
      hint.className = 'sales-hint';
      hint.textContent = l.salesHint;
      buttons.insertAdjacentElement('afterend', hint);
    }
  }

  if (hero && perf && !document.querySelector('#engine-performance')) {
    const section = document.createElement('section');
    section.id = 'engine-performance';
    const metricsHtml = perf.metrics.map(metric => `<article class="performance-metric"><strong>${metric[0]}</strong><span>${metric[1]}</span></article>`).join('');
    const machineHtml = perf.machine.map(spec => `<div class="performance-spec"><b>${spec[0]}</b><span>${spec[1]}</span></div>`).join('');
    section.innerHTML = `<div class="wrap"><div class="performance-panel"><div class="performance-head"><div><p class="kicker">${perf.kicker}</p><h2>${perf.title}</h2></div><p class="performance-lead">${perf.lead}</p></div><div class="performance-grid">${metricsHtml}</div><div class="performance-machine"><h3>${perf.machineTitle}</h3><div class="performance-specs">${machineHtml}</div><p class="performance-note">${perf.note}</p></div></div></div>`;
    hero.insertAdjacentElement('afterend', section);
  }

  const productSection = document.querySelector('#products');
  if (productSection) {
    const iconMap = {workspace:'WS',auto:'AS',studio:'ST',enterprise:'EN'};
    const cardHtml = p.cards.map(card => {
      const featured = card.key === 'auto' ? ' featured' : '';
      const tags = card.tags.map(tag => `<span>${tag}</span>`).join('');
      let actions = `<a class="btn${card.key === 'auto' ? ' primary' : ''} contact-trigger" role="button" tabindex="0">${card.cta}</a>`;
      if (card.key === 'auto') {
        actions = `<a class="btn platform-download windows-download" href="${WINDOWS_DOWNLOAD}" target="_blank" rel="noopener noreferrer">Windows</a><a class="btn platform-download linux-download" href="${LINUX_DOWNLOAD}" target="_blank" rel="noopener noreferrer">Linux</a>${actions}`;
      }
      return `<article class="b2b-card${featured}"><div class="b2b-card-top"><span class="b2b-icon">${iconMap[card.key]}</span><span class="b2b-status">${card.status}</span></div><h3>${card.title}</h3><p class="b2b-subtitle">${card.subtitle}</p><p class="b2b-desc">${card.desc}</p><div class="b2b-tags">${tags}</div><div class="b2b-actions">${actions}</div></article>`;
    }).join('');
    const flowHtml = p.flow.map(step => `<article class="sales-step"><b>${step[0]}</b><strong>${step[1]}</strong><p>${step[2]}</p></article>`).join('');
    productSection.innerHTML = `<div class="wrap"><div class="b2b-panel"><div class="b2b-head"><div><p class="kicker">${p.kicker}</p><h2>${p.title}</h2></div><div><p class="b2b-lead">${p.lead}</p><p class="b2b-quote-note">${p.quoteNote}</p></div></div><div class="b2b-grid">${cardHtml}</div><div class="sales-flow"><h3>${p.flowTitle}</h3><div class="sales-flow-grid">${flowHtml}</div></div></div></div>`;
  }

  const modal = document.createElement('div');
  modal.className = 'contact-modal';
  modal.hidden = true;
  modal.innerHTML = `<div class="contact-backdrop" data-contact-close></div><section class="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title"><button class="contact-close" type="button" data-contact-close aria-label="${t.close}">×</button><p class="kicker">CONTACT</p><h2 id="contact-title">${t.title}</h2><p class="contact-intro">${t.intro}</p><div class="contact-email-card"><span>${t.emailLabel}</span><strong>${EMAIL}</strong><button type="button" class="btn primary contact-copy">${t.copy}</button><small class="contact-copy-status" aria-live="polite"></small></div><div class="contact-meta"><div><span>${t.hours}</span><strong>${t.hoursValue}</strong></div><div><span>${t.response}</span><strong>${t.responseValue}</strong></div></div></section>`;
  document.body.appendChild(modal);

  const open = () => {
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.contact-close').focus();
  };
  const close = () => {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  };
  const bind = el => {
    if (el.dataset.contactBound) return;
    el.dataset.contactBound = '1';
    el.removeAttribute('href');
    el.setAttribute('role','button');
    el.setAttribute('tabindex','0');
    el.classList.add('contact-trigger');
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  };

  document.querySelectorAll('a[href^="mailto:"],a.contact-trigger').forEach(bind);
  const links = document.querySelector('.links');
  if (links && !links.querySelector('.contact-trigger')) {
    const el = document.createElement('a');
    el.textContent = t.nav;
    links.appendChild(el);
    bind(el);
  }
  const ctaButtons = document.querySelector('.cta .hero-buttons');
  if (ctaButtons && !ctaButtons.querySelector('.contact-trigger')) {
    const el = document.createElement('a');
    el.className = 'btn';
    el.textContent = t.button;
    ctaButtons.insertBefore(el, ctaButtons.lastElementChild);
    bind(el);
  }
  const foot = document.querySelector('.foot > div:last-child');
  if (foot && !foot.textContent.includes(EMAIL)) {
    const el = document.createElement('a');
    el.textContent = EMAIL;
    foot.insertBefore(document.createElement('br'), foot.firstChild);
    foot.insertBefore(el, foot.firstChild);
    bind(el);
  }

  modal.querySelectorAll('[data-contact-close]').forEach(el => el.addEventListener('click', close));
  modal.querySelector('.contact-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const area = document.createElement('textarea');
      area.value = EMAIL;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    const status = modal.querySelector('.contact-copy-status');
    status.textContent = t.copied;
    setTimeout(() => status.textContent = '', 2200);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });

  const header = document.querySelector('header');
  if (header) {
    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight + 16}px`);
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);
    window.addEventListener('orientationchange', syncHeaderHeight);
    if (window.ResizeObserver) new ResizeObserver(syncHeaderHeight).observe(header);
  }
})();