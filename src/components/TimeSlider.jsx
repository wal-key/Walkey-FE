import { useWalkie } from '../context/WalkieContext';
import './TimeSlider.css';

export default function TimeSlider() {
    const { time, setTime } = useWalkie();

    return (
        <div className="time-slider-container">
            <div className="time-display">{time}분</div>
            <input
                type="range"
                min="10"
                max="60"
                step="10"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="slider"
            />
            <div className="time-labels">
                <span>10분</span>
                <span>60분</span>
            </div>
        </div>
    );
}
