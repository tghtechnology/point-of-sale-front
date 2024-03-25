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

const getCategories = async () => {
    try {
        const response = await apiClient.get('/categoria/listar');
        return response.data; 
    } catch (error) {
        console.log(error);
        return []; 
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

    
export {
    createCategory,listCategories, getCategories,editCategories,updateCategory

}