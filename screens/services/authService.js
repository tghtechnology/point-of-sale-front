import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const createToken = async (email, password) => {
    try {
        const { data, status } = await apiClient.post(`/login`, email, password);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error)
    }
}

const logout = async () => {
    try {
        const { data, status } = await apiClient.post(`/logout`, {
            headers: {
                Authorization: `Bearer ${AsyncStorage.getItem('token')}`
            }
        });
        return {
            data,
            status
        };
    } catch (error) {
        console.log("Error al llamar a la API de cierre de sesión:", error);
    }
}

export {
    createToken,
    logout
}
