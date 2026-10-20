// Portfolio data (source: wordcat.co.kr portfolio) + rendering for index / works / work-detail.
// To add a project: put the image in assets/img/works/ and add one line below (list order = display order).
//   id      : image file name (assets/img/works/<id>.jpg = list thumbnail)
//   title   : project name (optional; the client name is shown when absent)
//   photos  : number of PHOTO gallery images  -> <id>-photo-1.jpg, <id>-photo-2.jpg ... (optional)
//   designs : number of DESIGN gallery images -> <id>-design-1.jpg ... (optional)
const WORKS = [
  { id: 'mofa-mekong', cat: 'mice', client: '외교부', title: '2026 제5차 한-메콩 유스그룹 워크숍', photos: 2, designs: 2 },
  { id: 'goyang-flower-imc', cat: 'imc', client: '고양국제꽃박람회', title: '2024 고양국제꽃박람회 종합 홍보 운영 사업' },
  { id: 'qia', cat: 'translation', client: '농림축산검역본부', title: '제2외국어 통역지원서비스 용역' },
  { id: 'incheon-maritime', cat: 'mice', client: '국립인천해양박물관', title: '2026 국립인천해양박물관 그리스 국제학술대회', photos: 2, designs: 1 },
  { id: 'kocca', cat: 'imc', client: '한국콘텐츠진흥원 KOCCA', title: '2023 패션문화 홍보채널 운영 위탁용역' },
  { id: 'mnd', cat: 'translation', client: '국방부', title: '2020 국방백서 외국어 번역 용역' },
  { id: 'nrc-korea-vietnam', cat: 'mice', client: '경제인문사회연구회', title: '2026 한-베 국제컨퍼런스', photos: 2, designs: 2 },
  { id: 'yonsei-mirae', cat: 'imc', client: '연세대학교 미래캠퍼스', title: '2023학년도 연세대학교 미래캠퍼스 소셜미디어(SNS)운영 대행 용역' },
  { id: 'law-info', cat: 'translation', client: '한국법령정보원', title: '2025년 찾기 쉬운 생활법령정보 외국어 콘텐츠 개발 및 업데이트' },
  { id: 'seoul-diplomacy', cat: 'mice', client: '서울특별시', title: '서울 글로벌 도시외교 평화포럼', photos: 2, designs: 3 },
  { id: 'anseong', cat: 'imc', client: '경기도 안성시', title: '2024년 안성시 SNS 운영 용역' },
  { id: 'gangnam-office', cat: 'translation', client: '강남구청', title: '강남구 의료관광 외국어 전문번역 용역' },
  { id: 'acc-asia-artists', cat: 'mice', client: '국립아시아문화전당', title: '2026 차세대 아시아 예술인 커뮤니티 사업 운영', photos: 2, designs: 2 },
  { id: 'kch', cat: 'imc', client: '한국문화재재단', title: '2023년 문화유산채널 홈페이지 홍보' },
  { id: 'haccp', cat: 'translation', client: '한국식품안전관리인증원', title: '2023년 수입식품 HACCP 평가자료 번역 용역' },
  { id: 'mofa-middle-east', cat: 'mice', client: '외교부', title: '서울 중동문제 국제회의', photos: 2, designs: 3 },
  { id: 'police-univ', cat: 'translation', client: '경찰청 경찰대학', title: '태국 경찰 사이버범죄 수사역량강화 온라인 연수 통번역 용역' },
  { id: 'asean-youth', cat: 'mice', client: '한-아세안센터', title: '2026 한-아세안 청년 네트워크 워크숍', photos: 2, designs: 1 },
  { id: 'kipi-2023', cat: 'translation', client: '한국특허정보원', title: '2023년 기계번역 품질평가 용역사업' },
  { id: 'kibo-ma', cat: 'mice', client: '기술보증기금', title: '기업승계 M&A 지원을 위한 간담회 등 인식확산', photos: 2, designs: 2 },
  { id: 'sepa', cat: 'translation', client: '한국사회적기업진흥원', title: '2023년 국제 정책교류 및 확산을 위한 번역 용역' },
  { id: 'kast-forum', cat: 'mice', client: '한국과학기술한림원', title: '2026 한국과학기술한림원 신년 S&T 융합포럼 & 신입회원패 수여식', photos: 2, designs: 3 },
  { id: 'nsr', cat: 'translation', client: '국가보안기술연구소', title: '사이버 위협 보고서 한영 번역모델 병렬코퍼스 구축 용역' },
  { id: 'hangeul-museum', cat: 'mice', client: '국립한글박물관', title: '2025 한글날 기념 한글주간 행사', photos: 2, designs: 8 },
  { id: 'nia', cat: 'translation', client: '한국지능정보사회진흥원', title: '2024년 국제기구 디지털정부 평가 상시대응' },
  { id: 'kida', cat: 'mice', client: '한국국방연구원', title: '2024년 국방 공공데이터활용 경진대회 행사대행용역' },
  { id: 'kitech', cat: 'translation', client: '한국생산기술연구원', title: '베트남 환경규제 번역 및 감수' },
  { id: 'sejong', cat: 'mice', client: '세종학당재단', title: '2023년 세종학당 문화인턴 파견 사업' },
  { id: 'seoul-2023', cat: 'translation', client: '서울특별시', title: '2023년 서울시 외국어 전문번역 용역' },
  { id: 'goyang-flower-mice', cat: 'mice', client: '고양국제꽃박람회', title: '2024 고양국제꽃박람회 종합 홍보 운영 사업' },
  { id: 'kofpi', cat: 'translation', client: '한국임업진흥원', title: '2023년 합법목재 교역촉진제도 통번역 서비스 지원' },
  { id: 'gill', cat: 'mice', client: '경기도평생교육진흥원', title: '평화통일을 위한 전문가 강연회 운영' },
  { id: 'seoul-2022', cat: 'translation', client: '서울특별시', title: '2022 외국어 홈페이지 전문번역 용역' },
  { id: 'kangwon', cat: 'mice', client: '강원대학교', title: '2023년 강원LRS공유대학 융합전공 홍보 운영 용역' },
  { id: 'kipi-2022', cat: 'translation', client: '한국특허정보원', title: '2022년 기계번역 품질평가 용역사업' },
  { id: 'sisul', cat: 'mice', client: '서울시설공단', title: '2023년 이동지원센터 상담원 서비스품질 모니터링 및 위탁교육 용역' },
  { id: 'gokams', cat: 'translation', client: '예술경영지원센터', title: '한국미술 다국어 용어사전 번역' },
  { id: 'arko', cat: 'mice', client: '한국문화예술위원회', title: '2023년 예술요원 필수 직무교육' },
  { id: 'gangnam-gu', cat: 'translation', client: '서울특별시 강남구', title: '강남구 의료관광 외국어 전문번역 용역' },
  { id: 'ggsports', cat: 'mice', client: '경기도체육회', title: '2023년 경기도종합대회 관리시스템 기능고도화 및 운영관리 용역' },
  { id: 'kipi-2021', cat: 'translation', client: '2021년 한국특허정보원', title: '2022년 기계번역 품질평가 용역사업' },
  { id: 'kawf', cat: 'mice', client: '한국예술인복지재단', title: '2024년 예술인파견지원-예술로 사업 교육 및 행사 기획·운영 용역' },
];
// Texts come from the language file (assets/texts_<locale>.json): js.cat_*, projects.<id>.title / .client.
// The values in WORKS above are the Korean fallback.
const tr = (key, fallback) => (window.I18N ? I18N.t(key, fallback) : fallback);
const workCat = w => tr(`js.cat_${w.cat}`, { imc: 'IMC', mice: 'MICE', translation: '통번역' }[w.cat]);
const workTitle = w => tr(`projects.${w.id}.title`, w.title);
const workClient = w => tr(`projects.${w.id}.client`, w.client);
const workImg = w => `assets/img/works/${w.id}.jpg`;
const workUrl = w => `work-detail.html?id=${w.id}`;
const workName = w => workTitle(w) || workClient(w);
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const range = n => Array.from({ length: n || 0 }, (_, i) => i + 1);

