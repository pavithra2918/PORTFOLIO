// ============================================================
//  PAVITHRA S PORTFOLIO - MAIN JAVASCRIPT
// ============================================================

// ---- Particles ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    const left  = Math.random() * 100;
    const delay = Math.random() * 15;
    const dur   = Math.random() * 12 + 10;
    const colors = ['#6366f1','#a855f7','#818cf8','#c084fc','#06b6d4'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      background:${color};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    container.appendChild(p);
  }
}

// ---- Navbar scroll effect ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 100;
      if (window.scrollY >= top) current = s.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  });
}

// ---- Mobile hamburger ----
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ---- Typewriter effect ----
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const texts = [
    'FullStack Developer',
    'UI/UX Enthusiast',
    'Java Programmer'
  ];
  let ti = 0, ci = 0, deleting = false;
  const speed = { type: 80, delete: 45, pause: 1800 };

  function tick() {
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        setTimeout(() => { deleting = true; tick(); }, speed.pause);
        return;
      }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(tick, deleting ? speed.delete : speed.type);
  }
  tick();
}

// ---- Scroll reveal ----
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.section-header, .skill-category, .timeline-item, .cert-card, .edu-card, ' +
    '.about-content, .about-image-col, .contact-card, .contact-form-wrapper, .stat-card'
  );

  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ---- Stagger reveal for grid items ----
function initStaggerReveal() {
  const grids = document.querySelectorAll('.skills-grid, .cert-grid');
  grids.forEach(grid => {
    const children = grid.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });
}

// ---- Resume modal ----
function initResumeModal() {
  const modal      = document.getElementById('resumeModal');
  const viewResume = document.getElementById('viewResume');
  const resumeBtn  = document.getElementById('resumeBtn');
  const modalClose = document.getElementById('modalClose');

  function openModal() { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }

  if (viewResume) viewResume.addEventListener('click', openModal);
  if (resumeBtn)  resumeBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// ---- Contact form ----
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Message Sent!
    `;
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Send Message
      `;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ---- Smooth hover glow on cards ----
function initCardGlow() {
  document.querySelectorAll('.glass-card, .cert-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initNavbar();
  initHamburger();
  initTypewriter();
  initScrollReveal();
  initStaggerReveal();
  initResumeModal();
  initContactForm();
  initCardGlow();
});
