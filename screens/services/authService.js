import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Crea un token de autenticación usando las credenciales del usuario.
 *
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 *
 * @example
 * createToken('usuario@example.com', 'password123')
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */

const createToken = async (email,password)  => {
    try {
        const {data, status} = await apiClient.post(`/login`, email,password);
        console.log('Respuesta del backend:', data);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * Cierra la sesión del usuario.
 *
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 *
 * @example
 * logout()
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */

const logout = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const { data, status } = await apiClient.post(`/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            data,
            status
        };
    } catch (error) {
        console.log("Error al llamar a la API de cierre de sesión:", error);
    }
  }

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
 * Obtiene los datos de un usuario por su ID.
 *
 * @param {string} id - El ID del usuario.
 * @returns {Promise<Object>} - Los datos del usuario.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 *
 * @example
 * obtenerDatosUsuarioPorId('12345')
 *   .then(data => console.log('Datos del usuario:', data))
 *   .catch(error => console.error(error));
 */
  const obtenerDatosUsuarioPorId = async (id) => {
    try {
      const token = await getToken();
      const response = await apiClient.get(`/usuario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
      }
    });
    return response.data; // Devuelve los datos de los empleados
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    throw new Error('Error al obtener los empleados');
  }
};

/**
 * Edita los datos de un usuario por su ID.
 *
 * @param {string} id - El ID del usuario.
 * @param {Object} newData - Los nuevos datos del usuario.
 * @returns {Promise<Object>} - Los datos del usuario editado.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 *
 * @example
 * editarUsuarioPorId('12345', { nombre: 'Nuevo Nombre' })
 *   .then(data => console.log('Usuario editado:', data))
 *   .catch(error => console.error(error));
 */

const editarUsuarioPorId = async (id, newData) => {
    try {
      const token = await getToken();
      const response = await apiClient.put(`/editar/${id}`, newData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data; 
    } catch (error) {
      console.error('Error al editar usuario:', error);
      throw new Error('Error al editar usuario');
    }
};

/**
 * Cambia la contraseña del usuario.
 *
 * @param {string} contraseñaActual - La contraseña actual del usuario.
 * @param {string} nuevaContraseña - La nueva contraseña del usuario.
 * @param {string} verificarContraseña - La verificación de la nueva contraseña.
 * @returns {Promise<Object>} - Los datos de la respuesta.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 *
 * @example
 * cambiarContraseña('contraseñaActual', 'nuevaContraseña', 'verificarContraseña')
 *   .then(data => console.log('Contraseña cambiada:', data))
 *   .catch(error => console.error(error));
 */

const cambiarContraseña = async (contraseñaActual, nuevaContraseña, verificarContraseña) => {
  if (!contraseñaActual || !nuevaContraseña || !verificarContraseña) {
    throw new Error("Todos los campos son requeridos");
  }
  if (nuevaContraseña !== verificarContraseña) {
    throw new Error("La nueva contraseña y su confirmación deben coincidir");
  }
  const token = await AsyncStorage.getItem('token');
  const userId = await AsyncStorage.getItem("usuarioid");

  if (!token) {
    throw new Error("Error de autenticación: Token no encontrado.");
  }

  if (!userId) {
    throw new Error("Error de autenticación: ID del usuario no encontrado.");
  }
  const data = {
    contraseñaActual,
    nuevaContraseña,
    verificarContraseña, 
  };
  try {
    const response = await apiClient.put(
      `/usuario/${userId}/cambiarPass`, 
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json', 
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error.message);
    throw new Error("No se pudo cambiar la contraseña");
  }
};

  
export {
    createToken,
    logout,
    obtenerDatosUsuarioPorId,
    editarUsuarioPorId,
    cambiarContraseña
}