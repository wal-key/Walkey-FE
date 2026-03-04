import { api } from './http'


const authApi = api.extend({
    hooks: {
        afterResponse: [
            async (_req, _opt, res) => {

                if (res.status === 400 ||
                    res.status === 401 ||
                    res.status === 404) {
                    console.log('400번대 실패', await res.json())
                    console.log(res)
                }
                if (res.status === 200) {
                    console.log('로그인성공', await res.json())
                }

            }
        ]
    }
})

interface User {
    id: string;
    username: string;
    avatar_url: string;
}

interface UserResponse {
    data: User;
}

// 유저 정보 불러오기
export const userSet = async () => {
    const response = await api.get('api/users/me').json<UserResponse>();
    console.log('ㄴㅇㄹㄴㅇㄹ',response)
    return response.data; 
}

// 로그인 api로 예시 든거임!
export const login = async (email: string, password: string) => {
    return await authApi.post('api/auth/login', {
        json: { email, password }
    });
};




export default login