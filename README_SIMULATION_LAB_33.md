# Issue #33 — Simulation LAB 서브브랜드

2026-08-30 홈페이지 상단 브랜드 `GigaRoute AI` 오른쪽에 `Simulation LAB` 서브브랜드를 추가했습니다.

## 적용 범위

- 공통 `site.css`의 `.brand:after`를 사용해 `Simulation LAB`을 표시합니다.
- `GigaRoute AI` 본 브랜드보다 작은 크기와 얇은 두께로 표시합니다.
- `white-space: nowrap`을 적용해 `Simulation LAB` 자체가 줄바꿈되거나 잘리지 않도록 했습니다.
- `index.html`, `index-ko.html`, `index-en.html`, `index-zh.html`, `index-es.html`, `index-ja.html`이 모두 동일한 `site.css`를 사용하므로 전체 다국어 페이지에 동일 적용됩니다.
- 이미지 생성이나 이미지 자산 변경은 하지 않았습니다.
- 기존 메뉴, 언어 선택, Windows/Linux 다운로드 및 기타 UI 기능은 변경하지 않았습니다.

## 2차 가독성 조정

- 데스크톱 글자 크기: `12px → 14.4px`로 약 20% 확대했습니다.
- 모바일 글자 크기: `9.5px → 11.4px`로 약 20% 확대했습니다.
- 색상은 기존 `var(--muted)`보다 조금 진한 `#4f5f73`으로 변경했습니다.
- 투명도는 `0.9 → 0.96`으로 높여 배경 위에서 더 잘 보이도록 했습니다.
- 기존 `nowrap` 및 모바일 간격 축소 정책은 유지해 잘림 가능성을 낮췄습니다.

## 구현 커밋

- `0e9f4beda4c2c442e297602bb0a3e89f739c4c1e` — `홈페이지: GigaRoute AI 옆 Simulation LAB 서브브랜드 추가`
- `842f48dcc2e6c705c0bddd9abb212784b961cec6` — `홈페이지: Simulation LAB 가독성 20% 개선 (#33)`

## 검증 범위

이번 요청은 PR 요청이 아니므로 별도 Build/Test 및 GitHub Actions는 실행하지 않았습니다. 정적 HTML 전체가 공통 `site.css`를 참조하는 구조와 CSS 적용 범위를 코드 기준으로 확인했습니다.

---

# Issue #44 — 모바일 앵커 상단 공백 보정

2026-09-05 모바일에서 상단 내비게이션의 `플랫폼`, `제품`, `컨설팅`, `워크플로우`를 눌렀을 때 sticky header 아래에 섹션의 상단 padding까지 중복되어 큰 빈 공간이 보이던 문제를 수정했습니다.

## 원인

- `contact.js`가 실제 sticky header 높이를 `--header-h` CSS 변수로 동기화합니다.
- 기존 `site.css`는 모든 `section`에 `scroll-margin-top: var(--header-h)`를 적용했습니다.
- 일반 섹션은 별도로 `padding-top: 88px`, 동적 제품 섹션은 `72px`를 사용하므로 앵커 이동 시 헤더 높이와 섹션 padding이 시각적으로 중복되었습니다.

## 수정 정책

- `#engine-performance`의 기존 정상 앵커 간격은 그대로 유지합니다.
- `#platform`, `#consulting`, `#workflow`는 88px top padding을 고려하여 `scroll-margin-top: calc(var(--header-h) - 64px)`로 보정합니다.
- `#products`는 72px top padding을 고려하여 `scroll-margin-top: calc(var(--header-h) - 48px)`로 보정합니다.
- 결과적으로 섹션의 실제 첫 콘텐츠가 sticky header 아래 약 24px 지점에서 시작하도록 맞춥니다.
- iOS Safari의 기존 CSS 캐시가 남지 않도록 한국어 루트 `index.html`과 `index-ko.html`의 `site.css` 버전을 `20260905-1`로 갱신했습니다.

## 관련 커밋

- `f5999e8c0ee9c22dc9b67c4e9dae24d381b349ab` — `fix: 모바일 앵커 공백 보정 (#44)`
- `c9142d9c70b3bb7b88d80f4b07af25e5e27950ed` — `fix: 모바일 앵커 CSS 캐시 갱신 (#44)`
- `44e045a60b64fff88a124505d3ece6eb35fd401c` — `fix: 한국어 페이지 앵커 CSS 캐시 갱신 (#44)`

이번 수정도 PR 요청이 아니므로 별도 Build/Test 및 GitHub Actions는 실행하지 않았습니다.

---

# Issue #45 — 제품 구조 단순화 / Custom AMHS Simulation 중심

2026-09-05 홈페이지 제품 영역을 `기업 맞춤형 AMHS 시뮬레이션 SW` 중심으로 단순화했습니다.

## 변경 내용

- 상단 내비게이션의 `플랫폼` 항목을 삭제했습니다.
- 기존 `#platform` 소개 섹션을 한국어·영어·중국어(간체)·스페인어·일본어 페이지에서 모두 삭제했습니다.
- 제품 영역의 긴 `Public Preview → 기술 검토 → Demo/PoC → 상용 배포` 설명과 판매 Funnel UI를 제거했습니다.
- 기존 `GigaRoute Workspace` 제품 카드를 삭제했습니다.
- 제품 영역은 다음 3개 제품/프로젝트 카드로 단순화했습니다.
  - `GigaRoute Auto Simulation`
  - `GigaRoute Simulation Studio`
  - `Enterprise & Custom`
- 제품 소개 문구는 OHT·AGV·AMR·OHS의 레이아웃, 물동량, 배차·교통 제어, KPI를 고객 환경에 맞게 모델링·검증하는 **기업 맞춤형 AMHS 시뮬레이션 소프트웨어**를 중심으로 짧게 정리했습니다.
- Hero 미리보기의 `Workspace` 표기도 제품 라인으로 오해되지 않도록 `Simulation`으로 변경했습니다.

## 구현 구조

- 기존 `contact.js`는 `#products`가 있을 때 B2B 제품/판매 구조를 동적으로 덮어쓰므로, 새 정적 제품 섹션은 `#solutions` 앵커를 사용합니다.
- 제품 내비게이션과 Hero 제품 CTA도 `#solutions`로 연결합니다.
- 3개 제품 카드는 `repeat(auto-fit, minmax(240px, 1fr))` 그리드를 사용해 모바일·태블릿에서 카드가 겹치거나 지나치게 좁아지지 않도록 했습니다.
- `제품성능`, `컨설팅`, `워크플로우`, Windows/Linux 다운로드, 문의 모달은 기존 동작을 유지합니다.
- 중국어 페이지의 self-only CSP와 로컬 자산 정책도 유지합니다.

## 검증 범위

이번 요청은 PR 요청이 아니므로 별도 Build/Test 및 GitHub Actions는 실행하지 않았습니다. 코드 기준으로 다국어 5개 페이지의 내비게이션, 제품 앵커, 제품 카드 수, Platform 섹션 제거 범위를 동일하게 맞췄습니다.

---

# Issue #46 — 모바일 제품 문구·간격 정리 및 성능 표기 반올림

2026-09-06 제품 섹션의 상단 소개를 더 짧고 강하게 정리하고, 모바일에서 메뉴 버튼과 각 섹션 본문 사이 간격 및 텍스트 잘림을 보정했습니다.

## 변경 내용

- 제품 섹션에서 `현장에 맞는 AMHS 시뮬레이션 소프트웨어.` 제목과 그 아래 설명 문단을 삭제했습니다.
- `기업 맞춤형 AMHS 시뮬레이션 SW`를 제품 섹션의 단일 대형 제목으로 확대했습니다.
- 영어·중국어(간체)·스페인어·일본어도 같은 구조로 맞춰 각 언어의 Custom AMHS Simulation Software 문구만 대형 제목으로 표시합니다.
- `#solutions`, `#consulting`, `#workflow`의 모바일 상단 padding과 `scroll-margin-top`을 `#engine-performance`와 같은 기준으로 맞춰 메뉴 클릭 후 과도한 상단 공백을 줄였습니다.
- 카드·컨설팅 패널·워크플로우 카드의 padding, gap, heading margin을 줄여 긴 세로 공백을 축소했습니다.
- 모바일 제목과 본문에 `word-break`, `overflow-wrap`, 적절한 `line-height`, `min-height:auto`를 적용해 잘림과 겹침 가능성을 낮췄습니다.
- 공개 화면의 `21.559×` 표기는 읽기 쉽게 `21.6×`로 반올림해 표시합니다. 원시 실측값 `21.559×`와 166.981초 측정 근거는 기존 문서에 그대로 보존합니다.
- 이미지 생성 및 이미지 자산 변경은 하지 않았습니다.

## 구현 구조

- `site-fixes.css`: Issue #46의 공통 모바일 간격·텍스트 래핑·제품 대형 제목 오버라이드만 관리합니다.
- `display-fixes.js`: `contact.js`가 생성한 성능 섹션의 공개 표시값만 `21.559 → 21.6`으로 반올림합니다.
- 모든 다국어 HTML은 위 두 공통 파일을 로드하며 기존 `site.css`, `contact.js`, 중국어 CSP, Windows/Linux, Contact 기능은 유지합니다.

## 검증 범위

PR 요청이 아니므로 별도 Build/Test 및 GitHub Actions는 실행하지 않았습니다. 이미지 생성도 수행하지 않았습니다. 코드 기준으로 한국어 기본/호환, 영어, 중국어(간체), 스페인어, 일본어 페이지가 동일한 제품 제목 구조와 공통 보정 파일을 사용하도록 맞췄습니다.
