import { useEffect, useState } from "react";
import { listRecibos, ReciboById,DetalleByRembolsoId,Reembolsar} from "../../services/RecibosService";
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

  const handleDetalleRembolsoById=async (id)=>{
    try{
      const {data,status} = await DetalleByRembolsoId(id)
      if(status ===200){
        return data;
      }else{
        console.log("Error al cargar detalle por rembolso",status);
        return null;
      }
    }catch(error){
      console.log("Error al cargar detalle por rembolso",error);
      return null;

    }
  };
  
  const handleRembolsar=async(id,detalle)=>{
    try {
      const res = await Reembolsar(id,detalle);
      console.log(id, detalle)
      if (res.status === 200 || res.status === 201) {
      
        return res.data;
      } else {
        console.error("Error al rembolsar", res.status);
        return null;
      }
    } catch (error) {
      console.error("Error creando el rembolso:", error);
      return null;
    }
  }

  return (
    <RecibosContext.Provider value={{ listRecibo, setListRecibo, handleReciboById,handleDetalleRembolsoById,handleRembolsar }}>
      {children}
    </RecibosContext.Provider>
  );
};

export default RecibosProvider;
