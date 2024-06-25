import { sendemail, sendnewpassword } from "../../services/EmailService"
import EmailContext from "./EmailContext";
import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Proveedor de contexto para el manejo de correos electrónicos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} El proveedor de contexto de correos electrónicos.
 */

const EmailProvider = ({ children }) => {

  /**
   * Envía un correo electrónico.
   *
   * @param {string} email - Dirección de correo electrónico del destinatario.
   * @returns {boolean} True si el correo electrónico se envió correctamente, false si no.
   * @throws {Error} Si ocurre un error al enviar el correo electrónico.
   */

  const handleSendEmail = async (email) => {
    const { status } = await sendemail(email);
    if (status === 200 || status === 201) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Envía una nueva contraseña.
   *
   * @param {string} newPassword - La nueva contraseña.
   * @param {string} token - El token para la autenticación.
   * @returns {boolean} True si la nueva contraseña se envió correctamente, false si no.
   * @throws {Error} Si ocurre un error al enviar la nueva contraseña.
   */

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