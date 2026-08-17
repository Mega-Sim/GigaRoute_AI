# GigaRoute AI

GigaRoute AI 공식 홈페이지 공개 저장소입니다.

- 공식 도메인: https://gigaroute.ai
- 고객지원 이메일: support@gigaroute.ai
- 배포 방식: GitHub Pages + GitHub Actions
- 기본 홈페이지: `index.html` (한국어)
- 영어 페이지: `index-en.html`
- 한국어 호환 주소: `index-ko.html`
- 중국어(간체) 페이지: `index-zh.html`
- 스페인어 페이지: `index-es.html`
- 일본어 페이지: `index-ja.html`
- 브라우저 파비콘: `favicon.png` (GigaRoute `GR` 브랜드 아이콘)
- 공통 스타일: `site.css`
- 공통 문의 UI, 무료 레이아웃 점검, Vehicle 기준 상품·가격표: `contact.js`

루트 도메인 `https://gigaroute.ai/`은 한국어 홈페이지를 기본으로 표시합니다. 각 페이지 상단의 언어 선택 메뉴에서 English, 한국어, 中文, Español, 日本語 페이지로 이동할 수 있습니다. English 선택은 항상 `index-en.html`로 이동하도록 공통 스크립트에서 정규화합니다. 기존 `index-ko.html` 주소는 한국어 호환 주소로 유지합니다. 모든 파일은 UTF-8로 관리합니다.

## Public Distribution / Private Core 정책

이 저장소는 **public 홈페이지 및 배포 전용 저장소**입니다. GigaRoute 제품의 C++ 핵심 소스는 여기에 저장하지 않습니다.

- private canonical source: `Mega-Sim/Sim_Core`
- public website/distribution: `Mega-Sim/GigaRoute_AI`
- `SimulationEngine`, `RouteCatalog`, Merge/Deadlock, Simulation Studio 등 핵심 구현은 private `Sim_Core`에만 유지
- `.cpp/.hpp/.pdb/.lib/.obj/.exp/.ilk` 등 네이티브 소스·심볼·중간 산출물은 이 public 저장소에 커밋하지 않음
- Windows EXE/DLL/ZIP 배포 파일은 Git tree에 커밋하지 않고 **GitHub Releases asset**으로만 배포
- public release package는 private `Sim_Core`의 hardened Release staging에서 생성하며 source/debug symbol/private library를 포함하지 않음

루트 `.gitignore`는 실수로 native source, debug symbols, compiler intermediates, runtime binaries가 public Git history에 들어가는 것을 방지합니다.

## 무료 초기 레이아웃 점검

모든 언어 페이지의 Hero 영역 바로 아래에서 DXF 기반 무료 초기 레이아웃 점검 서비스를 안내합니다.

- 연결되지 않거나 누락된 경로
- 잘못된 교차점과 분기·합류
- 중복 또는 겹친 형상
- 급격한 곡선과 주행 경로 품질
- 시뮬레이션 모델링에 영향을 줄 수 있는 문제
- 주요 문제 요약, 개선 권고 및 다음 단계 안내

무료 서비스는 초기 엔지니어링 점검 범위이며, 전체 레이아웃 수정, 시뮬레이션 네트워크 생성 및 맞춤 개발은 유료 전문 서비스로 구분합니다. 신청 버튼은 공통 Contact 모달과 `support@gigaroute.ai` 문의 동선으로 연결됩니다.

## GigaRoute Auto Simulation 제품·가격 정책

홈페이지의 구형 4개 제품 카드 영역은 표시하지 않고, `GigaRoute Auto Simulation`의 Vehicle 기준 상품군을 제품 영역에 직접 표시합니다.

| 상품 | 최대 동시 Vehicle | 한국 출시가 | 한국 정가 | 일본 출시가 | 일본 정가 |
|---|---:|---:|---:|---:|---:|
| Auto Simulation Free | 20 | 무료 | - | 無料 | - |
| Auto Simulation Basic | 100 | ₩79,000/월 | ₩129,000/월 | ¥8,900/月 | ¥14,000/月 |
| Auto Simulation Pro | 500 | ₩199,000/월 | ₩299,000/월 | ¥22,000/月 | ¥33,000/月 |
| Auto Simulation Scale | 1,500 | ₩399,000/월 | ₩599,000/월 | ¥44,000/月 | ¥66,000/月 |
| Auto Simulation Enterprise | 3,000 | ₩799,000/월 | ₩1,190,000/월 | ¥88,000/月 | ¥132,000/月 |

- 한국어 페이지: KRW 가격 공개, 정가는 취소선으로 표시하고 Launch Price 강조
- 일본어 페이지: JPY 가격 공개, 정가는 취소선으로 표시하고 Launch Price 강조
- 영어·중국어·스페인어 페이지: 금액 대신 Dealer 문의 표시
- 각 요금제에 `Workspace + 2D/3D Auto Simulation 포함` 표시
- Layout Object / Station / Node / Edge는 라이선스상 개수 제한 없음
- Auto Simulation Pro는 대표 상품으로 강조
- 과거 영문 페이지에 남아 있던 `Workspace Monthly $120 / Annual $1,200` 구형 가격 섹션은 표시하지 않음

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

- `feature/issue-8-free-layout-assessment`: 다국어 무료 초기 레이아웃 점검 섹션 및 문의 연결 추가
- `feature/issue-3-consulting-auto-simulation`: Consulting 메뉴·Algorithm-Based AutoMod Modeling 소개·GigaRoute Auto Simulation 명칭 반영

## 변경 이력

- 2026-08-17: Issue #13 해석을 정정해 Issue #12의 Vehicle 기준 Free / Basic / Pro / Scale / Enterprise 상품·가격표를 복구하고, 사용자가 삭제 요청한 구형 4개 제품 카드 영역 및 과거 Workspace USD 가격 섹션은 표시하지 않도록 수정했습니다. English 선택은 `index-en.html`로 이동하는 수정 상태를 유지합니다.
- 2026-08-17: Issue #12로 GigaRoute Auto Simulation을 최대 동시 Vehicle 수 기준의 Free 20 / Basic 100 / Pro 500 / Scale 1,500 / Enterprise 3,000 상품군으로 구성하고, 한국은 KRW·일본은 JPY의 정가 취소선 + Launch Price를 표시하며 나머지 언어권은 Dealer 문의 정책으로 구성했습니다.
- 2026-08-17: Issue #11로 사용자 제공 `GR` 브랜드 아이콘을 `favicon.png`에 적용했습니다.
- 2026-08-17: Issue #10으로 루트 `index.html`의 기본 언어를 한국어로 전환하고, 기존 영문 홈페이지를 `index-en.html`에 보존했습니다.
- 2026-08-17: private `Mega-Sim/Sim_Core`를 canonical product source로, public `Mega-Sim/GigaRoute_AI`를 홈페이지·배포 전용 저장소로 분리했습니다.

홈페이지 공개·배포 원본은 `Mega-Sim/GigaRoute_AI`에서 관리하며, 제품 C++ 핵심 소스는 private `Mega-Sim/Sim_Core`에서 관리합니다.
