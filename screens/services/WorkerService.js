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

const getWorkers = async () => {
    try {
        const response = await apiClient.get(`/listarEmpleados`);
        return response.data; // Devuelve los datos de los descuentos
    } catch (error) {
        console.log(error);
        return []; // En caso de error, devuelve un array vacío
    }
}; 

export {
    createWorker,getWorkers
}