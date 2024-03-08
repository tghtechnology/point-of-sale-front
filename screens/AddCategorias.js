import React, { useState } from 'react';
import { View} from 'react-native';
import { CrearCategoria } from './apiss/ApiCategoria';
import NuevaCat from './categorias/NuevaCat';



const AddCategorias = () => {
  const [datos, setDatos] = useState({
    id: '',
    nombre: '',
    color: '',
    estado:'',
  });

  const EnviarCat= async() =>{
    try {
    const response = await CrearCategoria(datos);
    console.log('Respuesta de la API:', response);
    setDatos({
      id: '',
      nombre: '',
      color: '',
      estado:'',
      });
  } catch (error) {
    console.error('Error al crear categoria:', error);
    console.error('Error al enviar datos:', error.message);
    console.log('Respuesta completa del error:', error.response);
  }
}
  return (
    <View>
    <NuevaCat
      EnviarCat={EnviarCat}
      datos={datos}
      setDatos={setDatos}
    />
    </View>
    
  );
};
 
export default AddCategorias;