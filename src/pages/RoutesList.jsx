import { useNavigate } from 'react-router-dom';
import { useWalkie } from '../context/WalkieContext';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import './RoutesList.css';

// Mock Data Generator
const generateMockRoutes = (theme, time) => {
    const adjectives = {
        nature: ['숲내음 가득한', '나무 그늘', '피톤치드'],
        silent: ['고요한', '사색하기 좋은', '한적한'],
        sparkling: ['빛나는', '낭만적인', '도시의 밤'],
        cafe: ['커피향 나는', '힙한 골목', '디저트']
    };

    const bgs = {
        nature: 'linear-gradient(to right, #e8f5e9, #a5d6a7)',
        silent: 'linear-gradient(to right, #eceff1, #b0bec5)',
        sparkling: 'linear-gradient(to right, #311b92, #512da8)',
        cafe: 'linear-gradient(to right, #efebe9, #d7ccc8)'
    };

    return [1, 2, 3].map(i => ({
        id: i,
        title: `${adjectives[theme][i - 1]} 산책로 ${i}`,
        desc: `${time}분 동안 즐기는 ${theme} 테마 코스입니다.`,
        time: time,
        dist: (time * 0.06 + Math.random() * 0.2).toFixed(1),
        bg: bgs[theme],
        theme: theme
    }));
};

export default function RoutesList() {
    const navigate = useNavigate();
    const { theme, time, setSelectedRoute } = useWalkie();
    const routes = generateMockRoutes(theme, time);

    const handleSelect = (route) => {
        setSelectedRoute(route);
        navigate(`/map/${route.id}`);
    };

    return (
        <div className={`routes-list-container theme-${theme}`}>
            <div className="glass-panel list-box">
                <header className="list-header">
                    <button onClick={() => navigate('/home')} className="back-btn">←</button>
                    <h2>추천 산책로</h2>
                </header>

                <div className="routes-grid">
                    {routes.map(r => (
                        <div key={r.id} className="route-card" onClick={() => handleSelect(r)}>
                            <div className="card-bg" style={{ background: r.bg }}></div>
                            <div className="card-content">
                                <h3>{r.title}</h3>
                                <p className="desc">{r.desc}</p>
                                <div className="stats">
                                    <span><Clock size={14} /> {r.time}분</span>
                                    <span><MapPin size={14} /> {r.dist}km</span>
                                </div>
                            </div>
                            <div className="card-action">
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
