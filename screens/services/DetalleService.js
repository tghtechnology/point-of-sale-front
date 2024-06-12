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
 * Lista todos los detalles disponibles.
 *
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al cargar los detalles.
 *
 * @example
 * listDetalle()
 *   .then(response => console.log('Detalles:', response.data))
 *   .catch(error => console.error('Error:', error));
 */
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
        throw new Error('Error al cargar detalle');
    }
}
/**
 * Obtiene el detalle basado en el ID de la venta.
 *
 * @param {string} ventaId - El ID de la venta para la cual se desea obtener el detalle.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al cargar el detalle.
 *
 * @example
 * DetalleByVentaId('12345')
 *   .then(response => console.log('Detalle de venta:', response.data))
 *   .catch(error => console.error('Error:', error));
 */
const DetalleByVentaId=async(ventaId)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/detalle/venta/${ventaId}`, {
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
/**
 * Obtiene el detalle basado en el ID del detalle.
 *
 * @param {string} id - El ID del detalle que se desea obtener.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al cargar el detalle.
 *
 * @example
 * getDetalleById('12345')
 *   .then(response => console.log('Detalle:', response.data))
 *   .catch(error => console.error('Error:', error));
 */
const getDetalleById=async(id)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/detalle/${id}`, {
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
    DetalleByVentaId,
    getDetalleById
}