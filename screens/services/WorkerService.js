import apiClient from "../apiss/AxiosConfig";

const createWorker = async (newWorker) => {
    try {
        const {data, status} = await apiClient.post(`/crearEmpleado`, newWorker);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error);
    }
}

export {
    createWorker
}