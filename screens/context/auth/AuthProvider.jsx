import React,{useState} from "react";
import AuthContext from "./AuthContext";
import {createToken,obtenerDatosUsuarioPorId,editarUsuarioPorId,cambiarContraseña,logout} from "../../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * Componente AuthProvider
 *
 * Este componente proporciona funcionalidades relacionadas con la autenticación y gestión del estado
 * de usuario a sus componentes hijos. Utiliza la API de Contexto de React para gestionar la autenticación
 * y manejar operaciones de usuario.
 *
 * @param {Object} props - El objeto de propiedades.
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 *
 * @returns {JSX.Element} El componente AuthProvider.
 */

const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
  

    /**
     * Inicia sesión del usuario.
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} password - La contraseña del usuario.
     * @returns {Object|boolean} Los datos del usuario si la autenticación fue exitosa, false en caso contrario.
     * @throws {Error} - Devuelve un error si hay un problema al iniciar sesión.
     */
    
    const loginAccess = async (email, password) => {
      try {
        const { status, data } = await createToken(email, password);
        if (status === 200) {
          const { usuario_id, token } = data;
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("usuarioid", usuario_id.toString());
          setIsAuth(true);
          const userData = await obtenerDatosUsuarioPorId(usuario_id);
          setUser(userData);
          setRole(userData.rol);
          console.log(userData);
          console.log(userData.rol);
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
    

    /**
     * Edita los datos de un usuario.
     * @param {number|string} id - El ID del usuario a editar.
     * @param {Object} newData - Los nuevos datos del usuario.
     * @returns {boolean} True si la edición fue exitosa, false en caso contrario.
     * @throws {Error} - Devuelve un error si hay un problema al editar el usuario.
     */

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


    /**
     * Cambia la contraseña del usuario.
     * @param {string} currentPassword - La contraseña actual del usuario.
     * @param {string} newPassword - La nueva contraseña del usuario.
     * @param {string} confirmPassword - La confirmación de la nueva contraseña.
     * @returns {Object} El resultado de la operación de cambio de contraseña.
     * @throws {Error} - Devuelve un error si hay un problema al cambiar la contraseña.
     */

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
        throw error; // Lanza el error para otros manejadores
      }
    };
    

    /**
     * Cierra la sesión del usuario.
     * @returns {boolean} True si la operación fue exitosa, false en caso contrario.
     * @throws {Error} - Devuelve un error si hay un problema al cerrar sesión.
     */
    
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
        role,
        setUser,
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