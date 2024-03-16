import {createUser, changePassword} from "../../services/UserService"
import UsuarioContext from "./UsuarioContext";
const UsuarioProvider = ({children}) => {


    const handleCreateUser = async (newUser) => {
        const { status } = await createUser(newUser);
        if(status === 200 || status === 201){
          return true;
        }else {
          return false;
        }
    }

    const handleChangePassword = async (id, password) => {
      const {status} = await changePassword(id,password);
      if(status === 200){
        return true;
      }
      else{
        return false;
      }
    }


  return (
    <UsuarioContext.Provider value={{
      handleCreateUser,
      handleChangePassword
    }}> 
      {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioProvider
