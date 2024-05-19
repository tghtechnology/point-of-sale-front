import React,{useState,useEffect} from "react";
import {createUser,getUsers,editUser,eliminarTemporal,eliminarPermanente, getUserById } from "../../services/UserService"
import UsuarioContext from "./UsuarioContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsuarioProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState([])

    const handleCreateUser = async (newUser) => {
      try{
        const res = await createUser(newUser);
        if(res.status === 200 || res.status === 201){
          return res.data;
        }
         else {     
          return null;
        }
      }catch(error){

          console.log("Error creating user:", error);
          return null;
      }

    }

    const fetchUsers = async () =>{
      try {
        const user = await getUsers();
        setUser(user);
      } catch (error) {
        
      }
    }
    useEffect(() => {
      fetchUsers();
    }, []);

    const handleEditUser = async (id,updatedData) => {
      console.log(id)
      try {
        const response = await editUser(id,updatedData);
        if (response && response.status === 200) {
          const updatedUsers = user.map((users)=>
          users.id === id ? {...users, ...updatedData} : users
        );
        setWorker(updatedUsers);
        console.log('edicion correcta')
      } else if (response && response.status === 204) {
        console.log('Usuario editado exitosamente');
      }
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

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
    const handleGetUserById = async (id) => {
      try {
        const response = await getUserById(id);
        if (response && response.status === 200) {
          return response.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error getting user by id:", error);
        return null;
      }
    }

  return (
    <UsuarioContext.Provider value={{
      
      handleCreateUser,
      handleEditUser,
      user,
      setUser,
      handleDeleteTemporary,
      handleDeletePermanent,
      handleGetUserById
              
    }}> 
      {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioProvider