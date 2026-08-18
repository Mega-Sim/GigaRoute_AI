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
- 공통 문의 UI, Auto Simulation 다국어 가격 정책 및 무료 레이아웃 점검 섹션: `contact.js`
- 상단 `GitHub` 버튼: `https://github.com/Mega-Sim/GigaRoute_AI_Simulation_Demo` (모든 언어 페이지 공통)

루트 도메인 `https://gigaroute.ai/`은 한국어 홈페이지를 기본으로 표시합니다. 각 페이지 상단의 언어 선택 메뉴에서 English, 한국어, 中文, Español, 日本語 페이지로 이동할 수 있습니다. English 선택은 항상 `index-en.html`로 이동하도록 공통 스크립트에서 정규화합니다. 기존 `index-ko.html` 주소는 한국어 호환 주소로 유지합니다. 모든 파일은 UTF-8로 관리합니다.

## 중국어 페이지 중국 접속 최적화 정책

`index-zh.html`은 중국 본토에서 차단되거나 지연될 수 있는 외부 렌더링 리소스에 의존하지 않도록 별도로 관리합니다.

- Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`)를 사용하지 않음
- 외부 CSS/CDN, 외부 JavaScript/CDN, 외부 Web Font를 중국어 페이지의 렌더링 필수 요소로 사용하지 않음
- 중국어 페이지에 self-only Content Security Policy를 적용하여 `font`, `style`, `script`, `connect` 외부 로드를 차단
- 스타일과 동작은 같은 도메인의 `site.css`, `contact.js`, `favicon.png` 등 로컬 자산을 사용
- 중국어 글꼴은 `Microsoft YaHei UI`, `Microsoft YaHei`, `PingFang SC`, `Hiragino Sans GB`, `Source Han Sans SC`, `Noto Sans CJK SC`, Arial 순의 시스템 폰트 스택을 사용하며 외부 폰트 다운로드를 요구하지 않음
- 공통 CSS/JS를 변경하더라도 중국어 페이지에 Google 계열 리소스나 중국에서 접근이 불안정한 CDN 의존성을 추가하지 않음
- GitHub 등 외부 사이트로 이동하는 일반 링크는 페이지 렌더링 의존성이 아니므로 유지할 수 있으나, 중국어 페이지 자체 표시와 주요 기능은 외부 사이트 접속 없이 동작해야 함

2026-08-17 점검 당시 저장소에는 `fonts.googleapis.com`, `fonts.gstatic.com`, CSS `@import`, `@font-face` 기반 외부 폰트 로드가 존재하지 않았으며, Issue #15에서 중국어 페이지가 향후에도 외부 CDN을 자동으로 사용하지 못하도록 CSP를 추가했습니다.

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

## GigaRoute Auto Simulation 판매 정책

Auto Simulation 상품명은 모든 언어 페이지에서 아래 5개 명칭으로 **고정**합니다. 임의로 `Scale`, `Enterprise` 등 이전 명칭으로 되돌리지 않습니다.

| 상품 | 최대 동시 Vehicle | 한국 출시가 | 한국 정가 | 일본 출시가 | 일본 정가 |
|---|---:|---:|---:|---:|---:|
| Auto Simulation Free | 20 | 무료 | - | 無料 | - |
| Auto Simulation Basic | 100 | ₩79,000/월 | ₩129,000/월 | ¥8,900/月 | ¥14,000/月 |
| Auto Simulation Pro | 500 | ₩199,000/월 | ₩299,000/월 | ¥22,000/月 | ¥33,000/月 |
| Auto Simulation Ultra | 1,500 | ₩399,000/월 | ₩599,000/월 | ¥44,000/月 | ¥66,000/月 |
| Auto Simulation Ultimate | 3,000 | ₩799,000/월 | ₩1,190,000/월 | ¥88,000/月 | ¥132,000/月 |

판매/표시 원칙:

- 최종 상품명: **Free / Basic / Pro / Ultra / Ultimate**
- Vehicle 제한: **20 / 100 / 500 / 1,500 / 3,000**
- 한국어 페이지: KRW 가격 공개, 정가는 취소선으로 표시하고 Launch Price 강조
- 일본어 페이지: JPY 가격 공개, 정가는 취소선으로 표시하고 Launch Price 강조
- 영어·중국어·스페인어 페이지: 가격 대신 `Contact Dealer` / 현지 딜러 문의
- Layout Object / Station / Node / Edge 수에는 라이선스상 개수 제한을 두지 않음
- 모든 요금제에 Workspace + 2D/3D Auto Simulation 포함
- Auto Simulation Pro를 대표/강조 상품으로 표시
- 구형 Workspace 월 USD 120 / 연 USD 1,200 단독 가격표는 사용하지 않음
- 구형 Workspace / Auto Simulation / Simulation Pro / AMR 4개 제품 카드 영역은 가격표 영역으로 대체하며 다시 노출하지 않음

상품명과 가격 정책은 공통 `contact.js`에서 결정하므로 한국어·영어·중국어·스페인어·일본어 페이지에 동일하게 적용합니다.

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

- 2026-08-18: Issue #17로 루트 한국어·한국어 호환·중국어·스페인어·일본어 홈페이지의 상단 우측 `GitHub` 버튼을 `Mega-Sim/GigaRoute_AI_Simulation_Demo` 저장소로 통일했습니다. 영어 페이지는 Issue #16에서 이미 동일하게 연결되어 있었습니다.
- 2026-08-18: Issue #16으로 영어 홈페이지 상단 우측 `GitHub` 버튼을 공개 `Mega-Sim/GigaRoute_AI_Simulation_Demo` 저장소로 연결했습니다.
- 2026-08-17: Issue #15로 중국어 페이지에 self-only CSP와 중국어 로컬 시스템 폰트 스택을 적용하고, Google Fonts/CDN 등 중국 본토에서 차단될 수 있는 외부 렌더링 의존성을 사용하지 않는 정책을 고정했습니다.
- 2026-08-17: Issue #14로 Auto Simulation 상위 상품명을 `Scale → Ultra`, `Enterprise → Ultimate`로 변경하고, 모든 언어 페이지에서 Free / Basic / Pro / Ultra / Ultimate 명칭을 공통 사용하도록 고정했습니다.
- 2026-08-17: Issue #13 요청 해석을 정정해 Issue #12의 Vehicle 기준 신제품/가격표를 복구하고, 구형 4개 제품 카드 및 과거 Workspace 단독 가격 영역은 제거했습니다. English 선택은 `index-en.html`로 이동하도록 유지합니다.
- 2026-08-17: Issue #12로 최대 동시 Vehicle 수 기준의 Auto Simulation 상품·국가별 가격 정책을 도입했습니다. 이후 Issue #14에서 상위 상품명을 Ultra / Ultimate로 확정했습니다.
- 2026-08-17: Issue #11로 사용자 제공 `GR` 브랜드 아이콘을 `favicon.png`에 적용하고, 루트 한국어 홈페이지에서 브라우저 탭/주소창 아이콘으로 명시적으로 사용하도록 연결했습니다.
- 2026-08-17: Issue #10으로 루트 `index.html`의 기본 언어를 한국어로 전환하고, 기존 영문 홈페이지를 `index-en.html`에 보존했습니다. 기존 `index-ko.html` 주소와 중국어·스페인어·일본어 페이지는 유지합니다.
- 2026-08-17: private `Mega-Sim/Sim_Core`를 canonical product source로, public `Mega-Sim/GigaRoute_AI`를 홈페이지·배포 전용 저장소로 분리하고 native source/symbol/intermediate/binary의 Git commit 차단 정책을 추가했습니다.
- 2026-08-05: 영어·한국어·중국어·스페인어·일본어 홈페이지 Hero 아래에 무료 초기 레이아웃 점검 섹션을 추가하고, 초기 점검 범위와 유료 전문 서비스의 경계를 명확히 표시했습니다.
- 2026-08-05: GigaRoute Workspace에 `(Enable Customizing)`을 추가하고 AutoMod·NVIDIA Isaac Sim Export 설명을 모든 언어 페이지에 반영했습니다.
- 2026-08-05: 모든 언어 페이지에 다국어 Contact 모달, 이메일 복사, 업무시간·회신시간 안내를 적용하고 `mailto:` 직접 실행에 따른 외부 메일 클라이언트 실행 문제를 제거했습니다.
- 2026-08-05: 영문 기본 홈페이지에서 Roadmap 오른쪽에 Contact 메뉴를 추가하고 `support@gigaroute.ai` 고객지원 링크 및 운영 안내를 추가했습니다.
- 2026-08-04: Consulting 메뉴와 Algorithm-Based AutoMod Modeling 소개를 다국어 페이지에 추가하고 GigaRoute Basic을 GigaRoute Auto Simulation으로 변경했습니다.
- 2026-08-04: 루트 도메인의 기본 언어를 영어로 변경하고 한국어·중국어·스페인어·일본어 페이지와 공통 언어 선택 UI를 추가했습니다.

홈페이지 공개·배포 원본은 `Mega-Sim/GigaRoute_AI`에서 관리하며, 제품 C++ 핵심 소스는 private `Mega-Sim/Sim_Core`에서 관리합니다.