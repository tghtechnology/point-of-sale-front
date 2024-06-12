import React,{useState,useEffect} from "react";
import {createUser,getUsers,editUser,eliminarTemporal,eliminarPermanente, getUserById } from "../../services/UserService"
import UsuarioContext from "./UsuarioContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Proveedor de contexto para el manejo de usuarios.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} El proveedor de contexto de usuarios.
 */

const UsuarioProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState([])


  /**
   * Crea un nuevo usuario.
   *
   * @param {Object} newUser - Datos del nuevo usuario.
   * @returns {Object|null} Los datos del usuario creado o null si hubo un error.
   * @throws {Error} Si ocurre un error al crear el usuario.
   */

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

    /**
   * Obtiene la lista de usuarios.
   *
   * @returns {void}
   * @throws {Error} Si ocurre un error al obtener los usuarios.
   */

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

    /**
   * Edita un usuario.
   *
   * @param {number} id - ID del usuario a editar.
   * @param {Object} updatedData - Datos actualizados del usuario.
   * @returns {void}
   * @throws {Error} Si ocurre un error al editar el usuario.
   */

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

  /**
   * Elimina temporalmente un usuario.
   *
   * @param {string} password - Contraseña del usuario.
   * @returns {boolean} True si se eliminó temporalmente, false en caso contrario.
   * @throws {Error} Si ocurre un error al eliminar temporalmente el usuario.
   */

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
        return true;
      } else {
        setIsAuth(false);
        alert("Datos incorrectos, intente de nuevo");
        return false;
      }
    };

    /**
   * Elimina permanentemente un usuario.
   *
   * @param {string} password - Contraseña del usuario.
   * @returns {boolean} True si se eliminó permanentemente, false en caso contrario.
   * @throws {Error} Si ocurre un error al eliminar permanentemente el usuario.
   */

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
        return true;
      } else {
        setIsAuth(false);
        alert("Datos incorrectos, intente de nuevo");
        return false;
      }
    };

    /**
   * Obtiene un usuario por su ID.
   *
   * @param {number} id - ID del usuario.
   * @returns {Object|null} Los datos del usuario o null si hubo un error.
   * @throws {Error} Si ocurre un error al obtener el usuario por ID.
   */
  
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