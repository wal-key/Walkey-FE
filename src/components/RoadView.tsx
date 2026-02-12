import { useEffect, useRef } from 'react';
import './RoadView.css';

interface RoadViewProps {
    isOpen: boolean;
    onClose: () => void;
    position: { lat: number; lng: number } | null;
}

declare global {
    interface Window {
        kakao: any;
    }
}

export default function RoadView({ isOpen, onClose, position }: RoadViewProps) {
    const rvContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && position && rvContainer.current) {
            const { kakao } = window;
            if (!kakao) {
                console.error('Kakao SDK not found');
                return;
            }

            kakao.maps.load(() => {
                if (!rvContainer.current) return;

                const roadview = new kakao.maps.Roadview(rvContainer.current);
                const roadviewClient = new kakao.maps.RoadviewClient();
                const positionToView = new kakao.maps.LatLng(position.lat, position.lng);

                console.log('Searching Roadview for:', position);

                // 검색 반경을 100m로 확대하여 데이터 발견 확률을 높임
                roadviewClient.getNearestPanoId(positionToView, 100, (panoId: number) => {
                    if (panoId === null) {
                        console.warn('No Roadview data found at this location');
                        alert('해당 위치 근처에 로드뷰 데이터가 없습니다. 조금 더 도로 쪽을 클릭해 보세요.');
                        onClose();
                    } else {
                        console.log('Found PanoId:', panoId);
                        roadview.setPanoId(panoId, positionToView);
                    }
                });
            });
        }
    }, [isOpen, position, onClose]);

    if (!isOpen) return null;

    return (
        <div className="roadview-overlay" onClick={onClose}>
            <div className="roadview-content" onClick={(e) => e.stopPropagation()}>
                <header className="rv-header">
                    <h3>로드뷰 (미리보기)</h3>
                    <button className="close-rv-btn" onClick={onClose}>×</button>
                </header>
                <div
                    ref={rvContainer}
                    className="roadview-viewer"
                    style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0' }}
                >
                    {/* Kakao Roadview will be rendered here */}
                </div>
            </div>
        </div>
    );
}
