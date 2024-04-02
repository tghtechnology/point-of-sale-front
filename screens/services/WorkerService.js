import apiClient from "../apiss/AxiosConfig";

const createWorker = async (newWorker) => {
    try {
        const { data, status } = await apiClient.post(`/empleado`, newWorker);
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
        const response = await apiClient.get(`/empleado`);
        return response.data; // Devuelve los datos de los descuentos
    } catch (error) {
        console.log(error);
        return []; // En caso de error, devuelve un array vacío
    }
};

const editworker = async (id) => {
    try {
        const response = await apiClient.put(`/empleado/${id}`);
        if (response.status === 200) {
            // Si la respuesta es 200, devuelve los datos actualizados del descuento
            return response.data;
        }
    } catch (error) {
        console.error('Error editing worker:', error);
        throw new Error('Error al editar el empleado');
    }
};

const deleteworker = async (id) => {
    try {
        const { data, status } = await apiClient.delete(`/empleado/${id}`);
        return {
            data,
            status
        };
    } catch (error) {
        console.log('Error:', error.response.data);
    }
}

const updatedWorker = async (id, newData) => {
    try {
        const response = await apiClient.put(`/empleado/${id}`, newData);
        return response.data;
    } catch (error) {
        throw new Error(`Error al actualizar el empleado: ${error.message}`);
    }
};

export {
    createWorker, getWorkers, editworker, deleteworker, updatedWorker
}