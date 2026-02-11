# WalkingSession.tsx 상세 설명서

이 파일은 우리 서비스의 핵심인 **'산책 진행 화면'**입니다. 사용자가 선택한 경로를 지도에 보여주고, 산책 시작 버튼을 누르면 시간이 흐르며 산책 상태를 관리합니다. (기존 `MapDetail.tsx`에서 이름이 변경되었습니다.)

> [!IMPORTANT]
> 이 페이지는 **재혁(penguin)** 님의 주요 구현 담당 범위입니다. 향후 `useWalkingSession` 훅을 통해 엔진 로직이 고도화될 예정입니다.

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useEffect, useState } from 'react';
2: import { useNavigate } from 'react-router-dom';
3: import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
...
8: import RoadView from '../components/RoadView';
```
- **설명:** 리액트 훅, 지도 도구, 그리고 공통 부품으로 분리된 **로드뷰(`RoadView`)**를 가져옵니다.

---

## 2. 주요 상태 관리

- `isWalking`: 현재 산책이 진행 중인지(타이머가 도는지) 확인하는 스위치입니다.
- `elapsedTime`: 산책을 시작한 후 흐른 시간(초)을 저장합니다.
- `routePath`: 지도에 그려질 실제 산책 경로 좌표들입니다.

---

## 3. 핵심 기능

### 산책 시작 및 종료 (`handleStartStop`)
- 버튼을 누르면 산책이 시작되거나, 확인 절차를 거쳐 종료됩니다.

### 결과 저장 및 이동 (`finishSession`)
- 산책이 끝나면 소요 시간과 거리를 계산하여 `localStorage`에 저장하고, 기록(`Records`) 페이지로 이동시킵니다.

### 타이머 작동
- `useEffect`와 `setInterval`을 사용하여 1초마다 `elapsedTime`을 증가시킵니다.

---

## 4. 화면 그리기 (Return)

### 지도 영역 (`MapContainer`)
- 테마에 맞는 지도 타일을 불러오고, 경로(`Polyline`)와 출발지 마커를 표시합니다.

### 하단 대시보드 (`map-overlay-bottom`)
- **소요 시간**: 실시간으로 흐르는 시간을 `00:00` 형식으로 보여줍니다.
- **총 거리**: 코스의 전체 길이를 표시합니다.

### 지도 클릭 로드뷰 인터랙션
- 지도의 특정 지점을 클릭하면 공통 부품인 `RoadView`가 나타납니다. 산책 경로 주변의 실제 모습을 확인하고 싶을 때 지도를 직접 터치/클릭하여 사용할 수 있습니다.

---

## 요약
이 페이지는 **"사용자가 실제로 산책을 즐기며 자신의 상태(시간, 위치)를 실시간으로 확인하고, 산책이 끝나면 그 기록을 안전하게 저장하는 핵심 엔진 화면"**입니다.
