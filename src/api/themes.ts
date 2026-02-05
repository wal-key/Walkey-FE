import { api } from './http'

const getThems = async ()=>{
    return await api.get('themes').json();
}




export default getThems