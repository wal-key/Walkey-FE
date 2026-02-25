import { api } from './http'

export interface Coord {
    lat: number;
    lng: number
}

export interface RouteItem {
    id: number;
    name: string;
    total_distance: number;
    estimated_time: number;
    thumbnail_url: string;
    path?: Coord[];         // 기존 코드 호환
    paths?: Coord[];        // DB 컬럼명 대응 (단순 경로)
    detail_paths?: Coord[]; // DB 컬럼명 대응 (상세 경로)
}

export interface RouteResponse {
    data: RouteItem[];
}

export const getRoutes = async (themeId: number, duration: number) => {
    return await api.get('api/routes', {
        searchParams: {
            theme: themeId,
            time: duration
        }
    }).json<RouteResponse>();
}