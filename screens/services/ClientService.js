import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Obtiene el token de autenticación de AsyncStorage.
 *
 * @returns {Promise<string|null>} - Una promesa que resuelve con el token de autenticación o null si no se encuentra.
 */
  
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log('Token recuperado correctamente:', token);
        return token;
      } else {
        console.log('No se encontró ningún token en AsyncStorage');
        return null;
      }
    } catch (error) {
      console.error('Error al recuperar el token:', error);
      return null;
    }
  };

  /**
 * Crea un nuevo cliente.
 *
 * @param {Object} newClient - Los datos del nuevo cliente.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al crear el cliente.
 */
  
const createClient = async (newClient) => {
    try {
        const token = await getToken();
        const {data, status} = await apiClient.post(`/cliente`, newClient, {
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
 * Obtiene la lista de clientes.
 *
 * @returns {Promise<Object[]>} - Una promesa que resuelve con la lista de clientes.
 * @throws {Error} - Error al obtener la lista de clientes.
 */
const getClients = async () => {
    try {
        const token = await getToken();
        const response = await apiClient.get(`/cliente`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data
    } catch (error) {
        console.log(error);
        return []; 
    }
}; 
/**
 * Edita un cliente existente.
 *
 * @param {number} id - El ID del cliente a editar.
 * @param {Object} updatedData - Los datos actualizados del cliente.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al editar el cliente.
 */
const editClient = async (id, updatedData) => {
    try {
        const token = await getToken();
        const {data,status} = await apiClient.put(`/cliente/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return {
            data,
            status
        }
    } catch (error) {
      console.error('Error editing discount:', error);
      throw new Error('Error al editar el descuento');
    }
  };
/**
 * Elimina un cliente.
 *
 * @param {number} id - El ID del cliente a eliminar.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al eliminar el cliente.
 */
const deleteClient = async(id) => {
    try{
        const token = await getToken();
        const{data, status} = await apiClient.delete(`/cliente/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            data,
            status
        }
    }catch (error) {
        console.log('Error:',error.response.data);
    }
}
/**
 * Actualiza un cliente.
 *
 * @param {number} id - El ID del cliente a actualizar.
 * @param {Object} newData - Los datos actualizados del cliente.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al actualizar el cliente.
 */

const updateClient = async (id, newData) => {
    try {
        const token = await getToken();
        const {data,status} = await apiClient.put(`/cliente/${id}`, newData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return {
            data,
            status
        }
    } catch (error) {
        throw new Error(`Error al actualizar el cliente: ${error.message}`);
    }
    };
    /**
 * Obtiene un cliente por su ID.
 *
 * @param {number} id - El ID del cliente a obtener.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al obtener el cliente.
 */
const getClientById=async(id)=>{
    try{
        const token = await getToken();
        const{data, status} = await apiClient.get(`/cliente/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return {
            data,
            status
        }
    }catch (error) {
        console.log('Error:',error.response.data);
    }
}

export {
    createClient, getClients, editClient, deleteClient, updateClient, getClientById
}