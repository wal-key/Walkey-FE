# ThemeSelector.tsx 상세 설명서

이 파일은 사용자가 산책하고 싶은 **'테마'를 선택할 때 사용하는 버튼 목록(선택기)**을 만드는 부품입니다.

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useWalkey, Theme } from '../context/WalkeyContext';
```
- **설명:** 우리 서비스의 '데이터 보관함'에서 현재 선택된 테마가 무엇인지 확인하고, 테마를 바꾸는 기능(`useWalkey`)을 가져옵니다.

```tsx
2: import { Trees, Moon, Sparkles, Coffee } from 'lucide-react';
```
- **설명:** 버튼에 들어갈 예쁜 아이콘들(나무, 달, 반짝임, 커피)을 `lucide-react`라는 아이콘 도구상자에서 가져옵니다.

```tsx
3: import './ThemeSelector.css';
```
- **설명:** 이 버튼들이 어떻게 보일지(색상, 모양 등) 결정하는 디자인 파일을 가져옵니다.

---

## 2. 데이터 형식 및 목록 정의 (Data Setup)

```tsx
5: interface ThemeOption {
6:     id: Theme;
7:     label: string;
8:     icon: React.ComponentType<{ size?: number | string }>;
9: }
```
- **설명:** 하나의 테마 버튼이 가져야 할 정보의 모양을 정해둡니다. (아이디, 글자, 아이콘)

```tsx
11: const THEMES: ThemeOption[] = [
12:     { id: 'nature', label: 'Nature', icon: Trees },
13:     { id: 'silent', label: 'Silent', icon: Moon },
14:     { id: 'sparkling', label: 'Sparkling', icon: Sparkles },
15:     { id: 'cafe', label: 'Cafe', icon: Coffee },
16: ];
```
- **설명:** 실제로 화면에 보여줄 4가지 테마 옵션들을 목록으로 만듭니다.

---

## 3. 메인 함수 정의 (ThemeSelector)

```tsx
18: export default function ThemeSelector() {
```
- **역할:** 테마 선택기 부품을 만듭니다.

```tsx
19:     const { theme, setTheme } = useWalkey();
```
- **설명:** 데이터 보관함에서 현재 어떤 `theme`(테마)가 선택되어 있는지 가져오고, 테마를 바꿀 수 있는 기능인 `setTheme`을 준비합니다.

---

## 4. 화면 그리기 (Return)

```tsx
21:     return (
22:         <div className="theme-grid">
```
- **설명:** 여러 개의 버튼을 바둑판 모양(`grid`)으로 감싸는 상자를 만듭니다.

```tsx
23:             {THEMES.map((t) => (
```
- **설명:** 위에서 만든 `THEMES` 목록을 하나씩 꺼내서(`map`), 아래의 버튼을 반복해서 만듭니다. (4번 반복하겠죠?)

```tsx
24:                 <button
25:                     key={t.id}
```
- **설명:** 각 테마를 위한 버튼을 만듭니다. `key`는 리액트가 각 버튼을 구별하기 위해 필요한 주민번호 같은 것입니다.

```tsx
26:                     className={`theme-btn ${theme === t.id ? 'active' : ''}`}
```
- **설명:** 버튼의 디자인 이름을 정합니다. 만약 "지금 선택된 테마"가 이 버튼이라면, `active`(활성화)라는 이름을 추가로 붙여서 색깔이 바뀌게 합니다.

```tsx
27:                     onClick={() => setTheme(t.id)}
```
- **설명:** 이 버튼을 **클릭했을 때**, 데이터 보관함에게 "사용자가 이 테마를 선택했어!"라고 알려주는(`setTheme`) 작업을 합니다.

```tsx
29:                     <t.icon size={24} />
30:                     <span className="label">{t.label}</span>
```
- **설명:** 버튼 안에 아이콘과 테마 이름(Nature, Silent 등)을 넣습니다.

```tsx
32:             ))}
33:         </div>
```
- **설명:** 반복을 마치고 상자를 닫습니다.

---

## 요약
이 부품은 **"4가지 테마 아이콘과 이름을 보여주고, 사용자가 클릭하면 그 테마를 현재 테마로 설정하는 기능"**을 가진 UI 조각입니다.
