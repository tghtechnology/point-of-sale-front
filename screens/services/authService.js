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
export {
    createToken
}