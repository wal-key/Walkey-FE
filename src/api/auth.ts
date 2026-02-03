import { api } from './http'


// 로그인 api로 예시 든거임!
export const login = async (email:string, password:string) => {
    return await api.post('signin', {
        json: { email, password }
    }).json(); 
};


export default login