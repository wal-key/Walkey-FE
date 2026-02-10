
import './RoadView.css';

interface RoadViewProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RoadView({ isOpen, onClose }: RoadViewProps) {
    if (!isOpen) return null;

    return (
        <div className="roadview-overlay" onClick={onClose}>
            <div className="roadview-content" onClick={(e) => e.stopPropagation()}>
                <h3>로드뷰 (미리보기)</h3>
                <div className="roadview-placeholder">
                    <p>현재 위치의 로드뷰 화면이 이곳에 표시됩니다.</p>
                    <img src="https://images.unsplash.com/photo-1513002048555-9005086ee46d?q=80&w=1000&auto=format&fit=crop" alt="Road View Mock" />
                </div>
                <button className="close-roadview" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}
