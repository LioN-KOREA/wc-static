# 워드캣 홈페이지 리뉴얼 시안

(주)워드캣(가산, 통합마케팅·MICE·통번역) 회사 홈페이지 시안. 목적: 기업 고객이 방문했을 때 "좋은 회사"라는 신뢰감을 주는 것.

## 디자인 기준
- 1안 확정: https://www.onandme.com/ 구성 참고 (2안 후보였던 http://www.dnccompany.com/ 은 보류)
- 현재 회사 사이트: https://wordcat.co.kr/ (서비스 항목 원문 출처)
- 브랜드 컬러 #159EBE (로고 CAT 박스 색), 보조 남색 #0A2236
- 분위기: 신뢰감 있고 깔끔하게. 모바일 대응 필수
- 폰트: Pretendard(한글), Montserrat(영문 헤드라인)

## 구조
- 정적 HTML/CSS/JS, 빌드 도구 없음. 공통 스타일 `assets/style.css`, 공통 동작 `assets/script.js`
- 페이지: index, about, imc, mice, translation, works, work-detail, recruit, contact
- 상단 메뉴(한국어): 소개 / 사업분야(IMC·MICE·통번역 드롭다운) / 실적 / 문의(문의하기·채용 드롭다운), 버튼 "문의하기". 영어: ABOUT / BUSINESS / PROJECTS / CONTACT, 버튼 "LET'S TALK". 모바일 메뉴는 각 항목을 그대로 개별 표시. (WORKS 섹션 명칭은 PROJECTS/실적, 파일명은 works.html 유지)
- 빠른 문의(플로팅 버튼 + 모달)는 `assets/script.js`에서 모든 페이지에 자동 삽입 (contact.html 제외) → 페이지별 HTML 수정 불필요. 홈 히어로 오른쪽의 견적 문의 카드(`data-quick-form`)도 같은 폼 템플릿 사용 (1100px 이하에서는 숨김)
- 홈(index) 수출바우처 팝업: `index.html`의 `<dialog class="promo">` (이미지 `assets/img/misc/voucher-popup.jpg`, 링크 wordcat-voucher.imweb.me). 닫으면 24시간 숨김(localStorage). 팝업을 내리려면 이 dialog를 삭제
- 헤더·모바일 메뉴·푸터는 각 페이지에 복사되어 있음 → 메뉴를 바꾸면 9개 페이지 모두 수정해야 함
- 포트폴리오는 `assets/works.js`의 `WORKS` 배열 하나로 관리 (index 6개, works 전체, work-detail.html?id=… 상세 모두 여기서 렌더링). 이미지는 `assets/img/works/<id>.jpg`
- 이미지는 모두 `assets/img/` 로컬 파일 (현재 사이트 wordcat.co.kr에서 가져와 최적화)
- 미리보기: `node tools/serve.js . 5173` → http://localhost:5173 (`.claude/launch.json`의 "wordcat")

## 다국어 (I18N)
- 언어: ko-KR(기본), en-US, zh-CN, ja-JP. 모든 문구는 `assets/texts_<locale>.json` (scope → key → 값, 값은 inner HTML)
- HTML 요소의 `data-i18n="scope.key"` → innerHTML 교체, `data-i18n-attr="placeholder:scope.key;alt:scope.key"` → 속성 교체. 헤더·모바일 메뉴·푸터는 scope `common`, 나머지는 페이지 이름(work-detail → `work_detail`)
- 스크립트가 만드는 문구는 `I18N.t('scope.key', 한국어 기본값)`: scope `js`(카테고리명 등), `quick`(빠른 문의 폼), `projects`(포트폴리오 `<id>.title` / `<id>.client`)
- `assets/i18n.js`: 언어 결정(?lang= → 방문자가 마지막에 고른 언어 → ko-KR), JSON 적용, 헤더·모바일 메뉴에 [한국어 | English | 中文 | 日本語] 스위치 삽입. 다른 스크립트는 `I18N.ready.then(...)` 후 렌더링
- 문구 수정 = 4개 JSON 모두 수정. HTML 안의 한국어 기본값도 ko-KR JSON과 같게 유지 (한국어 첫 화면은 교체 없이 바로 보임)
- 새 문구 추가 = 요소에 `data-i18n` 키 추가 + 4개 JSON에 같은 키 추가. 포트폴리오 추가 시 `projects.<id>.title/.client`를 4개 언어에 추가
- 번역하지 않고 영어 유지: 작은 섹션 라벨(`.label`), 히어로 태그, ONE TEAM, IMC·MICE, 사업 카드의 영문 태그, 사업 페이지의 영문 캡션(`.full`), 영문 소캡션(서비스 카드 `.en`, TEL/E-MAIL 등)
- 영어판 드롭다운 메뉴에는 오른쪽 설명 텍스트 없음. 수출바우처 팝업은 한국어판에서만 표시

## 아직 임시/미완성인 것
- 서비스 설명·포트폴리오(고객사명+이미지)·회사 정보·채용/크리에이터 내용은 wordcat.co.kr에서 옮긴 실제 내용
- 현재 사이트에 없어 예시로 남긴 것: 실적 숫자, 고객 후기, 인사말(대표 사진·서명 OOO), 비전, 전화·팩스 번호(02-000-0000), 포트폴리오 상세 설명(현재 사이트에 없음)
- 고객사 로고 대신 고객사 이름 텍스트로 표시 중
- 문의 폼·빠른 문의·크리에이터 합류 폼은 화면 검증만 되고 실제 전송 없음 (`assets/script.js`의 TODO)
- COMPANY FILE(회사소개서 PDF), 개인정보처리방침 페이지 미연결

## 다음 단계 후보
1. 실제 서버/도메인(wordcat.co.kr)에 올리기 + 문의 메일 연결
2. 포트폴리오를 직원이 직접 추가하는 방식 결정
3. 실제 콘텐츠 반영
