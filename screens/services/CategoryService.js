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
        console.log(error);
    }
}


const listCategories = async () => {
    try {
        const token = await getToken();
        const { data,status } = await apiClient.get(`/categoria/listar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); 
        return {
            data,
            status
        }; 
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar Categorias'); 
    }
};


const editCategories = async(id, updateCategorias) => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.put(`/categoria/actualizar/${id}`, updateCategorias, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return {
            data,
            status
        }; 
    } catch (error) {
      console.error('Error original:', error);
      throw new Error(`Error al editar categorias: ${error}`);
    }
};


 const deleteCategory = async(id) => {
        try{
            const token = await getToken();
            const{data, status} = await apiClient.delete(`/categoria/eliminar/${id}`,{
                headers:{
                        Authorization: `Bearer ${token}` 
                    }
                });
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