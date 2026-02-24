import { useNavigate } from 'react-router-dom';
import { Theme, useWalkey } from '../context/WalkeyContext';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './RouteSelect.css';
import RoadView from '../components/RoadView';
import { getRoutes, RouteItem } from '../api/routes';


// Fix Leaflet Marker Icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Mock generation logic removed (using real API)

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
            map.fitBounds(bounds, {
                padding: [50, 50],
                maxZoom: 16,
                animate: true,
                duration: 1.0
            });
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


export default function RouteSelect() {
    const navigate = useNavigate();
    const { theme, time, setSelectedRoute } = useWalkey();
    const [routes, setRoutes] = useState<RouteItem[]>([]); // 서버에서 올 산책로들
    const [isLoading, setIsLoading] = useState(true);      // 로딩 중인지 확인용

    const [startPos] = useState<[number, number]>([37.5665, 126.9780]); // Seoul City Hall
    const [previewRoutePath, setPreviewRoutePath] = useState<[number, number][]>([]);
    const [localSelectedRoute, setLocalSelectedRoute] = useState<RouteItem | null>(null);
    const [isRoadView, setIsRoadView] = useState(false);
    const [clickedPos, setClickedPos] = useState<{ lat: number; lng: number } | null>(null);

    // Fetch Routes from Backend
    useEffect(() => {
        const fetchRoutes = async () => {
            setIsLoading(true);
            try {
                const themeIdMap: Record<Theme, number> = {
                    nature: 1, silent: 2, sparkling: 3, cafe: 4
                };
                console.log('📡 API 요청 시작:', { theme, themeId: themeIdMap[theme], time });
                const response = await getRoutes(themeIdMap[theme], time);
                console.log('✅ API 응답 성공:', response.data);
                setRoutes(response.data);
            } catch (error) {
                console.error('❌ API 호출 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoutes();
    }, [theme, time]);

    const handleRouteClick = (route: RouteItem) => {
        setLocalSelectedRoute(route);
        // Prioritize 'detail_paths' for smoother lines
        const rawPath = route.detail_paths || route.paths || route.path || [];
        const leafletPath: [number, number][] = rawPath.map(c => [c.lat, c.lng]);
        setPreviewRoutePath(leafletPath);
    };

    const handleConfirm = () => {
        if (localSelectedRoute) {
            setSelectedRoute({
                id: localSelectedRoute.id,
                title: localSelectedRoute.name,
                theme: theme,
                time: localSelectedRoute.estimated_time,
                dist: (localSelectedRoute.total_distance / 1000).toFixed(1),
                desc: `${localSelectedRoute.estimated_time}분 추천 코스`,
                path: localSelectedRoute.detail_paths || localSelectedRoute.paths || localSelectedRoute.path || []
            });
            navigate(`/walking-session/${localSelectedRoute.id}`);
        }
    };

    return (
        <div className={`route-select-container theme-${theme}`}>
            {/* Top Left Back Button */}
            <button onClick={() => navigate('/walk-setup')} className="back-btn-global">
                <ArrowRight size={24} style={{ transform: 'rotate(180deg)' }} />
            </button>

            {/* Background Map */}
            <div className="list-map-bg">
                <MapContainer center={startPos} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer
                        url={THEME_TILES[theme] || THEME_TILES['nature']}
                        attribution='&copy; OSM'
                    />
                    {previewRoutePath.length > 0 && (
                        <Polyline
                            positions={previewRoutePath}
                            color={theme === 'sparkling' ? '#9575CD' : theme === 'nature' ? '#2E7D32' : '#FF5722'}
                            weight={6}
                            opacity={0.8}
                            lineJoin="round"
                        />
                    )}
                    <Marker position={previewRoutePath.length > 0 ? previewRoutePath[0] : startPos} />
                    <MapUpdater center={startPos} route={previewRoutePath} />
                    <MapClickHandler onClick={(lat, lng) => {
                        setClickedPos({ lat, lng });
                        setIsRoadView(true);
                    }} />
                </MapContainer>
            </div>

            {/* RoadView Mock Overlay */}
            <RoadView isOpen={isRoadView} onClose={() => setIsRoadView(false)} position={clickedPos} />

            <div className="glass-panel list-box">
                <header className="list-header">
                    <h2>추천 산책로</h2>
                </header>

                <div className="routes-grid">
                    {isLoading ? (
                        <div className="loading-state">산책로를 불러오는 중입니다...</div>
                    ) : routes.length === 0 ? (
                        <div className="empty-state">조건에 맞는 산책로가 없습니다.</div>
                    ) : (
                        routes.map(r => (
                            <div
                                key={r.id}
                                className={`route-card ${localSelectedRoute?.id === r.id ? 'selected' : ''}`}
                                onClick={() => handleRouteClick(r)}
                            >
                                <div
                                    className="card-bg"
                                    style={{
                                        backgroundImage: r.thumbnail_url ? `url(${r.thumbnail_url})` : 'none',
                                        backgroundColor: '#eee',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                                <div className="card-content">
                                    <h3>{r.name}</h3>
                                    <p className="desc">{r.estimated_time}분 추천 코스</p>
                                    <div className="stats">
                                        <span><Clock size={14} /> {r.estimated_time}분</span>
                                        <span><MapPin size={14} /> {(r.total_distance / 1000).toFixed(1)}km</span>
                                    </div>
                                </div>
                                <div className="card-action">
                                    {localSelectedRoute?.id === r.id ? <div className="chk-circle"></div> : <ArrowRight size={20} />}
                                </div>
                            </div>
                        ))
                    )}
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
