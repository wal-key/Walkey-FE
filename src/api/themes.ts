// themes.ts
import { api } from './http'

export interface ThemeOption {
    id: string;
    label: string;
    icon: string;
}

// 기존 테마 리스트 가져오기
export const getThemes = async (): Promise<ThemeOption[]> => {
    return await api.get('themes').json();
}

// 신규: 현재 감정 상태 가져오기 (엔드포인트를 'emotion'이라 가정)
export const getCurrentEmotion = async (): Promise<{ emotion: string }> => {
    return await api.get('emotion').json();
}