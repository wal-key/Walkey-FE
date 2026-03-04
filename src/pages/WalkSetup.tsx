import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSelector from '../components/ThemeSelector';
import TimeSlider from '../components/TimeSlider';
import { useWalkey } from '../context/WalkeyContext';
import './WalkSetup.css';
import { userSet } from '../api/auth';
export default function WalkSetup() { // 산책 테마와 시간을 선택하는 메인 페이지.
    const navigate = useNavigate();
    const { theme, user, setUser } = useWalkey();
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        // 로그인 후 넘어올 때 자연스러운 전환을 위해 2초간 로딩 화면을 보여줌
        if (user === null) {
            console.log('유저 정보가 없습니다. 로그인 상태를 확인해주세요.');
            userSetup();
        }
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const userSetup = async () => {
        const userdata = await userSet()
        console.log('받아온거', userdata);
        if (userdata) {
            console.log('유저 정보 설정됨:', userdata);
            
            setUser(userdata);
        }
    }

        if (isPageLoading) {
            return (
                <div className={`walk-setup-container theme-${theme}`} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
                        <div className="loading-spinner" style={{ fontSize: '3rem', marginBottom: '20px', animation: 'spin 2s linear infinite' }}>🚶‍♂️</div>
                        <h2 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Walkey와 여정을 준비 중입니다...</h2>
                        <p style={{ color: '#555', fontSize: '1rem' }}>잠시만 기다려주세요 ✨</p>
                    </div>
                </div>
            );
        }

        return (
            <div className={`walk-setup-container theme-${theme}`}>
                <div className="glass-panel content-box" style={{ animation: 'fadeIn 0.5s ease-in' }}>
                    <header className="walk-setup-header">
                        <h2>안녕하세요, {user?.username || '산책러'}님!</h2>
                        <p>오늘도 건강한 한 걸음 어떠세요?</p>
                    </header>

                    <section className="section">
                        <h3>감정 테마</h3>
                        <ThemeSelector />
                    </section>

                    <section className="section">
                        <h3>산책 시간</h3>
                        <TimeSlider />
                    </section>

                    <button
                        className="find-route-btn"
                        onClick={() => navigate('/route-select')}
                    >
                        산책로 찾기
                    </button>
                </div>
            </div>
        );
    }
