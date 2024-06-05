import React, { useState, useEffect, useContext } from 'react';
import DiscountContext from "./DiscountContext";
import { createDiscount, getDiscounts,getCeroDiscounts, updateDiscountStatus,editDiscount, updateDiscount,getDiscountById } from "../../services/DiscountService";
import AuthContext from '../auth/AuthContext';

const DiscountProvider = ({ children }) => {
    const [discounts, setDiscounts] = useState([]);
    const [Cerodiscounts, setCerodiscounts] = useState([]);
    const { isAuth } = useContext(AuthContext);

    const handleCreateDiscount = async (newDiscount) => {
        try {
            const response = await createDiscount(newDiscount);
            if (response && response.status !== undefined) {
                if (response.status === 200 || response.status === 201) {
                    return response.data; // Devuelve la respuesta completa del servidor
                } else {
                    console.error("La respuesta indica un error:", response);
                    return null;
                }
            } else {
                console.error("La respuesta no tiene una propiedad 'status' válida:", response);
                return null;
            }
        } catch (error) {
            console.error("Error al llamar a createDiscount:", error);
            return null;
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
        if (isAuth) {
        fetchMyDiscounts();
        }
    }, [isAuth]);

    const fetchCeroDiscounts = async () => {
        try {
            const Cerodiscounts = await getCeroDiscounts();
            console.log("Descuentos obtenidos:", Cerodiscounts);
            setCerodiscounts(Cerodiscounts);
        } catch (error) {
            console.error('Error al obtener los descuentos:', error);
        }
    };

    useEffect(() => {
        if (isAuth) {
        fetchCeroDiscounts();
        }
    }, [isAuth]);

    const toggleDiscountStatus = async (id, newStatus) => {
        try {
            const response = await updateDiscountStatus(id, newStatus);
            if (response && response.success === true) {
                // Actualizar la lista después de cambiar el estado
                fetchMyDiscounts(); 
                fetchCeroDiscounts();
                return true;
            } else {
                console.error('Error toggling discount status:', response.success ? 'Unexpected response' : 'Toggle discount failed');
                console.log('Full response:', response); // Agregar esta línea para imprimir la respuesta completa
                return false;
            }
        } catch (error) {
            console.error('Error toggling discount status:', error);
            return false;
        }
    };

    const handleEditDiscount = async (id, updatedData) => {
        console.log(id)
        try {
          const response = await editDiscount(id, updatedData);
          if (response && response.status === 200) {
            const updatedDiscounts = discounts.map((discount) =>
              discount.id === id ? { ...discount, ...updatedData } : discount
            );
            setDiscounts(updatedDiscounts);
            console.log('Descuento editado exitosamente');
          } else if (response && response.status === 204) {
            console.log('Descuento editado exitosamente');
          }
        } catch (error) {
          console.error('Error editing discount:', error);
        }
      };

      const handleDiscountById = async (id) => {
        try {
          const res = await getDiscountById(id);
          if (res.status === 200 || res.status === 201) {
            return res.data;
          } else {
            console.error("Failed to get discount by ID:", res.status);
            return null;
          }
        } catch (error) {
          console.error("Error fetching discount by ID:", error);
          return null;
        }
     
      };

      const handleUpdateDiscount = async (id, newData) => {
        console.log("..")
        try {
            const updatedDiscount = await updateDiscount(id, newData);
            setDiscounts(prevDiscounts => {
                return prevDiscounts.map(discount =>
                    discount.id === id ? { ...discount, ...updatedDiscount } : discount
                );
            });
            console.log('Descuento actualizada exitosamente:', updatedDiscount);
        } catch (error) {
            console.error('Error al actualizar la Descuento:', error);
        }
    };
    return (
        <DiscountContext.Provider value={{ handleCreateDiscount, discounts,setDiscounts,Cerodiscounts,toggleDiscountStatus,handleEditDiscount,handleUpdateDiscount,handleDiscountById}}>
            {children}
        </DiscountContext.Provider>
    );
}

export default DiscountProvider;
