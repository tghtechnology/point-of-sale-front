import React, { useState, useEffect, useContext } from 'react';
import { listRecibos, ReciboById, DetalleByRembolsoId, Reembolsar, crearRecibo } from "../../services/RecibosService";
import RecibosContext from "./RecibosContext";
import AuthContext from '../auth/AuthContext';


const RecibosProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const [listRecibo, setListRecibo] = useState([]);

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
  const handleCrearRecibo = async () => {
    try {
      const res = await crearRecibo();
      console.log('Recibo:',res)
      if (res.status === 200 || res.status === 201) {
        await fetchRecibos(); 
        return res.data;
      } else {
        console.error("Error al crear recibo", res.status);
        return null;
      }
    } catch (error) {
      console.error("Error creando recibo:", error);
      return null;
    }
  }

  return (
    <RecibosContext.Provider value={{ listRecibo, setListRecibo, handleReciboById, handleDetalleRembolsoById, handleRembolsar, handleCrearRecibo, fetchRecibos }}>
      {children}
    </RecibosContext.Provider>
  );
};

export default RecibosProvider;
