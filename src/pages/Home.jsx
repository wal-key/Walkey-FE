import { useNavigate } from 'react-router-dom';
import ThemeSelector from '../components/ThemeSelector';
import TimeSlider from '../components/TimeSlider';
import { useWalkie } from '../context/WalkieContext';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();
    const { theme } = useWalkie();

    return (
        <div className={`home-container theme-${theme}`}>
            <div className="glass-panel content-box">
                <header className="home-header">
                    <h2>오늘의 산책</h2>
                    <p>어떤 기분으로 걸으시겠어요?</p>
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
