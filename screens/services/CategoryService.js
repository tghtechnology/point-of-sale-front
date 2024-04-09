import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
        throw new Error('Error al obtener el token');
    }
};

const createCategory = async (newCategory) => {
    try {
        const token = await getToken();
        console.log("Token de autenticación:", token); 
        const {data, status} = await apiClient.post(`/categoria/crear`, newCategory, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return {
            data,
            status
        }
    } catch (error) {
        console.error("Error al crear categoría:", error);
        throw new Error('Error al crear la categoría');
    }
};


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