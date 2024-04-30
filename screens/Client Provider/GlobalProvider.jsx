import { useEffect, useState } from "react";
import { createSale } from "../../services/SaleService";
import SaleContext from "./SaleContext";

const GlobalProvider = ({ children }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);
    const [selectedTaxes, setSelectedTaxes] = useState([]);

    return (
        <SaleContext.Provider value={{
                selectedItems,
                selectedDiscounts,
                selectedClients,
                selectedTaxes,
            }}>
            {children}
        </SaleContext.Provider>
    );
};