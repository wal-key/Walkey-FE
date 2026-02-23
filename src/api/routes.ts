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
    path: Coord[];
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