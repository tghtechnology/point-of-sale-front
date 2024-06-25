import React, { useState, useEffect, useContext } from 'react';
import { createSale, listSales, SaleById } from "../../services/SaleService";
import SaleContext from "./SaleContext";
import AuthContext from '../auth/AuthContext';
import RecibosContext from '../recibos/RecibosContext'; // Importar RecibosContext
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * Proveedor de contexto para el manejo de ventas.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} El proveedor de contexto de ventas.
 */

const SaleProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const { fetchRecibos } = useContext(RecibosContext); // Usar fetchRecibos del contexto de recibos
  const [listSale, setListSales] = useState([]);

  /**
   * Obtiene la lista de ventas.
   *
   * @returns {void}
   * @throws {Error} Si ocurre un error al listar las ventas.
   */

  const fetchSales = async () => {
    try {
      const res = await listSales();
      if (res.status === 200 || res.status === 201) {
        setListSales(res.data);
      } else {
        console.error("Failed to list sales:", res.status);
      }
    } catch (error) {
      console.error("Failed to list sales:", error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      fetchSales();
    }
  }, [isAuth]);

  /**
   * Crea una nueva venta.
   *
   * @param {Object} newSale - Los datos de la nueva venta.
   * @param {Array} newSale.detalles - Detalles de la venta.
   * @param {string} newSale.tipoPago - Tipo de pago.
   * @param {number} newSale.impuestoId - ID del impuesto.
   * @param {number} newSale.descuentoId - ID del descuento.
   * @param {number} newSale.clienteId - ID del cliente.
   * @param {number} newSale.dineroRecibido - Dinero recibido.
   * @returns {Object|null} Los datos de la venta creada o null si hubo un error.
   * @throws {Error} Si ocurre un error al crear la venta.
   */

  const handleCreateSale = async (newSale) => {
    const { detalles, tipoPago, impuestoId, descuentoId, clienteId, dineroRecibido } = newSale;
    try {
      const usuarioId = await AsyncStorage.getItem("usuarioid");
      const res = await createSale({ detalles, tipoPago, impuestoId, descuentoId, clienteId, dineroRecibido }, usuarioId);
      if (res.status === 200 || res.status === 201) {
        await fetchSales();
        await fetchRecibos();
        return res.data;
      } else {
        console.error("Failed to create sale:", res.status);
        return null;
      }
    } catch (error) {
      console.error("Error creating sale:", error);
      return null;
    }
  };

  /**
   * Obtiene una venta por su ID.
   *
   * @param {number} id - ID de la venta.
   * @returns {Object|null} Los datos de la venta o null si hubo un error.
   * @throws {Error} Si ocurre un error al obtener la venta por ID.
   */
  
  const handleSaleById = async (id) => {
    try {
      const res = await SaleById(id);
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
    <SaleContext.Provider value={{ handleCreateSale, listSale, setListSales, handleSaleById }}>
      {children}
    </SaleContext.Provider>
  );
};

export default SaleProvider;