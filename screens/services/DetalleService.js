import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const listDetalle = async () => {
    try {
      
        const { data, status } = await apiClient.get(`/detalle`);
        return {
            data,
            status
        };
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar detalle');
    }
}


export {
    listDetalle,
}