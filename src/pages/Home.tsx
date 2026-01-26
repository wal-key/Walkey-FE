import { useNavigate } from 'react-router-dom';
import ThemeSelector from '../components/ThemeSelector';
import TimeSlider from '../components/TimeSlider';
import { useWalky } from '../context/WalkyContext';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();
    const { theme, user } = useWalky();

    return (
        <div className={`home-container theme-${theme}`}>
            <div className="glass-panel content-box">
                <header className="home-header">
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
                    onClick={() => navigate('/routes')}
                >
                    산책로 찾기
                </button>
            </div>
        </div>
    );
}
