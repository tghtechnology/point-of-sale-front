import apiClient from "../apiss/AxiosConfig";

const createSale = async (newSal) => {
    try {
        const { data, status } = await apiClient.post(`/venta`, newSal);
        return {
            data,
            status,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export {
    createSale,
}
