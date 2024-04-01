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
const eliminarTemporal = async (password) => {
    try {
      const usuario_id = await AsyncStorage.getItem("usuarioid");
      const token = await AsyncStorage.getItem("token");
      const userIdInt = parseInt(usuario_id, 10); // o Number(usuario_id)
      const { data, status } = await apiClient.post(`/eliminar-temporal`, {usuario_id: userIdInt, password, token });
      return {
        data,
        status
      };
    } catch (error) {
      console.log( error);
    }
  }
  
  const eliminarPermanente = async (password) => {
    try {
      const usuario_id = await AsyncStorage.getItem("usuarioid");
      const token = await AsyncStorage.getItem("token");
      const userIdInt = parseInt(usuario_id, 10); // o Number(usuario_id)
      const { data, status } = await apiClient.post(`/eliminar-permanente`, {usuario_id: userIdInt, password, token });
      return {
        data,
        status
      };
    } catch (error) {
      console.log( error);
    }
  }
export {
    createToken,
    eliminarTemporal,
    eliminarPermanente
}