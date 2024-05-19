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
const createDiscount = async (newDiscount) => {
    try {
        const token = await getToken();
        const {data, status} = await apiClient.post(`/descuento`, newDiscount,{
            headers:{
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

const getDiscounts = async () => {
    try {
        const token = await getToken();
        const response = await apiClient.get(`/descuento`,{
            headers:{
                    Authorization: `Bearer ${token}` 
                }
            });
        return response.data; // Devuelve los datos de los descuentos
    } catch (error) {
        console.log(error);
        return []; // En caso de error, devuelve un array vacío
    }
};

const getDiscountById=async(id)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/descuento/${id}`, {
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

const getCeroDiscounts = async () => {
    try {
        const token = await getToken();
        const response = await apiClient.get('/descuentosEliminados',{
            headers:{
                    Authorization: `Bearer ${token}` 
                }
            });
        return response.data; // Devuelve los datos de los descuentos
    } catch (error) {
        console.log(error);
        return []; // En caso de error, devuelve un array vacío
    }
};

const updateDiscountStatus = async (id, newStatus) => {
    try {
        const token = await getToken();
        const response = await apiClient.put(`/descuento/${id}/cambiar-estado`, { estado: newStatus },{
            headers:{
                    Authorization: `Bearer ${token}` 
                }
            });
        console.log('Response from updateDiscountStatus:', response);
        if (response.status === 204) {
            // Si la respuesta es 204, devolver un objeto vacío para indicar éxito
            return { success: true };
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error toggling discount status:', error);
        throw new Error('Error al actualizar el estado del descuento');
    }
}

const editDiscount = async (id, updatedData) => {
    console.log(id)
    try {
      const token = await getToken();
      const response = await apiClient.put(`/descuento/${id}`, updatedData,{
        headers:{
                Authorization: `Bearer ${token}` 
            }
        });
      if (response.status === 200) {
        // Si la respuesta es 200, devuelve los datos actualizados del descuento
        return response.data;
      }
    } catch (error) {
      console.error('Error editing discount:', error);
      throw new Error('Error al editar el descuento');
    }
  };

  const updateDiscount = async (id, newData) => {
    try {
        const token = await getToken();
        const response = await apiClient.put(`/descuento/${id}`, newData,{
            headers:{
                    Authorization: `Bearer ${token}` 
                }
            });
        return response.data;
    } catch (error) {
        throw new Error(`Error al actualizar el descuento: ${error.message}`);
    }
    };

export {
    createDiscount, getDiscounts,getCeroDiscounts,updateDiscountStatus, editDiscount,updateDiscount,getDiscountById
}