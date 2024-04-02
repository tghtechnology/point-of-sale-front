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
        throw new Error('Error al cargar Categorias'); 
    }
};


const editCategories = async(id,updateCategorias) => {
    try {
        const { data,status } = await apiClient.put(`/categoria/actualizar/${id}`, updateCategorias);
        return {
            data,
            status
        }; 
    } catch (error) {
      throw new Error('Error al editar categorias');
    }
  };


 const deleteCategory = async(id) => {
        try{
            const{data, status} = await apiClient.delete(`/categoria/eliminar/${id}`);
            return{
                data,
                status
            };
        }catch (error) {
            console.log('Error:',error.response.data);
        }
    }

    
export {
    createCategory, listCategories,editCategories,deleteCategory

}