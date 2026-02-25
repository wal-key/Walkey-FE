import React from 'react';
import './LoginModal.css'; // Shared styles
import { useState } from 'react';
import login from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useWalkey } from '../context/WalkeyContext';

interface EmailLoginModalProps {
    onSwitchToSocial: () => void;
}

const EmailLoginModal: React.FC<EmailLoginModalProps> = ({ onSwitchToSocial }) => {
    const { setUser } = useWalkey()
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleLogin = async (id: string, password: string) => {
        setIsLoading(true);
        setErrMessage('');
        try {
            const loginData = await login(id, password);
            const data = await loginData.json() as any;
            console.log('loginData:', data.data.user);
            setUser(data.data.user); // 로그인 성공 시 사용자 정보 저장
            // setUser(data.user);
            navigate('/walk-setup'); // 급하니깐 일단 이렇게만 ㅎㅎ

        } catch (err: any) {
            const data = await err.response.json();
            setErrMessage(data.message || '로그인에 실패했습니다. 다시 시도해주세요.');
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="modal-header">
                <h2 className="modal-title">로그인</h2>
                <p className="modal-subtitle">Walkey와 함께 당신의 여정을 시작하세요</p>
            </div>

            <div className="login-form">
                {errMessage && <p className="error-message">{errMessage}</p>}
                <div className="input-group">
                    <label className="login-label">이메일</label>
                    <input type="email" className="login-input" placeholder="name@example.com" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="input-group">
                    <label className="login-label">비밀번호</label>
                    <input type="password" className="login-input" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className="submit-btn" onClick={() => { handleLogin(id, password) }}>로그인</button>

                <div className="divider"><span>또는</span></div>

                <button className="switch-btn" onClick={onSwitchToSocial}>
                    소셜 계정으로 시작하기
                </button>
            </div>

            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p className="loading-text">Walkey에 연결 중...</p>
                </div>
            )}
        </>
    );
};

export default EmailLoginModal;
