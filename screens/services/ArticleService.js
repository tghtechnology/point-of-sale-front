import apiClient from "../apiss/AxiosConfig";

const createArticle = async (newArticle) => {
     try {
        const {data, status} = await apiClient.post(`/articulo/crear`, newArticle);
        
        return {
            data,
            status
         }
     } catch (error) {
         console.log(error);
     }
 }

 const listCategory = async () => {
    try {
        const { data } = await apiClient.get(`/categoria/listar`); 
        return data; 
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar categorias'); 
    }
}

 export {
     createArticle,
     listCategory
 }