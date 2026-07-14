/* ============================================
   AIDS — Gestion du thème clair / sombre
   Le thème est appliqué le plus tôt possible via
   un script inline dans <head> (anti-flash).
   Ce fichier gère uniquement l'interaction du switch.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const root = document.documentElement;

  const applyState = () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      isDark ? 'Activer le mode clair' : 'Activer le mode sombre'
    );
  };

  applyState();

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('aids-theme', next);
    applyState();
  });

  // Si l'utilisateur n'a jamais choisi manuellement, on suit la préférence système en direct
  if (!localStorage.getItem('aids-theme') && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', (e) => {
      if (!localStorage.getItem('aids-theme')) {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        applyState();
      }
    });
  }
});
