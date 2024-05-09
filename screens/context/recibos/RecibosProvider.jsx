import { useEffect,useState } from "react";
import {listRecibos}from "../../services/RecibosService";
import RecibosContext from "./RecibosContext";


const RecibosProvider = ({children}) => {
    const [listRecibo, setListRecibo] = useState([]);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const { data, status } = await listRecibos();
                if (status === 200) {
                    setListRecibo(data); 
                } else {
                    console.log("Error al cargar recibos:", status);
                }
            } catch (error) {
                console.error("Error al cargar recibos:", error);
            }
        }
        getArticle();
    }, []);






    return(
        <RecibosContext.Provider value={{listRecibo, setListRecibo }}>
            {children}
        </RecibosContext.Provider>
    )
}
export default RecibosProvider;