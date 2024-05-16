import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const listDetalle = async () => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/detalle`, {
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
        throw new Error('Error al cargar articulos');
    }
}


export {
    listDetalle,
}