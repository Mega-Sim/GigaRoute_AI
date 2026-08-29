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
