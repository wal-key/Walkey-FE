import { api } from './http'

// 유저에 대한 산책 통계
interface WalkSession {
    session_info: {
        actual_distance: number;
        actual_duration: number;
        total_distance: number;
        total_duration: number;
    }
}
// 각 산책에 대한 정보들
interface WalkHistoryItem {
    id: number;
    route_id: number;
    thumbnail_url: string;
    route_name: string;
    description: string;
    actual_distance: number;      // 개별 산책 거리
    actual_duration: number;      // 개별 산책 시간
    start_time: string;
    end_time: string;
    created_at: string;
}

// 통합본
export interface WalkHistoryResponse {
    message: string;
    data: WalkSession;
    histories: WalkHistoryItem[]
}


export const history = async (username: string) => {
    return await api.get(`api/users/sessions/${username}`).json<WalkHistoryResponse>();
}

