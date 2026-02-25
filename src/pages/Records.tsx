import { useNavigate } from 'react-router-dom';
import { useWalkey, WalkeyRecord } from '../context/WalkeyContext';
import { Activity, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import './Records.css';
import { history, WalkHistoryResponse } from '../api/history';

export default function Records() {

    const [historyData, setHistoryData] = useState<WalkHistoryResponse | null>(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await history();
                    console.log(res);
                    setHistoryData(res);
                }
                catch (e) {
                    console.log(e);
                }
            })();
    }, [])

useEffect(() => {
        // ⭐️ 수정: historyData가 존재하고(&&), 그 안의 data가 배열인지 검사합니다!
        const Distance = historyData && Array.isArray(historyData.data) 
            ? historyData.data.reduce((sum, item) => sum + item.actual_distance, 0)
            : 0;
            
        const Duration = historyData && Array.isArray(historyData.data)
            ? historyData.data.reduce((sum, item) => sum + item.actual_duration, 0)
            : 0;
            
        console.log('🎉 드디어 계산된 결과:', Distance, Duration);
        setTotalDistance(Distance);
        setTotalDuration(Duration);
    }, [historyData]);


    const check = () => {
        console.log('historyData:', historyData);
    }

    const navigate = useNavigate();
    const { lastWalk } = useWalkey();
    // Get records from localStorage
    const records: WalkeyRecord[] = JSON.parse(localStorage.getItem('walkey_records') || '[]');

    return (
        <div className="records-container">
            <div className="glass-panel records-box">
                <header className="records-header">
                    <button onClick={() => navigate('/walk-setup')} className="close-btn">×</button>
                    <h2 onClick={() => check()}>나의 산책 기록</h2>
                </header>

                <div className="stats-dashboard">
                    <div className="stat-card highlight">
                        <Activity className="icon" size={24} />
                        <span className="value">{totalDistance || '0'}km</span>
                        <span className="label">이번 산책 거리</span>
                    </div>
                    <div className="stat-card highlight">
                        <Clock className="icon" size={24} />
                        <span className="value">{totalDuration || '0'}분</span>
                        <span className="label">이번 산책 시간</span>
                    </div>
                </div>

                <div className="stats-summary-row">
                    <div className="summary-item">
                        <span className="label">누적 거리</span>
                        <span className="value">{totalDistance || 0}km</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">누적 시간</span>
                        <span className="value">{totalDuration|| 0}분</span>
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

                <button className="new-walk-btn" onClick={() => navigate('/walk-setup')}>
                    새로운 산책 시작하기
                </button>
            </div>
        </div>
    );
}