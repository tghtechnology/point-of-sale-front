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
const DetalleReembolsoByReciboId=async (reciboId)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/reembolso/recibo/${reciboId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        console.log('Data:',data);
        return {
            data,
            status
        };
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar articulos');
    }
}

export {
    getToken,
    DetalleReembolsoByReciboId
}