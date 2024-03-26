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

const getTokem = async (token)  => {
    try {
        const {data, status} = await apiClient.post(`/logout`, token);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    createToken,
    getTokem
}