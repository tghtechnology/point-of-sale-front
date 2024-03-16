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



 export {
     createArticle,
    
 }