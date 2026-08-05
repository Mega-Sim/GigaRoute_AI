(() => {
  const EMAIL = 'support@gigaroute.ai';
  const locale = document.documentElement.lang || 'en';
  const copy = {
    en: {nav:'Contact', button:'Contact us', title:'Contact GigaRoute AI', intro:'For product inquiries, technical support, AutoMod consulting, or partnerships, contact us at the email below.', emailLabel:'Support email', copy:'Copy email', copied:'Email copied', hours:'Business hours', hoursValue:'Monday–Friday, 09:00–18:00 KST', response:'Typical response', responseValue:'Within 1 business day', close:'Close'},
    ko: {nav:'문의', button:'문의하기', title:'GigaRoute AI 문의', intro:'제품 문의, 기술지원, AutoMod 컨설팅 및 협업 문의는 아래 이메일로 연락해 주세요.', emailLabel:'고객지원 이메일', copy:'이메일 복사', copied:'복사되었습니다', hours:'업무시간', hoursValue:'평일 09:00~18:00 (한국시간)', response:'일반적인 회신', responseValue:'영업일 기준 1일 이내', close:'닫기'},
    'zh-CN': {nav:'联系我们', button:'联系我们', title:'联系 GigaRoute AI', intro:'如需产品咨询、技术支持、AutoMod 咨询或合作，请通过以下邮箱联系我们。', emailLabel:'支持邮箱', copy:'复制邮箱', copied:'邮箱已复制', hours:'工作时间', hoursValue:'周一至周五 09:00–18:00（韩国时间）', response:'通常回复时间', responseValue:'1 个工作日内', close:'关闭'},
    es: {nav:'Contacto', button:'Contactar', title:'Contactar con GigaRoute AI', intro:'Para consultas sobre productos, soporte técnico, consultoría AutoMod o colaboraciones, escríbanos al correo indicado.', emailLabel:'Correo de soporte', copy:'Copiar correo', copied:'Correo copiado', hours:'Horario de atención', hoursValue:'Lunes a viernes, 09:00–18:00 KST', response:'Tiempo de respuesta habitual', responseValue:'En 1 día laborable', close:'Cerrar'},
    ja: {nav:'お問い合わせ', button:'お問い合わせ', title:'GigaRoute AIへのお問い合わせ', intro:'製品、技術サポート、AutoModコンサルティング、協業については、以下のメールアドレスまでご連絡ください。', emailLabel:'サポートメール', copy:'メールアドレスをコピー', copied:'コピーしました', hours:'営業時間', hoursValue:'平日 09:00～18:00（韓国時間）', response:'通常の返信時間', responseValue:'1営業日以内', close:'閉じる'}
  };
  const t = copy[locale] || copy.en;

  const workspaceCopy = {
    en: {
      description: 'A customizable modeling and analysis workspace for cleaning CAD drawings, building graph structures, reviewing layout issues, and exporting models to AutoMod and NVIDIA Isaac Sim.',
      pricingKicker: 'Workspace pricing', pricingTitle: 'Start with GigaRoute Workspace.', pricingIntro: 'Choose monthly flexibility or save with an annual subscription. Customization services are available for site-specific workflows and export requirements.',
      monthly: 'Monthly', yearly: 'Annual', monthUnit: '/ month', yearUnit: '/ year', yearlyNote: 'Save USD 240 compared with monthly billing', contact: 'Contact sales'
    },
    ko: {
      description: 'CAD 도면 정리, 그래프 구조 생성, 레이아웃 문제 검토와 AutoMod 및 NVIDIA Isaac Sim Export를 지원하는 커스터마이징 가능한 모델링·분석 작업 공간입니다.',
      pricingKicker: 'Workspace 가격', pricingTitle: 'GigaRoute Workspace를 시작하세요.', pricingIntro: '월간 구독과 할인된 연간 구독 중 선택할 수 있으며, 현장별 작업 흐름과 Export 요구사항에 맞춘 커스터마이징 서비스도 제공합니다.',
      monthly: '월간', yearly: '연간', monthUnit: '/ 월', yearUnit: '/ 년', yearlyNote: '월간 결제 대비 연간 USD 240 절감', contact: '구매 문의'
    },
    'zh-CN': {
      description: '可定制的建模与分析工作空间，用于清理 CAD 图纸、构建图结构、检查布局问题，并支持导出到 AutoMod 和 NVIDIA Isaac Sim。',
      pricingKicker: 'Workspace 价格', pricingTitle: '开始使用 GigaRoute Workspace。', pricingIntro: '可选择灵活的月度订阅或更优惠的年度订阅，并可针对现场工作流程和导出需求提供定制服务。',
      monthly: '月付', yearly: '年付', monthUnit: '/ 月', yearUnit: '/ 年', yearlyNote: '相比月付每年节省 USD 240', contact: '联系销售'
    },
    es: {
      description: 'Un espacio de modelado y análisis personalizable para depurar planos CAD, crear estructuras de grafos, revisar problemas del diseño y exportar modelos a AutoMod y NVIDIA Isaac Sim.',
      pricingKicker: 'Precios de Workspace', pricingTitle: 'Empiece con GigaRoute Workspace.', pricingIntro: 'Elija la flexibilidad mensual o ahorre con una suscripción anual. También ofrecemos personalización para flujos de trabajo y requisitos de exportación específicos.',
      monthly: 'Mensual', yearly: 'Anual', monthUnit: '/ mes', yearUnit: '/ año', yearlyNote: 'Ahorre USD 240 al año frente al pago mensual', contact: 'Contactar ventas'
    },
    ja: {
      description: 'CAD図面の整理、グラフ構造の構築、レイアウト問題の確認に加え、AutoModおよびNVIDIA Isaac SimへのExportに対応するカスタマイズ可能なモデリング・分析ワークスペースです。',
      pricingKicker: 'Workspace 料金', pricingTitle: 'GigaRoute Workspaceを始めましょう。', pricingIntro: '柔軟な月額プランまたは割安な年額プランを選択できます。現場固有のワークフローやExport要件に合わせたカスタマイズにも対応します。',
      monthly: '月額', yearly: '年額', monthUnit: '/ 月', yearUnit: '/ 年', yearlyNote: '月額払いと比べて年間 USD 240 お得', contact: '購入について相談'
    }
  };
  const wt = workspaceCopy[locale] || workspaceCopy.en;

  const workspaceCard = document.querySelector('.card.workspace');
  if (workspaceCard) {
    const name = workspaceCard.querySelector('h3');
    const description = workspaceCard.querySelector('p');
    const tags = workspaceCard.querySelector('.tags');
    if (name) name.textContent = 'GigaRoute Workspace (Enable Customizing)';
    if (description) description.textContent = wt.description;
    if (tags) {
      ['AutoMod Export', 'NVIDIA Isaac Sim Export'].forEach(label => {
        if (![...tags.children].some(tag => tag.textContent === label)) {
          const tag = document.createElement('span');
          tag.textContent = label;
          tags.appendChild(tag);
        }
      });
    }
  }

  if (!document.querySelector('#workspace-pricing')) {
    const style = document.createElement('style');
    style.textContent = `
      #workspace-pricing{padding-top:30px}.pricing-heading{max-width:760px;margin-bottom:30px}.pricing-heading h2{margin:0;font-size:clamp(34px,4.8vw,58px);line-height:1.05;letter-spacing:-.055em}.pricing-heading>p:last-child{margin:18px 0 0;color:var(--muted);font-size:17px;line-height:1.7}.pricing-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.price-card{padding:30px;border:1px solid rgba(255,255,255,.9);border-radius:28px;background:rgba(255,255,255,.78);box-shadow:var(--shadow)}.price-card.featured{background:linear-gradient(145deg,rgba(231,241,239,.96),rgba(255,255,255,.88));border-color:rgba(71,111,123,.24)}.price-card h3{margin:0 0 18px;font-size:22px}.price{display:flex;align-items:flex-end;gap:9px;margin-bottom:14px}.price strong{font-size:clamp(42px,6vw,64px);line-height:.95;letter-spacing:-.055em}.price span{padding-bottom:7px;color:var(--muted);font-weight:800}.price-note{min-height:25px;margin:0 0 22px;color:var(--muted);line-height:1.55}.price-card .btn{width:100%}@media(max-width:700px){.pricing-grid{grid-template-columns:1fr}.price-card{padding:24px}.card.workspace h3{font-size:21px;line-height:1.25}}`;
    document.head.appendChild(style);

    const pricing = document.createElement('section');
    pricing.id = 'workspace-pricing';
    pricing.innerHTML = `<div class="wrap"><div class="pricing-heading"><p class="kicker">${wt.pricingKicker}</p><h2>${wt.pricingTitle}</h2><p>${wt.pricingIntro}</p></div><div class="pricing-grid"><article class="price-card"><h3>${wt.monthly}</h3><div class="price"><strong>USD 120</strong><span>${wt.monthUnit}</span></div><p class="price-note">&nbsp;</p><a class="btn contact-trigger" role="button" tabindex="0">${wt.contact}</a></article><article class="price-card featured"><h3>${wt.yearly}</h3><div class="price"><strong>USD 1,200</strong><span>${wt.yearUnit}</span></div><p class="price-note">${wt.yearlyNote}</p><a class="btn primary contact-trigger" role="button" tabindex="0">${wt.contact}</a></article></div></div>`;
    const roadmap = document.querySelector('#roadmap');
    const ctaSection = roadmap ? roadmap.nextElementSibling : null;
    if (ctaSection) ctaSection.parentNode.insertBefore(pricing, ctaSection);
    else document.querySelector('main')?.appendChild(pricing);
  }

  const modal = document.createElement('div');
  modal.className = 'contact-modal';
  modal.hidden = true;
  modal.innerHTML = `<div class="contact-backdrop" data-contact-close></div><section class="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title"><button class="contact-close" type="button" data-contact-close aria-label="${t.close}">×</button><p class="kicker">CONTACT</p><h2 id="contact-title">${t.title}</h2><p class="contact-intro">${t.intro}</p><div class="contact-email-card"><span>${t.emailLabel}</span><strong>${EMAIL}</strong><button type="button" class="btn primary contact-copy">${t.copy}</button><small class="contact-copy-status" aria-live="polite"></small></div><div class="contact-meta"><div><span>${t.hours}</span><strong>${t.hoursValue}</strong></div><div><span>${t.response}</span><strong>${t.responseValue}</strong></div></div></section>`;
  document.body.appendChild(modal);

  const open = () => { modal.hidden = false; document.body.classList.add('modal-open'); modal.querySelector('.contact-close').focus(); };
  const close = () => { modal.hidden = true; document.body.classList.remove('modal-open'); };
  const bind = el => { el.removeAttribute('href'); el.setAttribute('role','button'); el.setAttribute('tabindex','0'); el.classList.add('contact-trigger'); el.addEventListener('click', open); el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }); };

  document.querySelectorAll('a[href^="mailto:"], a.contact-trigger').forEach(bind);
  const links = document.querySelector('.links');
  if (links && !links.querySelector('.contact-trigger')) { const a=document.createElement('a'); a.textContent=t.nav; links.appendChild(a); bind(a); }
  const ctaButtons = document.querySelector('.cta .hero-buttons');
  if (ctaButtons && !ctaButtons.querySelector('.contact-trigger')) { const a=document.createElement('a'); a.className='btn'; a.textContent=t.button; ctaButtons.insertBefore(a, ctaButtons.lastElementChild); bind(a); }
  const foot = document.querySelector('.foot > div:last-child');
  if (foot && !foot.textContent.includes(EMAIL)) { const a=document.createElement('a'); a.textContent=EMAIL; foot.insertBefore(document.createElement('br'), foot.firstChild); foot.insertBefore(a, foot.firstChild); bind(a); }

  modal.querySelectorAll('[data-contact-close]').forEach(el => el.addEventListener('click', close));
  modal.querySelector('.contact-copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(EMAIL); }
    catch { const area=document.createElement('textarea'); area.value=EMAIL; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); }
    const status=modal.querySelector('.contact-copy-status'); status.textContent=t.copied; setTimeout(()=>status.textContent='',2200);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
})();
