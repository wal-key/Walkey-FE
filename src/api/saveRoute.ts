import { api } from './http';


// interface SaveRouteRequest {
//     user_id: string;
//     route_id: number;
// }

export const saveRoute = async (user_id: string, route_id: number) => {
    const res = await api.post('api/users/sessions', {
        json: {
            user_id: user_id,
            route_id: route_id
        }
    }).json();
    console.log('산책 시작 정보임s',res)
    return res;
};


export const updateRoute = async (session_id: number, end_time: string, actual_distance: number, actual_duration: number) => {
    const res = await api.patch('api/users/sessions', {
        json: {
            session_id: session_id,
            end_time: end_time,
            actual_distance: actual_distance,
            actual_duration: actual_duration
        }
    }).json();
    console.log('산책 종료 정보s',res);
    return res;
};