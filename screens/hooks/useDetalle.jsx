import { useContext } from "react";
import DetalleContext from "../context/detalle/DetalleContext";


const useDetalle = () => useContext(DetalleContext);

export default useDetalle;