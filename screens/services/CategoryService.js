import apiClient from "../apiss/AxiosConfig";

const createCategory = async (newCategory) => {
    try {
        const {data, status} = await apiClient.post(`/categoria/crear`, newCategory);
        
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error);
    }
}
const listCategories = async () => {
    try {
        const { data,status } = await apiClient.get(`/categoria/listar`); 
        return {
            data,
            status
        }; 
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar categorias'); 
    }
}
export {
    createCategory,
    listCategories
}