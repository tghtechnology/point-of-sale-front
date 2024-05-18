import { useEffect, useState } from "react";
import { createSale, listSales, SaleById} from "../../services/SaleService";
import SaleContext from "./SaleContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaleProvider = ({ children }) => {
  const [listSale, setListSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await listSales();
        if (res.status === 200 || res.status === 201) {
          setListSales(res.data);
        } else {
          console.error("Failed to list sales:", res.status);
        }
      } catch (error) {
        console.error("Failed to list sales:", error);
      }
    };

    fetchSales();
  }, []); 

  const handleCreateSale = async (newSale) => {
    const { detalles, tipoPago, impuestoId, descuentoId, clienteId, dineroRecibido } = newSale;
    try {
      const usuarioId = await AsyncStorage.getItem("usuarioid");
      const res = await createSale({ detalles, tipoPago, impuestoId, descuentoId, clienteId, dineroRecibido }, usuarioId);
      if (res.status === 200 || res.status === 201) {
        return res.data;
      } else {
        console.error("Failed to create sale:", res.status);
        return null;
      }
    } catch (error) {
      console.error("Error creating sale:", error);
      return null;
    }
  };

  const handleSaleById = async (id) => {
    try {
      const res = await SaleById(id);
      if (res.status === 200 || res.status === 201) {
        return res.data;
      } else {
        console.error("Failed to get sale by ID:", res.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching sale by ID:", error);
      return null;
    }
  };

  
 

  return (
    <SaleContext.Provider value={{ handleCreateSale, listSale, handleSaleById}}>
      {children}
    </SaleContext.Provider>
  );
};

export default SaleProvider;
