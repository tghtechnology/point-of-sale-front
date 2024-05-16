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


    return (
        <DetalleContext.Provider value={{ listDetalles,setListDetalles }}>
            {children}
        </DetalleContext.Provider>
    )
}

export default DetalleProvider;