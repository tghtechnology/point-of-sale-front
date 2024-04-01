import apiClient from "../apiss/AxiosConfig";

const createClient = async (newClient) => {
    try {
        const {data, status} = await apiClient.post(`/cliente`, newClient);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error);
    }
}

const getClients = async () => {
    try {
        const response = await apiClient.get(`/cliente`);
        return response.data; // Devuelve los datos de los descuentos
    } catch (error) {
        console.log(error);
        return []; // En caso de error, devuelve un array vacío
    }
}; 

const editClient = async (id, updatedData) => {
    console.log(id)
    try {
      const response = await apiClient.put(`/cliente/${id}`, updatedData);
      if (response.status === 200) {
        // Si la respuesta es 200, devuelve los datos actualizados del descuento
        return response.data;
      }
    } catch (error) {
      console.error('Error editing discount:', error);
      throw new Error('Error al editar el descuento');
    }
  };

const deleteClient = async(id) => {
    try{
        const{data, status} = await apiClient.delete(`/cliente/${id}`);
        return{
            data,
            status
        };
    }catch (error) {
        console.log('Error:',error.response.data);
    }
}

const updateClient = async (id, newData) => {
    try {
        const response = await apiClient.put(`/cliente/${id}`, newData);
        return response.data;
    } catch (error) {
        throw new Error(`Error al actualizar el cliente: ${error.message}`);
    }
    };

export {
    createClient, getClients, editClient, deleteClient, updateClient
}