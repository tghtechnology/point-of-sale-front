import apiClient from "../apiss/AxiosConfig";

const createToken = async (email,password)  => {
    try {
        const {data, status} = await apiClient.post(`/login`, email,password);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error)
    }
}
const verifyUser = async (id,password) =>{
    try{
        const {data, status} = await apiClient.post(`/verificar/${id}`,password);
        return{
            data,
            status
        }
    }catch{
            console.log(error);
        }
    }

export {
    createToken,
    verifyUser
}