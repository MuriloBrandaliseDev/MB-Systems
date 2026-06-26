/* =================================================================
   MB System — Scripts de interatividade
   ================================================================= */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Preloader ---------- */
  window.addEventListener('load', () => {
    const pre = $('#preloader');
    if (pre) setTimeout(() => pre.classList.add('is-done'), 600);
  });

  /* ---------- Fallback para imagens quebradas ---------- */
  const IMG_FALLBACK = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop&auto=format&q=80';

  /* Logos de clientes: tenta .png, depois .svg placeholder, depois texto */
  $$('.client-logo__img, .hero__clients-logos img').forEach((img) => {
    img.addEventListener('error', () => {
      const card = img.closest('.client-logo');
      const fb = img.dataset.fallback;
      if (fb && !img.dataset.triedFallback) {
        img.dataset.triedFallback = '1';
        img.src = fb;
        return;
      }
      if (card) card.classList.add('is-text-only');
    });
  });

  $$('.project__media img, .product-card__media img, .roadmap-card__media img').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      img.src = IMG_FALLBACK;
    });
  });

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Tema claro/escuro ---------- */
  const themeToggle = $('#themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('mb-theme');
  // Padrão sempre claro (branco). Só usa o escuro se o usuário tiver escolhido antes.
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('mb-theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('mb-theme', 'dark');
      }
    });
  }

  /* ---------- Header scroll + barra de progresso ---------- */
  const header = $('#header');
  const progress = $('#scrollProgress');
  const toTop = $('#toTop');

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 30);
    if (toTop) toTop.classList.toggle('is-visible', y > 500);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Menu mobile ---------- */
  const navToggle = $('#navToggle');
  const nav = $('#nav');
  let backdrop = $('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }
  const closeMenu = () => {
    nav && nav.classList.remove('is-open');
    navToggle && navToggle.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    navToggle && navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    backdrop.addEventListener('click', closeMenu);
    $$('.nav__link').forEach((l) => l.addEventListener('click', closeMenu));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Contadores animados ---------- */
  const counters = $$('.stat__num[data-count]');
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Barras de competência ---------- */
  const skillBars = $$('.skill__bar span[data-skill]');
  if ('IntersectionObserver' in window) {
    const sio = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.skill + '%';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    skillBars.forEach((b) => sio.observe(b));
  } else {
    skillBars.forEach((b) => (b.style.width = b.dataset.skill + '%'));
  }

  /* ---------- Scroll spy (link ativo) ---------- */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('id');
          navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + id));
        }
      });
    }, { threshold: 0.5 });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Filtro de projetos + Ver mais ---------- */
  const portfolio = $('#portfolio');
  const portfolioToggle = $('#portfolioToggle');
  const filters = $$('.filter');
  const projects = $$('.project');
  let portfolioExpanded = false;
  let activeFilter = 'all';

  const applyProjectFilter = () => {
    projects.forEach((p) => {
      const matchCat = activeFilter === 'all' || p.dataset.category === activeFilter;
      const isFeatured = p.hasAttribute('data-featured');
      const hideExtra = !portfolioExpanded && activeFilter === 'all' && !isFeatured;
      p.classList.toggle('is-hidden', !matchCat || hideExtra);
    });
    if (portfolio) {
      portfolio.classList.toggle('is-expanded', portfolioExpanded || activeFilter !== 'all');
    }
    if (portfolioToggle) {
      portfolioToggle.style.display = activeFilter === 'all' ? '' : 'none';
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFilter = btn.dataset.filter;
      applyProjectFilter();
    });
  });

  if (portfolioToggle && portfolio) {
    const toggleLabel = portfolioToggle.querySelector('.portfolio-toggle-label');
    portfolioToggle.addEventListener('click', () => {
      portfolioExpanded = !portfolioExpanded;
      portfolioToggle.classList.toggle('is-expanded', portfolioExpanded);
      portfolioToggle.setAttribute('aria-expanded', String(portfolioExpanded));
      if (toggleLabel) toggleLabel.textContent = portfolioExpanded ? 'Ver menos projetos' : 'Ver mais projetos';
      applyProjectFilter();
    });
  }

  applyProjectFilter();

  /* ---------- Carrossel de depoimentos ---------- */
  const track = $('#testimonialTrack');
  const slides = track ? $$('.testimonial', track) : [];
  const dotsWrap = $('#tDots');
  const prevBtn = $('#tPrev');
  const nextBtn = $('#tNext');
  let current = 0;
  let autoTimer;

  if (track && slides.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Ir para depoimento ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap && dotsWrap.appendChild(dot);
    });

    const goTo = (i) => {
      current = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (dotsWrap) $$('button', dotsWrap).forEach((d, di) => d.classList.toggle('is-active', di === current));
      resetAuto();
    };
    window.goTo = goTo;

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

    const startAuto = () => (autoTimer = setInterval(() => goTo(current + 1), 6000));
    function resetAuto() { clearInterval(autoTimer); startAuto(); }
    startAuto();

    const carousel = $('#testimonialCarousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
    carousel.addEventListener('mouseleave', startAuto);

    // suporte a swipe (toque)
    let startX = 0;
    carousel.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) goTo(current + (diff < 0 ? 1 : -1));
    }, { passive: true });
  }

})();
