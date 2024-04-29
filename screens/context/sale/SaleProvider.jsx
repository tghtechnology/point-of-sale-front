import { useEffect,useState } from "react";
import {createSale} from "../../services/SaleService";
import SaleContext from "./SaleContext";

const SaleProvider = ({ children }) => {
  const handleCreateSale = async (newSal) => {
    const {detalles,tipoPago,impuestoId,descuentoId,clienteId,usuarioId,dineroRecibido} = newSal;
    try {
        const status = await createSale({detalles,tipoPago,impuestoId,descuentoId,clienteId,usuarioId,dineroRecibido});
        return status === 200 || status === 201;
    } catch (error) {
        console.log("Error creating venta:", error);
        return false;
    }
};

  return (
    <SaleContext.Provider value={handleCreateSale}> 
        {children}
    </SaleContext.Provider>
  );
};


export default SaleProvider;
