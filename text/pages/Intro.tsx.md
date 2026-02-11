# Intro.tsx 상세 설명서

이 파일은 우리 서비스의 **'첫 화면(대문)'**입니다. 처음 접속하면 멋진 로고가 나오고, 잠시 후 로그인 창이 나타나는 화면을 담당합니다.

---

## 1. 재료 가져오기 (Import)

```tsx
1: import { useNavigate } from 'react-router-dom';
2: import { useEffect, useState } from 'react';
```
- **설명:** 다른 페이지로 이동시켜주는 도구(`useNavigate`)와, 화면이 켜졌을 때 어떤 명령을 내리거나 정보를 저장하는 도구(`useEffect`, `useState`)를 가져옵니다.

```tsx
3: import { LogIn, User, Lock } from 'lucide-react';
4: import { useWalkey } from '../context/WalkeyContext';
5: import './Intro.css';
```
- **설명:** 로그인 버튼 등에 쓰일 아이콘들, 우리 서비스의 공통 데이터 저장소(`useWalkey`), 그리고 이 페이지의 디자인 파일(`Intro.css`)을 가져옵니다.

---

## 2. 상태 설정 (Variables)

```tsx
8:     const navigate = useNavigate();
9:     const { setUser } = useWalkey();
```
- **설명:** 페이지를 이동시키는 기능과, 로그인한 사용자의 정보를 저장함에 넣는 기능을 준비합니다.

```tsx
10:     const [showLogin, setShowLogin] = useState(false);
11:     const [email, setEmail] = useState('');
12:     const [password, setPassword] = useState('');
13:     const [error, setError] = useState('');
```
- **설명:** 화면에서 관리해야 할 4가지 변수를 만듭니다.
    - `showLogin`: 지금 로그인 창을 보여줄지 말지 결정합니다. (처음엔 `false`라 안 보입니다.)
    - `email`, `password`: 사용자가 입력한 이메일과 비밀번호입니다.
    - `error`: 로그인 실패 시 보여줄 에러 메시지입니다.

---

## 3. 동작 정의 (Functions)

### (1) 2초 뒤에 로그인 모달 띄우기
```tsx
15:     useEffect(() => {
16:         const timer = setTimeout(() => setShowLogin(true), 2000);
17:         return () => clearTimeout(timer);
18:     }, []);
```
- **설명:** 이 화면이 처음 나타나면 2초(2000밀리초)를 기다렸다가(`setTimeout`), `showLogin`을 `true`로 바꿔서 로그인 창이 스르륵 나타나게 합니다.

### (2) 로그인 처리하기
```tsx
20:     const handleLogin = (e: React.FormEvent) => {
21:         e.preventDefault();
```
- **설명:** 로그인 버튼을 눌렀을 때 실행됩니다. `preventDefault`는 페이지가 새로고침되는 것을 막아줍니다.

```tsx
23:         if (email === 'walkey@example.com' && password === '1234') {
24:             setUser({ name: '산책러', email });
25:             navigate('/home');
```
- **설명:** 만약 이메일과 비밀번호가 미리 정해둔 값(예시 데이터)과 일치하면, 사용자 정보를 저장하고 홈 화면(`/home`)으로 이동합니다.

```tsx
26:         } else {
27:             setError('이메일 또는 비밀번호가 올바르지 않습니다.');
28:         }
```
- **설명:** 입력 정보가 틀리면 에러 메시지를 화면에 띄웁니다.

---

## 4. 화면 그리기 (Return)

```tsx
33:             <h1 className="logo-text fade-in">Walkey</h1>
34:             <p className="fade-in-delayed mb-8">당신의 걸음마다 감성을 담아</p>
```
- **설명:** 서비스 이름(Walkey)과 감성적인 문구를 화면 중앙에 보여줍니다. `fade-in`은 서서히 나타나는 애니메이션 효과입니다.

```tsx
36:             {showLogin && (
37:                 <div className="login-card fade-in-up">
```
- **설명:** 아까 2초 뒤에 `showLogin`이 `true`가 되면, 그제야 아래의 로그인 카드(`login-card`) 뭉치를 화면에 그립니다.

```tsx
41:                             <input
42:                                 type="email"
...
45:                                 onChange={(e) => setEmail(e.target.value)}
```
- **설명:** 사용자가 이메일을 입력하는 칸입니다. 글자를 칠 때마다 `setEmail` 기능이 작동하여 입력 내용을 저장합니다.

```tsx
60:                         <button type="submit" className="login-btn">
```
- **설명:** 로그인 버튼입니다. 누르면 우리가 만든 `handleLogin` 기능이 실행됩니다.

---

## 요약
이 페이지는 **"처음 들어왔을 때 로고를 보여주고, 2초 뒤에 로그인 창을 띄워 사용자가 로그인을 성공하면 홈 화면으로 보내주는 역할"**을 합니다.
