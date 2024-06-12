import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Obtiene el token almacenado en AsyncStorage.
 *
 * @returns {Promise<string|null>} - Una promesa que resuelve con el token si existe, o null si no se encuentra.
 * @throws {Error} - Si ocurre un error al obtener el token.
 *
 * @example
 * getToken()
 *   .then(token => console.log('Token:', token))
 *   .catch(error => console.error('Error:', error));
 */
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
        throw new Error('Error al obtener el token');
    }
};
/**
 * Obtiene el detalle del reembolso basado en el ID del recibo.
 *
 * @param {string} reciboId - El ID del recibo para el cual se desea obtener el detalle del reembolso.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al cargar el detalle del reembolso.
 *
 * @example
 * DetalleReembolsoByReciboId('12345')
 *   .then(response => console.log('Detalle del reembolso:', response.data))
 *   .catch(error => console.error('Error:', error));
 */
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