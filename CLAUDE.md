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
- 상단 메뉴: ABOUT / IMC / MICE / TRANSLATION / WORKS / CONTACT
- RECRUIT(채용) 페이지는 경영진 요청으로 임시 숨김: `recruit.html` 파일·이미지·스타일은 그대로 두고 다른 8개 페이지의 링크만 제거함 (상단 메뉴, 모바일 메뉴, 푸터 "채용"). 되살리려면 `recruit.html`에 남아 있는 메뉴·푸터 링크를 8개 페이지에 다시 넣으면 됨
- 헤더·모바일 메뉴·푸터는 각 페이지에 복사되어 있음 → 메뉴를 바꾸면 9개 페이지 모두 수정해야 함
- 포트폴리오는 `assets/works.js`의 `WORKS` 배열 하나로 관리 (index 6개, works 전체, work-detail.html?id=… 상세 모두 여기서 렌더링). 이미지는 `assets/img/works/<id>.jpg`. 상세 페이지 갤러리: MICE는 `photos`/`designs`(`<id>-photo-N.jpg`, `<id>-design-N.jpg`), IMC는 대표 이미지(`<id>.jpg`)를 커버로 보여 주고 나머지는 `images`(`<id>-img-N.jpg`). 카드 사진 표시: `reshape: true`는 프레임을 꽉 채움(잘릴 수 있음, MICE), `false`는 사진 전체를 프레임 안에 맞추고 남는 부분은 배경(IMC)
- 이미지는 모두 `assets/img/` 로컬 파일 (현재 사이트 wordcat.co.kr에서 가져와 최적화)
- 미리보기: `node tools/serve.js . 5173` → http://localhost:5173 (`.claude/launch.json`의 "wordcat")

## 아직 임시/미완성인 것
- 서비스 설명·포트폴리오(고객사명+이미지)·회사 정보·채용/크리에이터 내용은 wordcat.co.kr에서 옮긴 실제 내용
- 현재 사이트에 없어 예시로 남긴 것: 실적 숫자, 고객 후기, 연혁, 조직도, 인사말(대표 사진·서명 OOO), 비전, 전화·팩스 번호(02-000-0000), 포트폴리오 상세 설명(현재 사이트에 없음)
- 홈 "함께한 파트너": 고객사 32곳 모두 로고로 표시 (`assets/img/clients/`). 새 고객사는 로고 파일을 이 폴더에 넣고 index.html 두 줄(각 줄이 2번 반복됨)에 `<span class="logo"><img …></span>` 추가
- 문의 폼·크리에이터 합류 폼은 화면 검증만 되고 실제 전송 없음 (`assets/script.js`의 TODO)
- COMPANY FILE(회사소개서 PDF), 개인정보처리방침 페이지 미연결

## 다음 단계 후보
1. 실제 서버/도메인(wordcat.co.kr)에 올리기 + 문의 메일 연결
2. 포트폴리오를 직원이 직접 추가하는 방식 결정
3. 실제 콘텐츠 반영
