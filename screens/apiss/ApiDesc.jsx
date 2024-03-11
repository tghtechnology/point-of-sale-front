const API = 'http://192.168.18.27:3000';

export const registroDescuento = async (datosDescuento) => {
    try {
      const response = await fetch(`${API}/descuento`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify(datosDescuento),
      });
      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error desde el cuerpo de la respuesta
        console.log('Detalles del error:', errorData);
        throw new Error(`Error en la solicitud (${response.status}): ${errorData.message || 'Error desconocido en la solicitud'}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en registroDescuento:', error);
      throw error;
    }
  };
  
  export const obtenerDescuentos = async () => {
    try {
      const response = await fetch(`${API}/descuento`);
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error desconocido en la solicitud';
        throw new Error(`Error en la solicitud (${response.status}): ${errorMessage}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener descuentos:', error);
      throw error;
    }
  };
  
  export const actualizarEstadoDescuento = async (id, nuevoEstado) => {
    try {
      const response = await fetch(`${API}/descuento/${id}/cambiar-estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado ? 1 : 0 }),
      });
  
      if (!response.ok) {
        const errorMessage = `Error al actualizar el estado del descuento: ${response.statusText}`;
        console.error(errorMessage);
        return response.status === 204 ? {} : Promise.reject(errorMessage);
      }
  
      return response.status === 204 ? {} : response.json();
    } catch (error) {
      console.error('Error al cambiar el estado del descuento:', error);
      if (error.response && error.response.data && error.response.data.error) {
        console.error('Error específico:', error.response.data.error);
      }
      throw error;
    }
  };