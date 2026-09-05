(() => {
  const roundPublicPerformance = () => {
    const section = document.querySelector('#engine-performance');
    if (!section) return false;
    section.querySelectorAll('h2,strong,p,span').forEach((el) => {
      if (el.children.length) return;
      el.textContent = el.textContent.replace(/21\.559/g, '21.6').replace(/21,559/g, '21,6');
    });
    return true;
  };

  const apply = () => {
    if (roundPublicPerformance()) return;
    requestAnimationFrame(() => {
      if (roundPublicPerformance()) return;
      setTimeout(roundPublicPerformance, 0);
    });
  };

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
})();
