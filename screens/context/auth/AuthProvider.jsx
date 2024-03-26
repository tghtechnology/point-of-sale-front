import React,{useState} from "react";
import AuthContext from "./AuthContext"
import { createToken, verifyUser } from "../../services/authService";
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

    const handleVerifyPassword = async (usuario_id, password) => {
      try {
          const storedToken = await AsyncStorage.getItem("token");
          console.log("Token: ", storedToken);
          if (!storedToken || !usuario_id) {
              return false;
          }
          console.log("Id:", usuario_id, "Contraseña:", password);
          const status = await verifyUser(usuario_id, password);
          if (status === 200) {
              return true;
          } else {
              return false;
          }
      } catch (error) {
          console.error("Error al verificar la contraseña", error);
          return false;
      }
  };
  

  return (
    <AuthContext.Provider value={{
        isAuth,
        loginAccess,
        handleVerifyPassword,
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
