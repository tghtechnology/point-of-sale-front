const API = 'http://192.168.18.27:3000';

export const registroUsuario = async (datosUsuario) => {
  try {
    const response = await fetch(`${API}/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosUsuario),
    });
  
    if (!response.ok) {
      const errorData = await response.text(); // Cambiado de json a text
      throw new Error(`Error en la solicitud (${response.status}): ${errorData}`);
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en registroUsuario`, error);
    throw error;
  }
};


export const obtenerPais = async () => {
  try {
    const response = await fetch(`${API}/listaPaises`); // Ajusta la URL de tu API
    const textResponse = await response.text();
    if (!response.ok) {
      console.error(`Error en la solicitud (${response.status}): ${textResponse}`);
      throw new Error(`Error en la solicitud (${response.status}): ${textResponse}`);
    }

    const listaPaises = JSON.parse(textResponse);
    return listaPaises;
  } catch (error) {
    console.error('Error en obtenerPais:', error);
    throw error;
  }
};


