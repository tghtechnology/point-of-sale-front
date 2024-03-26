import apiClient from "../apiss/AxiosConfig";

const createUser = async (newUser) => {
    try {
        const {data, status} = await apiClient.post(`/registro`, newUser);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error);
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
    createUser,
    verifyUser
}