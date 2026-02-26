import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useWalkey, Theme, WalkeyRecord } from '../context/WalkeyContext';
import { ArrowLeft, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './WalkingSession.css';
import RoadView from '../components/RoadView';

// Fix Leaflet Marker Icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { saveRoute, updateRoute } from '../api/saveRoute';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Theme Tile URLs
const THEME_TILES: Record<Theme, string> = {
    nature: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    silent: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    sparkling: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
    cafe: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
};

// Component to handle map bounds
function MapAdjuster({ route }: { route: [number, number][] }) {
    const map = useMap();
    useEffect(() => {
        if (route && route.length > 0) {
            const bounds = L.latLngBounds(route);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [route, map]);
    return null;
}

// Component to handle map clicks for RoadView
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click: (e) => {
            onClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function WalkingSession() {
    const navigate = useNavigate();
    const { theme, selectedRoute, user, setLastWalk } = useWalkey();
    const [routePath, setRoutePath] = useState<[number, number][]>([]);
    const [startPos] = useState<[number, number]>([37.5665, 126.9780]); // Custom Start (Seoul City Hall)
    const [isWalking, setIsWalking] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRoadView, setIsRoadView] = useState(false);
    const [clickedPos, setClickedPos] = useState<{ lat: number; lng: number } | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    // Generate Route on Mount
    useEffect(() => {
        if (!selectedRoute) {
            navigate('/route-select'); // Redirect if no route selected
            return;
        }

        if (selectedRoute.path) {
            // Use real path from server (will receive either detail_paths or paths)
            const leafletPath: [number, number][] = selectedRoute.path.map(c => [c.lat, c.lng]);
            setRoutePath(leafletPath);
        } else {
            console.error('❌ 경로 데이터(path)가 없습니다.');
            alert('유효한 경로 데이터가 없습니다. 다시 선택해주세요.');
            navigate('/route-select');
        }
    }, [selectedRoute, startPos, navigate]);

    // Elapsed Time Timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isWalking) {
            timer = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isWalking]);

    const handleStartStop = async () => {
        if (!isWalking) {
            setIsWalking(true);
            if (user?.id && selectedRoute?.id) {
                const data = await saveRoute(user.id, selectedRoute.id) as any; // 나중에 타입 제대로 정의
                if (data?.data?.id ) {
                    setSessionId(data.data.id);
                }
            }
        } else {
            if (window.confirm('산책을 그만하시겠습니까?')) {
                alert('산책을 그만합니다.');
                finishSession(false);
            }
            const endData = await updateRoute(Number(sessionId), new Date().toISOString(), 1.5, elapsedTime); 
            console.log('산책 종료 응답', endData);
        }
    };

    const handleAutoFinish = () => {
        alert('산책을 마쳤습니다.');
        finishSession(true);
    };

    const finishSession = (completed: boolean) => {
        if (!selectedRoute) return;

        const actualTime = Math.ceil(elapsedTime / 60) || 1;
        // Simple mock calculation for partial distance
        const totalDist = parseFloat(selectedRoute.dist);
        const actualDist = completed ? selectedRoute.dist : (totalDist * (elapsedTime / (selectedRoute.time * 60))).toFixed(2);

        const newRecord: WalkeyRecord = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            theme: theme,
            dist: actualDist,
            time: actualTime,
            completed: completed
        };

        // Save record (Mock)
        const existing: WalkeyRecord[] = JSON.parse(localStorage.getItem('walkey_records') || '[]');
        localStorage.setItem('walkey_records', JSON.stringify([newRecord, ...existing]));

        setLastWalk(newRecord);
        navigate('/records');
    };

    return (
        <div className="walking-session-page">
            <div className="map-overlay-top">
                <button onClick={() => navigate('/route-select')} className="icon-btn">
                    <ArrowLeft />
                </button>
                <span className="route-title">{selectedRoute?.title}</span>
            </div>

            <MapContainer center={startPos} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer
                    url={THEME_TILES[theme] || THEME_TILES['nature']}
                    attribution='&copy; OSM'
                />
                {routePath.length > 0 && <Polyline positions={routePath} color={theme === 'sparkling' ? '#9575CD' : '#FF5722'} weight={5} />}
                <Marker position={startPos}>
                    <Popup>출발지</Popup>
                </Marker>
                <MapAdjuster route={routePath} />
                <MapClickHandler onClick={(lat, lng) => {
                    setClickedPos({ lat, lng });
                    setIsRoadView(true);
                }} />
            </MapContainer>

            {/* RoadView Mock Overlay */}
            <RoadView isOpen={isRoadView} onClose={() => setIsRoadView(false)} position={clickedPos} />

            {/* Controls Overlay */}
            <div className="map-controls">
                {isWalking && (
                    <button className="auto-finish-test-btn" onClick={handleAutoFinish}>
                        (테스트) 강제 완료
                    </button>
                )}
            </div>

            <div className="map-overlay-bottom">
                <div className="route-info-detail">
                    <div className="d-item">
                        <span className="label">소요 시간</span>
                        <span className="value">
                            {isWalking ? `${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}` : `${selectedRoute?.time}분`}
                        </span>
                    </div>
                    <div className="d-item" onClick={() => { console.log(selectedRoute, user, sessionId) }}>
                        <span className="label" >총 거리</span>
                        <span className="value">{selectedRoute?.dist}km</span>
                    </div>
                </div>
                <button className={`finish-btn ${isWalking ? 'walking' : ''}`} onClick={handleStartStop}>
                    <Navigation size={18} />
                    {isWalking ? '산책 끝내기' : '산책 시작'}
                </button>
            </div>
        </div>
    );
}
