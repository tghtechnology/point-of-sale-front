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
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
        throw new Error('Error al obtener el token');
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



const cambiarContraseña = async (contraseñaActual, nuevaContraseña, verificarContraseña) => {
  // Verificaciones iniciales
  if (!contraseñaActual || !nuevaContraseña || !verificarContraseña) {
    throw new Error("Todos los campos son requeridos");
  }

  if (nuevaContraseña !== verificarContraseña) {
    throw new Error("La nueva contraseña y su confirmación deben coincidir");
  }

  // Obtener el token y el ID del usuario
  const token = await AsyncStorage.getItem('token');
  const userId = await AsyncStorage.getItem("usuarioid");

  if (!token) {
    throw new Error("Error de autenticación: Token no encontrado.");
  }

  if (!userId) {
    throw new Error("Error de autenticación: ID del usuario no encontrado.");
  }

  // Datos para la solicitud
  const data = {
    contraseñaActual, // Campo actual
    nuevaContraseña, // Nueva contraseña
    verificarContraseña, // Verificación de la nueva contraseña
  };

  // Enviar la solicitud al servidor
  try {
    const response = await apiClient.put(
      `/usuario/${userId}/cambiarPass`, 
      data, // Datos enviados
      {
        headers: {
          Authorization: `Bearer ${token}`, // Encabezado de autorización
          'Content-Type': 'application/json', // Asegúrate de que sea JSON
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