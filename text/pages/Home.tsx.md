# Home.tsx 상세 설명서

이 파일은 우리 서비스의 **'메인 홈 화면'**입니다. 사용자에게 인사를 건네고, 원하는 산책 테마와 시간을 고를 수 있게 안내하는 중심 허브 역할을 합니다.

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useNavigate } from 'react-router-dom';
2: import ThemeSelector from '../components/ThemeSelector';
3: import TimeSlider from '../components/TimeSlider';
4: import { useWalkey } from '../context/WalkeyContext';
5: import './Home.css';
```
- **설명:** 화면 이동 도구(`useNavigate`), 테마 선택기 부품(`ThemeSelector`), 시간 조절기 부품(`TimeSlider`), 그리고 우리의 데이터 보관함(`useWalkey`)을 가져옵니다.

---

## 2. 메인 함수 정의 (Home)

```tsx
7: export default function Home() {
8:     const navigate = useNavigate();
9:     const { theme, user } = useWalkey();
```
- **설명:** 홈 화면을 만드는 함수입니다. 보관함에서 현재 선택된 `theme`(테마) 정보와 접속 중인 `user`(사용자) 정보를 꺼내옵니다.

---

## 3. 화면 그리기 (Return)

```tsx
12:         <div className={`home-container theme-${theme}`}>
```
- **설명:** 홈 화면 전체를 감싸는 배경 상자입니다. 현재 선택된 테마에 따라 배경색이나 분위기가 바뀌도록 `theme-nature` 같은 스타일 이름을 자동으로 붙여줍니다.

```tsx
13:             <div className="glass-panel content-box">
```
- **설명:** 반투명한 유리 느낌(`glass-panel`)의 하얀 상자를 만듭니다. 이 안에 실제 내용물들을 담습니다.

```tsx
15:                     <h2>안녕하세요, {user?.name || '산책러'}님!</h2>
16:                     <p>오늘도 건강한 한 걸음 어떠세요?</p>
```
- **설명:** 로그인한 사용자의 이름을 불러서 인사합니다. 이름이 없으면 그냥 '산책러'라고 부릅니다.

```tsx
19:                 <section className="section">
20:                     <h3>감정 테마</h3>
21:                     <ThemeSelector />
22:                 </section>
```
- **설명:** '감정 테마'라는 소제목 아래에, 우리가 미리 만든 `ThemeSelector` 부품을 끼워 넣습니다. 이제 여기서 테마를 고를 수 있습니다.

```tsx
24:                 <section className="section">
25:                     <h3>산책 시간</h3>
26:                     <TimeSlider />
27:                 </section>
```
- **설명:** '산책 시간'이라는 소제목 아래에, `TimeSlider` 부품을 끼워 넣습니다. 여기서 시간을 조절합니다.

```tsx
29:                 <button
30:                     className="find-route-btn"
31:                     onClick={() => navigate('/routes')}
32:                 >
33:                     산책로 찾기
34:                 </button>
```
- **설명:** 모든 선택을 마친 후 누르는 버튼입니다. 누르면 추천 경로들이 있는 `/routes` 페이지로 이동합니다.

---

## 요약
이 페이지는 **"사용자에게 인사를 하고, `ThemeSelector`와 `TimeSlider`를 한데 모아 보여주어서 사용자가 원하는 산책 조건을 설정한 뒤 다음 단계로 넘어가게 돕는 화면"**입니다.
