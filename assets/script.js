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

// Forms (front-end only: validation + success screen)
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const filled = v => v.trim() !== '';
const setupForm = (form, rules) => {
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
    const done = form.parentElement.querySelector('.form-done');
    done.classList.add('show');
    if (!form.closest('dialog')) scrollTo({ top: done.offsetTop - 150, behavior: 'smooth' });
  });
};

const form = document.querySelector('#contactForm');
if (form) {
  const preset = new URLSearchParams(location.search).get('type');
  const presetInput = preset && form.querySelector(`input[name=type][value="${CSS.escape(preset)}"]`);
  if (presetInput) presetInput.checked = true;
  const fileInput = form.querySelector('input[type=file]');
  fileInput.addEventListener('change', () => {
    form.querySelector('.file-name').textContent = fileInput.files[0] ? fileInput.files[0].name : '기획안, RFP 등 참고 파일 (최대 20MB)';
  });
  setupForm(form, {
    company: filled,
    name: filled,
    phone: v => /^[0-9\-\s]{9,}$/.test(v.trim()),
    email: isEmail,
    message: v => v.trim().length >= 10,
  });
}

// Creators network join form (recruit page)
const joinForm = document.querySelector('#joinForm');
if (joinForm) setupForm(joinForm, { name: filled, email: isEmail, portfolio: filled });

// Quick inquiry (빠른 문의): one form template, used by
//  - the floating button + modal dialog (every page except contact.html)
//  - the inline quote card in the home hero (<aside data-quick-form>)
const quickForm = (p, autofocus) => `
    <form class="form qi-form" novalidate>
      <div class="field"><label for="${p}-name">회사명 / 담당자명<i>*</i></label><input type="text" id="${p}-name" name="name"${autofocus ? ' autofocus' : ''} placeholder="(주)워드캣 / 홍길동" autocomplete="organization"><p class="err">회사명 또는 담당자명을 입력해 주세요.</p></div>
      <div class="row2">
        <div class="field"><label for="${p}-phone">연락처<i>*</i></label><input type="tel" id="${p}-phone" name="phone" placeholder="010-0000-0000" autocomplete="tel"><p class="err">올바른 연락처를 입력해 주세요.</p></div>
        <div class="field"><label for="${p}-email">이메일<i>*</i></label><input type="email" id="${p}-email" name="email" placeholder="name@company.com" autocomplete="email"><p class="err">올바른 이메일 주소를 입력해 주세요.</p></div>
      </div>
      <div class="field"><label for="${p}-message">문의 내용<i>*</i></label><textarea id="${p}-message" name="message" placeholder="필요한 서비스(IMC · MICE · 통번역 등)와 일정을 간단히 적어주세요."></textarea><p class="err">문의 내용을 10자 이상 입력해 주세요.</p></div>
      <div class="agree">
        수집 항목: 회사명·담당자명, 연락처, 이메일 · 이용 목적: 문의 응대 · 보유 기간: 상담 완료 후 1년
        <label><input type="checkbox" name="agree"> 개인정보 수집 및 이용에 동의합니다. (필수)</label>
        <p class="err" style="color:#E5484D;font-size:13px;margin-top:6px">개인정보 수집 및 이용에 동의해 주세요.</p>
      </div>
      <div class="qi-actions">
        <button type="submit" class="btn-submit">빠른 문의 보내기</button>
        <a href="contact.html" class="qi-general">일반문의 →</a>
      </div>
    </form>
    <div class="form-done">
      <div class="ic">✓</div>
      <h3>문의가 접수되었습니다.</h3>
      <p>영업일 기준 1~2일 이내에 담당자가 연락드리겠습니다.</p>
    </div>`;
const quickRules = {
  name: filled,
  phone: v => /^[0-9\-\s]{9,}$/.test(v.trim()),
  email: isEmail,
  message: v => v.trim().length >= 10,
};

const heroQuick = document.querySelector('[data-quick-form]');
if (heroQuick) {
  heroQuick.innerHTML = `
    <span class="label">QUICK QUOTE</span>
    <h3>견적 문의</h3>
    <p class="qi-desc">연락처와 문의 내용만 남겨주시면 영업일 기준 1~2일 이내에 연락드립니다.</p>${quickForm('hq')}`;
  setupForm(heroQuick.querySelector('.qi-form'), quickRules);
}

if (!document.querySelector('#contactForm')) {
  document.body.insertAdjacentHTML('beforeend', `
<button type="button" class="qi-fab" aria-haspopup="dialog">
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2zm3 6v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"/></svg>
  <span>빠른 문의</span>
</button>
<dialog class="qi" aria-labelledby="qi-title">
  <div class="qi-inner">
    <button type="button" class="qi-close" aria-label="닫기">×</button>
    <span class="label">QUICK INQUIRY</span>
    <h3 id="qi-title">빠른 문의</h3>
    <p class="qi-desc">연락처와 문의 내용만 남겨주시면<br>영업일 기준 1~2일 이내에 담당자가 연락드립니다.</p>${quickForm('qi', true)}
  </div>
</dialog>`);
  const fab = document.querySelector('.qi-fab'), dlg = document.querySelector('dialog.qi');
  document.body.classList.add('has-qi');
  fab.addEventListener('click', () => dlg.showModal());
  dlg.querySelector('.qi-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); // click on the backdrop
  setupForm(dlg.querySelector('.qi-form'), quickRules);
}

// Promo popup (index): opens on load; closing it hides it for 1 day, like the popup on wordcat.co.kr
const promo = document.querySelector('dialog.promo');
if (promo) {
  const KEY = 'wc-promo-voucher-hidden-until';
  let hiddenUntil = 0;
  try { hiddenUntil = +localStorage.getItem(KEY) || 0; } catch (e) {}
  const close = () => {
    promo.close();
    try { localStorage.setItem(KEY, Date.now() + 24 * 60 * 60 * 1000); } catch (e) {}
  };
  promo.querySelector('.promo-close').addEventListener('click', close);
  promo.addEventListener('click', e => { if (e.target === promo) close(); }); // click on the backdrop
  promo.addEventListener('cancel', e => { e.preventDefault(); close(); });  // Esc key
  if (Date.now() > hiddenUntil) promo.showModal();
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
