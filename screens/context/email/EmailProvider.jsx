import { sendemail, sendnewpassword } from "../../services/EmailService"
import EmailContext from "./EmailContext";
import AsyncStorage from "@react-native-async-storage/async-storage"

const EmailProvider = ({ children }) => {
  const handleSendEmail = async (email) => {
    const { status } = await sendemail(email);
    if (status === 200 || status === 201) {
      return true;
    } else {
      return false;
    }
  }

  const handleSendNewPassword = async (newPassword, token) => {
    const { status } = await sendnewpassword(newPassword, token);
    if (status === 200 || status === 201) {
      return true;
    } else {
      return false;
    }
  }


  return (
    <EmailContext.Provider value={{
      handleSendEmail,
      handleSendNewPassword
    }}>
      {children}
    </EmailContext.Provider>
  )
}

export default EmailProvider
