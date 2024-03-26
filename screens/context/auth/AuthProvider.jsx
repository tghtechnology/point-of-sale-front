import React,{useState} from "react";
import AuthContext from "./AuthContext"
import { createToken } from "../../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage"
const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);

    const loginAccess = async (email,password) => {
        const { status, data } = await createToken(email,password);
        if (status === 200) {
          const usuario_id=data.usuario_id;
          const token=data.token
          AsyncStorage.setItem("token",token);
          AsyncStorage.setItem("usuarioid",usuario_id);
          const storedToken=AsyncStorage.getItem("token");
          console.log("Token: ",storedToken);
          const stored=AsyncStorage.getItem("usuario_id");
          console.log("Usuario_d: ",stored);
          setIsAuth(true);
  
          alert("Autenticación exitosa");
          return true;
        } else {
          setIsAuth(false);
          alert("Datos incorrectos, intente de nuevo");
          return false;
        }
      };

      const handleVerifyPassword = async (id, password) => {
        const {status} = await verifyUser(id,password);
        if(status === 200){
          return true;
        }
        else{
          return false;
        }
      }


  return (
    <AuthContext.Provider value={{
        isAuth,
        loginAccess,
        handleVerifyPassword
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
