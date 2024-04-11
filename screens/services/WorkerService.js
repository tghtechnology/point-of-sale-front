import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error al guardar el token:', error);
      throw new Error('Error al guardar el token en AsyncStorage');
    }
  };

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token === null) {
      throw new Error('Token no encontrado en AsyncStorage');
    }
    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error);
    throw new Error('Error al obtener el token desde AsyncStorage');
  }
};

const createWorker = async (newWorker) => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.post(`/empleado`, newWorker, {
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
        const response = await apiClient.put(`/empleado/${id}`, updatedWorker, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        if (response.status === 200) {
            // Si la respuesta es 200, devuelve los datos actualizados del descuento
            return response.data;
        }
    } catch (error) {
        console.error('Error editing worker:', error);
        throw new Error('Error al editar el empleado');
    }
};

const deleteworker = async (id) => {
    try {
        const { data, status } = await apiClient.delete(`/empleado/${id}`);
        return {
            data,
            status
        };
    } catch (error) {
        console.log('Error:', error.response.data);
    }
}

const updatedWorker = async (id, newData) => {
    try {
        const response = await apiClient.put(`/empleado/${id}`, newData);
        return response.data;
    } catch (error) {
        throw new Error(`Error al actualizar el empleado: ${error.message}`);
    }
};

export {
    createWorker, getWorkers, editworker, deleteworker, updatedWorker
}