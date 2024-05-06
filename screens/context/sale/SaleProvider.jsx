import { useEffect,useState } from "react";
import {createSale} from "../../services/SaleService";
import SaleContext from "./SaleContext";

const SaleProvider = ({ children }) => {
  const handleCreateSale = async (newSal) => {
    const {detalles,tipoPago,impuestoId,descuentoId,clienteId,usuarioId,dineroRecibido} = newSal;
    try {
        const res = await createSale({detalles,tipoPago,impuestoId,descuentoId,clienteId,usuarioId,dineroRecibido});
        if (res.status === 200 || res.status === 201){
          return res.data
        }else {
          console.error("Error al crear el venta:", res.status);
          return null;
        }
    } catch (error) {
        console.log("Error creating venta:", error);
        return null;
    }
};



  return (
    <SaleContext.Provider value={handleCreateSale}> 
        {children}
    </SaleContext.Provider>
  );
};


export default SaleProvider;
