# App.tsx 상세 설명서

이 파일은 우리 웹 애플리케이션의 **'중앙 통제실'**이자 **'지도(Router)'**와 같은 역할을 합니다. 어떤 주소로 이동했을 때 어떤 화면을 보여줄지 결정합니다.

---

## 1. 외부 도구 가져오기 (Import)

코딩에서는 다른 사람들이 미리 만들어둔 도구(라이브러리)나 내가 다른 파일에 만들어둔 코드를 가져다가 쓸 수 있습니다. 이를 `import`(임포트)라고 합니다.

```tsx
1: import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
```
- **설명:** 웹사이트에서 "페이지 이동" 기능을 담당하는 도구상자(`react-router-dom`)에서 필요한 도구들(`BrowserRouter`, `Routes`, `Route`, `Navigate`)을 가져옵니다.
    - `BrowserRouter`: 웹브라우저의 주소창과 우리 앱을 연결해주는 큰 틀입니다.
    - `Routes`: 여러 도로(`Route`)가 모여있는 도로망입니다.
    - `Route`: 구체적으로 "이 주소일 땐 이 화면!"이라고 지정하는 개별 도로입니다.
    - `Navigate`: 코드가 자동으로 다른 주소로 화면을 넘겨버릴 때 사용합니다.

```tsx
2: import { WalkeyProvider } from './context/WalkeyContext';
```
- **설명:** 우리 서비스(`Walkey`) 전체에서 쓰이는 중요한 데이터(예: 현재 산책 정보 등)를 모든 화면이 공유할 수 있게 해주는 '데이터 보관함'(`WalkeyProvider`)을 가져옵니다.

```tsx
3: import Intro from './pages/Intro';
4: import Home from './pages/Home';
5: import RoutesList from './pages/RoutesList';
6: import MapDetail from './pages/MapDetail';
7: import Records from './pages/Records';
```
- **설명:** 우리가 미리 만들어둔 각 페이지 화면들을 가져옵니다.
    - `Intro`: 시작 화면
    - `Home`: 메인 홈 화면
    - `RoutesList`: 산책 경로 목록 화면
    - `MapDetail`: 지도가 보이는 상세 화면
    - `Records`: 기록 확인 화면

---

## 2. 메인 함수 정의 (App)

```tsx
9: function App() {
```
- **함수 이름:** `App`
- **역할:** 이 서비스의 전체 구조를 정의하는 가장 중심이 되는 함수입니다.
- **인수(받는 값):** 없음
- **하는 일:** 화면에 보여줄 구조(HTML과 비슷한 모양의 코드)를 내보냅니다.

---

## 3. 화면 구조 설계 (Return)

```tsx
10:     return (
```
- **설명:** 이제부터 화면에 그려질 내용을 실제 코드로 작성하기 시작합니다.

```tsx
11:         <WalkeyProvider>
```
- **설명:** 위에서 가져온 '데이터 보관함'으로 전체 앱을 감쌉니다. 이렇게 하면 이 안에 들어가는 모든 페이지에서 산책 데이터를 꺼내 쓸 수 있습니다.

```tsx
12:             <BrowserRouter>
```
- **설명:** "이제부터 주소창에 따라 화면을 바꿀 거야!"라고 선언하는 틀입니다.

```tsx
13:                 <Routes>
```
- **설명:** "지금부터 아래 적힌 여러 주소 중에서 딱 맞는 하나를 고를게!"라는 뜻입니다.

```tsx
14:                     <Route path="/" element={<Intro />} />
```
- **설명:** 주소가 그냥 `/`(기본 주소)이면, `Intro`(시작 화면)를 보여줍니다.

```tsx
15:                     <Route path="/home" element={<Home />} />
```
- **설명:** 주소 끝에 `/home`이 붙으면, `Home`(홈 화면)을 보여줍니다.

```tsx
16:                     <Route path="/routes" element={<RoutesList />} />
```
- **설명:** 주소 끝에 `/routes`가 붙으면, 추천 경로 목록을 보여줍니다.

```tsx
17:                     <Route path="/map/:id" element={<MapDetail />} />
```
- **설명:** 주소 끝에 `/map/` 뒤에 어떤 숫자나 글자(`:id`)가 붙으면, 지도가 보이는 상세 페이지를 보여줍니다. (여기서 `:id`는 어떤 길인지 알려주는 이름표 같은 것입니다.)

```tsx
18:                     <Route path="/records" element={<Records />} />
```
- **설명:** 주소 끝에 `/records`가 붙으면, 내 산책 기록들을 보여줍니다.

```tsx
19:                     <Route path="*" element={<Navigate to="/" replace />} />
```
- **설명:** 만약 사용자가 우리가 정하지 않은 엉뚱한 주소(`*`)로 들어오면, 자동으로 맨 처음 화면(`/`)으로 되돌려 보냅니다(`Navigate`).

```tsx
20:                 </Routes>
21:             </BrowserRouter>
22:         </WalkeyProvider>
```
- **설명:** 앞에서 열었던 틀들을 순서대로 닫아줍니다.

```tsx
23:     );
24: }
```
- **설명:** `App` 함수 내보내기를 마무리합니다.

---

## 4. 밖으로 내보내기 (Export)

```tsx
26: export default App;
```
- **설명:** 이렇게 만든 `App`이라는 덩어리를 다른 곳에서도 꺼내 쓸 수 있도록 "내보내기"를 합니다. 보통 이 코드는 `main.tsx`라는 곳에서 받아서 웹 브라우저에 진짜로 그려주게 됩니다.
