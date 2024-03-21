import apiClient from "../apiss/AxiosConfig";

const createArticle = async (newArticle) => {
     try {
        const {data, status} = await apiClient.post(`/articulo/crear`, newArticle);
        return {
            data,
            status
         }
     } catch (error) {
         console.log('Error:',error.response.data);
     }
 }

 const listArticles = async () => {
    try {
        const { data,status } = await apiClient.get(`/articulo/listar`); 
        return {
            data,
            status
        }; 
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar articulos'); 
    }
}



const updateArticles = async(id,updateArticle) => {
    try{
        const{data, status} = await apiClient.put(`/articulo/actualizar/${id}`,updateArticle);
        return{
            data,
            status
        };
    }catch (error) {
        console.log('Error:',error.response.data);
    }
}

 export {
     createArticle,
     listArticles,
     updateArticles
 }