# WalkeyContext.tsx 상세 설명서

이 파일은 우리 서비스 전체의 **'거대한 데이터 보관함(냉장고)'**입니다. 로그인한 사용자 정보, 선택한 테마, 산책 시간 등 모든 중요한 데이터를 여기서 한꺼번에 관리하고, 어떤 페이지에서든 꺼내 쓸 수 있게 해줍니다.

---

## 1. 기본 재료 및 형식 정의

```tsx
1: import { createContext, useState, useContext, ReactNode } from 'react';
```
- **설명:** 리액트에서 데이터를 공유하기 위해 필요한 도구들을 가져옵니다.

```tsx
3: export type Theme = 'nature' | 'silent' | 'sparkling' | 'cafe';
```
- **설명:** `Theme`라는 이름표는 'nature', 'silent', 'sparkling', 'cafe' 이 4가지 글자 중 하나만 가질 수 있도록 약속합니다.

```tsx
5: export interface Route { ... }
15: export interface User { ... }
20: export interface WalkeyRecord { ... }
```
- **설명:** 경로(Route), 사용자(User), 기록(Record)이 각각 어떤 정보들을 담고 있어야 하는지 설계도를 그립니다.

---

## 2. 보관함 설계도 (WalkeyContextType)

```tsx
29: interface WalkeyContextType {
30:     theme: Theme;
31:     setTheme: (theme: Theme) => void;
...
42: }
```
- **설명:** 이 보관함에 어떤 물건들이 들어있고, 그것을 어떻게 바꿀 수 있는지(함수들) 미리 목록을 만들어둡니다.

```tsx
44: const WalkeyContext = createContext<WalkeyContextType | undefined>(undefined);
```
- **설명:** 실제로 데이터를 담을 수 있는 '가상의 보관함'을 하나 만듭니다.

---

## 3. 실제 보관함 부품 (WalkeyProvider)

이 부품이 전체 앱을 감싸야 데이터 공유가 가능해집니다.

```tsx
46: export function WalkeyProvider({ children }: { children: ReactNode }) {
```
- **함수 이름:** `WalkeyProvider`
- **인수:** `children` (이 보관함 안에 들어갈 모든 하위 화면들)

```tsx
47:     const [theme, setTheme] = useState<Theme>('nature');
48:     const [time, setTime] = useState<number>(30);
...
52:     const [lastWalk, setLastWalk] = useState<WalkeyRecord | null>(null);
```
- **설명:** `useState`를 사용하여 실제 데이터를 저장할 칸을 만듭니다.
    - 왼쪽(`theme`): 현재 값
    - 오른쪽(`setTheme`): 값을 바꾸는 함수

```tsx
54:     const value: WalkeyContextType = {
55:         theme, setTheme,
...
61:     };
```
- **설명:** 위에서 만든 모든 데이터와 함수들을 `value`라는 하나의 큰 보따리에 담습니다.

```tsx
63:     return (
64:         <WalkeyContext.Provider value={value}>
65:             {children}
66:         </WalkeyContext.Provider>
67:     );
```
- **설명:** `WalkeyContext.Provider`라는 특수한 포장지로 전체 앱(`children`)을 감쌉니다. 그리고 우리가 만든 보따리(`value`)를 전달합니다. 이제 이 안에 있는 모든 화면은 이 보따리를 열어볼 수 있습니다.

---

## 4. 데이터 꺼내 쓰는 도구 (useWalkey)

```tsx
70: export function useWalkey() {
71:     const context = useContext(WalkeyContext);
```
- **설명:** 각 페이지에서 "보관함 좀 열어볼게요!"라고 말할 때 사용하는 갈고리(`useWalkey`)를 만듭니다.

```tsx
72:     if (context === undefined) {
73:         throw new Error('useWalkey must be used within a WalkeyProvider');
74:     }
```
- **설명:** 만약 보관함 바깥에서 데이터를 꺼내려고 하면 "보관함 안에서만 사용하세요!"라고 에러를 띄워주는 안전장치입니다.

---

## 요약
이 파일은 **"전체 서비스에서 공통으로 쓰는 데이터(테마, 시간, 사용자 등)를 한곳에 모아두고, 필요한 화면 어디서든 편하게 꺼내 쓰거나 수정할 수 있게 해주는 중심 저장소"**입니다.
