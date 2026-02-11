# Records.tsx 상세 설명서

이 파일은 사용자의 모든 **'산책 기록 목록'**을 보여주는 페이지입니다. 방금 마친 산책 정보뿐만 아니라, 서버와 연동하여 누적된 모든 통계를 함께 서비스합니다.

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useNavigate } from 'react-router-dom';
2: import { useWalkey, WalkeyRecord } from '../context/WalkeyContext';
6: import { history, WalkHistoryResponse } from '../api/history';
```
- **설명:** 화면 이동 도구, 전역 상태 보관함(`useWalkey`), 그리고 서버에서 전체 이력을 가져오는 기능(`history`)을 가져옵니다.

---

## 2. 데이터 불러오기 및 연동

### (1) 서버 데이터 연동 (`useEffect`)
- 화면이 로드될 때 `history` API를 호출하여 서버에 저장된 누적 거리와 시간 데이터를 가져와 `historyData` 상태에 저장합니다.

### (2) 로컬 기록 불러오기
- `localStorage`에서 `walkey_records`를 읽어와 최근 산책 목록을 보여줍니다.

---

## 3. 화면 그리기 (Return)

### 상단 대시보드 (`stats-dashboard`)
- `lastWalk`: 방금 막 마친 산책의 실시간 결과(거리, 시간)를 눈에 띄게 보여줍니다.

### 누적 통계 (`stats-summary-row`)
- 서버로부터 받아온 **누적 거리**와 **누적 시간**을 아래쪽에 배치하여 사용자의 총 활동량을 보여줍니다.

### 최근 산책 목록 (`gallery-section`)
- 지금까지 했던 산책들을 갤러리 형태로 나열합니다. 기록이 없을 때는 산책을 유도하는 메시지를 띄웁니다.

---

## 요약
이 페이지는 **"사용자가 그동안의 산책 성과를 한눈에 확인하고, 서버 데이터와 로컬 데이터를 함께 조회하여 지속적인 산책 동기를 얻을 수 있게 돕는 기록 보관소"**입니다.
