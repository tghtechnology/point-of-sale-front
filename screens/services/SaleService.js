import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Obtiene el token de autenticación del almacenamiento asíncrono.
 *
 * @returns {Promise<string>} - Una promesa que resuelve con el token de autenticación.
 * @throws {Error} - Error al obtener el token.
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
 * Crea una nueva venta.
 *
 * @param {Object} newSal - Los datos de la nueva venta.
 * @param {number} usuarioId - El ID del usuario asociado a la venta.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al crear la venta.
 */
const createSale = async (newSal, usuarioId) => {
    try {
        const token = await getToken();
        const usuarioId = await AsyncStorage.getItem("usuarioid");
        const userIdInt = parseInt(usuarioId, 10); 
        console.log(userIdInt)
        const { data, status } = await apiClient.post(`/venta`, {...newSal, usuarioId: userIdInt}, {
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
};
/**
 * Obtiene la lista de ventas.
 *
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al obtener la lista de ventas.
 */
const listSales =async()=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/venta`, {
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
};
/**
 * Obtiene una venta por su ID.
 *
 * @param {number} id - El ID de la venta a obtener.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 * @throws {Error} - Error al obtener la venta.
 */
const SaleById=async(id)=>{
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/venta/${id}`, {
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
};



export {
    createSale,
    listSales,
    SaleById,
}