import { useEffect, useState } from "react";
import { listRecibos, ReciboById } from "../../services/RecibosService";
import RecibosContext from "./RecibosContext";

const RecibosProvider = ({ children }) => {
  const [listRecibo, setListRecibo] = useState([]);

  useEffect(() => {
    const getRecibos = async () => {
      try {
        const { data, status } = await listRecibos();
        if (status === 200) {
          setListRecibo(data);
        } else {
          console.error("Error al cargar recibos:", status);
        }
      } catch (error) {
        console.error("Error al cargar recibos:", error);
      }
    };

    getRecibos();
  }, []);

  const handleReciboById = async (id) => {
    try {
      const { data, status } = await ReciboById(id);
      if (status === 200) {
        return data; // Return the fetched data instead of setting it directly
      } else {
        console.error("Error al cargar recibo:", status);
        return null;
      }
    } catch (error) {
      console.error("Error al cargar recibo:", error);
      return null;
    }
  };

  return (
    <RecibosContext.Provider value={{ listRecibo, setListRecibo, handleReciboById }}>
      {children}
    </RecibosContext.Provider>
  );
};

export default RecibosProvider;
