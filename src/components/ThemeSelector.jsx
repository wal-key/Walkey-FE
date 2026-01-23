import { useWalkie } from '../context/WalkieContext';
import { Trees, Moon, Sparkles, Coffee } from 'lucide-react';
import './ThemeSelector.css';

const THEMES = [
    { id: 'nature', label: 'Nature', icon: Trees },
    { id: 'silent', label: 'Silent', icon: Moon },
    { id: 'sparkling', label: 'Sparkling', icon: Sparkles },
    { id: 'cafe', label: 'Cafe', icon: Coffee },
];

export default function ThemeSelector() {
    const { theme, setTheme } = useWalkie();

    return (
        <div className="theme-grid">
            {THEMES.map((t) => (
                <button
                    key={t.id}
                    className={`theme-btn ${theme === t.id ? 'active' : ''}`}
                    onClick={() => setTheme(t.id)}
                >
                    <t.icon size={24} />
                    <span className="label">{t.label}</span>
                </button>
            ))}
        </div>
    );
}
