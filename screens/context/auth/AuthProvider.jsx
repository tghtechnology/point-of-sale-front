import React,{useState} from "react";
import { Children } from "react/cjs/react.production.min"
import AuthContext from "./AuthContext"
import { createToken } from "../../services/authService";
const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);

    const loginAccess = async (user) => {
        const { status, data } = await createToken(user);
        if (status === 200) {
          sessionStorage.setItem("token", data.token);
          setIsAuth(true);
        
          alert("Autenticación exitosa");
          return true;
        } else {
          setIsAuth(false);
          alert("Datos incorrectos, intente de nuevo");
          return false;
        }
      };
  return (
    <AuthContext.Provider value={{
        isAuth,
        loginAccess,
    }}>
        {Children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
