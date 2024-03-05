const API = 'http://192.168.0.109:3000'

const eliminarCuentaPermanentemente = async (userId) => {
    try {
      const response = await fetch(`${API}/eliminar-permanentemente/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
  
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.mensaje);
      } else {
        const errorData = await response.json();
        console.error(errorData.mensaje); 
      }
    } catch (error) {
      console.error('Error al intentar eliminar la cuenta permanentemente:', error);
    }
  };
  

  const userIdToDelete = 123; 
  eliminarCuentaPermanentemente(userIdToDelete);