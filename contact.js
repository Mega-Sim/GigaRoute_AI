(() => {
  const EMAIL = 'support@gigaroute.ai';
  const locale = document.documentElement.lang || 'en';

  const contactCopy = {
    en: {nav:'Contact',button:'Contact us',title:'Contact GigaRoute AI',intro:'For product inquiries, technical support, AutoMod consulting, or partnerships, contact us at the email below.',emailLabel:'Support email',copy:'Copy email',copied:'Email copied',hours:'Business hours',hoursValue:'Monday–Friday, 09:00–18:00 KST',response:'Typical response',responseValue:'Within 1 business day',close:'Close'},
    ko: {nav:'문의',button:'문의하기',title:'GigaRoute AI 문의',intro:'제품 문의, 기술지원, AutoMod 컨설팅 및 협업 문의는 아래 이메일로 연락해 주세요.',emailLabel:'고객지원 이메일',copy:'이메일 복사',copied:'복사되었습니다',hours:'업무시간',hoursValue:'평일 09:00~18:00 (한국시간)',response:'일반적인 회신',responseValue:'영업일 기준 1일 이내',close:'닫기'},
    'zh-CN': {nav:'联系我们',button:'联系我们',title:'联系 GigaRoute AI',intro:'如需产品咨询、技术支持、AutoMod 咨询或合作，请通过以下邮箱联系我们。',emailLabel:'支持邮箱',copy:'复制邮箱',copied:'邮箱已复制',hours:'工作时间',hoursValue:'周一至周五 09:00–18:00（韩国时间）',response:'通常回复时间',responseValue:'1 个工作日内',close:'关闭'},
    es: {nav:'Contacto',button:'Contactar',title:'Contactar con GigaRoute AI',intro:'Para consultas sobre productos, soporte técnico, consultoría AutoMod o colaboraciones, escríbanos al correo indicado.',emailLabel:'Correo de soporte',copy:'Copiar correo',copied:'Correo copiado',hours:'Horario de atención',hoursValue:'Lunes a viernes, 09:00–18:00 KST',response:'Tiempo de respuesta habitual',responseValue:'En 1 día laborable',close:'Cerrar'},
    ja: {nav:'お問い合わせ',button:'お問い合わせ',title:'GigaRoute AIへのお問い合わせ',intro:'製品、技術サポート、AutoModコンサルティング、協業については、以下のメールアドレスまでご連絡ください。',emailLabel:'サポートメール',copy:'メールアドレスをコピー',copied:'コピーしました',hours:'営業時間',hoursValue:'平日 09:00～18:00（韓国時間）',response:'通常の返信時間',responseValue:'1営業日以内',close:'閉じる'}
  };

  const productCopy = {
    en: {
      workspaceDescription:'A customizable modeling and analysis workspace for cleaning CAD drawings, building graph structures, reviewing layout issues, and exporting models to AutoMod and NVIDIA Isaac Sim.',
      detailTitle:'Workspace plans', monthly:'Monthly', yearly:'Annual', monthUnit:'/ month', yearUnit:'/ year', saving:'Save USD 240 compared with monthly billing', sales:'Contact sales', coming:'Coming Soon', preparing:'Product details and pricing are being prepared.'
    },
    ko: {
      workspaceDescription:'CAD 도면 정리, 그래프 구조 생성, 레이아웃 문제 검토와 AutoMod 및 NVIDIA Isaac Sim Export를 지원하는 커스터마이징 가능한 모델링·분석 작업 공간입니다.',
      detailTitle:'Workspace 요금제', monthly:'월간', yearly:'연간', monthUnit:'/ 월', yearUnit:'/ 년', saving:'월간 결제 대비 연간 USD 240 절감', sales:'구매 문의', coming:'준비 중', preparing:'제품 상세 기능과 가격을 준비하고 있습니다.'
    },
    'zh-CN': {
      workspaceDescription:'可定制的建模与分析工作空间，用于清理 CAD 图纸、构建图结构、检查布局问题，并支持导出到 AutoMod 和 NVIDIA Isaac Sim。',
      detailTitle:'Workspace 方案', monthly:'月付', yearly:'年付', monthUnit:'/ 月', yearUnit:'/ 年', saving:'相比月付每年节省 USD 240', sales:'联系销售', coming:'即将推出', preparing:'产品详细功能与价格正在准备中。'
    },
    es: {
      workspaceDescription:'Un espacio de modelado y análisis personalizable para depurar planos CAD, crear estructuras de grafos, revisar problemas del diseño y exportar modelos a AutoMod y NVIDIA Isaac Sim.',
      detailTitle:'Planes de Workspace', monthly:'Mensual', yearly:'Anual', monthUnit:'/ mes', yearUnit:'/ año', saving:'Ahorre USD 240 al año frente al pago mensual', sales:'Contactar ventas', coming:'Próximamente', preparing:'Los detalles y precios del producto están en preparación.'
    },
    ja: {
      workspaceDescription:'CAD図面の整理、グラフ構造の構築、レイアウト問題の確認に加え、AutoModおよびNVIDIA Isaac SimへのExportに対応するカスタマイズ可能なモデリング・分析ワークスペースです。',
      detailTitle:'Workspace料金プラン', monthly:'月額', yearly:'年額', monthUnit:'/ 月', yearUnit:'/ 年', saving:'月額払いと比べて年間 USD 240 お得', sales:'購入について相談', coming:'準備中', preparing:'製品の詳細機能と料金を準備しています。'
    }
  };

  const t = contactCopy[locale] || contactCopy.en;
  const p = productCopy[locale] || productCopy.en;

  const style = document.createElement('style');
  style.textContent = `
    #products .cards{align-items:stretch}.product-column{display:grid;grid-template-rows:auto 1fr;gap:14px;min-width:0}.product-column>.card{width:100%;min-height:325px}.product-detail{min-height:255px;padding:24px;border:1px solid rgba(255,255,255,.88);border-radius:25px;box-shadow:0 14px 40px rgba(42,60,82,.08);overflow:hidden}.product-detail.workspace-detail{background:linear-gradient(155deg,#e7f1ef,#fff)}.product-detail.basic-detail{background:linear-gradient(155deg,#e8eff7,#fff)}.product-detail.pro-detail{background:linear-gradient(155deg,#efedf8,#fff)}.product-detail.amr-detail{background:linear-gradient(155deg,#f6efe5,#fff)}.product-detail h4{margin:0 0 18px;font-size:20px;letter-spacing:-.035em}.price-stack{display:grid;gap:10px}.mini-price{padding:15px;border:1px solid var(--line);border-radius:17px;background:rgba(255,255,255,.72)}.mini-price.featured{border-color:rgba(71,111,123,.24);background:rgba(255,255,255,.9)}.mini-price b{display:block;margin-bottom:8px;color:var(--brand);font-size:12px}.mini-price strong{font-size:27px;line-height:1}.mini-price span{margin-left:6px;color:var(--muted);font-size:12px;font-weight:800}.mini-price p{margin:10px 0 0;color:var(--muted);font-size:12px;line-height:1.45}.mini-price .btn{width:100%;margin-top:13px}.coming-box{height:100%;min-height:205px;display:grid;place-content:center;text-align:center}.coming-box strong{font-size:23px}.coming-box p{max-width:210px;margin:12px auto 0;color:var(--muted);font-size:14px;line-height:1.6}.card.workspace h3{font-size:21px;line-height:1.25}.card.workspace p{font-size:15px;line-height:1.55}@media(max-width:1050px){#products .cards{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:700px){#products .cards{grid-template-columns:1fr}.product-detail{min-height:auto}.product-column>.card{min-height:auto}.coming-box{min-height:150px}}
  `;
  document.head.appendChild(style);

  const cards = document.querySelector('#products .cards');
  if (cards && !cards.querySelector('.product-column')) {
    [...cards.children].forEach((card, index) => {
      const type = ['workspace','basic','pro','amr'][index] || 'basic';
      const column = document.createElement('div');
      column.className = 'product-column';
      card.parentNode.insertBefore(column, card);
      column.appendChild(card);

      if (type === 'workspace') {
        const name = card.querySelector('h3');
        const description = card.querySelector('p');
        const tags = card.querySelector('.tags');
        if (name) name.textContent = 'GigaRoute Workspace (Enable Customizing)';
        if (description) description.textContent = p.workspaceDescription;
        if (tags) {
          ['AutoMod Export','NVIDIA Isaac Sim Export'].forEach(label => {
            if (![...tags.children].some(tag => tag.textContent === label)) {
              const tag = document.createElement('span'); tag.textContent = label; tags.appendChild(tag);
            }
          });
        }
      }

      const detail = document.createElement('article');
      detail.className = `product-detail ${type}-detail`;
      if (type === 'workspace') {
        detail.innerHTML = `<h4>${p.detailTitle}</h4><div class="price-stack"><div class="mini-price"><b>${p.monthly}</b><strong>USD 120</strong><span>${p.monthUnit}</span><a class="btn contact-trigger" role="button" tabindex="0">${p.sales}</a></div><div class="mini-price featured"><b>${p.yearly}</b><strong>USD 1,200</strong><span>${p.yearUnit}</span><p>${p.saving}</p><a class="btn primary contact-trigger" role="button" tabindex="0">${p.sales}</a></div></div>`;
      } else {
        detail.innerHTML = `<div class="coming-box"><div><strong>${p.coming}</strong><p>${p.preparing}</p></div></div>`;
      }
      column.appendChild(detail);
    });
  }

  document.querySelector('#workspace-pricing')?.remove();

  const modal = document.createElement('div');
  modal.className = 'contact-modal';
  modal.hidden = true;
  modal.innerHTML = `<div class="contact-backdrop" data-contact-close></div><section class="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title"><button class="contact-close" type="button" data-contact-close aria-label="${t.close}">×</button><p class="kicker">CONTACT</p><h2 id="contact-title">${t.title}</h2><p class="contact-intro">${t.intro}</p><div class="contact-email-card"><span>${t.emailLabel}</span><strong>${EMAIL}</strong><button type="button" class="btn primary contact-copy">${t.copy}</button><small class="contact-copy-status" aria-live="polite"></small></div><div class="contact-meta"><div><span>${t.hours}</span><strong>${t.hoursValue}</strong></div><div><span>${t.response}</span><strong>${t.responseValue}</strong></div></div></section>`;
  document.body.appendChild(modal);

  const open = () => { modal.hidden = false; document.body.classList.add('modal-open'); modal.querySelector('.contact-close').focus(); };
  const close = () => { modal.hidden = true; document.body.classList.remove('modal-open'); };
  const bind = el => { if (el.dataset.contactBound) return; el.dataset.contactBound='1'; el.removeAttribute('href'); el.setAttribute('role','button'); el.setAttribute('tabindex','0'); el.classList.add('contact-trigger'); el.addEventListener('click',open); el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}}); };

  document.querySelectorAll('a[href^="mailto:"],a.contact-trigger').forEach(bind);
  const links = document.querySelector('.links');
  if (links && !links.querySelector('.contact-trigger')) { const a=document.createElement('a'); a.textContent=t.nav; links.appendChild(a); bind(a); }
  const ctaButtons = document.querySelector('.cta .hero-buttons');
  if (ctaButtons && !ctaButtons.querySelector('.contact-trigger')) { const a=document.createElement('a'); a.className='btn'; a.textContent=t.button; ctaButtons.insertBefore(a,ctaButtons.lastElementChild); bind(a); }
  const foot = document.querySelector('.foot > div:last-child');
  if (foot && !foot.textContent.includes(EMAIL)) { const a=document.createElement('a'); a.textContent=EMAIL; foot.insertBefore(document.createElement('br'),foot.firstChild); foot.insertBefore(a,foot.firstChild); bind(a); }

  modal.querySelectorAll('[data-contact-close]').forEach(el=>el.addEventListener('click',close));
  modal.querySelector('.contact-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(EMAIL);}catch{const area=document.createElement('textarea');area.value=EMAIL;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();}const status=modal.querySelector('.contact-copy-status');status.textContent=t.copied;setTimeout(()=>status.textContent='',2200);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
})();
