import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import './Intro.css';

export default function Intro() {
    const navigate = useNavigate();
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowBtn(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="intro-container">
            <h1 className="logo-text fade-in">Walkie</h1>
            <p className="fade-in-delayed">당신의 걸음마다 감성을 담아</p>

            {showBtn && (
                <button
                    className="start-btn fade-in-up"
                    onClick={() => navigate('/home')}
                >
                    <Play size={20} fill="currentColor" />
                    <span className="ml-2">시작하기</span>
                </button>
            )}
        </div>
    );
}
