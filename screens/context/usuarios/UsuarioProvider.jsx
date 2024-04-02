import React,{useState,useEffect} from "react";
import {createUser,eliminarTemporal,eliminarPermanente } from "../../services/UserService"
import UsuarioContext from "./UsuarioContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsuarioProvider = ({children}) => {
  const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const handleCreateUser = async (newUser) => {
        const { status } = await createUser(newUser);
        if(status === 200 || status === 201){
          return true;
        }else {
          return false;
        }
    }

    const initializeUserAndToken = async () => {
      const storedUserId = await AsyncStorage.getItem("usuarioid");
      const storedToken = await AsyncStorage.getItem("token");
      setUserId(storedUserId);
      setToken(storedToken);
   };
  
  useEffect(() => {
      initializeUserAndToken();
   }, []);
  
    const handleDeleteTemporary = async(password) => {
      try {
          console.log("Token almacenado:", token);
          console.log("ID de usuario almacenado:", userId);
          console.log("Contraseña proporcionada:", password);

          if (!token || !userId) {
              console.error("No se encontró el token o el ID de usuario en AsyncStorage");
              return false;
          }

          const { status } = await eliminarTemporal(password);
          console.log("Estado de la respuesta:", status);
          return status === 200;
      } catch (error) {
          console.error("Error al eliminar cuenta temporal:", error);
          return false;
      }
  };
      const handleDeletePermanent = async(password) => {
    try {
        console.log("Token almacenado:", token);
        console.log("ID de usuario almacenado:", userId);
        console.log("Contraseña proporcionada:", password);

        if (!token || !userId) {
            console.error("No se encontró el token o el ID de usuario en AsyncStorage");
            return false;
        }

        const { status } = await eliminarPermanente (password);
        console.log("Estado de la respuesta:", status);
        return status === 200;
    } catch (error) {
        console.error("Error al eliminar cuenta temporal:", error);
        return false;
    }
  };

    


  return (
    <UsuarioContext.Provider value={{
      userId,
      token,
      handleCreateUser,
      handleDeleteTemporary,
      handleDeletePermanent,

    }}> 
      {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioProvider
