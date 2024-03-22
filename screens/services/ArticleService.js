import apiClient from "../apiss/AxiosConfig";

const createArticle = async (newArticle) => {
     try {
        const {data, status} = await apiClient.post(`/articulo/crear`, newArticle);
        return {
            data,
            status
         }
     } catch (error) {
        console.error("Error creating article:", error);
        return { status: 500, error: error.message };
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

const updateArticles = async(text_id,updateArticle) => {
    try{
        const{data, status} = await apiClient.put(`/articulo/actualizar/${text_id}`,updateArticle);
        return{
            data,
            status
        };
    }catch (error) {
        console.log('Error:',error.response.data);
    }
}

const deleteArticles = async(text_id) => {
    try{
        const{data, status} = await apiClient.delete(`/articulo/eliminar/${text_id}`);
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
     updateArticles,
     deleteArticles
 }