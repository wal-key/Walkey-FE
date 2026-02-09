import { useNavigate } from 'react-router-dom';
import ThemeSelector from '../components/ThemeSelector';
import TimeSlider from '../components/TimeSlider';
import { useWalkey } from '../context/WalkeyContext';
import './WalkSetup.css';

export default function WalkSetup() { // 산책 테마와 시간을 선택하는 메인 페이지.
    const navigate = useNavigate();
    const { theme, user } = useWalkey();

    return (
        <div className={`walk-setup-container theme-${theme}`}>
            <div className="glass-panel content-box">
                <header className="walk-setup-header">
                    <h2>안녕하세요, {user?.name || '산책러'}님!</h2>
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
