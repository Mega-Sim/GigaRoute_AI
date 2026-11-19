# Cloudflare Workers Git 연동 현황 및 Pages 선택 전환 절차

> 상태(2026-11-19 KST): **Cloudflare Workers Git 연결·최초 배포 확인 / main Push 자동 재배포 검증 중 / 공식 도메인은 GitHub Pages 유지**. Cloudflare Pages 프로젝트는 생성 확인되지 않았습니다.
> 이 문서는 기존 공식 홈페이지를 변경하지 않는 실행 지침입니다. Cloudflare 계정의 비밀번호, 세션 쿠키, API 토큰은 GitHub나 이 문서에 기록하지 않습니다.

## 0. 현재 운영 구성 (실측)

- 공개 홈페이지 저장소: `Mega-Sim/GigaRoute_AI`
- 기본 브랜치: `main` (이 저장소는 신규 브랜치를 만들지 않고 `main`에서 작업)
- 공식 도메인: `https://gigaroute.ai`
- 현재 배포: `.github/workflows/deploy-pages.yml` → GitHub Pages (GitHub Actions)
- `gigaroute.ai` A: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www.gigaroute.ai` CNAME: `mega-sim.github.io`
- 현장 HTTP HEAD 결과: `200`, `Server: GitHub.com`
- 현재 배포물의 `index.html`에서 `contact.js?v=20261117-1` 존재 확인

위 DNS와 HTTP 점검은 2026-11-19에 수행했습니다. 전환할 때 다시 확인하십시오.


## 0-A. 실제 생성된 Cloudflare Workers 프리뷰 (2026-11-19)

- Workers 프리뷰: `https://gigaroute-ai.sik1093.workers.dev/`
- 대시보드 배포 로그의 Initializing / Cloning / Installing / Deploying 및 Build completed 성공 화면 확인
- GitHub 저장소 `Mega-Sim/GigaRoute_AI`, Production branch `main`: 계정 소유자가 대시보드에서 직접 확인
- Windows 원격 PC에서 프리뷰와 공식 사이트에 직접 HTTP 요청: 메인, 영어, Help, YouTube, History, 중국어, 스페인어, 일본어, `contact.js`, `site.css`, `site-fixes.css`, `favicon.png`, Help JSON 2개 모두 HTTP 200 및 원본 바이트 SHA-256 일치
- `/index-ko.html`은 Cloudflare Workers에서 HTTP 307 → `/index-ko` (HTTP 200)으로 정규화됨. 기존 GitHub Pages는 `/index-ko.html`에 직접 HTTP 200을 반환. 도메인 전환 전 링크·SEO 정책과 호환성 재점검 필요
- HTML의 `Content-Type`은 Worker가 `text/html`로 응답하고 기존 GitHub Pages는 `text/html; charset=utf-8`로 응답함. HTML 문서 내 `<meta charset="utf-8">` 확인; 브라우저 한글 렌더링 정상
- **자동 재배포 검증용 문서 마커:** `WORKERS_GIT_SYNC_20261119_A`
- 이 마커를 포함한 문서 전용 `main` 커밋으로 GitHub Push → Workers 배포 반영 여부를 별도 확인하며, 기존 홈페이지 HTML/CSS/JS 및 DNS는 변경하지 않음

> 아래 1~4장은 **Pages로 별도 전환하는 경우의 선택 가이드**입니다. 현재 연결된 서비스는 Pages가 아닌 Workers입니다. Pages 추가 프로젝트 생성은 당장 필요하지 않습니다.

## 1. Cloudflare Pages 별도 프로젝트 생성 (사이트 전환 금지)

Cloudflare 로그인 계정 소유자가 대시보드에서 다음을 수행합니다.

1. [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) → **Create application** → **Pages** → **Connect to Git**.
2. GitHub를 연결하고, 저장소 접근 권한은 가능하다면 `Mega-Sim/GigaRoute_AI`로만 한정합니다.
3. 선택 저장소: `Mega-Sim/GigaRoute_AI`
4. Project name: `gigaroute-ai-site` (미사용 이름이면 사용 가능하며, 충돌 시 다른 고유 이름 사용).
5. Production branch: **`main`**
6. Framework preset: **None** / Build command: **비워 둠** / Build output directory: **`.`** / Root directory: **저장소 루트**.
   - 이 저장소는 `index.html`, `site.css`, `contact.js`, `help/`, `youtube/`, `history/` 등을 루트 기준 상대 경로로 배포하는 **빌드 단계 없는 정적 사이트**입니다.
7. Save and Deploy. 자동 생성된 `https://<project>.pages.dev` 주소를 확인합니다.
8. **이 단계에서는 Cloudflare Pages에 `gigaroute.ai`이나 `www.gigaroute.ai`을 연결하지 않습니다.** 기존 GitHub Pages DNS/CNAME도 변경하지 않습니다.

공식 문서: https://developers.cloudflare.com/pages/get-started/git-integration/ , https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## 2. 기존 페이지와 미리보기 비교 (필수)

먼저 `pages.dev` 환경에서 아래 경로를 확인하고, 기존 `https://gigaroute.ai`과 비교합니다.

- `/` — 한국어 메인 홈페이지, 동일한 Hero/내비게이션/다운로드 링크
- `/index-ko.html`, `/index-en.html`, `/index-zh.html`, `/index-es.html`, `/index-ja.html` — 언어별 렌더링
- `/site.css`, `/site-fixes.css`, `/contact.js`, `/display-fixes.js` — 정적 자산 응답 및 콘솔 오류 없음
- `/help/` 및 `/help/reference.json` — Help/검색 데이터 정상
- `/youtube/`, `/history/` — 독립 페이지 정상
- `/robots.txt`, `/sitemap.xml`, `/favicon.png` — 정상 응답
- 모바일/데스크톱 UI, 다운로드 버튼과 문의 모달 기능이 기존과 동일
- 암호, 토큰, 사내 자료, 비공개 제품 핵심 코드가 Pages 배포물에 포함되지 않음

`main`에 테스트용 콘텐츠 커밋을 만들지 않고, 다음 정상적인 홈페이지 변경 시 Cloudflare Pages 배포 로그에서 **같은 커밋 SHA**가 반영되는지 확인합니다.

## 3. 전환 결정이 내려졌을 때만 진행

- 사전 검증이 모두 끝나기 전에는 DNS를 바꾸지 않습니다.
- Cloudflare Pages > Custom domains에서 `gigaroute.ai` 연결을 설정합니다. 필요한 DNS 전환은 Cloudflare 화면의 안내와 실제 레코드를 대조한 뒤 수행합니다.
- `www.gigaroute.ai`도 별도로 연결하고 HTTPS/리디렉션을 점검합니다.
- GitHub Pages의 기존 워크플로/설정은 전환 직후 즉시 제거하지 않습니다. 롤백 기간 동안 유지합니다.
- **Cloudflare Email Routing 관련 MX/SPF/DKIM/TXT 레코드를 변경하지 않습니다.**
- 전환 후 `/`, 언어별 페이지, Help, YouTube, History, 다운로드 링크, 모바일 레이아웃을 다시 확인합니다.

## 4. 장애 발생 시 원상복구

1. Cloudflare Pages의 커스텀 도메인 연결 및 변경된 웹용 DNS를 점검합니다.
2. 기존 GitHub Pages로 재전환 시 저장해 둔 원래 DNS를 복구합니다.
   - Apex A 4건: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` CNAME: `mega-sim.github.io`
3. `CNAME` 파일의 `gigaroute.ai`과 GitHub Pages 도메인 구성을 다시 확인합니다.
4. 외부 HTTP 200, CSS/JS 링크, 이메일 수신을 점검합니다.

> 주의: 위 DNS는 2026-11-19 당시 관찰된 값이며, 되돌리기 전에 최신 운영 설정과 대조합니다.

## 5. 완료 판정

- [x] 현재 GitHub Pages 배포 설정, 실도메인, GitHub 저장소 확인
- [x] Cloudflare Pages 신규 연결 설정 및 검증/롤백 절차 문서화
- [ ] Cloudflare 계정에서 GitHub App 승인
- [ ] Cloudflare Pages 프로젝트 생성 및 `pages.dev` 배포 성공
- [ ] `pages.dev` UI·기능·공개 자산 비교 검증
- [ ] GitHub `main` Push → Cloudflare Pages 자동 배포 검증
- [ ] (별도 전환 결정 시) 실도메인 Cloudflare Pages로 전환

이 준비 문서의 커밋만으로 **Cloudflare Pages가 생성되거나 GitHub 연동이 완료되는 것은 아닙니다**. 기존 GitHub Pages 워크플로의 Push 경로 목록에 본 문서는 포함되지 않아 홈페이지 재배포를 발생시키지 않습니다.
