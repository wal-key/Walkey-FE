// themes.ts
import { api } from './http'

export interface ThemeOption {
    id: string;
    label: string;
    icon: string;
}

// 기존 테마 리스트 가져오기
export const getThemes = async (): Promise<ThemeOption[]> => {
    // API 연결 오류로 인해 임시로 하드코딩된 6가지 테마를 바로 반환합니다.
    return [
        { id: 'nature', label: '자연과 힐링', icon: 'nature' },
        { id: 'silent', label: '조용한 밤길', icon: 'silent' },
        { id: 'sparkling', label: '기분 좋은 산책', icon: 'sparkling' },
        { id: 'cafe', label: '카페 투어', icon: 'cafe' },
        { id: 'energy', label: '활기찬 파워워킹', icon: 'active' },
        { id: 'random', label: '어디로든 발길 닿는대로', icon: 'random' }
    ];
}

// 신규: 현재 감정 상태 가져오기 (엔드포인트를 'emotion'이라 가정)
export const getCurrentEmotion = async (): Promise<{ emotion: string }> => {
    try {
        // 백엔드에 아직 /emotion API가 없으므로 임시로 'happy'를 반환하도록 예외 처리합니다.
        // 추후 백엔드 API가 완성되면 try-catch를 수정하세요.
        return await api.get('emotion').json();
    } catch (error) {
        console.warn('감정 API가 아직 서버에 없습니다. 임시 데이터(happy)를 반환합니다.');
        return { emotion: 'happy' };
    }
}