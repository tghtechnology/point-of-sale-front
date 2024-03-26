import {createUser,verifyUser} from "../../services/UserService"
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

    


  return (
    <UsuarioContext.Provider value={{
      handleCreateUser
    }}> 
      {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioProvider
