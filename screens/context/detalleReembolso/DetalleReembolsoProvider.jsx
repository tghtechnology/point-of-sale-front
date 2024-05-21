import { useEffect,useState } from "react";
import { DetalleReembolsoByReciboId } from "../../services/DetalleReembolso";
import {DetalleReembolsoContext} from "./DetalleReembolsoContex"
const DetalleReembolsoProvider=({children}) => {
const handleDetalleReembolsoByReciboId=async (reciboId)=>{
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
