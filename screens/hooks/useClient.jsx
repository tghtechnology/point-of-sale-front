import { useContext } from "react";
import ClientContext from "../context/cliente/ClientContext";

const useClient = () => {
    return useContext(ClientContext)
}

export default useClient;