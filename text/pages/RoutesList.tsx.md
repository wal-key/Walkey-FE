# RoutesList.tsx 상세 설명서

이 파일은 사용자에게 **'추천 산책로 목록'**을 보여주고, 지도를 통해 미리 경로를 확인하게 해주는 페이지입니다.

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useNavigate } from 'react-router-dom';
```
- **설명:** 다른 페이지로 이동하게 해주는 도구를 가져옵니다.

```tsx
4: import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
```
- **설명:** '지도'를 그리는 전문 도구(`react-leaflet`)들을 가져옵니다.
    - `MapContainer`: 지도를 담는 그릇
    - `Polyline`: 지도 위에 선(경로)을 긋는 펜
    - `Marker`: 지도 위 특정 지점을 가리키는 핀

---

## 2. 가짜 데이터 만들기 (Mock Data)

```tsx
21: const generateMockRoutes = (theme: Theme, time: number): Route[] => {
```
- **함수 이름:** `generateMockRoutes`
- **인수:** 선택한 `theme`(테마)와 `time`(시간)
- **하는 일:** 서버 데이터 대신, 연습용으로 쓸 수 있는 3개의 가짜 산책로 정보를 만들어냅니다. 사용자가 고른 테마에 어울리는 이름과 색상을 자동으로 붙여줍니다.

---

## 3. 지도 업데이트 도구 (MapUpdater)

```tsx
60: function MapUpdater({ center, route }: MapUpdaterProps) {
```
- **하는 일:** 지도가 특정 위치를 쳐다보게 하거나(`flyTo`), 경로가 한눈에 다 들어오도록 지도의 크기를 조절(`fitBounds`)하는 똑똑한 비서 역할을 합니다.

---

## 4. 메인 함수 정의 (RoutesList)

```tsx
79: export default function RoutesList() {
81:     const { theme, time, setSelectedRoute } = useWalkey();
```
- **설명:** 추천 경로 페이지를 만듭니다. 보관함에서 우리가 앞서 선택했던 디자인 테마와 시간을 확인합니다.

```tsx
89:     const calculatePath = (route: Route) => { ... }
```
- **설명:** 선택한 산책로의 시간을 바탕으로, 지도 위에 동그랗게 그려질 선의 좌표들을 계산하는 함수입니다.

```tsx
111:     const handleRouteClick = (route: Route) => {
112:         setLocalSelectedRoute(route);
113:         const path = calculatePath(route);
114:         setPreviewRoutePath(path);
115:     };
```
- **설명:** 사용자가 목록에서 산책로 하나를 **클릭했을 때** 실행됩니다. 클릭한 산책로를 선택 표시하고, 지도 위에 그 산책로의 경로를 선으로 그립니다.

---

## 5. 화면 그리기 (Return)

```tsx
132:             <div className="list-map-bg">
133:                 <MapContainer ...>
```
- **설명:** 화면 배경 전체에 지도를 깔아줍니다.

```tsx
138:                     {previewRoutePath.length > 0 && <Polyline positions={previewRoutePath} ... />}
```
- **설명:** 사용자가 산책로를 클릭해서 경로가 계산되었다면, 지도 위에 선(`Polyline`)을 그립니다.

```tsx
145:             {isRoadView && ( ... )}
```
- **설명:** '로드뷰' 버튼을 눌렀을 때만 나타나는 미리보기 화면입니다.

```tsx
166:                 <div className="routes-grid">
167:                     {routes.map(r => ( ... ))}
```
- **설명:** 위에서 만든 3개의 가짜 산책로 정보를 하나씩 카드 모양으로 그려줍니다. 클릭하면 지도가 움직이고 경로가 표시됩니다.

```tsx
191:                     <button ... onClick={handleConfirm} >
195:                         산책 시작하기
196:                     </button>
```
- **설명:** 산책로를 하나 결정하고 누르는 버튼입니다. 누르면 최종 지도 안내 페이지로 이동합니다.

---

## 요약
이 페이지는 **"사용자가 고른 조건에 맞는 3가지 산책로를 보여주고, 클릭할 때마다 지도에 경로를 미리 그려주어 하나를 선택하게 만드는 화면"**입니다.
