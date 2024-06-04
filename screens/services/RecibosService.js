import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
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
        return { data, status };
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar recibos');
    }
};

const ReciboById = async (id) => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/recibo/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return { data, status };
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar recibos');
    }
};

const DetalleByRembolsoId = async (id) => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/reembolso/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return { data, status };
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar detalle rembolso');
    }
};

const Reembolsar = async (id, detalles) => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.post(
            '/reembolsar',
            { id, detalles },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return { data, status };
    } catch (error) {
        console.error("Error al realizar el reembolso:", error);
        throw new Error('Error al procesar la solicitud de reembolso');
    }
};


export {
    listRecibos,
    ReciboById,
    DetalleByRembolsoId,
    Reembolsar
};
