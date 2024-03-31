import React,{useState} from "react";
import AuthContext from "./AuthContext"
import { createToken, eliminarTemporal } from "../../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);

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
  

    const handleDeleteTemporary = async (id, password, token) => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUserId = await AsyncStorage.getItem("usuario_id");
        console.log("Token almacenado:", storedToken, "ID de usuario almacenado:", storedUserId); // Imprime los valores almacenados
    
        if (!storedToken || !storedUserId) {
          return false;
        }
    
        const { status } = await eliminarTemporal(storedUserId, password, storedToken);
        console.log("Estado de la respuesta:", status); // Imprime el estado de la respuesta
        return status === 200;
      } catch (error) {
        console.error("Error al verificar la contraseña", error);
        return false;
      }
    }

  return (
    <AuthContext.Provider value={{
        isAuth,
        loginAccess,
        handleDeleteTemporary,
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
