import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import './LoginModal.css';
import EmailLoginModal from './EmailLoginModal';
import SocialLoginModal from './SocialLoginModal';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [view, setView] = useState<'email' | 'social'>('email');
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => setIsVisible(true), 10);
            setView('email'); // Reset to default view
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div className={`modal-overlay ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="modal-backdrop" onClick={onClose} />

            <div className={`glass-panel modal-container ${isVisible ? 'scale-100' : 'scale-95'}`}>
                <button onClick={onClose} className="modal-close-btn">
                    <X size={20} />
                </button>

                {view === 'email' ? (
                    <EmailLoginModal onSwitchToSocial={() => setView('social')} />
                ) : (
                    <SocialLoginModal onSwitchToEmail={() => setView('email')} />
                )}
            </div>
        </div>
    );
};

export default LoginModal;
