import { useContext } from "react";
import DiscountContext from "../context/discount/DiscountContext";

const useDiscount = () => {
    return useContext(DiscountContext)
}

export default useDiscount;