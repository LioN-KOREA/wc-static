// Portfolio data (source: wordcat.co.kr portfolio) + rendering for index / works / work-detail.
// To add a project: put the image in assets/img/works/ and add one line below (list order = display order).
//   id      : image file name (assets/img/works/<id>.jpg = list thumbnail)
//   title   : project name (optional; the client name is shown when absent)
//   photos  : number of PHOTO gallery images  -> <id>-photo-1.jpg, <id>-photo-2.jpg ... (optional)
//   designs : number of DESIGN gallery images -> <id>-design-1.jpg ... (optional)
const WORKS = [
  { id: 'mofa-mekong', cat: 'mice', client: '외교부', title: '2026 제5차 한-메콩 유스그룹 워크숍', photos: 2, designs: 2 },
  { id: 'incheon-maritime', cat: 'mice', client: '국립인천해양박물관', title: '2026 국립인천해양박물관 그리스 국제학술대회', photos: 2, designs: 1 },
  { id: 'nrc-korea-vietnam', cat: 'mice', client: '경제인문사회연구회', title: '2026 한-베 국제컨퍼런스', photos: 2, designs: 2 },
  { id: 'seoul-diplomacy', cat: 'mice', client: '서울특별시', title: '서울 글로벌 도시외교 평화포럼', photos: 2, designs: 3 },
  { id: 'acc-asia-artists', cat: 'mice', client: '국립아시아문화전당', title: '2026 차세대 아시아 예술인 커뮤니티 사업 운영', photos: 2, designs: 2 },
  { id: 'mofa-middle-east', cat: 'mice', client: '외교부', title: '서울 중동문제 국제회의', photos: 2, designs: 3 },
  { id: 'asean-youth', cat: 'mice', client: '한-아세안센터', title: '2026 한-아세안 청년 네트워크 워크숍', photos: 2, designs: 1 },
  { id: 'kibo-ma', cat: 'mice', client: '기술보증기금', title: '기업승계 M&A 지원을 위한 간담회 등 인식확산', photos: 2, designs: 2 },
  { id: 'kast-forum', cat: 'mice', client: '한국과학기술한림원', title: '2026 한국과학기술한림원 신년 S&T 융합포럼 & 신입회원패 수여식', photos: 2, designs: 3 },
  { id: 'hangeul-museum', cat: 'mice', client: '국립한글박물관', title: '2025 한글날 기념 한글주간 행사', photos: 2, designs: 8 },
];
const WORK_CAT = { imc: 'IMC', mice: 'MICE', translation: 'TRANSLATION' };
const workImg = w => `assets/img/works/${w.id}.jpg`;
const workUrl = w => `work-detail.html?id=${w.id}`;
const workName = w => w.title || w.client;
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const range = n => Array.from({ length: n || 0 }, (_, i) => i + 1);

// Works grid: <div class="works-grid" data-works="all"> or data-works="6" (first N)
document.querySelectorAll('[data-works]').forEach(grid => {
  const n = grid.dataset.works === 'all' ? WORKS.length : +grid.dataset.works;
  grid.innerHTML = WORKS.slice(0, n).map((w, i) => `
    <article class="work reveal${['', ' d1', ' d2'][i % 3]}" data-cat="${w.cat}"><a href="${workUrl(w)}">
      <div class="thumb"><img src="${workImg(w)}" alt="${esc(workName(w))}" loading="lazy"><span class="view">VIEW</span></div>
      <div class="meta"><span class="cat">${WORK_CAT[w.cat]}</span>${w.title ? `<span class="client">${esc(w.client)}</span>` : ''}</div>
      <h4>${esc(workName(w))}</h4></a></article>`).join('');
  const count = document.querySelector('.works-count b');
  if (count) count.textContent = n;
});

// Detail page
const wd = document.querySelector('[data-work-detail]');
if (wd) {
  const id = new URLSearchParams(location.search).get('id');
  const i = Math.max(0, WORKS.findIndex(w => w.id === id));
  const w = WORKS[i], prev = WORKS[(i - 1 + WORKS.length) % WORKS.length], next = WORKS[(i + 1) % WORKS.length];
  const hasGallery = w.photos || w.designs;
  document.title = `${workName(w)} | WORKS | 워드캣`;
  wd.querySelectorAll('[data-f]').forEach(el => {
    const f = el.dataset.f;
    if (f === 'cat') el.textContent = WORK_CAT[w.cat];
    else if (f === 'client') el.textContent = w.client;
    else if (f === 'name') el.textContent = workName(w);
    else if (f === 'crumb') el.textContent = `HOME / WORKS / ${WORK_CAT[w.cat]}`;
    else if (f === 'cover') el.hidden = !!hasGallery;
    else if (f === 'img') { el.src = workImg(w); el.alt = workName(w); }
    else if (f === 'gallery') {
      el.hidden = !hasGallery;
      const group = (label, kind, n) => n ? `<div class="wd-gallery"><h3>${label}</h3><div class="wd-gallery-grid">${range(n).map(k =>
        `<figure><img src="assets/img/works/${w.id}-${kind}-${k}.jpg" alt="${esc(workName(w))} ${label} ${k}" loading="lazy"></figure>`).join('')}</div></div>` : '';
      el.innerHTML = group('PHOTO', 'photo', w.photos) + group('DESIGN', 'design', w.designs);
    }
    else if (f === 'prev') { el.href = workUrl(prev); el.lastChild.textContent = workName(prev); }
    else if (f === 'next') { el.href = workUrl(next); el.lastChild.textContent = workName(next); }
  });
}
