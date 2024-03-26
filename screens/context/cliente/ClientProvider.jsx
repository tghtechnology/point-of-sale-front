import {createClient} from "../../services/ClientService"
import ClientContext from "./ClientContext";
const ClientProvider = ({children}) => {
    const handleCreateClient = async (newClient) => {
        const { status } = await createClient(newClient);
        if(status === 200 || status === 201){
          return true;
        }else {     
          return false;
        }
    }


  return (
    <ClientContext.Provider value={{
        handleCreateClient
    }}> 
      {children}
    </ClientContext.Provider>
  )
}

export default ClientProvider
