import React, { useState, useEffect, useContext } from 'react';
import {createImpuesto,listImpuestos,editImpuestos,deleteImpuesto,updateImpuesto,getTaxById} from "../../services/ImpuestoService";
import ImpuestoContext from "./ImpuestoContext";
import AuthContext from '../auth/AuthContext';


/**
 * Proveedor de contexto para el manejo de impuestos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} El proveedor de contexto de impuestos.
 */

const ImpuestoProvider = ({ children }) => {
  const [listImpuesto, setListImpuesto] = useState([]);
  const { isAuth } = useContext(AuthContext);

    useEffect(() => {
      if (isAuth) {
      const getTaxes= async () => {
          try {
              const { data, status } = await listImpuestos();
              if (status === 200) {
                setListImpuesto(data); 
                  
              } else {
                  console.log("Error al cargar articulos:", status);
              }
          } catch (error) {
              console.error("Error al cargar articulos:", error);
          }
      }
      getTaxes();
    }
  }, [isAuth]);
  

  /**
   * Crea un nuevo impuesto.
   *
   * @param {Object} newImp - Datos del nuevo impuesto.
   * @param {string} newImp.nombre - Nombre del impuesto.
   * @param {number} newImp.tasa - Tasa del impuesto.
   * @param {string} newImp.tipo_impuesto - Tipo de impuesto.
   * @returns {Object|null} Los datos del impuesto creado o null si hubo un error.
   * @throws {Error} Si ocurre un error al crear el impuesto.
   */

  const handleCreateImp = async (newImp) => {
    const { nombre, tasa, tipo_impuesto } = newImp;
    try {
        const res = await createImpuesto({ nombre, tasa, tipo_impuesto });
        if(res.status==200 || res.status == 201){
          return res.data;
        }
        else{
          return null;
        }
    } catch (error) {
        console.log("Error creating impuesto:", error);
        return null;
    }
};

/**
   * Edita un impuesto existente.
   *
   * @param {Object} updateImpuestos - Datos del impuesto a actualizar.
   * @param {number} updateImpuestos.id - ID del impuesto a actualizar.
   * @param {string} updateImpuestos.nombre - Nombre del impuesto.
   * @param {number} updateImpuestos.tasa - Tasa del impuesto.
   * @param {string} updateImpuestos.tipo_impuesto - Tipo de impuesto.
   * @returns {boolean} True si el impuesto se editó correctamente, false si no.
   * @throws {Error} Si ocurre un error al editar el impuesto.
   */

const handleEditImp= async (updateImpuestos) => {
  const { nombre, tasa, tipo_impuesto } = updateImpuestos;
   try {
     const response = await editImpuestos(updateImpuestos.id, { nombre, tasa, tipo_impuesto } ); 
     if (response && (response.status === 200 || response.status === 204)) {
       console.log('Impuesto editado exitosamente');
       const updatedList = listImpuesto.map(impuesto => {
         if (impuesto.id === updateImpuestos.id) {
           return { ...impuesto, ...updateImpuestos };
         } else {
           return impuesto;
         }
       });
       setListImpuesto(updatedList);
       return true;
     } else {
       return false;
     }
   } catch (error) {
     console.error('Error editing impuesto:', error);
     return false;
   }
 };
 
 /**
   * Elimina un impuesto.
   *
   * @param {number} id - ID del impuesto a eliminar.
   * @returns {boolean} True si el impuesto se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error al eliminar el impuesto.
   */

const handleDeleteImp = async (id) => {
  try {
      const { status } = await deleteImpuesto(id);
      if (status === 200) {
          return true;
      } else {
          return false;
      }
  } catch (error) {
      console.error("Error deleting impuesto:", error);
      return false;
  }
};

/**
   * Obtiene un impuesto por ID.
   *
   * @param {number} id - ID del impuesto a obtener.
   * @returns {Object|null} Los datos del impuesto o null si hubo un error.
   * @throws {Error} Si ocurre un error al obtener el impuesto.
   */
  
const handleTaxById = async (id) => {
  try {
    const res = await getTaxById(id);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      console.error("Failed to get tax by ID:", res.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching tax by ID:", error);
    return null;
  }
}





  return (
    <ImpuestoContext.Provider value={{handleCreateImp,listImpuesto,setListImpuesto,handleEditImp,handleDeleteImp,handleTaxById }}> 
        {children}
    </ImpuestoContext.Provider>
  );
};


export default ImpuestoProvider;