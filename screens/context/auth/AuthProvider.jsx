import React,{useState} from "react";
import AuthContext from "./AuthContext";
import {createToken,obtenerDatosUsuarioPorId,editarUsuarioPorId,logout} from "../../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
  

    const loginAccess = async (email, password) => {
      try {
        const { status, data } = await createToken(email, password);
        if (status === 200) {
          const { usuario_id, token } = data;
          AsyncStorage.setItem("token", token);
          AsyncStorage.setItem("usuarioid", usuario_id.toString());
          setIsAuth(true);
          const userData = await obtenerDatosUsuarioPorId(usuario_id);
          setUser(userData);
          return status, data;
        } else {
          setIsAuth(false);
          return false;
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        setIsAuth(false);
        return false;
      }
    };
    
    const editarUsuario = async (id, newData) => {
      try {
        const editedUser = await editarUsuarioPorId(id, newData);
        setUser(editedUser);
        return true;
      } catch (error) {
        console.error("Error al editar usuario:", error);
        return false;
      }
    };

    const logautAccess = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        try {
          const response = await logout();
          if (response.status === 200) {
            await AsyncStorage.removeItem("token");
            setIsAuth(false);
            setUser(null); // Borra los datos del usuario cuando cierra sesión
            alert("Cierre de sesión exitoso");
            return true;
          } else {
            setIsAuth(false);
            alert("Error al cerrar sesión");
            return false;
          }
        } catch (error) {
          console.error("Error al cerrar sesión:", error.message);
         
          return false;
        }
      }
    };
  
  

  return (
    <AuthContext.Provider value={{
        isAuth,
        user,
        setUser,
        editarUsuario,
        loginAccess,
        logautAccess,
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider