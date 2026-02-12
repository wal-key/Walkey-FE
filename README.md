카카오에서 카카오 지도 api를 받아와 그날 산책 감성에 따라 산책 코스를 정해줘 안내주는 서비스입니다.

컨셉에 따라 산책 코스 분위기와 산책 시간을 고르고 로드뷰를 확인 할 수 있습니다.
산책 결과를 확인 할 수 있습니다.
회원 기능을 업그레이드하면 마이페이지도 구현 할 계획입니다.

## 파일 구성 및 역할

### 실행 및 설정 파일
- `start_walkie.command`: 맥(Mac) 사용자가 앱을 쉽게 실행할 수 있도록 돕는 자동 실행 스크립트입니다.
- `package.json`: 프로젝트에 필요한 라이브러리 목록과 실행 명령어(scripts)를 관리하는 파일입니다.
- `vite.config.ts`: Vite 빌드 도구의 설정 파일입니다.
- `tsconfig.json`: 타입스크립트(TypeScript) 컴파일러 설정 파일입니다.
- `index.html`: 웹 앱의 진입점이 되는 파일로, 리액트 앱이 이곳에 그려집니다.

### 소스 코드 (src)
- `src/main.tsx`: 리액트 앱의 시작점입니다. `App` 컴포넌트를 실제 화면(DOM)에 연결하는 역할을 합니다.
- `src/App.tsx`: 앱의 페이지 이동(라우팅)을 설정하는 주요 컴포넌트입니다.
- `src/index.css`: 앱 전체에 공통으로 적용되는 스타일(CSS) 파일입니다.
- `src/vite-env.d.ts`: Vite 환경변수 및 이미지 파일 등의 타입을 정의해주는 파일입니다.

### 전역 상태 (src/context)
- `src/context/WalkeyContext.tsx`: 선택한 테마, 경로, 산책 기록 등 앱 전체에서 공유해야 할 데이터를 관리하는 파일입니다.

### 페이지 (src/pages)
- `src/pages/Intro.tsx`: 앱 실행 시 가장 먼저 보여지는 인트로(스플래시) 화면입니다.
- `src/pages/Home.tsx`: 메인 화면으로, 산책 테마와 시간을 선택하는 페이지입니다.
- `src/pages/RoutesList.tsx`: 사용자 선택에 맞춰 추천 산책로 목록을 보여주는 페이지입니다.
- `src/pages/MapDetail.tsx`: 선택한 산책로의 지도와 경로를 보여주고, 산책을 진행하는 페이지입니다.
- `src/pages/Records.tsx`: 완료된 산책 기록들을 모아서 보여주는 페이지입니다.

### 스타일 (CSS)
각 페이지의 디자인을 담당하는 스타일 파일들입니다.
- `src/pages/Intro.css`
- `src/pages/Home.css`
- `src/pages/RoutesList.css`
- `src/pages/MapDetail.css`
- `src/pages/Records.css`

### 컴포넌트 (src/components)
- `src/components/ThemeSelector.tsx`: 산책 테마(숲, 고요, 반짝임 등)를 선택하는 버튼 UI 컴포넌트입니다.
- `src/components/TimeSlider.tsx`: 산책 시간을 조절하는 슬라이더 UI 컴포넌트입니다.
