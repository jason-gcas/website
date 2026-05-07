/* GCAS Network — Interactive JS (Apple-clean rebuild) */

/* ═══ NAV SCROLL AWARE ═══ */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ═══ MOBILE MENU (hamburger) ═══ */
(function () {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('open', open);
    btn.classList.toggle('is-active', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-locked', open);
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });

  // Close when clicking any link inside (including the CTA)
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('open')) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  // Close on resize past mobile breakpoint
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 1024) setOpen(false);
    }, 100);
  });

  window.closeMobile = function () { setOpen(false); };
})();

/* ═══ REVEAL ON SCROLL ═══ */
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-scale');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.querySelectorAll(':scope > .reveal, :scope > .reveal-scale')) : [];
        const idx = Math.max(0, siblings.indexOf(entry.target));
        setTimeout(() => entry.target.classList.add('visible'), idx * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ═══ ANIMATED COUNTERS ═══ */
(function () {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix !== undefined ? el.dataset.prefix : '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = target * eased;
      const display = target >= 100 ? Math.round(current).toLocaleString() : (Math.round(current * 10) / 10);
      el.textContent = prefix + display + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
})();

/* ═══ SMOOTH ANCHOR LINKS (same-page only) ═══ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ═══ HIGHLIGHT ACTIVE NAV LINK ═══ */
(function () {
  const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((link) => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (/\.html$/.test(href)) {
      const linkPage = href.split('/').pop().split('#')[0];
      if (linkPage === path) link.classList.add('active');
    }
  });
})();

/* ═══ INTAKE FORMS ═══ */
(function () {
  const INTAKE_EMAIL = 'intake@gcasnetwork.com';

  /* Tab switching */
  const tabs = document.querySelectorAll('.form-tab');
  const panels = document.querySelectorAll('.form-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.panel;
      tabs.forEach(t => {
        const active = t === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
      });
      panels.forEach(p => p.classList.toggle('active', p.id === targetId));
    });
  });

  /* Format phone numbers */
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
      let formatted = digits;
      if (digits.length > 6) formatted = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
      else if (digits.length > 3) formatted = `(${digits.slice(0,3)}) ${digits.slice(3)}`;
      else if (digits.length > 0) formatted = `(${digits}`;
      e.target.value = formatted;
    });
  });

  /* Validate */
  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const empty = !field.value.trim();
      field.style.borderColor = empty ? '#d33' : '';
      if (empty) valid = false;
    });
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value);
      if (!ok) { emailField.style.borderColor = '#d33'; valid = false; }
    }
    return valid;
  }

  /* Build email body */
  function buildEmailBody(form, formType) {
    const data = new FormData(form);
    const lines = [`New ${formType} submission from the GCAS Network website:`, ''];

    const fieldLabels = {
      firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone',
      company: 'Company', state: 'State', yearsInBusiness: 'Years in Business',
      annualRevenue: 'Annual Revenue', primarySpecialty: 'Primary Specialty',
      goal: 'Business Goals', preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time', timezone: 'Time Zone',
      interest: 'Primary Interest', notes: 'Discussion Notes',
      background: 'Professional Background', expertise: 'Areas of Expertise',
      yearsExperience: 'Years of Experience', currentRole: 'Current Role',
      availability: 'Availability'
    };

    for (const [key, label] of Object.entries(fieldLabels)) {
      const values = data.getAll(key);
      if (values.length && values[0]) lines.push(`${label}: ${values.join(', ')}`);
    }

    const setAsides = data.getAll('setAside');
    if (setAsides.length) lines.push(`Set-Aside Designations: ${setAsides.join(', ')}`);

    lines.push('', '---', 'Submitted via gcasnetwork.com');
    return lines.join('\n');
  }

  /* Attach handler */
  function attachFormHandler(formId, successId, subject, formType) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form || !success) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(form)) {
        const firstInvalid = form.querySelector('[required][style*="d33"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const body = buildEmailBody(form, formType);
      const mailto = `mailto:${INTAKE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      form.style.display = 'none';
      success.classList.add('visible');
      window.location.href = mailto;
    });
  }

  attachFormHandler('qualifyForm', 'qualifySuccess', 'GCAS Qualification Intake', 'qualification');
  attachFormHandler('scheduleForm', 'scheduleSuccess', 'GCAS Discovery Call Request', 'discovery call');
  attachFormHandler('consultantForm', 'consultantSuccess', 'GCAS Consultant Application', 'consultant application');

  window.resetIntakeForm = function (e) {
    if (e) e.preventDefault();
    document.querySelectorAll('form').forEach(f => {
      if (f.id === 'qualifyForm' || f.id === 'scheduleForm' || f.id === 'consultantForm') {
        f.reset();
        f.style.display = '';
        f.querySelectorAll('[required]').forEach(field => { field.style.borderColor = ''; });
      }
    });
    document.querySelectorAll('.form-success').forEach(s => s.classList.remove('visible'));
    const firstTab = document.querySelector('.form-tab');
    if (firstTab) firstTab.click();
    const formCard = document.querySelector('.form-card');
    if (formCard) formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
})();

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' ? false : true;
        hamburger.setAttribute('aria-expanded', expanded);
        mobileMenu.classList.toggle('open');
        mobileMenu.setAttribute('aria-hidden', !expanded);
    });
}
