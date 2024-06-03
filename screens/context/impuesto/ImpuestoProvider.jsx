import React, { useState, useEffect, useContext } from 'react';
import {createImpuesto,listImpuestos,editImpuestos,deleteImpuesto,updateImpuesto,getTaxById} from "../../services/ImpuestoService";
import ImpuestoContext from "./ImpuestoContext";
import AuthContext from '../auth/AuthContext';

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
