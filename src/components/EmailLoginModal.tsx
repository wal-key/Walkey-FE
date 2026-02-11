import React from 'react';
import './LoginModal.css'; // Shared styles

interface EmailLoginModalProps {
    onSwitchToSocial: () => void;
}

const EmailLoginModal: React.FC<EmailLoginModalProps> = ({ onSwitchToSocial }) => {
    return (
        <>
            <div className="modal-header">
                <h2 className="modal-title">로그인</h2>
                <p className="modal-subtitle">Walkey와 함께 당신의 여정을 시작하세요</p>
            </div>

            <div className="login-form">
                <div className="input-group">
                    <label className="login-label">이메일</label>
                    <input type="email" className="login-input" placeholder="name@example.com" />
                </div>
                <div className="input-group">
                    <label className="login-label">비밀번호</label>
                    <input type="password" className="login-input" placeholder="비밀번호를 입력하세요" />
                </div>

                <button className="submit-btn" onClick={() => { }}>로그인</button>

                <div className="divider"><span>또는</span></div>

                <button className="switch-btn" onClick={onSwitchToSocial}>
                    소셜 계정으로 시작하기
                </button>
            </div>

            <div className="modal-footer">
                로그인함으로써 Walkey의 <a href="#" className="modal-link">이용약관</a> 및 <a href="#" className="modal-link">개인정보처리방침</a>에 동의하게 됩니다.
            </div>
        </>
    );
};

export default EmailLoginModal;
