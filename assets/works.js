// Portfolio data (source: wordcat.co.kr portfolio) + rendering for index / works / work-detail.
// To add a project: put the image in assets/img/works/ and add one line below (list order = display order).
const WORKS = [
  { id: 'goyang-flower-mice', cat: 'mice', client: '고양국제꽃박람회' },
  { id: 'goyang-flower-imc', cat: 'imc', client: '고양국제꽃박람회' },
  { id: 'qia', cat: 'translation', client: '농림축산검역본부' },
  { id: 'sejong', cat: 'mice', client: '세종학당재단' },
  { id: 'kocca', cat: 'imc', client: '한국콘텐츠진흥원 KOCCA' },
  { id: 'mnd', cat: 'translation', client: '국방부' },
  { id: 'kida', cat: 'mice', client: '한국국방연구원' },
  { id: 'yonsei-mirae', cat: 'imc', client: '연세대학교 미래캠퍼스' },
  { id: 'gill', cat: 'mice', client: '경기도평생교육진흥원' },
  { id: 'gangnam-office', cat: 'translation', client: '강남구청' },
  { id: 'kangwon', cat: 'mice', client: '강원대학교' },
  { id: 'anseong', cat: 'imc', client: '경기도 안성시' },
  { id: 'police-univ', cat: 'translation', client: '경찰청 경찰대학' },
  { id: 'sisul', cat: 'mice', client: '서울시설공단' },
  { id: 'kch', cat: 'imc', client: '한국문화재재단' },
  { id: 'nsr', cat: 'translation', client: '국가보안기술연구소' },
  { id: 'arko', cat: 'mice', client: '한국문화예술위원회' },
  { id: 'seoul-2023', cat: 'translation', client: '2023년 서울특별시' },
  { id: 'ggsports', cat: 'mice', client: '경기도체육회' },
  { id: 'seoul-2022', cat: 'translation', client: '2022년 서울특별시' },
  { id: 'kawf', cat: 'mice', client: '한국예술인복지재단' },
  { id: 'gokams', cat: 'translation', client: '예술경영지원센터' },
  { id: 'gangnam-gu', cat: 'translation', client: '서울특별시 강남구' },
];
const WORK_CAT = { imc: 'IMC', mice: 'MICE', translation: 'TRANSLATION' };
const workImg = w => `assets/img/works/${w.id}.jpg`;
const workUrl = w => `work-detail.html?id=${w.id}`;
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Works grid: <div class="works-grid" data-works="all"> or data-works="6" (first N)
document.querySelectorAll('[data-works]').forEach(grid => {
  const n = grid.dataset.works === 'all' ? WORKS.length : +grid.dataset.works;
  grid.innerHTML = WORKS.slice(0, n).map((w, i) => `
    <article class="work reveal${['', ' d1', ' d2'][i % 3]}" data-cat="${w.cat}"><a href="${workUrl(w)}">
      <div class="thumb"><img src="${workImg(w)}" alt="${esc(w.client)} 프로젝트" loading="lazy"><span class="view">VIEW</span></div>
      <div class="meta"><span class="cat">${WORK_CAT[w.cat]}</span></div>
      <h4>${esc(w.client)}</h4></a></article>`).join('');
  const count = document.querySelector('.works-count b');
  if (count) count.textContent = n;
});

// Detail page
const wd = document.querySelector('[data-work-detail]');
if (wd) {
  const id = new URLSearchParams(location.search).get('id');
  const i = Math.max(0, WORKS.findIndex(w => w.id === id));
  const w = WORKS[i], prev = WORKS[(i - 1 + WORKS.length) % WORKS.length], next = WORKS[(i + 1) % WORKS.length];
  document.title = `${w.client} | WORKS | 워드캣`;
  wd.querySelectorAll('[data-f]').forEach(el => {
    const f = el.dataset.f;
    if (f === 'cat') el.textContent = WORK_CAT[w.cat];
    else if (f === 'client') el.textContent = w.client;
    else if (f === 'crumb') el.textContent = `HOME / WORKS / ${WORK_CAT[w.cat]}`;
    else if (f === 'img') { el.src = workImg(w); el.alt = `${w.client} 프로젝트`; }
    else if (f === 'prev') { el.href = workUrl(prev); el.lastChild.textContent = prev.client; }
    else if (f === 'next') { el.href = workUrl(next); el.lastChild.textContent = next.client; }
  });
}
