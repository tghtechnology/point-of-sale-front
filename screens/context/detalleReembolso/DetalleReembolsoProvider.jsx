import { DetalleReembolsoByReciboId } from "../../services/DetalleReembolsoService";
import DetalleReembolsoContext from "./DetalleReembolsoContex"
  
/**
 * Componente DetalleReembolsoProvider
 *
 * Este componente proporciona funcionalidades relacionadas con los detalles de reembolsos y gestión del estado
 * a sus componentes hijos. Utiliza la API de Contexto de React para gestionar los detalles de reembolsos.
 *
 * @param {Object} props - El objeto de propiedades.
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 *
 * @returns {JSX.Element} El componente DetalleReembolsoProvider.
 */

const DetalleReembolsoProvider=({children}) => {


  /**
   * Obtiene los detalles de reembolsos por el ID del recibo.
   * @param {number|string} reciboId - El ID del recibo.
   * @returns {Object|null} Los detalles del reembolso o null si la obtención falló.
   * @throws {Error} - Devuelve un error si hay un problema al obtener los detalles del reembolso.
   */
  
const handleDetalleReembolsoByReciboId = async (reciboId)=>{
    try {
      const res = await DetalleReembolsoByReciboId(reciboId);
      if (res.status === 200 || res.status === 201) {
        console.log(res.data)
        return res.data;
      } else {
        console.error("Failed to get sale by ID:", res.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching sale by ID:", error);
      return null;
    }
  }
  return (
    <DetalleReembolsoContext.Provider value={{handleDetalleReembolsoByReciboId }}>
        {children}
    </DetalleReembolsoContext.Provider>
)
}

export default DetalleReembolsoProvider;
