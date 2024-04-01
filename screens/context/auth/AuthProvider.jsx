import React,{useState,useEffect} from "react";
import AuthContext from "./AuthContext";
import { createToken, eliminarTemporal,eliminarPermanente } from "../../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    const loginAccess = async (email, password) => {
      const { status, data } = await createToken(email, password);
      if (status === 200) {
        const usuario_id = data.usuario_id;
        const token = data.token
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("usuarioid", usuario_id);
        const storedToken = AsyncStorage.getItem("token");
        console.log("Token: ", storedToken);
        const stored = AsyncStorage.getItem("usuarioid");
        console.log("Usuario_d: ", stored);
        setIsAuth(true);
  
        alert("Autenticación exitosa");
        return true;
      } else {
        setIsAuth(false);
        alert("Datos incorrectos, intente de nuevo");
        return false;
      }
    };
  
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
    <AuthContext.Provider value={{
        isAuth,
        userId,
        token,
        loginAccess,
        handleDeleteTemporary,
        handleDeletePermanent,
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
