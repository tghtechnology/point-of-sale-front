import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
        throw new Error('Error al obtener el token');
    }
};

const createImpuesto = async (newImp) => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.post(`/impuesto/crear`, newImp, {
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
};

const listImpuestos = async () => {
    try {
        const token = await getToken();
        console.log('Tokem:',token)
        const { data,status } = await apiClient.get(`/impuesto/listar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); 
        return {
            data,
            status
        }; 
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar Impuestos'); 
    }
};

const editImpuestos = async(id,updateImpuestos) => {
    try {
        const token = await getToken();
        const { data,status } = await apiClient.put(`/impuesto/actualizar/${id}`, updateImpuestos, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            data,
            status
        }; 
    } catch (error) {
      throw new Error('Error al editar impuestos');
    }
  };

  const deleteImpuesto = async(id) => {
    try{
        const token = await getToken();
        const{data, status} = await apiClient.delete(`/impuesto/eliminar/${id}`, {
            headers: {
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
};
const getTaxById=async(id)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/impuesto/listar/${id}`, {
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
    createImpuesto,
    listImpuestos,
    editImpuestos,
    deleteImpuesto,
    getTaxById
  
}