# GigaRoute AI

GigaRoute AI 공식 홈페이지 공개 저장소입니다.

- 공식 도메인: https://gigaroute.ai
- 고객지원 이메일: support@gigaroute.ai
- 배포 방식: GitHub Pages + GitHub Actions
- 기본 홈페이지: `index.html` (English)
- 영어 호환 주소: `index-en.html`
- 한국어 페이지: `index-ko.html`
- 중국어(간체) 페이지: `index-zh.html`
- 스페인어 페이지: `index-es.html`
- 일본어 페이지: `index-ja.html`
- 공통 스타일: `site.css`
- 공통 문의 UI 및 Workspace 다국어 정보: `contact.js`

각 페이지 상단의 언어 선택 메뉴에서 English, 한국어, 中文, Español, 日本語 페이지로 이동할 수 있습니다. 모든 파일은 UTF-8로 관리하며, 검색엔진 언어 구분을 위한 canonical 및 `hreflang` 링크를 포함합니다.

## GigaRoute Workspace 판매 정보

모든 언어 페이지에서 GigaRoute Workspace를 커스터마이징 가능한 제품으로 안내하며, AutoMod 및 NVIDIA Isaac Sim Export 지원 내용을 표시합니다.

- 월간 구독: USD 120
- 연간 구독: USD 1,200
- 현장별 워크플로우 및 Export 요구사항에 맞춘 커스터마이징 문의 가능

## 고객지원 이메일 운영

홈페이지의 Contact 메뉴, 하단 문의 버튼 및 Footer 이메일은 운영체제의 기본 메일 프로그램을 직접 실행하지 않습니다. 대신 홈페이지 내부의 다국어 Contact 모달을 열어 다음 정보를 제공합니다.

- 고객지원 이메일 `support@gigaroute.ai`
- 이메일 주소 복사 버튼
- 평일 업무시간 및 일반적인 회신 예상시간
- ESC, 배경 클릭, 닫기 버튼을 통한 종료
- PC 및 모바일 반응형 표시

현재 수신 구성은 Cloudflare Email Routing을 사용합니다.

`support@gigaroute.ai` → Cloudflare Email Routing → 지정 Gmail 주소

Cloudflare가 관리하는 MX, SPF, DKIM 레코드는 임의로 수정하거나 삭제하지 않습니다. 무료 Email Routing은 수신 전달 기능이며, Gmail에서 회신할 경우 기본 발신 주소는 Gmail 주소로 표시될 수 있습니다. 향후 `support@gigaroute.ai` 발신이 필요하면 Google Workspace, Microsoft 365 또는 별도 SMTP 서비스를 연결합니다.

## 작업 브랜치

- `feature/issue-3-consulting-auto-simulation`: Consulting 메뉴·Algorithm-Based AutoMod Modeling 소개·GigaRoute Auto Simulation 명칭 반영

## 변경 이력

- 2026-08-05: GigaRoute Workspace에 `(Enable Customizing)`을 추가하고 AutoMod·NVIDIA Isaac Sim Export 설명과 월간 USD 120·연간 USD 1,200 가격표를 모든 언어 페이지에 반영했습니다.
- 2026-08-05: 모든 언어 페이지에 다국어 Contact 모달, 이메일 복사, 업무시간·회신시간 안내를 적용하고 `mailto:` 직접 실행에 따른 외부 메일 클라이언트 실행 문제를 제거했습니다.
- 2026-08-05: 영문 기본 홈페이지에서 Roadmap 오른쪽에 Contact 메뉴를 추가하고 `support@gigaroute.ai` 고객지원 링크 및 운영 안내를 추가했습니다.
- 2026-08-04: Consulting 메뉴와 Algorithm-Based AutoMod Modeling 소개를 다국어 페이지에 추가하고 GigaRoute Basic을 GigaRoute Auto Simulation으로 변경했습니다.
- 2026-08-04: 루트 도메인의 기본 언어를 영어로 변경하고 한국어·중국어·스페인어·일본어 페이지와 공통 언어 선택 UI를 추가했습니다.

홈페이지 원본은 `Mega-Sim/Sim_Core`의 `docs/GigaRoute_AI`에서 이관되었습니다.
