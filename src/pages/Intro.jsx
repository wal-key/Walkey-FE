import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Play, LogIn, User, Lock } from 'lucide-react';
import { useWalkie } from '../context/WalkieContext';
import './Intro.css';

export default function Intro() {
    const navigate = useNavigate();
    const { setUser } = useWalkie();
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setShowLogin(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock Login logic
        if (email === 'walkie@example.com' && password === '1234') {
            setUser({ name: '산책러', email });
            navigate('/home');
        } else {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div className="intro-container">
            <h1 className="logo-text fade-in">Walkie</h1>
            <p className="fade-in-delayed mb-8">당신의 걸음마다 감성을 담아</p>

            {showLogin && (
                <div className="login-card fade-in-up">
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <User size={18} className="input-icon" />
                            <input
                                type="email"
                                placeholder="이메일 (walkie@example.com)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                placeholder="비밀번호 (1234)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit" className="login-btn">
                            <LogIn size={20} />
                            <span>로그인</span>
                        </button>
                    </form>
                    <p className="hint-text">로그인 버튼을 눌러 산책을 시작하세요</p>
                </div>
            )}
        </div>
    );
}
