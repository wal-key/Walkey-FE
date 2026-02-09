import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './Landing.css';
import LoginModal from '../components/LoginModal';

export default function Landing() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="landing-container">
            <h1 className="logo-text fade-in">Walkey</h1>
            <p className="fade-in-delayed mb-8">당신의 걸음마다 감성을 담아</p>
            <button
                onClick={() => setShowLogin(true)}
                className="start-btn fade-in-delayed-2"
            >
                지금 바로 시작하기
                <ArrowRight size={24} />
            </button>

            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </div>
    );
}