import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Obtiene el token de autenticación del almacenamiento asíncrono.
 *
 * @returns {Promise<string|null>} - Una promesa que resuelve con el token de autenticación o null si no se encuentra.
 * @throws {Error} - Error al obtener el token.
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
 * Crea un nuevo impuesto.
 *
 * @param {Object} newImp - Los datos del nuevo impuesto.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al crear el impuesto.
 */
const createImpuesto = async (newImp) => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.post(`/impuesto/crear`, newImp, {
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
};
/**
 * Obtiene la lista de impuestos.
 *
 * @returns {Promise<{data: Array, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al cargar los impuestos.
 */
const listImpuestos = async () => {
    try {
        const token = await getToken();
        console.log('Tokem:',token)
        const { data,status } = await apiClient.get(`/impuesto/listar`, {
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
        throw new Error('Error al cargar Impuestos'); 
    }
};
/**
 * Edita un impuesto existente.
 *
 * @param {string} id - El ID del impuesto a editar.
 * @param {Object} updateImpuestos - Los datos actualizados del impuesto.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al editar el impuesto.
 */
const editImpuestos = async(id,updateImpuestos) => {
    try {
        const token = await getToken();
        const { data,status } = await apiClient.put(`/impuesto/actualizar/${id}`, updateImpuestos, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            data,
            status
        }; 
    } catch (error) {
      throw new Error('Error al editar impuestos');
    }
  };
/**
 * Elimina un impuesto existente.
 *
 * @param {string} id - El ID del impuesto a eliminar.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 */
  const deleteImpuesto = async(id) => {
    try{
        const token = await getToken();
        const{data, status} = await apiClient.delete(`/impuesto/eliminar/${id}`, {
            headers: {
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
};
/**
 * Obtiene un impuesto por su ID.
 *
 * @param {string} id - El ID del impuesto a obtener.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al obtener el impuesto.
 */
const getTaxById=async(id)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/impuesto/listar/${id}`, {
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
export {
    createImpuesto,
    listImpuestos,
    editImpuestos,
    deleteImpuesto,
    getTaxById
  
}