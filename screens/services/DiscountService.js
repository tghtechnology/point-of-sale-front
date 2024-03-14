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

export {
    createDiscount
}