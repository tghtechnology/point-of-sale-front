import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { registroDescuento, obtenerDescuentos, actualizarEstadoDescuento } from './apiss/ApiDesc';
import DescuentoForm from './descuento/DescuentoForm';
import DescuentoList from './descuento/DescuentoList';

  const Descuento = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoDescuento, setTipoDescuento] = useState('');
  const [descuentos, setDescuentos] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    id: '',
    nombre: '',
    tipo_descuento: '',
    valor:'0.0',
    estado:'',
  });

  
  useEffect(() => {
    const cargarDescuentos = async () => {
      try {
        const descuentosData = await obtenerDescuentos();
        setDescuentos(descuentosData);
      } catch (error) {
        console.error('Error al cargar descuentos:', error);
      }
    };

    cargarDescuentos();
  }, []);

  const irAFormulario = () => {
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };

  const numeros = (text) => {
    // Utiliza una expresión regular para permitir solo números
    const numeroValido = text.replace(/[^0-9.]/g, '');
    setDatosFormulario({ ...datosFormulario, valor: numeroValido });
  };

  const EnviarDesc= async() =>{
    try {
      const tipoDescuentoApi = tipoDescuento ===  'percent' ? '%' : '$';
      const datosDescuento = {
        ...datosFormulario,
        tipo_descuento: tipoDescuentoApi,
      };
  
      const response = await registroDescuento(datosDescuento);
    console.log('Respuesta de la API:', response);
    
    setMostrarFormulario(false);
    setDatosFormulario({
      id: '',
      nombre: '',
      tipo_descuento: '',
      valor:'0.0',
      estado:'',
      });
  } catch (error) {
    console.error('Error en registroDescuento:', error);
    console.error('Error al enviar datos:', error.message);
    console.log('Respuesta completa del error:', error.response);

    // Agrega esta línea para imprimir el cuerpo de la respuesta si está disponible
    if (error.response && error.response.data) {
      console.log('Cuerpo de la respuesta del servidor:', error.response.data);
    }

    throw error;
}   
};

const cambiarEstadoDescuento = async (id, nuevoEstado) => {
  try {
    await actualizarEstadoDescuento(id, nuevoEstado);
    // Recargar la lista después de cambiar el estado
    const descuentosData = await obtenerDescuentos();
    setDescuentos(descuentosData);
  } catch (error) {
    console.error('Error al cambiar el estado del descuento:', error);
  }
};

  return (
    <View style={styles.container}>
      
      
        <DescuentoList descuentos={descuentos} cambiarEstadoDescuento={cambiarEstadoDescuento} />
          
      
      <View style={styles.bottomSpace} />
      {/* Botón con ícono para ir al formulario */}
      <TouchableOpacity style={styles.addButton} onPress={irAFormulario}>
        <Icon name='plus-circle' size={70} color="green" />
      </TouchableOpacity>

      <Modal visible={mostrarFormulario}  transparent>
            <DescuentoForm  // Usa el componente DescuentoFormulario
              EnviarDesc={EnviarDesc}
              cerrarFormulario={cerrarFormulario}
              tipoDescuento={tipoDescuento}
              setTipoDescuento={setTipoDescuento}
              datosFormulario={datosFormulario}
              setDatosFormulario={setDatosFormulario}
            />  
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  bottomSpace: {
    flex: 1,
  },
  addButton: {
    alignSelf: 'flex-end', // Alinea el botón a la derecha
  },
  input: {
    marginBottom: 25,
    fontSize: 17,
    borderBottomWidth: 1, // Cambiado de borderWidth
    borderBottomColor: 'red', // Cambiado de borderColor
    height: 40,
    color: '#546574',
    padding: 10,
    borderRadius: 5,
  },
  valorInput:{
    flex:1,
    marginBottom: 25,
    fontSize: 17,
    borderBottomWidth: 1, // Cambiado de borderWidth
    borderBottomColor: 'red', // Cambiado de borderColor
    height:40,
    color: '#546574',
    padding: 10,
    borderRadius: 5,
  },
  texto:{
    fontSize:20,
    color:'white',
  },
  boton: {
     borderRadius:5,
     backgroundColor:"red",
     height: 50,
     justifyContent: 'center',
     alignItems: 'center',
     padding:15,
  },
  bottomSpace: {
    flex: 1,
  },
  addButton: {
    alignSelf: 'flex-end',
  },
  mensajeContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mensaje: {
    fontSize: 20,
    marginBottom: 20,
    color:'gray',
  },
});

export default Descuento;
