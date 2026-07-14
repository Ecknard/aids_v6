/* ============================================
   AIDS Website — scripts.js (v2)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu toggle ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
  });
  document.querySelectorAll('.nav-mobile-menu a').forEach(link =>
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      hamburger?.setAttribute('aria-label', 'Ouvrir le menu de navigation');
    })
  );

  /* ---- Scroll reveal ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- Counter animation (amélioration progressive : le HTML contient déjà la vraie valeur) ---- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.count;
        const suffix = entry.target.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.floor(target / 50));
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          entry.target.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 30);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---- Active nav on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === '#' + entry.target.id)
            link.classList.add('active-nav');
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));

  /* ---- Smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Formspree contact form feedback ---- */
  const form = document.querySelector('#contact form, form.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Envoi en cours...';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          btn.innerHTML = '✅ Message envoyé !';
          btn.style.background = '#1a7a45';
          form.reset();
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 5000);
        } else {
          throw new Error('Erreur serveur');
        }
      } catch {
        btn.innerHTML = '❌ Erreur — réessayez';
        btn.style.background = '#c0392b';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }
    });
  }

  /* ---- Carrousel partenaires : permettre le défilement tactile manuel ---- */
  const partnersWrap = document.querySelector('.partners-track-wrap');
  const partnersTrack = document.querySelector('.partners-track');
  if (partnersWrap && partnersTrack) {
    let resumeTimer;
    const pauseAuto = () => {
      partnersTrack.style.animationPlayState = 'paused';
      clearTimeout(resumeTimer);
    };
    const scheduleResume = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        // Repart proprement du début pour éviter un saut visuel après un scroll manuel
        partnersWrap.scrollTo({ left: 0, behavior: 'smooth' });
        partnersTrack.style.animationPlayState = 'running';
      }, 2500);
    };
    partnersWrap.addEventListener('touchstart', pauseAuto, { passive: true });
    partnersWrap.addEventListener('touchend', scheduleResume, { passive: true });
    partnersWrap.addEventListener('pointerdown', pauseAuto);
    partnersWrap.addEventListener('pointerup', scheduleResume);
  }

});
