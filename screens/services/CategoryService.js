import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Obtiene el token de autenticación desde el almacenamiento local.
 *
 * @returns {Promise<string>} - El token de autenticación.
 * @throws {Error} - Si ocurre un error al obtener el token.
 *
 * @example
 * getToken()
 *   .then(token => console.log('Token obtenido:', token))
 *   .catch(error => console.error(error));
 */
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
        throw new Error('Error al obtener el token');
    }
};
/**
 * Crea una nueva categoría.
 *
 * @param {Object} newCategory - Los datos de la nueva categoría.
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error durante la creación de la categoría.
 *
 * @example
 * const categoryData = { name: 'Nueva Categoría' };
 * createCategory(categoryData)
 *   .then(response => console.log('Categoría creada:', response))
 *   .catch(error => console.error('Error:', error));
 */
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

/**
 * Obtiene la lista de categorías.
 *
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al cargar las categorías.
 *
 * @example
 * listCategories()
 *   .then(response => console.log('Categorías:', response))
 *   .catch(error => console.error('Error:', error));
 */
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
/**
 * Edita una categoría por su ID.
 *
 * @param {string} id - El ID de la categoría a editar.
 * @param {Object} updateCategorias - Los nuevos datos de la categoría.
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al editar la categoría.
 *
 * @example
 * const updatedData = { name: 'Categoría Actualizada' };
 * editCategories('123', updatedData)
 *   .then(response => console.log('Categoría editada:', response))
 *   .catch(error => console.error('Error:', error));
 */
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
/**
 * Elimina una categoría por su ID.
 *
 * @param {string} id - El ID de la categoría a eliminar.
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al eliminar la categoría.
 *
 * @example
 * deleteCategory('123')
 *   .then(response => console.log('Categoría eliminada:', response))
 *   .catch(error => console.error('Error:', error));
 */
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