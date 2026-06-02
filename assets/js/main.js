document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  initTimeline();
  initStatCounters();
  initMobileMenu();
});

/* ----- Portfolio (index & about) ----- */
function initPortfolio() {
  const preview = document.getElementById('portfolio-preview');
  const items = Array.from(document.querySelectorAll('[data-portfolio-item]'));
  const section = document.getElementById('portfolio');
  if (!items.length) return;

  const AUTOPLAY_MS = 2800;
  let index = 0;
  let timer = null;
  let paused = false;

  const setActive = (item, fromUser = false) => {
    items.forEach((el) => {
      const isActive = el === item;
      el.classList.toggle('is-active', isActive);
      el.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    index = items.indexOf(item);

    const { image, alt } = item.dataset;
    if (preview && image) {
      preview.style.opacity = '0';
      window.setTimeout(() => {
        preview.src = image;
        preview.alt = alt || '';
        preview.style.opacity = '';
      }, 150);
    }

    if (fromUser) {
      paused = false;
      restartAutoplay();
    }
  };

  const advance = () => {
    if (paused) return;
    index = (index + 1) % items.length;
    setActive(items[index]);
  };

  const restartAutoplay = () => {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(advance, AUTOPLAY_MS);
  };

  items.forEach((item) => {
    item.addEventListener('click', () => setActive(item, true));
  });

  if (section) {
    section.addEventListener('mouseenter', () => {
      paused = true;
    });
    section.addEventListener('mouseleave', () => {
      paused = false;
      restartAutoplay();
    });
  }

  items[0].classList.add('is-active');
  restartAutoplay();
}

/* ----- Timeline (about) ----- */
function initTimeline() {
  const preview = document.getElementById('timeline-preview');
  const yearEl = document.getElementById('timeline-year');
  const headingEl = document.getElementById('timeline-heading');
  const descriptionEl = document.getElementById('timeline-description');
  const contentEl = document.getElementById('timeline-content');
  const progressEl = document.getElementById('timeline-progress');
  const items = Array.from(document.querySelectorAll('[data-timeline-item]'));
  const section = document.getElementById('timeline');
  if (!items.length) return;

  const AUTOPLAY_MS = 2800;
  let index = 0;
  let timer = null;
  let paused = false;

  const updateProgress = (i) => {
    if (!progressEl || items.length < 2) return;
    progressEl.style.width = `${(i / (items.length - 1)) * 100}%`;
  };

  const setActive = (item, fromUser = false) => {
    items.forEach((el) => {
      const isActive = el === item;
      el.classList.toggle('is-active', isActive);
      el.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    index = items.indexOf(item);
    updateProgress(index);

    if (contentEl) contentEl.style.opacity = '0';
    if (preview) preview.style.opacity = '0';

    window.setTimeout(() => {
      if (yearEl) yearEl.textContent = item.dataset.year || '';
      if (headingEl) headingEl.textContent = item.dataset.heading || '';
      if (descriptionEl) descriptionEl.textContent = item.dataset.description || '';

      const { image, alt } = item.dataset;
      if (preview && image) {
        preview.src = image;
        preview.alt = alt || '';
      }

      if (contentEl) contentEl.style.opacity = '';
      if (preview) preview.style.opacity = '';
    }, 150);

    if (fromUser) {
      paused = false;
      restartAutoplay();
    }
  };

  const advance = () => {
    if (paused) return;
    index = (index + 1) % items.length;
    setActive(items[index]);
  };

  const restartAutoplay = () => {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(advance, AUTOPLAY_MS);
  };

  items.forEach((item) => {
    item.addEventListener('click', () => setActive(item, true));
  });

  if (section) {
    section.addEventListener('mouseenter', () => {
      paused = true;
    });
    section.addEventListener('mouseleave', () => {
      paused = false;
      restartAutoplay();
    });
  }

  items[0].classList.add('is-active');
  updateProgress(0);
  restartAutoplay();
}

/* ----- Stats counter (index) ----- */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-stat-counter]');
  const section = document.getElementById('stats');
  if (!section || !counters.length) return;

  const STEP = 10;
  const STEP_MS = 120;

  const animate = (el) => {
    const target = Number(el.dataset.target) || 0;
    let current = 0;
    el.textContent = '0';

    const tick = () => {
      if (current >= target) {
        el.textContent = String(target);
        return;
      }
      current = Math.min(current + STEP, target);
      el.textContent = String(current);
      window.setTimeout(tick, STEP_MS);
    };
    tick();
  };

  const run = () => {
    counters.forEach((el) => {
      if (el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';
      animate(el);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );
  observer.observe(section);
}

/* ----- Mobile menu (all pages) ----- */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const panel = document.getElementById('mobile-menu-panel');
  if (!btn || !panel) return;

  const spans = btn.querySelectorAll('span');
  let isOpen = false;

  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      panel.classList.remove('hidden');
      spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      panel.classList.add('hidden');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isOpen) {
      btn.click();
    }
  });
}
