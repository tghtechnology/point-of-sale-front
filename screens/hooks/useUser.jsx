import { useContext } from "react";
import UsuarioContext from "../context/usuarios/UsuarioContext";

const useUser = () => {
    return useContext(UsuarioContext)
}

export default useUser;