import { useContext } from "react";
import DetalleReembolsoContext from "../context/detalleReembolso/DetalleReembolsoContex";

const useDetalleReembolso = () => useContext(DetalleReembolsoContext);

export default useDetalleReembolso;
