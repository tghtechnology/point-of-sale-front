import { useContext } from "react";
import EmailContext from "../context/email/EmailContext";

const useEmail = () => {
    return useContext(EmailContext)
}

export default useEmail;