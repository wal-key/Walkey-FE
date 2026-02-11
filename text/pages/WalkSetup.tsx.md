# WalkSetup.tsx 상세 설명서

이 파일은 우리 서비스의 **'산책 설정 화면'**입니다. 사용자에게 인사를 건네고, 원하는 산책 테마와 시간을 고를 수 있게 안내하는 중심 허브 역할을 합니다. (기존 `Home.tsx`에서 더욱 직관적인 이름으로 변경되었습니다.)

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useNavigate } from 'react-router-dom';
2: import ThemeSelector from '../components/ThemeSelector';
3: import TimeSlider from '../components/TimeSlider';
4: import { useWalkey } from '../context/WalkeyContext';
5: import './WalkSetup.css';
```
- **설명:** 화면 이동 도구(`useNavigate`), 테마 선택기 부품(`ThemeSelector`), 시간 조절기 부품(`TimeSlider`), 그리고 우리의 데이터 보관함(`useWalkey`)을 가져온 뒤 전용 스타일 파일을 연결합니다.

---

## 2. 메인 함수 정의 (WalkSetup)

```tsx
7: export default function WalkSetup() {
8:     const navigate = useNavigate();
9:     const { theme, user } = useWalkey();
```
- **설명:** 산책 설정을 만드는 함수입니다. 보관함에서 현재 선택된 `theme`(테마) 정보와 접속 중인 `user`(사용자) 정보를 꺼내옵니다.

---

## 3. 화면 그리기 (Return)

```tsx
12:         <div className={`walk-setup-container theme-${theme}`}>
```
- **설명:** 설정 화면 전체를 감싸는 배경 상자입니다. 현재 선택된 테마에 따라 배경색이나 분위기가 바뀌도록 스타일 이름을 자동으로 붙여줍니다.

```tsx
13:             <div className="glass-panel content-box">
```
- **설명:** 반투명한 유리 느낌(`glass-panel`)의 상자를 만듭니다.

```tsx
14:                 <header className="walk-setup-header">
15:                     <h2>안녕하세요, {user?.name || '산책러'}님!</h2>
16:                     <p>오늘도 건강한 한 걸음 어떠세요?</p>
17:                 </header>
```
- **설명:** 로그인한 사용자의 이름을 불러서 인사하는 헤더 부분입니다.

```tsx
19:                 <section className="section">
20:                     <h3>감정 테마</h3>
21:                     <ThemeSelector />
22:                 </section>
```
- **설명:** 테마를 고를 수 있는 `ThemeSelector` 부품을 배치합니다.

```tsx
24:                 <section className="section">
25:                     <h3>산책 시간</h3>
26:                     <TimeSlider />
27:                 </section>
```
- **설명:** 시간을 조절하는 `TimeSlider` 부품을 배치합니다.

```tsx
29:                 <button
30:                     className="find-route-btn"
31:                     onClick={() => navigate('/route-select')}
32:                 >
33:                     산책로 찾기
34:                 </button>
```
- **설명:** 모든 설정을 마친 후 누르는 버튼입니다. 누르면 추천 경로가 나오는 `/route-select` 페이지로 이동합니다.

---

## 요약
이 페이지는 **"사용자가 원하는 산책 조건(테마, 시간)을 설정하고 추천 경로 목록으로 이동할 수 있도록 돕는 관문"**입니다.
