// Header shadow + top button
const header = document.querySelector('.header');
const topBtn = document.querySelector('.top-btn');
const onScroll = () => {
  header.classList.toggle('scrolled', scrollY > 10);
  topBtn && topBtn.classList.toggle('show', scrollY > 600);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();
topBtn && topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile menu
document.querySelector('.menu-btn').addEventListener('click', () => document.body.classList.toggle('menu-open'));
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Number counter
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, start = performance.now(), dur = 1800;
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

// Works filter
document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.toggle('on', b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll('.work').forEach(w => w.classList.toggle('hide', f !== 'all' && w.dataset.cat !== f));
    const count = document.querySelector('.works-count b');
    if (count) count.textContent = document.querySelectorAll('.work:not(.hide)').length;
  });
});

// Work cards without their own link (main page) open the detail page
document.querySelectorAll('.work').forEach(w => {
  if (!w.querySelector('a')) w.addEventListener('click', () => { location.href = 'work-detail.html'; });
});

// Sub tabs: highlight the section currently in view (anchor tabs only)
const anchorTabs = [...document.querySelectorAll('.sub-tabs a[href^="#"]')];
if (anchorTabs.length) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) anchorTabs.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  anchorTabs.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });
}

// Contact form (front-end only: validation + success screen)
const form = document.querySelector('#contactForm');
if (form) {
  const preset = new URLSearchParams(location.search).get('type');
  const presetInput = preset && form.querySelector(`input[name=type][value="${CSS.escape(preset)}"]`);
  if (presetInput) presetInput.checked = true;
  const fileInput = form.querySelector('input[type=file]');
  fileInput.addEventListener('change', () => {
    form.querySelector('.file-name').textContent = fileInput.files[0] ? fileInput.files[0].name : '기획안, RFP 등 참고 파일 (최대 20MB)';
  });
  const rules = {
    company: v => v.trim() !== '',
    name: v => v.trim() !== '',
    phone: v => /^[0-9\-\s]{9,}$/.test(v.trim()),
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: v => v.trim().length >= 10,
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    let firstBad = null;
    Object.entries(rules).forEach(([key, ok]) => {
      const el = form.elements[key], valid = ok(el.value);
      el.classList.toggle('invalid', !valid);
      el.closest('.field').querySelector('.err').classList.toggle('show', !valid);
      if (!valid && !firstBad) firstBad = el;
    });
    const agree = form.elements.agree;
    const agreeErr = form.querySelector('.agree .err');
    agreeErr.classList.toggle('show', !agree.checked);
    if (!agree.checked && !firstBad) firstBad = agree;
    if (firstBad) { firstBad.focus(); return; }
    // TODO: 실제 전송 연결 (이메일 발송 서비스 또는 서버 API)
    form.style.display = 'none';
    document.querySelector('.form-done').classList.add('show');
    scrollTo({ top: document.querySelector('.form-done').offsetTop - 150, behavior: 'smooth' });
  });
}

// Hero particle network
const canvas = document.querySelector('.hero canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, dots;
  const resize = () => {
    const dpr = devicePixelRatio || 1;
    w = canvas.offsetWidth; h = canvas.offsetHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(90, Math.floor(w * h / 16000));
    dots = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .6 }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < dots.length; i++) {
      const a = dots[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(160,230,248,.7)'; ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const b = dots[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 140) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(127,225,245,${.18 * (1 - d / 140)})`; ctx.stroke(); }
      }
    }
    requestAnimationFrame(draw);
  };
  addEventListener('resize', resize);
  resize();
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
}
