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


const getCategories = async () => {
    try {
        const response = await apiClient.get('/categoria/listar');
        return response.data; // Devuelve los datos de los descuentos
    } catch (error) {
        console.log(error);
        return []; // En caso de error, devuelve un array vacío
    }
};


const editCategories = async ( updatedData) => {
    console.log('.')
    try {
        const response = await apiClient.put(`/categoria/actualizar/${text_id}`, updatedData);
        if (response.status === 200) {
       
        return response.data;
      }
    } catch (error) {
      throw new Error('Error al editar la categoria');
    }
  };

  const updateCategory = async ( newData) => {
    try {
        const response = await apiClient.put(`/categoria/actualizar/${text_id}`, newData);
        return response.data;
    } catch (error) {
        throw new Error(`Error al actualizar el categoria: ${error.message}`);
    }
    };
 const deleteCategory = async(text_id) => {
        try{
            const{data, status} = await apiClient.delete(`/categoria/eliminar/${text_id}`);
            return{
                data,
                status
            };
        }catch (error) {
            console.log('Error:',error.response.data);
        }
    }

    
export {
    createCategory, getCategories,editCategories,updateCategory,deleteCategory

}