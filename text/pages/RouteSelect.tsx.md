# RouteSelect.tsx 상세 설명서

이 파일은 우리 서비스의 **'산책로 선택 화면'**입니다. 앞에서 설정한 테마와 시간에 맞는 3가지 추천 코스를 보여주고, 사용자가 마음에 드는 코스를 최종 선택하도록 돕습니다. (기존 `RoutesList.tsx`에서 이름이 변경되었습니다.)

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useNavigate } from 'react-router-dom';
2: import { Theme, Route, useWalkey } from '../context/WalkeyContext';
3: import { Clock, MapPin, ArrowRight } from 'lucide-react';
4: import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
...
11: import RoadView from '../components/RoadView';
```
- **설명:** 지도 라이브러리(`react-leaflet`), 데이터 보관함(`useWalkey`), 그리고 공통 부품으로 분리된 **로드뷰(`RoadView`)**를 가져옵니다.

---

## 2. 주요 로직

### 가짜 데이터 경로 생성 (`calculatePath`)
- 사용자가 코스를 클릭했을 때 지도에 표시될 경로 좌표를 수학적으로 계산하여 생성합니다.

### 경로 선택 (`handleRouteClick`)
- 특정 코스 카드를 클릭하면 해당 코스를 `localSelectedRoute` 상태에 담고, 지도에 경로를 미리 보여줍니다.

---

## 3. 화면 그리기 (Return)

### 배경 지도 (`list-map-bg`)
- 선택한 코스의 경로가 폴리라인(`Polyline`)으로### 하단 대시보드 (`map-overlay-bottom`)
- **소요 시간**: 실시간으로 흐르는 시간을 `00:00` 형식으로 보여줍니다.
- **총 거리**: 코스의 전체 길이를 표시합니다.

### 지도 클릭 로드뷰 인터랙션
- 지도의 특정 지점을 클릭하면 공통 부품인 `RoadView`가 나타납니다. 산책 경로 주변의 실제 모습을 확인하고 싶을 때 지도를 직접 터치/클릭하여 사용할 수 있습니다.
 기존의 버튼 방식보다 더 직관적으로 원하는 위치의 모습을 미리 볼 수 있습니다.

### 코스 목록 (`routes-grid`)
- `routes.map()`을 돌려 3개의 코스 카드를 보여줍니다. 각 카드에는 제목, 설명, 시간, 거리가 표시됩니다.

---

## 요약
이 페이지는 **"사용자가 설정한 조건에 맞는 산책로들을 지도와 카드로 보여주고, 사용자가 최종적으로 걸을 코스를 선택하여 실제 산책(Walking Session)으로 넘어가게 유도하는 화면"**입니다.
