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