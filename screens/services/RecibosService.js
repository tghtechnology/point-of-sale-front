import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Obtiene el token de autenticación del almacenamiento asíncrono.
 *
 * @returns {Promise<string>} - Una promesa que resuelve con el token de autenticación.
 * @throws {Error} - Error si el token no se encuentra.
 */
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
/**
 * Obtiene la lista de recibos.
 *
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al cargar los recibos.
 */
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
/**
 * Obtiene un recibo por su ID.
 *
 * @param {string} id - El ID del recibo a obtener.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al cargar el recibo.
 */
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
/**
 * Obtiene el detalle de un reembolso por su ID.
 *
 * @param {string} id - El ID del reembolso del cual se desea obtener el detalle.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al cargar el detalle del reembolso.
 */
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
/**
 * Realiza un reembolso.
 *
 * @param {string} id - El ID del reembolso a realizar.
 * @param {Array} detalles - Los detalles del reembolso.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al realizar el reembolso.
 */
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
