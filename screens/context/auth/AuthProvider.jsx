import React,{useState} from "react";
import AuthContext from "./AuthContext";
import {createToken,obtenerDatosUsuarioPorId,editarUsuarioPorId,cambiarContraseña,logout} from "../../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    const loginAccess = async (email, password) => {
      try {
        const { status, data } = await createToken(email, password);
        if (status === 200) {
          const { usuario_id, token, role } = data;
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("usuarioid", usuario_id.toString());
          setIsAuth(true);
          const userData = await obtenerDatosUsuarioPorId(usuario_id);
          setUser(userData);
          setRole(role)
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

    const changePassword = async (currentPassword, newPassword, confirmPassword) => {
      // Validación para verificar que todos los campos sean requeridos
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("Todos los campos son requeridos");
      }
    
      // Verificación para confirmar que las nuevas contraseñas coincidan
      if (newPassword !== confirmPassword) {
        throw new Error("La nueva contraseña y su confirmación deben coincidir");
      }
    
      try {
        const result = await cambiarContraseña(currentPassword, newPassword, confirmPassword);
        return result;
      } catch (error) {
        console.error("Error al cambiar la contraseña:", error.message);
        alert(error.message); // Notificación de error al usuario
        throw error; // Lanza el error para otros manejadores
      }
    };
    

    const logautAccess = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          const response = await logout();
          if (response.status === 200) {
            await AsyncStorage.clear(); // Limpia todo el AsyncStorage
            setIsAuth(false);
            setUser(null);
            return true;
          } else {
            alert("Error al cerrar sesión");
            return false;
          }
        }
      } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
        return false;
      }
    };
    
  
  

  return (
    <AuthContext.Provider value={{
        isAuth,
        user,
        setUser,
        role,
        editarUsuario,
        loginAccess,
        logautAccess,
        changePassword
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider