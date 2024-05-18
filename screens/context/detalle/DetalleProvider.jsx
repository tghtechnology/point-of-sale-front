import { useEffect,useState } from "react";
import { listDetalle } from "../../services/DetalleService";
import DetalleContext from "./DetalleContext";


const DetalleProvider = ({children}) => {

    const [listDetalles, setListDetalles] = useState([]);

    useEffect(() => {
        const getDetalles = async () => {
            try {
                const { data, status } = await listDetalle();
                if (status === 200) {
                    setListDetalles(data); 
                } else {
                    console.log("Error al cargar detalles:", status);
                }
            } catch (error) {
                console.error("Error al cargar detalles:", error);
            }
        }
        getDetalles();
    }, []);

    const handleDetalleById = async (id) => {
        try {
          const res = await DetalleByVentaId(id);
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
        <DetalleContext.Provider value={{ listDetalles,setListDetalles,handleDetalleById }}>
            {children}
        </DetalleContext.Provider>
    )
}

export default DetalleProvider;