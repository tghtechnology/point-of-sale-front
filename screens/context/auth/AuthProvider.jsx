import React, { useState } from "react";
import AuthContext from "./AuthContext"
import { createToken, getTokem } from "../../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage"
const AuthProvider = ({ children }) => {
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

  const logautAccess = async (token) => {
    const status = await getTokem(token);
    if (status===200) {
      const token=data.token
      const storedToken = AsyncStorage.getItem("token");
      console.log("Token: ", storedToken);
      AsyncStorage.removeItem("token");
      setIsAuth(true);
      alert("Cierre de sesión exitoso");
      return true;
    } else {
      setIsAuth(false);
      alert("Error al cerrar sesión");
      console.log(Error)
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuth,
      loginAccess,
      logautAccess
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
