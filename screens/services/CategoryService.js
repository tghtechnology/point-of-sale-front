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
        // Si la respuesta es 200, devuelve los datos actualizados del descuento
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

    
export {
    createCategory,getCategories,editCategories,updateCategory
}