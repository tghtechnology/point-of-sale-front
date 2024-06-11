import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Obtiene el token almacenado en AsyncStorage.
 *
 * @returns {Promise<string|null>} - Una promesa que resuelve con el token si existe, o null si no se encuentra.
 * @throws {Error} - Si ocurre un error al obtener el token.
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
 * Crea un nuevo descuento.
 *
 * @param {Object} newDiscount - Los datos del nuevo descuento.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al crear el descuento.
 */
const createDiscount = async (newDiscount) => {
    try {
        const token = await getToken();
        const {data, status} = await apiClient.post(`/descuento`, newDiscount,{
            headers:{
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
 * Obtiene todos los descuentos.
 *
 * @returns {Promise<Object[]>} - Una promesa que resuelve con un array de datos de los descuentos.
 * @throws {Error} - Si ocurre un error al obtener los descuentos.
 */
const getDiscounts = async () => {
    try {
        const token = await getToken();
        const response = await apiClient.get(`/descuento`,{
            headers:{
                    Authorization: `Bearer ${token}` 
                }
            });
        return response.data; 
    } catch (error) {
        console.log(error);
        return []; 
    }
};
/**
 * Obtiene un descuento por su ID.
 *
 * @param {string} id - El ID del descuento.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al obtener el descuento.
 */
const getDiscountById=async(id)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/descuento/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            data,
            status,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
/**
 * Obtiene todos los descuentos eliminados.
 *
 * @returns {Promise<Object[]>} - Una promesa que resuelve con un array de datos de los descuentos eliminados.
 * @throws {Error} - Si ocurre un error al obtener los descuentos eliminados.
 */
const getCeroDiscounts = async () => {
    try {
        const token = await getToken();
        const response = await apiClient.get('/descuentosEliminados',{
            headers:{
                    Authorization: `Bearer ${token}` 
                }
            });
        return response.data; 
    } catch (error) {
        console.log(error);
        return []; 
    }
};

/**
 * Actualiza el estado de un descuento.
 *
 * @param {string} id - El ID del descuento.
 * @param {boolean} newStatus - El nuevo estado del descuento.
 * @returns {Promise<Object>} - Una promesa que resuelve con un objeto que indica éxito o los datos de la respuesta.
 * @throws {Error} - Si ocurre un error al actualizar el estado del descuento.
 */
const updateDiscountStatus = async (id, newStatus) => {
    try {
        const token = await getToken();
        const response = await apiClient.put(`/descuento/${id}/cambiar-estado`, { estado: newStatus },{
            headers:{
                    Authorization: `Bearer ${token}` 
                }
            });
        console.log('Response from updateDiscountStatus:', response);
        if (response.status === 204) {
            return { success: true };
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error toggling discount status:', error);
        throw new Error('Error al actualizar el estado del descuento');
    }
}
/**
 * Edita un descuento.
 *
 * @param {string} id - El ID del descuento.
 * @param {Object} updatedData - Los datos actualizados del descuento.
 * @returns {Promise<Object>} - Una promesa que resuelve con los datos actualizados del descuento.
 * @throws {Error} - Si ocurre un error al editar el descuento.
 */

const editDiscount = async (id, updatedData) => {
    console.log(id)
    try {
      const token = await getToken();
      const response = await apiClient.put(`/descuento/${id}`, updatedData,{
        headers:{
                Authorization: `Bearer ${token}` 
            }
        });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error editing discount:', error);
      throw new Error('Error al editar el descuento');
    }
  };
  /**
 * Actualiza un descuento.
 *
 * @param {string} id - El ID del descuento.
 * @param {Object} newData - Los nuevos datos del descuento.
 * @returns {Promise<Object>} - Una promesa que resuelve con los datos actualizados del descuento.
 * @throws {Error} - Si ocurre un error al actualizar el descuento.
 */
  const updateDiscount = async (id, newData) => {
    try {
        const token = await getToken();
        const response = await apiClient.put(`/descuento/${id}`, newData,{
            headers:{
                    Authorization: `Bearer ${token}` 
                }
            });
        return response.data;
    } catch (error) {
        throw new Error(`Error al actualizar el descuento: ${error.message}`);
    }
    };

export {
    createDiscount, getDiscounts,getCeroDiscounts,updateDiscountStatus, editDiscount,updateDiscount,getDiscountById
}