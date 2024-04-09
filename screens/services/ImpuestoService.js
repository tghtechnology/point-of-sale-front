import apiClient from "../apiss/AxiosConfig";

const createImpuesto = async (newImp) => {
    try {
        const { data, status } = await apiClient.post(`/impuesto/crear`, newImp);
        return {
            data,
            status,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const listImpuestos = async () => {
    try {
        const { data,status } = await apiClient.get(`/impuesto/listar`); 
        return {
            data,
            status
        }; 
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar Impuestos'); 
    }
};

const editImpuestos = async(id,updateImpuestos) => {
    try {
        const { data,status } = await apiClient.put(`/impuesto/actualizar/${id}`, updateImpuestos);
        return {
            data,
            status
        }; 
    } catch (error) {
      throw new Error('Error al editar impuestos');
    }
  };

  const deleteImpuesto = async(id) => {
    try{
        const{data, status} = await apiClient.delete(`/impuesto/eliminar/${id}`);
        return{
            data,
            status
        };
    }catch (error) {
        console.log('Error:',error.response.data);
    }
}
export {
    createImpuesto,
    listImpuestos,
    editImpuestos,
    deleteImpuesto,
  
}