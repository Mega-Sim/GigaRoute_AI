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

각 페이지 상단의 언어 선택 메뉴에서 English, 한국어, 中文, Español, 日本語 페이지로 이동할 수 있습니다. 모든 파일은 UTF-8로 관리하며, 검색엔진 언어 구분을 위한 canonical 및 `hreflang` 링크를 포함합니다.

## 고객지원 이메일 운영

홈페이지의 `Contact` 메뉴와 하단 고객지원 링크는 `mailto:support@gigaroute.ai`를 사용합니다. 실제 송수신을 위해서는 도메인 DNS를 관리하는 서비스에서 메일 호스팅을 연결해야 합니다.

권장 초기 구성:

1. Google Workspace 또는 Microsoft 365에서 `support@gigaroute.ai` 사서함을 생성합니다.
2. 도메인 DNS에 서비스가 안내하는 MX, SPF, DKIM 레코드를 등록합니다.
3. DMARC 레코드는 초기에는 모니터링 정책(`p=none`)으로 시작하고 정상 송수신 확인 후 강화합니다.
4. 대표자가 직접 확인하거나 담당자 여러 명이 필요하면 공유 사서함 또는 Google Group으로 운영합니다.
5. 문의량이 증가하면 Freshdesk, Zendesk, Jira Service Management 등의 티켓 시스템에 해당 주소를 연결합니다.

단순 포워딩만 사용할 수도 있지만, 발신 주소 인증과 회신 이력 관리를 위해 독립 사서함 또는 공유 사서함 방식을 권장합니다.

## 작업 브랜치

- `feature/issue-3-consulting-auto-simulation`: Consulting 메뉴·Algorithm-Based AutoMod Modeling 소개·GigaRoute Auto Simulation 명칭 반영

## 변경 이력

- 2026-08-05: 영문 기본 홈페이지에서 Roadmap 오른쪽에 Contact 메뉴를 추가하고 `support@gigaroute.ai` 고객지원 링크 및 운영 안내를 추가했습니다.
- 2026-08-04: Consulting 메뉴와 Algorithm-Based AutoMod Modeling 소개를 다국어 페이지에 추가하고 GigaRoute Basic을 GigaRoute Auto Simulation으로 변경했습니다.
- 2026-08-04: 루트 도메인의 기본 언어를 영어로 변경하고 한국어·중국어·스페인어·일본어 페이지와 공통 언어 선택 UI를 추가했습니다.

홈페이지 원본은 `Mega-Sim/Sim_Core`의 `docs/GigaRoute_AI`에서 이관되었습니다.
