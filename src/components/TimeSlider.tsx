import { ChangeEvent } from 'react';
import { useWalky } from '../context/WalkyContext';
import './TimeSlider.css';

export default function TimeSlider() {
    const { time, setTime } = useWalky();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTime(Number(e.target.value));
    };

    return (
        <div className="time-slider-container">
            <div className="time-display">{time}분</div>
            <input
                type="range"
                min="10"
                max="60"
                step="10"
                value={time}
                onChange={handleChange}
                className="slider"
            />
            <div className="time-labels">
                <span>10분</span>
                <span>60분</span>
            </div>
        </div>
    );
}
