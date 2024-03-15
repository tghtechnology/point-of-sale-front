import { createDiscount } from "../../services/DiscountService";
import DiscountContext from "./DiscountContext";

const DiscountProvider = ({children}) => {
    const handleCreateDiscount = async (newDiscount) => {
    try {
        const response = await createDiscount(newDiscount);
        if (response && response.status !== undefined) {
            if (response.status === 200 || response.status === 201) {
                return true;
            } else {
                return false;
            }
        } else {
            console.error("La respuesta no tiene una propiedad 'status' válida:", response);
            return false;
        }
    } catch (error) {
        console.error("Error al llamar a createDiscount:", error);
        return false;
    }
}
    return (
        <DiscountContext.Provider value={{ handleCreateDiscount }}>
            {children}
        </DiscountContext.Provider>
    )
}

export default DiscountProvider;
