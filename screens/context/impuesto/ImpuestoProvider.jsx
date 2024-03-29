import { useEffect,useState } from "react";
import {createImpuesto,listImpuestos,editImpuestos,deleteImpuesto} from "../../services/ImpuestoService";
import ImpuestoContext from "./ImpuestoContext";

const ImpuestoProvider = ({ children }) => {
  const [listImpuesto, setListImpuesto] = useState([]);
    useEffect(() => {
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
  }, []);
  

  const handleCreateImp = async (newImp) => {
    const { nombre, tasa, tipo_impuesto } = newImp;
    try {
        const status = await createImpuesto({ nombre, tasa, tipo_impuesto });
        return status === 200 || status === 201;
    } catch (error) {
        console.log("Error creating impuesto:", error);
        return false;
    }
};

const handleEditImp = async(updateImpuestos) => {
  const { nombre, tasa, tipo_impuesto } = updateImpuestos;
  try {
      const response = await editImpuestos(updateImpuestos.id, { nombre, tasa, tipo_impuesto } ); 
      if(response && response.status === 200){
          console.log('Impuesto editado exitosamente');
          return true; 
      } else if (response && response.status === 204) {
          console.log('Impuesto editado exitosamente');
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
}

  return (
    <ImpuestoContext.Provider value={{handleCreateImp,listImpuesto,handleEditImp,handleDeleteImp}}> 
        {children}
    </ImpuestoContext.Provider>
  );
};


export default ImpuestoProvider;
