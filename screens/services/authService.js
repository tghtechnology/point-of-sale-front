import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';



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

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
      console.log('Token guardado correctamente:', token);
    } catch (error) {
      console.error('Error al guardar el token:', error);
    }
  };
  
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

const editarUsuarioPorId = async (id, newData) => {
    try {
      const token = await getToken();
      const response = await apiClient.put(`/editar/${id}`, newData, {
        headers: {
          Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
        }
      });
      return response.data; // Devuelve los datos del usuario editado
    } catch (error) {
      console.error('Error al editar usuario:', error);
      throw new Error('Error al editar usuario');
    }
  };
  
export {
    createToken,
    logout,
    obtenerDatosUsuarioPorId,
    editarUsuarioPorId
}