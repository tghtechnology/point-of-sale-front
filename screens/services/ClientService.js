import apiClient from "../apiss/AxiosConfig";

const createClient = async (newClient) => {
    try {
        const {data, status} = await apiClient.post(`/cliente`, newClient);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error);
    }
}

export {
    createClient
}