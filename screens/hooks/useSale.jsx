import { useContext } from "react";
import SaleContext from "../context/sale/SaleContext";

const useSale = () => useContext(SaleContext);

export default useSale;