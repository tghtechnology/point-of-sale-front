import { useEffect,useState } from "react";
import {createSale} from "../../services/SaleService";
import SaleContext from "./SaleContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaleProvider = ({ children }) => {
  const handleCreateSale = async (newSal) => {
    const { detalles, tipoPago, impuestoId, descuentoId, clienteId, dineroRecibido } = newSal;
    try {
        const usuarioId = await AsyncStorage.getItem("usuarioid");
        const res = await createSale({ detalles, tipoPago, impuestoId, descuentoId, clienteId, dineroRecibido }, usuarioId);
        if (res.status === 200 || res.status === 201){
            return res.data
        } else {
            console.error("Error al crear la venta:", res.status);
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
