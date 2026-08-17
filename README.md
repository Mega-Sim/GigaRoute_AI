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
- 공통 문의 UI, Workspace 다국어 정보, Auto Simulation 국가별 가격표 및 무료 레이아웃 점검 섹션: `contact.js`

루트 도메인 `https://gigaroute.ai/`은 한국어 홈페이지를 기본으로 표시합니다. 각 페이지 상단의 언어 선택 메뉴에서 English, 한국어, 中文, Español, 日本語 페이지로 이동할 수 있습니다. 기존 `index-ko.html` 주소는 한국어 호환 주소로 유지합니다. 모든 파일은 UTF-8로 관리합니다.

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

## GigaRoute Auto Simulation 판매 정보

`GigaRoute Workspace + 2D/3D Auto Simulation`을 하나의 Auto Simulation 상품군으로 안내합니다. 라이선스 등급은 레이아웃 Object 수가 아니라 **한 번의 Simulation Run에서 허용되는 최대 동시 Vehicle 수**로 구분합니다.

라이선스상 다음 항목의 개수 제한은 두지 않습니다.

- Layout Object
- Station
- Node
- Edge

실제 처리 가능 규모는 사용자 PC 사양과 레이아웃 복잡도에 영향을 받을 수 있으므로 홈페이지 문구는 `No license-based object limits` 의미로 사용합니다.

### 상품 등급

| 상품 | 최대 동시 Vehicle | 한국 출시가 | 한국 정가 | 일본 출시가 | 일본 정가 |
|---|---:|---:|---:|---:|---:|
| Auto Simulation Free | 20 | 무료 | - | 無料 | - |
| Auto Simulation Basic | 100 | ₩79,000/월 | ₩129,000/월 | ¥8,900/月 | ¥14,000/月 |
| Auto Simulation Pro | 500 | ₩199,000/월 | ₩299,000/월 | ¥22,000/月 | ¥33,000/月 |
| Auto Simulation Scale | 1,500 | ₩399,000/월 | ₩599,000/월 | ¥44,000/月 | ¥66,000/月 |
| Auto Simulation Enterprise | 3,000 | ₩799,000/월 | ₩1,190,000/월 | ¥88,000/月 | ¥132,000/月 |

- 한국어 페이지: KRW 가격 공개, 정가는 취소선으로 표시하고 Launch Price를 강조
- 일본어 페이지: JPY 가격 공개, 정가는 취소선으로 표시하고 Launch Price를 강조
- 영어·중국어·스페인어 페이지: 금액을 직접 표시하지 않고 `Contact Dealer` / 현지 딜러 문의로 안내
- `GigaRoute Workspace`는 별도 USD 정가 상품으로 표시하지 않고 Auto Simulation 요금제 포함 기능으로 안내
- 각 요금제에는 Workspace + 2D/3D Auto Simulation 포함 문구를 표시
- Auto Simulation Pro를 가격표의 대표/강조 상품으로 표시

가격 및 국가별 판매 정책은 공통 `contact.js`에서 locale에 따라 결정하여 다국어 페이지의 중복 로직을 만들지 않습니다.

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

- 2026-08-17: Issue #12로 GigaRoute Auto Simulation을 최대 동시 Vehicle 수 기준의 Free 20 / Basic 100 / Pro 500 / Scale 1,500 / Enterprise 3,000 상품군으로 구성하고, 한국은 KRW·일본은 JPY의 정가 취소선 + Launch Price를 표시하며 나머지 언어권은 Dealer 문의 정책으로 전환했습니다. 기존 Workspace USD 단독 가격은 제거하고 Auto Simulation 요금제 포함 기능으로 안내합니다.
- 2026-08-17: Issue #11로 사용자 제공 `GR` 브랜드 아이콘을 `favicon.png`에 적용하고, 루트 한국어 홈페이지에서 브라우저 탭/주소창 아이콘으로 명시적으로 사용하도록 연결했습니다.
- 2026-08-17: Issue #10으로 루트 `index.html`의 기본 언어를 한국어로 전환하고, 기존 영문 홈페이지를 `index-en.html`에 보존했습니다. 기존 `index-ko.html` 주소와 중국어·스페인어·일본어 페이지는 유지합니다.
- 2026-08-17: private `Mega-Sim/Sim_Core`를 canonical product source로, public `Mega-Sim/GigaRoute_AI`를 홈페이지·배포 전용 저장소로 분리하고 native source/symbol/intermediate/binary의 Git commit 차단 정책을 추가했습니다.
- 2026-08-05: 영어·한국어·중국어·스페인어·일본어 홈페이지 Hero 아래에 무료 초기 레이아웃 점검 섹션을 추가하고, 초기 점검 범위와 유료 전문 서비스의 경계를 명확히 표시했습니다.
- 2026-08-05: Product별 기존 카드와 같은 색상의 하단 상세 박스를 추가하고, Workspace에는 월간 USD 120·연간 USD 1,200 가격표를 배치했으며 나머지 제품에는 준비 중 안내를 적용했습니다. (Issue #12에서 현재 국가별 Auto Simulation 가격 정책으로 대체)
- 2026-08-05: GigaRoute Workspace에 `(Enable Customizing)`을 추가하고 AutoMod·NVIDIA Isaac Sim Export 설명과 월간 USD 120·연간 USD 1,200 가격표를 모든 언어 페이지에 반영했습니다. (Issue #12에서 Workspace를 Auto Simulation 포함 기능으로 변경)
- 2026-08-05: 모든 언어 페이지에 다국어 Contact 모달, 이메일 복사, 업무시간·회신시간 안내를 적용하고 `mailto:` 직접 실행에 따른 외부 메일 클라이언트 실행 문제를 제거했습니다.
- 2026-08-05: 영문 기본 홈페이지에서 Roadmap 오른쪽에 Contact 메뉴를 추가하고 `support@gigaroute.ai` 고객지원 링크 및 운영 안내를 추가했습니다.
- 2026-08-04: Consulting 메뉴와 Algorithm-Based AutoMod Modeling 소개를 다국어 페이지에 추가하고 GigaRoute Basic을 GigaRoute Auto Simulation으로 변경했습니다.
- 2026-08-04: 루트 도메인의 기본 언어를 영어로 변경하고 한국어·중국어·스페인어·일본어 페이지와 공통 언어 선택 UI를 추가했습니다.

홈페이지 공개·배포 원본은 `Mega-Sim/GigaRoute_AI`에서 관리하며, 제품 C++ 핵심 소스는 private `Mega-Sim/Sim_Core`에서 관리합니다.