const renderWorks = () => {
  // Works grid: <div class="works-grid" data-works="all"> or data-works="6" (first N)
  document.querySelectorAll('[data-works]').forEach(grid => {
    const n = grid.dataset.works === 'all' ? WORKS.length : +grid.dataset.works;
    grid.innerHTML = WORKS.slice(0, n).map((w, i) => `
    <article class="work reveal${['', ' d1', ' d2'][i % 3]}" data-cat="${w.cat}"><a href="${workUrl(w)}">
      <div class="thumb"><img src="${workImg(w)}" alt="${esc(workName(w))}" loading="lazy"><span class="view">${tr('js.view', 'VIEW')}</span></div>
      <div class="meta"><span class="cat">${workCat(w)}</span></div>
      <h4>${esc(workName(w))}</h4>${workTitle(w) ? `
      <p class="client">${esc(workClient(w))}</p>` : ''}</a></article>`).join('');
    // the cards are added after the page scripts ran: register them with the scroll reveal (script.js)
    grid.querySelectorAll('.reveal').forEach(el => (typeof io !== 'undefined' ? io.observe(el) : el.classList.add('in')));
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
    document.title = `${workName(w)} | ${tr('js.detail_title_suffix', '실적 | 워드캣')}`;
    wd.querySelectorAll('[data-f]').forEach(el => {
      const f = el.dataset.f;
      if (f === 'cat') el.textContent = workCat(w);
      else if (f === 'client') el.textContent = workClient(w);
      else if (f === 'name') el.textContent = workName(w);
      else if (f === 'crumb') el.textContent = `${tr('js.crumb_works', '홈 / 실적')} / ${workCat(w)}`;
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
};
if (window.I18N) I18N.ready.then(renderWorks); else renderWorks();
