import React, { useState, useEffect, useContext } from 'react';
import { listRecibos, ReciboById, DetalleByRembolsoId, Reembolsar } from "../../services/RecibosService";
import RecibosContext from "./RecibosContext";
import AuthContext from '../auth/AuthContext';


/**
 * Proveedor de contexto para el manejo de recibos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} El proveedor de contexto de recibos.
 */

const RecibosProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const [listRecibo, setListRecibo] = useState([]);

  /**
   * Obtiene la lista de recibos.
   *
   * @returns {void}
   * @throws {Error} Si ocurre un error al cargar los recibos.
   */

  const fetchRecibos = async () => {
    try {
      const { data, status } = await listRecibos();
      if (status === 200) {
        setListRecibo(data);
      } else {
        console.error("Error al cargar recibos:", status);
      }
    } catch (error) {
      console.error("Error al cargar recibos:", error);
    }
  };

  useEffect(() => {
    if (isAuth) {
    fetchRecibos();
    }
  }, [isAuth]);

  /**
   * Obtiene un recibo por su ID.
   *
   * @param {number} id - ID del recibo.
   * @returns {Object|null} Los datos del recibo o null si hubo un error.
   * @throws {Error} Si ocurre un error al cargar el recibo.
   */

  const handleReciboById = async (id) => {
    try {
      const { data, status } = await ReciboById(id);
      if (status === 200) {
        return data;
      } else {
        console.error("Error al cargar recibo:", status);
        return null;
      }
    } catch (error) {
      console.error("Error al cargar recibo:", error);
      return null;
    }
  };

  /**
   * Obtiene el detalle de un rembolso por su ID.
   *
   * @param {number} id - ID del rembolso.
   * @returns {Object|null} Los datos del detalle del rembolso o null si hubo un error.
   * @throws {Error} Si ocurre un error al cargar el detalle del rembolso.
   */

  const handleDetalleRembolsoById = async (id) => {
    try {
      const { data, status } = await DetalleByRembolsoId(id);
      if (status === 200) {
        return data;
      } else {
        console.error("Error al cargar detalle por rembolso", status);
        return null;
      }
    } catch (error) {
      console.error("Error al cargar detalle por rembolso", error);
      return null;
    }
  };

  /**
   * Realiza un rembolso.
   *
   * @param {number} id - ID del recibo a rembolsar.
   * @param {Object} detalle - Detalles del rembolso.
   * @returns {Object|null} Los datos del rembolso o null si hubo un error.
   * @throws {Error} Si ocurre un error al realizar el rembolso.
   */
  
  const handleRembolsar = async (id, detalle) => {
    try {
      const res = await Reembolsar(id, detalle);
      if (res.status === 200 || res.status === 201) {
        await fetchRecibos(); // Fetch updated list of recibos after reembolso
        return res.data;
      } else {
        console.error("Error al rembolsar", res.status);
        return null;
      }
    } catch (error) {
      console.error("Error creando el rembolso:", error);
      return null;
    }
  };

  return (
    <RecibosContext.Provider value={{ listRecibo, setListRecibo, handleReciboById, handleDetalleRembolsoById, handleRembolsar, fetchRecibos }}>
      {children}
    </RecibosContext.Provider>
  );
};

export default RecibosProvider;