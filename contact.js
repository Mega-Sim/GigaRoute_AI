(() => {
  const EMAIL = 'support@gigaroute.ai';
  const locale = document.documentElement.lang || 'en';

  const copy = {
    en: {
      contact:{nav:'Contact',button:'Contact us',title:'Contact GigaRoute AI',intro:'For product inquiries, technical support, AutoMod consulting, dealer purchases, or partnerships, contact us at the email below.',emailLabel:'Support email',copy:'Copy email',copied:'Email copied',hours:'Business hours',hoursValue:'Monday–Friday, 09:00–18:00 KST',response:'Typical response',responseValue:'Within 1 business day',close:'Close'},
      assess:{kicker:'Free engineering review',title:'Free Initial Layout Assessment',lead:'Upload your DXF layout and receive a free initial engineering review before simulation begins.',checksTitle:'What we review',checks:['Disconnected or missing paths','Invalid intersections and junctions','Duplicate or overlapping geometry','Sharp curves and routing quality','Potential simulation modeling issues'],resultTitle:"What you'll receive",results:['Summary of key findings','Practical improvement recommendations','Guidance for next steps'],note:'The free service is an initial review. Full layout correction, network generation, and custom development are available as professional services.',cta:'Request Free Assessment'},
      workspaceDescription:'A customizable modeling and analysis workspace for cleaning CAD drawings, building graph structures, reviewing layout issues, and exporting models to AutoMod and NVIDIA Isaac Sim.'
    },
    ko: {
      contact:{nav:'문의',button:'문의하기',title:'GigaRoute AI 문의',intro:'제품 문의, 기술지원, AutoMod 컨설팅, 구매 및 협업 문의는 아래 이메일로 연락해 주세요.',emailLabel:'고객지원 이메일',copy:'이메일 복사',copied:'복사되었습니다',hours:'업무시간',hoursValue:'평일 09:00~18:00 (한국시간)',response:'일반적인 회신',responseValue:'영업일 기준 1일 이내',close:'닫기'},
      assess:{kicker:'무료 엔지니어링 검토',title:'무료 초기 레이아웃 점검',lead:'DXF 레이아웃을 보내주시면 시뮬레이션을 시작하기 전에 주요 문제를 무료로 점검해 드립니다.',checksTitle:'점검 항목',checks:['연결되지 않거나 누락된 경로','잘못된 교차점과 분기·합류','중복되거나 겹친 형상','급격한 곡선과 주행 경로 품질','시뮬레이션 모델링에 영향을 줄 수 있는 문제'],resultTitle:'제공 결과',results:['주요 문제 요약','실무적인 개선 권고','다음 단계 안내'],note:'무료 서비스는 초기 점검을 위한 것입니다. 전체 레이아웃 수정, 네트워크 생성 및 맞춤 개발은 유료 전문 서비스로 제공됩니다.',cta:'무료 점검 신청'},
      workspaceDescription:'CAD 도면 정리, 그래프 구조 생성, 레이아웃 문제 검토와 AutoMod 및 NVIDIA Isaac Sim Export를 지원하는 커스터마이징 가능한 모델링·분석 작업 공간입니다.'
    },
    'zh-CN': {
      contact:{nav:'联系我们',button:'联系我们',title:'联系 GigaRoute AI',intro:'如需产品咨询、技术支持、AutoMod 咨询、经销商购买或合作，请通过以下邮箱联系我们。',emailLabel:'支持邮箱',copy:'复制邮箱',copied:'邮箱已复制',hours:'工作时间',hoursValue:'周一至周五 09:00–18:00（韩国时间）',response:'通常回复时间',responseValue:'1 个工作日内',close:'关闭'},
      assess:{kicker:'免费工程审查',title:'免费初步布局检查',lead:'上传 DXF 布局，在开始仿真前获得免费的初步工程审查。',checksTitle:'检查内容',checks:['断开或缺失的路径','无效的交叉点与分支汇合','重复或重叠的几何图形','急弯与路径质量','可能影响仿真建模的问题'],resultTitle:'您将获得',results:['主要问题摘要','实用改进建议','下一步指导'],note:'免费服务仅用于初步审查。完整布局修正、网络生成和定制开发属于专业付费服务。',cta:'申请免费检查'},
      workspaceDescription:'可定制的建模与分析工作空间，用于清理 CAD 图纸、构建图结构、检查布局问题，并支持导出到 AutoMod 和 NVIDIA Isaac Sim。'
    },
    es: {
      contact:{nav:'Contacto',button:'Contactar',title:'Contactar con GigaRoute AI',intro:'Para consultas sobre productos, soporte técnico, consultoría AutoMod, compra mediante distribuidor o colaboraciones, escríbanos al correo indicado.',emailLabel:'Correo de soporte',copy:'Copiar correo',copied:'Correo copiado',hours:'Horario de atención',hoursValue:'Lunes a viernes, 09:00–18:00 KST',response:'Tiempo de respuesta habitual',responseValue:'En 1 día laborable',close:'Cerrar'},
      assess:{kicker:'Revisión de ingeniería gratuita',title:'Evaluación inicial gratuita del layout',lead:'Envíe su layout DXF y reciba una revisión inicial gratuita antes de comenzar la simulación.',checksTitle:'Qué revisamos',checks:['Rutas desconectadas o ausentes','Intersecciones y uniones no válidas','Geometría duplicada o superpuesta','Curvas cerradas y calidad de rutas','Posibles problemas para el modelado de simulación'],resultTitle:'Qué recibirá',results:['Resumen de hallazgos principales','Recomendaciones prácticas de mejora','Orientación sobre los siguientes pasos'],note:'El servicio gratuito es una revisión inicial. La corrección completa del layout, la generación de redes y el desarrollo personalizado se ofrecen como servicios profesionales.',cta:'Solicitar evaluación gratuita'},
      workspaceDescription:'Un espacio de modelado y análisis personalizable para depurar planos CAD, crear estructuras de grafos, revisar problemas del diseño y exportar modelos a AutoMod y NVIDIA Isaac Sim.'
    },
    ja: {
      contact:{nav:'お問い合わせ',button:'お問い合わせ',title:'GigaRoute AIへのお問い合わせ',intro:'製品、技術サポート、AutoModコンサルティング、ご購入、協業については、以下のメールアドレスまでご連絡ください。',emailLabel:'サポートメール',copy:'メールアドレスをコピー',copied:'コピーしました',hours:'営業時間',hoursValue:'平日 09:00～18:00（韓国時間）',response:'通常の返信時間',responseValue:'1営業日以内',close:'閉じる'},
      assess:{kicker:'無料エンジニアリングレビュー',title:'無料初期レイアウト診断',lead:'DXFレイアウトを送信すると、シミュレーション開始前に無料の初期エンジニアリングレビューを受けられます。',checksTitle:'確認項目',checks:['切断または欠落した経路','不正な交差点・分岐・合流','重複または重なった形状','急カーブと経路品質','シミュレーションモデリングに影響する可能性のある問題'],resultTitle:'提供内容',results:['主要な問題の要約','実務的な改善提案','次のステップのご案内'],note:'無料サービスは初期レビューを目的としています。レイアウト全体の修正、ネットワーク生成、カスタム開発は有料の専門サービスです。',cta:'無料診断を申し込む'},
      workspaceDescription:'CAD図面の整理、グラフ構造の構築、レイアウト問題の確認に加え、AutoModおよびNVIDIA Isaac SimへのExportに対応するカスタマイズ可能なモデリング・分析ワークスペースです。'
    }
  };

  const l = copy[locale] || copy.en;
  const t = l.contact;
  const a = l.assess;

  const languageSelect = document.querySelector('.language-select');
  if (languageSelect) {
    [...languageSelect.options].forEach(option => {
      if (option.textContent.trim() === 'English') option.value = 'index-en.html';
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    #free-assessment{padding:18px 0 72px}.assessment-panel{padding:34px;display:grid;grid-template-columns:.92fr 1.08fr;gap:30px;border:1px solid rgba(255,255,255,.9);border-radius:32px;background:linear-gradient(145deg,rgba(231,241,239,.96),rgba(255,255,255,.82));box-shadow:var(--shadow)}.assessment-copy h2{margin:0;font-size:clamp(34px,4.6vw,56px);line-height:1.05;letter-spacing:-.055em}.assessment-lead{margin:18px 0 0;color:var(--muted);font-size:17px;line-height:1.72}.assessment-actions{display:flex;flex-wrap:wrap;gap:11px;margin-top:24px}.assessment-note{margin:18px 0 0;color:var(--muted);font-size:12px;line-height:1.6}.assessment-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.assessment-card{padding:22px;border:1px solid var(--line);border-radius:21px;background:rgba(250,252,253,.88)}.assessment-card h3{margin:0 0 15px;font-size:18px}.assessment-card ul{margin:0;padding:0;list-style:none;display:grid;gap:10px}.assessment-card li{position:relative;padding-left:20px;color:var(--muted);font-size:14px;line-height:1.5}.assessment-card li:before{content:'✓';position:absolute;left:0;color:var(--brand);font-weight:900}
    @media(max-width:1050px){.assessment-panel{grid-template-columns:1fr}}@media(max-width:700px){#free-assessment{padding:6px 0 50px}.assessment-panel{padding:22px 18px}.assessment-grid{grid-template-columns:1fr}.assessment-actions .btn{width:100%}}
  `;
  document.head.appendChild(style);

  const hero = document.querySelector('.hero');
  if (hero && !document.querySelector('#free-assessment')) {
    const section = document.createElement('section');
    section.id = 'free-assessment';
    const list = items => items.map(item => `<li>${item}</li>`).join('');
    section.innerHTML = `<div class="wrap"><div class="assessment-panel"><div class="assessment-copy"><p class="kicker">${a.kicker}</p><h2>${a.title}</h2><p class="assessment-lead">${a.lead}</p><div class="assessment-actions"><a class="btn primary contact-trigger" role="button" tabindex="0">${a.cta}</a></div><p class="assessment-note">${a.note}</p></div><div class="assessment-grid"><article class="assessment-card"><h3>${a.checksTitle}</h3><ul>${list(a.checks)}</ul></article><article class="assessment-card"><h3>${a.resultTitle}</h3><ul>${list(a.results)}</ul></article></div></div></div>`;
    hero.insertAdjacentElement('afterend', section);
  }

  const workspaceCard = document.querySelector('#products .card.workspace');
  if (workspaceCard) {
    const name = workspaceCard.querySelector('h3');
    const description = workspaceCard.querySelector('p');
    const tags = workspaceCard.querySelector('.tags');
    if (name) name.textContent = 'GigaRoute Workspace (Enable Customizing)';
    if (description) description.textContent = l.workspaceDescription;
    if (tags) {
      ['AutoMod Export','NVIDIA Isaac Sim Export'].forEach(label => {
        if (![...tags.children].some(tag => tag.textContent === label)) {
          const tag = document.createElement('span');
          tag.textContent = label;
          tags.appendChild(tag);
        }
      });
    }
  }

  const modal=document.createElement('div');
  modal.className='contact-modal'; modal.hidden=true;
  modal.innerHTML=`<div class="contact-backdrop" data-contact-close></div><section class="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title"><button class="contact-close" type="button" data-contact-close aria-label="${t.close}">×</button><p class="kicker">CONTACT</p><h2 id="contact-title">${t.title}</h2><p class="contact-intro">${t.intro}</p><div class="contact-email-card"><span>${t.emailLabel}</span><strong>${EMAIL}</strong><button type="button" class="btn primary contact-copy">${t.copy}</button><small class="contact-copy-status" aria-live="polite"></small></div><div class="contact-meta"><div><span>${t.hours}</span><strong>${t.hoursValue}</strong></div><div><span>${t.response}</span><strong>${t.responseValue}</strong></div></div></section>`;
  document.body.appendChild(modal);
  const open=()=>{modal.hidden=false;document.body.classList.add('modal-open');modal.querySelector('.contact-close').focus();};
  const close=()=>{modal.hidden=true;document.body.classList.remove('modal-open');};
  const bind=el=>{if(el.dataset.contactBound)return;el.dataset.contactBound='1';el.removeAttribute('href');el.setAttribute('role','button');el.setAttribute('tabindex','0');el.classList.add('contact-trigger');el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});};
  document.querySelectorAll('a[href^="mailto:"],a.contact-trigger').forEach(bind);
  const links=document.querySelector('.links'); if(links&&!links.querySelector('.contact-trigger')){const el=document.createElement('a');el.textContent=t.nav;links.appendChild(el);bind(el);}
  const ctaButtons=document.querySelector('.cta .hero-buttons'); if(ctaButtons&&!ctaButtons.querySelector('.contact-trigger')){const el=document.createElement('a');el.className='btn';el.textContent=t.button;ctaButtons.insertBefore(el,ctaButtons.lastElementChild);bind(el);}
  const foot=document.querySelector('.foot > div:last-child'); if(foot&&!foot.textContent.includes(EMAIL)){const el=document.createElement('a');el.textContent=EMAIL;foot.insertBefore(document.createElement('br'),foot.firstChild);foot.insertBefore(el,foot.firstChild);bind(el);}
  modal.querySelectorAll('[data-contact-close]').forEach(el=>el.addEventListener('click',close));
  modal.querySelector('.contact-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(EMAIL);}catch{const area=document.createElement('textarea');area.value=EMAIL;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();}const status=modal.querySelector('.contact-copy-status');status.textContent=t.copied;setTimeout(()=>status.textContent='',2200);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
})();
