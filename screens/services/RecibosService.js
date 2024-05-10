import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const listRecibos = async () => {
    try {
        
        const { data, status } = await apiClient.get(`/recibo`);
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
}