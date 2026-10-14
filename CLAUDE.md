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
- 페이지: index, about, imc, mice, translation, works, work-detail, contact
- 상단 메뉴: ABOUT / IMC / MICE / TRANSLATION / WORKS / CONTACT
- 헤더·모바일 메뉴·푸터는 각 페이지에 복사되어 있음 → 메뉴를 바꾸면 8개 페이지 모두 수정해야 함
- 미리보기: `node tools/serve.js . 5173` → http://localhost:5173 (`.claude/launch.json`의 "wordcat")

## 아직 임시/미완성인 것
- 사진은 모두 picsum.photos 임시 이미지
- 실적 숫자, 포트폴리오, 고객 후기, 고객사 로고, 연혁, 조직도, 인사말은 예시 (사용자가 나중에 교체 예정)
- 푸터 주소·대표자·사업자번호·전화·이메일은 OOO 자리표시
- 문의 폼은 화면 검증만 되고 실제 전송 없음 (`assets/script.js`의 TODO)
- COMPANY FILE(회사소개서 PDF), 개인정보처리방침 페이지 미연결

## 다음 단계 후보
1. 실제 서버/도메인(wordcat.co.kr)에 올리기 + 문의 메일 연결
2. 포트폴리오를 직원이 직접 추가하는 방식 결정
3. 실제 콘텐츠 반영
