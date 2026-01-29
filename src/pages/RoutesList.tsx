import { useNavigate } from 'react-router-dom';
import { Theme, Route, useWalky } from '../context/WalkyContext';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './RoutesList.css';

// Fix Leaflet Marker Icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const generateMockRoutes = (theme: Theme, time: number): Route[] => {
    const adjectives: Record<Theme, string[]> = {
        nature: ['숲내음 가득한', '나무 그늘', '피톤치드'],
        silent: ['고요한', '사색하기 좋은', '한적한'],
        sparkling: ['빛나는', '낭만적인', '도시의 밤'],
        cafe: ['커피향 나는', '힙한 골목', '디저트']
    };

    const bgs: Record<Theme, string> = {
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

const THEME_TILES: Record<Theme, string> = {
    nature: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    silent: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    sparkling: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
    cafe: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
};

interface MapUpdaterProps {
    center: [number, number];
    route: [number, number][];
}

// Component to handle map center update
function MapUpdater({ center, route }: MapUpdaterProps) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 15);
        }
    }, [center, map]);

    useEffect(() => {
        if (route && route.length > 0) {
            const bounds = L.latLngBounds(route);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [route, map]);

    return null;
}


export default function RoutesList() {
    const navigate = useNavigate();
    const { theme, time, setSelectedRoute } = useWalky();
    const routes = generateMockRoutes(theme, time);

    const [startPos] = useState<[number, number]>([37.5665, 126.9780]); // Seoul City Hall
    const [previewRoutePath, setPreviewRoutePath] = useState<[number, number][]>([]);
    const [localSelectedRoute, setLocalSelectedRoute] = useState<Route | null>(null);
    const [isRoadView, setIsRoadView] = useState(false);

    const calculatePath = (route: Route) => {
        // Re-use logic for consistency
        const factor = route.time / 60;
        const radius = 0.005 * factor + 0.002;
        const steps = 15;
        const path: [number, number][] = [];

        // Use route.id to slightly vary direction or shape if needed, here just same pattern
        // Adding pseudo-randomness based on ID to make them look different
        const seedAngle = route.id * (Math.PI / 2);

        for (let i = 0; i <= steps; i++) {
            const theta = (i / steps) * 2 * Math.PI;
            const r = radius * (0.8 + Math.sin(theta * 3 + seedAngle) * 0.2); // vary shape
            const lat = startPos[0] + r * Math.sin(theta);
            const lng = startPos[1] + r * Math.cos(theta);
            path.push([lat, lng]);
        }
        path.push(path[0]);
        return path;
    };

    const handleRouteClick = (route: Route) => {
        setLocalSelectedRoute(route);
        const path = calculatePath(route);
        setPreviewRoutePath(path);
    };

    const handleConfirm = () => {
        if (localSelectedRoute) {
            setSelectedRoute(localSelectedRoute);
            navigate(`/map/${localSelectedRoute.id}`);
        }
    };

    return (
        <div className={`routes-list-container theme-${theme}`}>
            {/* Top Left Back Button */}
            <button onClick={() => navigate('/home')} className="back-btn-global">
                <ArrowRight size={24} style={{ transform: 'rotate(180deg)' }} />
            </button>

            {/* Background Map */}
            <div className="list-map-bg">
                <MapContainer center={startPos} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer
                        url={THEME_TILES[theme] || THEME_TILES['nature']}
                        attribution='&copy; OSM'
                    />
                    {previewRoutePath.length > 0 && <Polyline positions={previewRoutePath} color={theme === 'sparkling' ? '#9575CD' : '#FF5722'} weight={5} />}
                    <Marker position={startPos} />
                    <MapUpdater center={startPos} route={previewRoutePath} />
                </MapContainer>
            </div>

            {/* RoadView Mock Overlay */}
            {isRoadView && (
                <div className="roadview-overlay" onClick={() => setIsRoadView(false)}>
                    <div className="roadview-content">
                        <h3>로드뷰 (미리보기)</h3>
                        <div className="roadview-placeholder">
                            <p>현재 위치의 로드뷰 화면이 이곳에 표시됩니다.</p>
                            <img src="https://images.unsplash.com/photo-1513002048555-9005086ee46d?q=80&w=1000&auto=format&fit=crop" alt="Road View Mock" />
                        </div>
                        <button className="close-roadview">닫기</button>
                    </div>
                </div>
            )}

            <div className="glass-panel list-box">
                <button className="roadview-btn-inner" onClick={() => setIsRoadView(true)}>
                    로드뷰
                </button>
                <header className="list-header">
                    <h2>추천 산책로</h2>
                </header>

                <div className="routes-grid">
                    {routes.map(r => (
                        <div
                            key={r.id}
                            className={`route-card ${localSelectedRoute?.id === r.id ? 'selected' : ''}`}
                            onClick={() => handleRouteClick(r)}
                        >
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
                                {localSelectedRoute?.id === r.id ? <div className="chk-circle"></div> : <ArrowRight size={20} />}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="action-footer">
                    <button
                        className="confirm-btn"
                        disabled={!localSelectedRoute}
                        onClick={handleConfirm}
                    >
                        산책 시작하기
                    </button>
                </div>
            </div>
        </div >
    );
}
