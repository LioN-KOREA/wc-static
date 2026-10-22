// Portfolio data (source: wordcat.co.kr portfolio) + rendering for index / works / work-detail.
// To add a project: put the image in assets/img/works/ and add one line below (list order = display order).
//   id      : image file name (assets/img/works/<id>.jpg = list thumbnail)
//   title   : project name (optional; the client name is shown when absent)
//   photos  : number of PHOTO gallery images  -> <id>-photo-1.jpg, <id>-photo-2.jpg ... (optional)
//   designs : number of DESIGN gallery images -> <id>-design-1.jpg ... (optional)
//   images  : number of GALLERY images shown under the cover -> <id>-img-1.jpg ... (optional)
const WORKS = [
  { id: 'mofa-mekong', cat: 'mice', client: '외교부', title: '2026 제5차 한-메콩 유스그룹 워크숍', photos: 2, designs: 2 },
  { id: 'cheonan-bread-2025', cat: 'imc', client: '충청남도 천안시', title: '2025년「빵의 도시 천안」온라인 홍보 용역', images: 3 },
  { id: 'incheon-maritime', cat: 'mice', client: '국립인천해양박물관', title: '2026 국립인천해양박물관 그리스 국제학술대회', photos: 2, designs: 1 },
  { id: 'kocca-pr-2025', cat: 'imc', client: '한국콘텐츠진흥원', title: '2025년 한국콘텐츠진흥원 기관 홍보 위탁용역', images: 4 },
  { id: 'nrc-korea-vietnam', cat: 'mice', client: '경제인문사회연구회', title: '2026 한-베 국제컨퍼런스', photos: 2, designs: 2 },
  { id: 'mofa-sns-2025', cat: 'imc', client: '외교부', title: '2025년 외교부 SNS 콘텐츠 제작 용역', images: 3 },
  { id: 'seoul-diplomacy', cat: 'mice', client: '서울특별시', title: '서울 글로벌 도시외교 평화포럼', photos: 2, designs: 3 },
  { id: 'anseong-sns-2025', cat: 'imc', client: '경기도 안성시', title: '2025년 안성시 SNS 운영 용역', images: 4 },
  { id: 'acc-asia-artists', cat: 'mice', client: '국립아시아문화전당', title: '2026 차세대 아시아 예술인 커뮤니티 사업 운영', photos: 2, designs: 2 },
  { id: 'seoul-retech-2025', cat: 'imc', client: '서울특별시평생교육진흥원', title: '2025년 서울 리(Re)테크 사업 종합 홍보', images: 3 },
  { id: 'mofa-middle-east', cat: 'mice', client: '외교부', title: '서울 중동문제 국제회의', photos: 2, designs: 3 },
  { id: 'kisa-digital-2025', cat: 'imc', client: '한국인터넷진흥원', title: '2025년 기관 홍보 콘텐츠 제작 등 디지털 홍보 용역', images: 4 },
  { id: 'asean-youth', cat: 'mice', client: '한-아세안센터', title: '2026 한-아세안 청년 네트워크 워크숍', photos: 3 },
  { id: 'naacc-citizens-2025', cat: 'imc', client: '행정중심복합도시건설청', title: '2025년 국가상징구역 국민참여단 운영 용역', images: 4 },
  { id: 'kibo-ma', cat: 'mice', client: '기술보증기금', title: '기업승계 M&A 지원을 위한 간담회 등 인식확산', photos: 2, designs: 2 },
  { id: 'kom-overseas-2025', cat: 'imc', client: '한국한의약진흥원', title: '2025 한의약 콘텐츠 해외 홍보 용역', images: 4 },
  { id: 'kast-forum', cat: 'mice', client: '한국과학기술한림원', title: '2026 한국과학기술한림원 신년 S&T 융합포럼 & 신입회원패 수여식', photos: 2, designs: 3 },
  { id: 'korean-language-2025', cat: 'imc', client: '국어문화연합회', title: '2025 우리말 쓰기 문화 확산을 위한 콘텐츠 제작 및 문화 행사 운영', images: 4 },
  { id: 'hangeul-museum', cat: 'mice', client: '국립한글박물관', title: '2025 한글날 기념 한글주간 행사', photos: 2, designs: 8 },
  { id: 'gto-mice-brand-2025', cat: 'imc', client: '경기관광공사', title: '2025 경기 마이스 브랜드 구축 및 경기 마이스 뉴스레터, 영문 SNS 채널 운영 용역', images: 4 },
  { id: 'copyright-edu-2024', cat: 'imc', client: '한국저작권위원회', title: '2024 저작권 양방향교육 운영 및 원격교육 홍보', images: 4 },
  { id: 'kyef-gew-2024', cat: 'imc', client: '한국청년기업가정신재단', title: '2024 세계 기업가정신 주간 한국행사 운영 용역', images: 4 },
  { id: 'goyang-flower-2024', cat: 'imc', client: '고양국제꽃박람회', title: '2024 고양국제꽃박람회 종합 홍보 운영 사업', images: 4 },
  { id: 'seoul-tourism-balloon-2024', cat: 'imc', client: '서울관광재단', title: '2024 계류식 가스기구 홍보 마케팅', images: 4 },
  { id: 'yonsei-sns-2023', cat: 'imc', client: '연세대학교 미래캠퍼스', title: '2023학년도 연세대학교 미래캠퍼스 소셜미디어(SNS)운영 대행 용역', images: 4 },
  { id: 'heritage-channel-2023', cat: 'imc', client: '국가유산진흥원', title: '2023년 문화유산채널 홈페이지 홍보', images: 4 },
  { id: 'gill-peace-2023', cat: 'imc', client: '경기도평생교육진흥원', title: '2023 평화통일을 위한 전문가 강연회 운영', images: 4 },
  { id: 'kocca-fashion-2023', cat: 'imc', client: '한국콘텐츠진흥원', title: '2023 패션문화 홍보채널 운영 위탁용역', images: 4 },
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
  const hasGallery = w.photos || w.designs || w.images;
  document.title = `${workName(w)} | WORKS | 워드캣`;
  wd.querySelectorAll('[data-f]').forEach(el => {
    const f = el.dataset.f;
    if (f === 'cat') el.textContent = WORK_CAT[w.cat];
    else if (f === 'client') el.textContent = w.client;
    else if (f === 'name') el.textContent = workName(w);
    else if (f === 'crumb') el.textContent = `HOME / WORKS / ${WORK_CAT[w.cat]}`;
    else if (f === 'cover') el.hidden = !!(w.photos || w.designs); // PHOTO/DESIGN galleries already contain the cover image
    else if (f === 'img') { el.src = workImg(w); el.alt = workName(w); }
    else if (f === 'gallery') {
      el.hidden = !hasGallery;
      const group = (label, kind, n) => n ? `<div class="wd-gallery"><h3>${label}</h3><div class="wd-gallery-grid">${range(n).map(k =>
        `<figure><img src="assets/img/works/${w.id}-${kind}-${k}.jpg" alt="${esc(workName(w))} ${label} ${k}" loading="lazy"></figure>`).join('')}</div></div>` : '';
      el.innerHTML = group('PHOTO', 'photo', w.photos) + group('DESIGN', 'design', w.designs) + group('GALLERY', 'img', w.images);
    }
    else if (f === 'prev') { el.href = workUrl(prev); el.lastChild.textContent = workName(prev); }
    else if (f === 'next') { el.href = workUrl(next); el.lastChild.textContent = workName(next); }
  });
}
