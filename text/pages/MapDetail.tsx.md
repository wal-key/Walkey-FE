# MapDetail.tsx 상세 설명서

이 파일은 우리 서비스의 **'내비게이션 및 산책 진행 화면'**입니다. 실제로 산책을 시작하고, 시간이 얼마나 흘렀는지 보며, 지도 위의 경로를 따라가는 가장 핵심적인 역할을 합니다.

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useEffect, useState } from 'react';
2: import { useNavigate } from 'react-router-dom';
```
- **설명:** 화면이 바뀔 때 특정 일을 시키는 도구와, 페이지 이동 도구를 가져옵니다.

```tsx
3: import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
4: import { useWalkey, Theme, WalkeyRecord } from '../context/WalkeyContext';
```
- **설명:** 지도를 그리는 도구들과 우리 앱의 전역 데이터 저장소(`useWalkey`)를 가져옵니다.

---

## 2. 상태 설정 (Variables)

```tsx
47:     const [isWalking, setIsWalking] = useState(false);
48:     const [elapsedTime, setElapsedTime] = useState(0);
```
- **설명:**
    - `isWalking`: 현재 산책 중인지(`true`) 아니면 멈춰있는지(`false`)를 저장합니다.
    - `elapsedTime`: 산책을 시작한 후 몇 초가 흘렀는지 숫자를 저장합니다.

---

## 3. 동작 정의 (Functions)

### (1) 산책로 경로 만들기 (useEffect)
```tsx
52:     useEffect(() => {
...
65:         for (let i = 0; i <= steps; i++) {
69:             const lat = startPos[0] + r * Math.sin(theta) * 0.8;
70:             const lng = startPos[1] + r * Math.cos(theta);
71:             path.push([lat, lng]);
72:         }
```
- **설명:** 화면에 들어오자마자 실행됩니다. 선택한 산책 시간과 경로 정보를 바탕으로, 지도 위에 보일 예쁜 원형 경로(좌표 조각들)를 자동으로 생성합니다.

### (2) 타이머 작동시키기 (useEffect)
```tsx
79:     useEffect(() => {
81:         if (isWalking) {
82:             timer = setInterval(() => {
83:                 setElapsedTime(prev => prev + 1);
84:             }, 1000);
```
- **설명:** 산책 시작 버튼을 누르면(`isWalking`이 `true`가 되면), **1초마다 하나씩 숫자를 올리는 타이머**를 가동합니다.

### (3) 산책 마무리 및 기록 저장 (finishSession)
```tsx
105:     const finishSession = (completed: boolean) => {
113:         const newRecord: WalkeyRecord = {
114:             id: Date.now(),
116:             theme: theme,
117:             dist: actualDist,
...
120:         };
```
- **설명:** 산책이 끝나면 실행됩니다. 지금까지 걸은 거리와 시간, 테마 등을 모아서 하나의 '기록'(`newRecord`)으로 만듭니다.

```tsx
123:         const existing: WalkeyRecord[] = JSON.parse(localStorage.getItem('walkey_records') || '[]');
124:         localStorage.setItem('walkey_records', JSON.stringify([newRecord, ...existing]));
```
- **설명:** 브라우저의 저장소(`localStorage`)에 기존 기록들을 불러와서, 방금 한 산책 기록을 맨 앞에 추가하여 다시 저장합니다. (이렇게 해야 나중에 '기록' 페이지에서 볼 수 있습니다.)

---

## 4. 화면 그리기 (Return)

```tsx
139:             <MapContainer ...>
144:                 {routePath.length > 0 && <Polyline positions={routePath} ... />}
```
- **설명:** 화면 대부분을 차지하는 지도를 그리고, 그 위에 우리가 계산한 산책 경로(`Polyline`)를 선으로 그립니다.

```tsx
182:                             {isWalking ? `${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}` : `${selectedRoute?.time}분`}
```
- **설명:** 산책 중이면 실시간으로 흐르는 시간을(분:초 형식) 보여주고, 시작 전이면 예상 소요 시간을 보여줍니다.

```tsx
190:                 <button className={`finish-btn ${isWalking ? 'walking' : ''}`} onClick={handleStartStop}>
192:                     {isWalking ? '산책 끝내기' : '산책 시작'}
193:                 </button>
```
- **설명:** 가장 중요한 버튼입니다. 누를 때마다 산책을 시작하거나 끝내는 기능을 수행합니다.

---

## 요약
이 페이지는 **"지도 위에 안내된 경로를 보며 실제로 산책을 하고, 흐르는 시간을 체크하며, 산책이 끝나면 그 데이터를 저장해주는 가장 활동적인 화면"**입니다.
