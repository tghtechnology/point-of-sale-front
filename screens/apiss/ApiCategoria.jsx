/*const API = 'http://192.168.18.8:3000';

export const CrearCategoria = async (datosCategoria) => {
  try {
    const response = await fetch(`${API}/crearC`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosCategoria),
    });
  
    if (!response.ok) {
      const errorData = await response.text(); // Cambiado de json a text
      throw new Error(`Error en la solicitud (${response.status}): ${errorData}`);
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en CrearCategoria`, error);
    throw error;
  }
};*/