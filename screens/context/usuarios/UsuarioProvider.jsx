import React,{useState,useEffect} from "react";
import {createUser,eliminarTemporal,eliminarPermanente } from "../../services/UserService"
import UsuarioContext from "./UsuarioContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsuarioProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(false);

    const handleCreateUser = async (newUser) => {
        const { status } = await createUser(newUser);
        if(status === 200 || status === 201){
          return true;
        }else {
          return false;
        }
    }
    const handleDeleteTemporary = async (password) => {
      const { status, data } = await eliminarTemporal(password);
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
  
        alert("Cuenta eliminada temporalmente");
        return true;
      } else {
        setIsAuth(false);
        alert("Datos incorrectos, intente de nuevo");
        return false;
      }
    };

    const handleDeletePermanent = async (password) => {
      const { status, data } = await eliminarPermanente(password);
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
  
        alert("Cuenta eliminada permanentemente");
        return true;
      } else {
        setIsAuth(false);
        alert("Datos incorrectos, intente de nuevo");
        return false;
      }
    };


    

  

  return (
    <UsuarioContext.Provider value={{
      
      handleCreateUser,
      handleDeleteTemporary,
      handleDeletePermanent,
              
    }}> 
      {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioProvider