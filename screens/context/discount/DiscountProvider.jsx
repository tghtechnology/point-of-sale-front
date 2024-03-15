import React, { useState, useEffect } from 'react';
import DiscountContext from "./DiscountContext";
import { createDiscount, getDiscounts, updateDiscountStatus } from "../../services/DiscountService";

const DiscountProvider = ({ children }) => {
    const [discounts, setDiscounts] = useState([]);

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

    const fetchMyDiscounts = async () => {
        try {
            const discounts = await getDiscounts();
            console.log("Descuentos obtenidos:", discounts);
            setDiscounts(discounts);
        } catch (error) {
            console.error('Error al obtener los descuentos:', error);
        }
    };

    useEffect(() => {
        fetchMyDiscounts();
    }, []);

    const toggleDiscountStatus = async (id, newStatus) => {
        try {
            const response = await updateDiscountStatus(id, newStatus);
            if (response && response.status === 'success') {
                fetchMyDiscounts(); // Actualizar la lista después de cambiar el estado
                return true;
            } else {
                console.error('Error toggling discount status:', response.message);
                return false;
            }
        } catch (error) {
            console.error('Error toggling discount status:', error);
            return false;
        }
      };

    return (
        <DiscountContext.Provider value={{ handleCreateDiscount, discounts,toggleDiscountStatus}}>
            {children}
        </DiscountContext.Provider>
    );
}

export default DiscountProvider;
