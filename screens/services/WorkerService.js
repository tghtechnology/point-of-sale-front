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

const createWorker = async (newWorker, propietarioId) => {
    try {
        const token = await getToken();
        const propietarioId = await AsyncStorage.getItem("usuarioid");
        const UserIdInt = parseInt(propietarioId,10);
        console.log(UserIdInt)
        const { data, status } = await apiClient.post(`/empleado`, {...newWorker, propietarioId: UserIdInt}, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
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

const getWorkers = async () => {
    try {
      const token = await getToken();
      console.log('tu token es:',token)
      const response = await apiClient.get(`/empleado`, {
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
