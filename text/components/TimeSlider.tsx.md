# TimeSlider.tsx 상세 설명서

이 파일은 사용자가 산책하고 싶은 **'시간'을 조절하는 슬라이더(미끄럼틀 같은 바)**를 만드는 부품입니다.

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { ChangeEvent } from 'react';
```
- **설명:** 사용자가 슬라이더를 움직였을 때 발생하는 "바뀜" 사건(`ChangeEvent`)이 어떤 성질을 가졌는지 알려주는 이름표를 가져옵니다.

```tsx
2: import { useWalkey } from '../context/WalkeyContext';
```
- **설명:** 우리 서비스의 '데이터 보관함'에서 현재 설정된 시간을 가져오고, 시간을 수정하는 기능을 가져옵니다.

```tsx
3: import './TimeSlider.css';
```
- **설명:** 슬라이더의 모양과 색상을 결정하는 디자인 파일을 가져옵니다.

---

## 2. 메인 함수 정의 (TimeSlider)

```tsx
5: export default function TimeSlider() {
```
- **역할:** 시간 조절기 부품을 만듭니다.

```tsx
6:     const { time, setTime } = useWalkey();
```
- **설명:** 데이터 보관함에서 현재 선택된 `time`(분) 정보를 가져오고, 이 시간을 변경할 수 있는 `setTime` 기능을 꺼냅니다.

---

## 3. 동작 정의 (Function Inside)

```tsx
8:     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
9:         setTime(Number(e.target.value));
10:     };
```
- **함수 이름:** `handleChange`
- **인수(받는 정보):** `e` (슬라이더가 움직였다는 사건 정보)
- **하는 일:** 사용자가 슬라이더를 옮긴 위치의 숫자(`e.target.value`)를 읽어서, 데이터 보관함의 시간(`setTime`)을 그 숫자로 업데이트합니다.

---

## 4. 화면 그리기 (Return)

```tsx
13:         <div className="time-slider-container">
```
- **설명:** 시간 조절기 전체를 감싸는 바구니를 만듭니다.

```tsx
14:             <div className="time-display">{time}분</div>
```
- **설명:** 현재 선택된 시간이 몇 분인지 숫자로 보여줍니다. (슬라이더를 움직이면 이 숫자도 같이 변합니다.)

```tsx
15:             <input
16:                 type="range"
17:                 min="10"
18:                 max="60"
19:                 step="10"
20:                 value={time}
21:                 onChange={handleChange}
22:                 className="slider"
23:             />
```
- **설명:** 실제 옆으로 밀어서 움직이는 슬라이더 막대입니다.
    - `type="range"`: 범위를 조절하는 슬라이더 모양으로 그리라는 뜻입니다.
    - `min="10"`, `max="60"`: 최소 10분에서 최대 60분까지 선택 가능합니다.
    - `step="10"`: 한 칸 움직일 때마다 10분씩 툭툭 끊어서 이동합니다.
    - `value={time}`: 현재 막대의 위치를 우리가 저장한 시간과 맞춥니다.
    - `onChange={handleChange}`: 막대를 움직일 때마다 위에서 만든 `handleChange` 함수를 실행합니다.

```tsx
24:             <div className="time-labels">
25:                 <span>10분</span>
26:                 <span>60분</span>
27:             </div>
```
- **설명:** 슬라이더 양쪽 끝에 "10분", "60분"이라는 글자를 적어줍니다.

---

## 요약
이 부품은 **"슬라이더를 좌우로 밀어서 10분에서 60분 사이의 산책 시간을 선택하고, 선택된 시간을 데이터 보관함에 저장하는 기능"**을 담당합니다.
