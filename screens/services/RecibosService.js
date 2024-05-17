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
const listRecibos = async () => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/recibo`, {
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
        throw new Error('Error al cargar recibos');
    }
}
const ReciboById=async (id)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/recibo/${id}`, {
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
        throw new Error('Error al cargar recibos');
    }
}

export {
    listRecibos,
    ReciboById,
}