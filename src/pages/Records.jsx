import { useNavigate } from 'react-router-dom';
import { useWalkie } from '../context/WalkieContext';
import { User, Activity, Clock } from 'lucide-react';
import './Records.css';

export default function Records() {
    const navigate = useNavigate();
    const { lastWalk } = useWalkie();
    // Get records from localStorage
    const records = JSON.parse(localStorage.getItem('walkie_records') || '[]');

    // Calculate totals
    const totalDist = records.reduce((acc, cur) => acc + Number(cur.dist), 0).toFixed(1);
    const totalTime = records.reduce((acc, cur) => acc + Number(cur.time), 0);

    return (
        <div className="records-container">
            <div className="glass-panel records-box">
                <header className="records-header">
                    <button onClick={() => navigate('/home')} className="close-btn">×</button>
                    <h2>나의 산책 기록</h2>
                </header>

                <div className="stats-dashboard">
                    <div className="stat-card highlight">
                        <Activity className="icon" size={24} />
                        <span className="value">{lastWalk?.dist || '0'}km</span>
                        <span className="label">이번 산책 거리</span>
                    </div>
                    <div className="stat-card highlight">
                        <Clock className="icon" size={24} />
                        <span className="value">{lastWalk?.time || '0'}분</span>
                        <span className="label">이번 산책 시간</span>
                    </div>
                </div>

                <div className="stats-summary-row">
                    <div className="summary-item">
                        <span className="label">누적 거리</span>
                        <span className="value">{totalDist}km</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">누적 시간</span>
                        <span className="value">{totalTime}분</span>
                    </div>
                </div>

                <div className="gallery-section">
                    <h3>최근 산책로</h3>
                    <div className="gallery-grid">
                        {records.length === 0 ? (
                            <p className="empty-msg">아직 기록이 없습니다. 산책을 시작해보세요!</p>
                        ) : (
                            records.map(r => (
                                <div key={r.id} className={`gallery-item theme-${r.theme}`}>
                                    <div className="thumb-date">{r.date}</div>
                                    <div className="thumb-info">{r.dist}km · {r.time}분</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <button className="new-walk-btn" onClick={() => navigate('/home')}>
                    새로운 산책 시작하기
                </button>
            </div>
        </div>
    );
}
