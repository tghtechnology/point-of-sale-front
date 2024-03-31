import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const createToken = async (email,password)  => {
    try {
        const {data, status} = await apiClient.post(`/login`, email,password);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error)
    }
}
const eliminarTemporal = async (id, password, token) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("ID:", id, "Password:", password, "Token:", token); 
      const { data, status } = await apiClient.post(`/eliminar-temporal/`, { password, token });
      console.log("Respuesta de la API:", data, status);
      return {
        data,
        status
      };
    } catch (error) {
      console.log("Error al llamar a la API de eliminar temporal:", error);
    }
  }
  
export {
    createToken,
    eliminarTemporal,
}