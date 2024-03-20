import apiClient from "../apiss/AxiosConfig";

const createDiscount = async (newDiscount) => {
    try {
        const {data, status} = await apiClient.post(`/descuento`, newDiscount);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error);
    }
}

const getDiscounts = async () => {
    try {
        const response = await apiClient.get(`/descuento`);
        return response.data; // Devuelve los datos de los descuentos
    } catch (error) {
        console.log(error);
        return []; // En caso de error, devuelve un array vacío
    }
};

const getCeroDiscounts = async () => {
    try {
        const response = await apiClient.get('/descuentosEliminados');
        return response.data; // Devuelve los datos de los descuentos
    } catch (error) {
        console.log(error);
        return []; // En caso de error, devuelve un array vacío
    }
};

const updateDiscountStatus = async (id, newStatus) => {
    try {
        const response = await apiClient.put(`/descuento/${id}/cambiar-estado`, { estado: newStatus });
        console.log('Response from updateDiscountStatus:', response);
        if (response.status === 204) {
            // Si la respuesta es 204, devolver un objeto vacío para indicar éxito
            return { success: true };
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error toggling discount status:', error);
        throw new Error('Error al actualizar el estado del descuento');
    }
}

const editDiscount = async (id, updatedData) => {
    try {
      const response = await apiClient.put(`/descuento/${id}`, updatedData);
      if (response.status === 200) {
        // Si la respuesta es 200, devuelve los datos actualizados del descuento
        return response.data;
      }
    } catch (error) {
      console.error('Error editing discount:', error);
      throw new Error('Error al editar el descuento');
    }
  };

export {
    createDiscount, getDiscounts,getCeroDiscounts,updateDiscountStatus, editDiscount
}