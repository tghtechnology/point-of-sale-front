import apiClient from "../apiss/AxiosConfig";

const createCategory = async (newCategory) => {
    try {
        const {data, status} = await apiClient.post(`/crearCategoria`, newCategory);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error);
    }
}

export {
    createCategory
}