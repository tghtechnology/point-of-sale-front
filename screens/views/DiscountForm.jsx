import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text, TextInput, FlatList,Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useDiscount from '../hooks/useDiscount';
import DiscountProvider from '../context/discount/DiscountProvider';

const INITIAL_STATE = {
    nombre:'',
    tipo_descuento:'',
    valor:'',
  }

const DiscountForm = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoDescuento, setTipoDescuento] = useState('');
  const {handleCreateDiscount,discounts, toggleDiscountStatus } = useDiscount();
  const [ dataForm, setDataForm] = useState(INITIAL_STATE);
 
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await toggleDiscountStatus(id, newStatus);
    } catch (error) {
      setError('Error al actualizar el estado del descuento');
    }
  };


  const getValues = (name,value) => {
    setDataForm({
      ...dataForm,
      [name]:value
    })
  }

  const SubmitDiscount = async () => {
    
    const objectSend = {
      ...dataForm,
      tipo_descuento: tipoDescuento === 'percent' ? 'PORCENTAJE' : 'MONTO',
    }
    console.log("Valor de objectSend:", objectSend);
    console.log("estado:",estado)
    //control de errores para el crear un usuario
    try {
      const response = await handleCreateDiscount(objectSend);
      if (response) {
          alert("Descuento creado con éxito");
          setDataForm(INITIAL_STATE);
      } else {
          alert("El descuento no se pudo crear");
      }
  } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("problema interno del servidor")
  }
}
  
  const irAFormulario = () => {
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };

  const numeros = (text) => {
    // Utiliza una expresión regular para permitir solo números
    const numeroValido = text.replace(/[^0-9.]/g, '');
    setDataForm({ ...dataForm, valor: numeroValido });
  
}
  return (
    <View style={styles.container}>
      <FlatList
        data={discounts}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Text style={styles.itemText}>Tipo: {item.tipo_descuento}</Text>
            <Text style={styles.itemText}>Valor: {item.valor}</Text>
            <Text>Estado: {discounts.estado === 1 ? 'Activado' : 'Desactivado'}</Text>
            <Switch
              value={item.estado === 1}
              onValueChange={(newValue) => handleToggleStatus(item.id, newValue ? 1 : 0)}
            />
          </View>
    )}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={{ paddingHorizontal: 16 }}
    ListEmptyComponent={() => (
    <View style={styles.mensajeContainer}>
        <Text style={styles.mensaje}>No hay descuento :'v</Text>
        <Icon name='frown-o' size={70} color="gray" />
    </View>
        )}
        />
        <View style={styles.bottomSpace} />
      
      <View style={styles.bottomSpace} />

      {/* Botón con ícono para ir al formulario */}
      <TouchableOpacity style={styles.addButton} onPress={irAFormulario}>
        <Icon name='plus-circle' size={70} color="green" />
      </TouchableOpacity>

      
      <Modal visible={mostrarFormulario} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Contenido del formulario */}
            <Text style={styles.formularioTitle}>Crear Nuevo Descuento</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del descuento"
              value={dataForm.nombre}
              onChangeText={text => getValues('nombre', text)}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.valorInput]}
                placeholder="Valor"
                value={dataForm.valor}
                onChangeText={text => getValues('valor', text)}
                keyboardType="numeric"
              />
              <TouchableOpacity
              onPress={() => setTipoDescuento(prevTipo => prevTipo === 'percent' ? 'dollar' : 'percent')}
              style={styles.iconoBorde}
              >
              <Icon
              name={tipoDescuento === 'percent' ? 'percent' : 'dollar'}
              size={20}
              color={tipoDescuento === 'percent' ? '#00cc00' : '#0066ff'}
              style={styles.iconoDescuento}
              />
              </TouchableOpacity>
            </View>
            <View style={styles.botonesContainer}>
              <TouchableOpacity onPress={SubmitDiscount} style={[styles.boton, styles.enviarBoton]}>
                <Text style={styles.textoBoton}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cerrarFormulario} style={[styles.boton, styles.cerrarBoton]}>
                <Text style={styles.textoBoton}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      },
      bottomSpace: {
        flex: 1,
      },
      addButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
      },
      formularioTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      input: {
        marginBottom: 20,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        height: 40,
        color: '#333',
        paddingLeft: 10,
      },
      valorInput: {
        flex: 1,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      iconoBorde: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
      },
      iconoDescuento: {
        marginRight: 5,
      },
      botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      boton: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        width: 120,
        marginRight: 10,
      },
      enviarBoton: {
        backgroundColor: '#0066ff',
      },
      cerrarBoton: {
        backgroundColor: 'red',
      },
      textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
      mensajeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
      },
      mensaje: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
      },
      descuentosContainer: {
        marginTop: 20,
    },
    // Estilos para cada item de descuento
    itemContainer: {
      marginBottom: 10,
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3,
    },
    itemText: {
      fontSize: 18,
      color: '#333',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
});

export default DiscountForm;
