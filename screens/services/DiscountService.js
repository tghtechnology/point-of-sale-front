import apiClient from "../apiss/AxiosConfig";

const createDiscount = async (newDiscount) => {
    try {
        const {data, status} = await apiClient.post(`/descuento`, newDiscount);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error);
    }
}

const getDiscounts = async () => {
    try {
        const response = await apiClient.get(`/descuento`);
        return response.data; // Devuelve los datos de los descuentos
    } catch (error) {
        console.log(error);
        return []; // En caso de error, devuelve un array vacío
    }
};

const updateDiscountStatus = async (id, newStatus) => {
    try {
        const response = await apiClient.put(`/descuento/${id}`, { estado: newStatus });
        console.log('Response from updateDiscountStatus:', response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el estado del descuento');
    }
}
export {
    createDiscount, getDiscounts,updateDiscountStatus
}