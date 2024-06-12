import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Obtiene el token de autenticación de AsyncStorage.
 *
 * @returns {Promise<string|null>} - Una promesa que resuelve con el token de autenticación o null si no se encuentra.
 * @throws {Error} - Error al obtener el token.
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
 * Crea un nuevo empleado.
 *
 * @param {Object} newWorker - Los datos del nuevo empleado.
 * @param {number} propietarioId - El ID del propietario del empleado.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al crear el empleado.
 */
const createWorker = async (newWorker, propietarioId) => {
    try {
        const token = await getToken();
        const propietarioId = await AsyncStorage.getItem("usuarioid");
        const UserIdInt = parseInt(propietarioId,10);
        console.log(UserIdInt)
        const { data, status } = await apiClient.post(`/empleado`, {...newWorker, propietarioId: UserIdInt}, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return {
            data,
            status
        }
    } catch (error) {
        console.error('Error creating worker:', error);
        throw new Error('Error al crear el empleado');
    }
};
/**
 * Obtiene la lista de empleados.
 *
 * @returns {Promise<Object[]>} - Una promesa que resuelve con la lista de empleados.
 * @throws {Error} - Error al obtener la lista de empleados.
 */
const getWorkers = async () => {
    try {
      const token = await getToken();
      console.log('tu token es:',token)
      const response = await apiClient.get(`/empleado`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data; 
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
      throw new Error('Error al obtener los empleados');
    }
  };
/**
 * Edita un empleado existente.
 *
 * @param {number} id - El ID del empleado a editar.
 * @param {Object} updatedWorker - Los datos actualizados del empleado.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al editar el empleado.
 */
const editworker = async (id, updatedWorker) => {
    try {
        const token = await getToken();
        const { data,status } = await apiClient.put(`/empleado/${id}`,updatedWorker,{
          headers:{
                  Authorization: `Bearer ${token}` 
              }
          });
      return {
          data,
          status
      }; 
  } catch (error) {
    throw new Error('Error al editar el empleado');
  }
};
/**
 * Elimina un empleado.
 *
 * @param {number} id - El ID del empleado a eliminar.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al eliminar el empleado.
 */
const deleteworker = async (id) => {
    try {
        const token = await getToken();
        const {data, status} = await apiClient.delete(`/empleado/${id}`,{
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
/**
 * Actualiza un empleado.
 *
 * @param {number} id - El ID del empleado a actualizar.
 * @param {Object} newData - Los datos actualizados del empleado.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al actualizar el empleado.
 */

const updatedWorker = async (id, newData) => {
    try {
        const token = await getToken();
        const {data, status} = await apiClient.put(`/empleado/${id}`, newData, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      return{
        data,
        status
    };
    } catch (error) {
        throw new Error(`Error al actualizar el empleado: ${error.message}`);
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
  try {
      const token = await getToken();
      const { data, status } = await apiClient.get(`/cliente/${id}`, {
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
    createWorker, getWorkers, editworker, deleteworker, updatedWorker,getClientById
}