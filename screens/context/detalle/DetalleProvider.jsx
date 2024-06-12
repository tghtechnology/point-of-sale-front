import React, { useState, useEffect, useContext } from 'react';
import { listDetalle, DetalleByVentaId, getDetalleById } from "../../services/DetalleService";
import  DetalleContext  from "./DetalleContext";
import AuthContext from '../auth/AuthContext';


/**
 * Componente DetalleProvider
 *
 * Este componente proporciona funcionalidades relacionadas con los detalles de ventas y gestión del estado
 * a sus componentes hijos. Utiliza la API de Contexto de React para gestionar los detalles de ventas.
 *
 * @param {Object} props - El objeto de propiedades.
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 *
 * @returns {JSX.Element} El componente DetalleProvider.
 */

const DetalleProvider = ({ children }) => {
    const { isAuth } = useContext(AuthContext);
    const [listDetalles, setListDetalles] = useState([]);

    useEffect(() => {
        if (isAuth) {
        const getDetalles = async () => {

            try {
                const { data, status } = await listDetalle();
                if (status === 200) {
                    setListDetalles(data); 
                } else {
                    console.log("Error al cargar detalles:", status);
                }
            } catch (error) {
                console.error("Error al cargar detalles:", error);
            }
        }
        getDetalles();
    }
    }, [isAuth]);


    /**
     * Obtiene los detalles de ventas por el ID de la venta.
     * @param {number|string} ventaId - El ID de la venta.
     * @returns {Object|null} Los detalles de la venta o null si la obtención falló.
     * @throws {Error} - Devuelve un error si hay un problema al obtener los detalles de la venta.
     */

    const handleDetalleByVentaId = async (ventaId) => {
        try {
            const res = await DetalleByVentaId(ventaId);
            if (res.status === 200 || res.status === 201) {
                return res.data;
            } else {
                console.error("Failed to get sale by ID:", res.status);
                return null;
            }
        } catch (error) {
            console.error("Error fetching sale by ID:", error);
            return null;
        }
    };

    /**
     * Obtiene los detalles de ventas por el ID del detalle.
     * @param {number|string} id - El ID del detalle.
     * @returns {Object|null} Los detalles obtenidos o null si la obtención falló.
     * @throws {Error} - Devuelve un error si hay un problema al obtener los detalles.
     */
    
    const handleGetDetalleById = async (id) => {
        try {
            const res = await getDetalleById(id);
            if (res.status === 200 || res.status === 201) {
                return res.data;
            } else {
                console.error("Failed to get sale by ID:", res.status);
                return null;
            }
        } catch (error) {
            console.error("Error fetching sale by ID:", error);
            return null;
        }
    };

    return (
        <DetalleContext.Provider value={{ listDetalles, setListDetalles, handleDetalleByVentaId, handleGetDetalleById }}>
            {children}
        </DetalleContext.Provider>
    );
};

export default DetalleProvider;
