# history.ts 상세 설명서

이 파일은 사용자가 그동안 산책한 **'기록(히스토리)'들을 관리하는 담당자**입니다. 서버에서 어떤 형식으로 기록을 보내줄지 미리 정의하고, 실제로 기록을 가져오는 기능을 합니다.

---

## 1. 통신 도구 및 데이터 설계 (Interface)

코딩에서는 서버에서 올 데이터가 어떤 모양인지 미리 '이름표'를 붙여둘 수 있습니다. 이를 `interface`(인터페이스)라고 합니다.

### (1) 전체 통계 정보 (WalkSession)
```tsx
4: interface WalkSession {
5:     session_info: {
6:         actual_distance: number; // 실제로 걸은 총 거리
7:         actual_duration: number; // 실제로 걸은 총 시간
8:         total_distance: number;  // 목표로 했던 총 거리
9:         total_duration: number;  // 목표로 했던 총 시간
10:     }
11: }
```
- **설명:** 사용자가 지금까지 산책한 모든 내역의 합계를 뜻합니다. (숫자 형태들입니다.)

### (2) 개별 산책 기록 (WalkHistoryItem)
```tsx
13: interface WalkHistoryItem {
14:     id: number;              // 기록 고유 번호
15:     route_id: number;        // 경로 고유 번호
16:     thumbnail_url: string;   // 산책로 미리보기 사진 주소
17:     route_name: string;      // 산책로 이름
18:     description: string;     // 산책로 설명
19:     actual_distance: number; // 이번 산책에서 걸은 거리
20:     actual_duration: number; // 이번 산책에서 걸린 시간
21:     start_time: string;      // 시작 시각
22:     end_time: string;        // 종료 시각
23:     created_at: string;      // 기록이 생성된 날짜
24: }
```
- **설명:** 한 번의 산책에 대한 아주 구체적인 정보들입니다.

### (3) 서버의 전체 답장 모양 (WalkHistoryResponse)
```tsx
27: export interface WalkHistoryResponse {
28:     message: string;             // 서버가 보내는 메시지 (예: "성공")
29:     data: WalkSession;           // 위에서 정한 전체 통계 정보
30:     histories: WalkHistoryItem[] // 위에서 정한 개별 기록들의 목록(배열)
31: }
```

---

## 2. 기록 가져오기 함수 (history)

```tsx
34: export const history = async (username: string) => {
```
- **함수 이름:** `history`
- **인수(받는 정보):** `username` (누구의 기록인지 알기 위한 사용자 이름)
- **특징:** 서버와 대화하므로 `async`를 사용합니다.

```tsx
35:     return await api.get(`api/users/sessions/${username}`).json<WalkHistoryResponse>();
```
- **설명:** 서버의 특정 주소(`api/users/sessions/사용자이름`)로 기록을 달라고 요청(`get`)합니다.
    - `await`: 데이터가 올 때까지 기다립니다.
    - `.json<WalkHistoryResponse>()`: 받아온 데이터를 우리가 위에서 설계한 `WalkHistoryResponse` 모양에 맞춰서 해석하고 변환해줍니다.

---

## 요약
이 파일은 **"서버에서 산책 기록을 어떤 모양으로 받아올지 약속하고, 특정 사용자의 이름으로 그 기록들을 싹 다 챙겨오는 기능"**을 정의하고 있습니다.
