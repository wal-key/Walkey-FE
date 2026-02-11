# RoadView.tsx 상세 설명서

이 파일은 공통으로 사용되는 **'로드뷰(미리보기) 컴포넌트'**입니다. 지도의 특정 지점을 실제 거리의 모습으로 미리 볼 수 있게 해주는 오버레이 창 역할을 합니다.

---

## 1. 재료 가져오기 (Import)

```tsx
2: import './RoadView.css';
```
- **설명:** 전용 스타일 파일을 연결합니다.

---

## 2. 속성(Props) 정의

```tsx
4: interface RoadViewProps {
5:     isOpen: boolean;
6:     onClose: () => void;
7: }
```
- **isOpen**: 이 창을 열지 말지를 결정하는 논리값입니다.
- **onClose**: 창을 닫을 때 실행되는 함수입니다.

---

## 3. 화면 그리기 (Return)

```tsx
9: export default function RoadView({ isOpen, onClose }: RoadViewProps) {
10:     if (!isOpen) return null;
```
- **설명:** `isOpen`이 `false`라면 아무것도 그리지 않고 사라집니다.

```tsx
13:         <div className="roadview-overlay" onClick={onClose}>
14:             <div className="roadview-content" onClick={(e) => e.stopPropagation()}>
```
- **설명:** 화면 전체를 덮는 어두운 배경(`overlay`)을 만들고, 그 위에 실제 내용물(`content`)을 올립니다. 배경을 누르면 창이 닫히지만, 내용물 상자를 눌렀을 때는 닫히지 않도록 `stopPropagation()` 처리를 했습니다.

```tsx
16:                 <div className="roadview-placeholder">
17:                     <p>현재 위치의 로드뷰 화면이 이곳에 표시됩니다.</p>
18:                     <img src="https://images.unsplash.com/photo-1513002048555-9005086ee46d?q=80&w=1000&auto=format&fit=crop" alt="Road View Mock" />
19:                 </div>
```
- **설명:** 현재는 실제 지도 API 로드뷰 대신 이미지(Mock 데이터)를 보여주고 있습니다.

---

## 요약
이 컴포넌트는 **"사용자가 로드뷰를 보고 싶을 때 화면 중간에 나타나는 팝업창으로, 추후 재혁(penguin) 님이 지도 클릭 좌표와 연동하여 실제 데이터를 보여주도록 고도화할 핵심 부품"**입니다.
