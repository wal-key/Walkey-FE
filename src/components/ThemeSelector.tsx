import { useEffect, useState } from 'react';
import { useWalkey, Theme } from '../context/WalkeyContext';
import { Trees, Moon, Sparkles, Coffee, HelpCircle, Flame, Map } from 'lucide-react';
import { getThemes, getCurrentEmotion, ThemeOption } from '../api/themes'; // 함수들 임포트
import './ThemeSelector.css';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number | string }>> = {
    nature: Trees,
    silent: Moon,
    sparkling: Sparkles,
    cafe: Coffee,
    active: Flame,
    random: Map,
};

// 감정과 테마를 연결하는 매핑 객체
const EMOTION_TO_THEME: Record<string, Theme> = {
    happy: 'sparkling',
    sad: 'silent',
    angry: 'nature',
    tired: 'cafe'
};

export default function ThemeSelector() {
    const { theme, setTheme } = useWalkey();
    const [themes, setThemes] = useState<ThemeOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initThemeSelector = async () => {
            try {
                // 1. 테마 목록과 감정 상태를 동시에 가져옵니다.
                const [themeList, emotionData] = await Promise.all([
                    getThemes(),
                    getCurrentEmotion()
                ]);

                setThemes(themeList);

                // 2. 감정에 맞는 추천 테마가 있다면 자동으로 설정합니다.
                const recommendedTheme = EMOTION_TO_THEME[emotionData.emotion];
                if (recommendedTheme) {
                    setTheme(recommendedTheme);
                    console.log(`추천 테마 '${recommendedTheme}'가 적용되었습니다.`);
                }
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        initThemeSelector();
    }, [setTheme]); // setTheme은 context 함수이므로 의존성 배열에 추가

    if (loading) return <div>감정을 분석하고 테마를 불러오는 중...</div>;

    return (
        <div className="theme-grid">
            {themes.map((t) => {
                const IconComponent = ICON_MAP[t.icon] || HelpCircle;
                return (
                    <button
                        key={t.id}
                        className={`theme-btn ${theme === t.id ? 'active' : ''}`}
                        onClick={() => setTheme(t.id as Theme)}
                    >
                        <IconComponent size={24} />
                        <span className="label">{t.label}</span>
                    </button>
                );
            })}
        </div>
    );
}