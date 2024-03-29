import { useContext } from "react";
import ImpuestoContext from "../context/impuesto/ImpuestoContext";

const useImpuesto = () => useContext(ImpuestoContext);

export default useImpuesto;