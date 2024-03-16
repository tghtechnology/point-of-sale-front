import apiClient from "../apiss/AxiosConfig";

const createToken = async (credentials)  => {
    try {
        const {data, status} = await apiClient.post(`/login`, credentials);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error)
    }
}


export {
    createToken
}