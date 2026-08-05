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

  const modal = document.createElement('div');
  modal.className = 'contact-modal';
  modal.hidden = true;
  modal.innerHTML = `<div class="contact-backdrop" data-contact-close></div><section class="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title"><button class="contact-close" type="button" data-contact-close aria-label="${t.close}">×</button><p class="kicker">CONTACT</p><h2 id="contact-title">${t.title}</h2><p class="contact-intro">${t.intro}</p><div class="contact-email-card"><span>${t.emailLabel}</span><strong>${EMAIL}</strong><button type="button" class="btn primary contact-copy">${t.copy}</button><small class="contact-copy-status" aria-live="polite"></small></div><div class="contact-meta"><div><span>${t.hours}</span><strong>${t.hoursValue}</strong></div><div><span>${t.response}</span><strong>${t.responseValue}</strong></div></div></section>`;
  document.body.appendChild(modal);

  const open = () => { modal.hidden = false; document.body.classList.add('modal-open'); modal.querySelector('.contact-close').focus(); };
  const close = () => { modal.hidden = true; document.body.classList.remove('modal-open'); };
  const bind = el => { el.removeAttribute('href'); el.setAttribute('role','button'); el.setAttribute('tabindex','0'); el.classList.add('contact-trigger'); el.addEventListener('click', open); el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }); };

  document.querySelectorAll('a[href^="mailto:"]').forEach(bind);
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
