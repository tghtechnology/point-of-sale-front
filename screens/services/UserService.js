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
 * Crea un nuevo usuario.
 *
 * @param {Object} newUser - Los datos del nuevo usuario.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al crear el usuario.
 */
const createUser = async (newUser) => {
    try {
        const token = await getToken();
        const {data, status} = await apiClient.post(`/registro`, newUser,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return {
            data,
            status
        }
    } catch (error) {
      throw new Error('Error al crear el empleado');
    }
}
/**
 * Obtiene la lista de usuarios.
 *
 * @returns {Promise<Object[]>} - Una promesa que resuelve con la lista de usuarios.
 * @throws {Error} - Error al obtener la lista de usuarios.
 */
const getUsers = async () => {
  try{
    const token = await getToken();
    const response = await apiClient.get(`/usuario`, {
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
 * Edita un usuario existente.
 *
 * @param {number} id - El ID del usuario a editar.
 * @param {Object} updatedWorker - Los datos actualizados del usuario.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al editar el usuario.
 */

const editUser = async (id, updatedWorker) => {
  try {
      const token = await getToken();
      const { data,status } = await apiClient.put(`/editar/${id}`,updatedWorker,{
        headers:{
                Authorization: `Bearer ${token}` 
            }
        });
    return {
        data,
        status
    }; 
} catch (error) {
  throw new Error('Error al editar el usuario');
}
};
/**
 * Elimina temporalmente un usuario.
 *
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al eliminar temporalmente el usuario.
 */
const eliminarTemporal = async (password) => {
    try {
      const usuario_id = await AsyncStorage.getItem("usuarioid");
      const token = await AsyncStorage.getItem("token");
      const userIdInt = parseInt(usuario_id, 10); 
      const { data, status } = await apiClient.post(`/eliminar-temporal`, {usuario_id: userIdInt, password, token },{
        headers:{
                Authorization: `Bearer ${token}` 
            }
        });
      return {
        data,
        status
      };
    } catch (error) {
      console.log( error);
    }
  }
  /**
 * Elimina permanentemente un usuario.
 *
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al eliminar permanentemente el usuario.
 */
  const eliminarPermanente = async (password) => {
    try {
      const usuario_id = await AsyncStorage.getItem("usuarioid");
      const token = await AsyncStorage.getItem("token");
      const userIdInt = parseInt(usuario_id, 10); 
      const { data, status } = await apiClient.post(`/eliminar-permanente`, {usuario_id: userIdInt, password, token },{
        headers:{
                Authorization: `Bearer ${token}` 
            }
        });
      return {
        data,
        status
      };
    } catch (error) {
      console.log( error);
    }
  }
/**
 * Obtiene un usuario por su ID.
 *
 * @param {number} id - El ID del usuario a obtener.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al obtener el usuario.
 */
  const getUserById=async (id)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/usuario/${id}`, {
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
    createUser,
    getUsers, 
    editUser,
    eliminarTemporal,
    eliminarPermanente,
    getUserById,
}