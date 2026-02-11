# Landing.tsx 상세 설명서

이 파일은 우리 서비스의 **'랜딩 화면'**입니다. 브랜드 로고와 슬로건을 보여주며, 사용자가 서비스를 시작하기 위해 거쳐가는 첫 관문입니다. (기존 `Intro.tsx`에서 더욱 직관적인 이름으로 변경되었습니다.)

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useState } from 'react';
2: import { ArrowRight } from 'lucide-react';
3: import './Landing.css';
4: import LoginModal from '../components/LoginModal';
```
- **설명:** 상태 관리 도구(`useState`), 화살표 아이콘(`ArrowRight`), 스타일 파일, 그리고 로그인을 위한 부품(`LoginModal`)을 가져옵니다.

---

## 2. 메인 함수 정의 (Landing)

```tsx
6: export default function Landing() {
7:     const [showLogin, setShowLogin] = useState(false);
```
- **설명:** 랜딩 화면을 만드는 함수입니다. `showLogin`이라는 상태를 통해 로그인 모달창을 띄울지 말지를 결정합니다.

---

## 3. 화면 그리기 (Return)

```tsx
10:         <div className="landing-container">
11:             <h1 className="logo-text fade-in">Walkey</h1>
12:             <p className="fade-in-delayed mb-8">당신의 걸음마다 감성을 담아</p>
```
- **설명:** 브랜드 이름인 **'Walkey'**와 슬로건을 나타냅니다. `fade-in` 효과를 주어 부드럽게 나타나도록 설정했습니다.

```tsx
13:             <button
14:                 onClick={() => setShowLogin(true)}
15:                 className="start-btn fade-in-delayed-2"
16:             >
17:                 지금 바로 시작하기
18:                 <ArrowRight size={24} />
19:             </button>
```
- **설명:** '지금 바로 시작하기' 버튼입니다. 클릭하면 `showLogin` 상태가 `true`가 되어 로그인 모달이 화면에 나타납니다.

```tsx
21:             <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
```
- **설명:** 사용자가 버튼을 누르면 나타날 로그인 모달 부품입니다.

---

## 요약
이 페이지는 **"사용자가 서비스에 접속했을 때 가장 먼저 마주하는 화면으로, 브랜드의 분위기를 전달하고 '시작하기' 버튼을 통해 로그인을 유도하는 역할"**을 합니다.
