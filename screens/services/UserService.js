import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const getUsers = async () => {
  try{
    const token = await getToken();
    const response = await apiClient.get(`/listar`, {
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