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

const editArticles = async(updateArticle) => {
    console.log(editArticles)
    try {
        const response = await apiClient.put(`/categoria/actualizar/${text_id}`, updateArticle);
        if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error('Error al editar el articulo');
    }
  };

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
     editArticles,
     deleteArticles
 }