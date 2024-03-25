import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet,Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useDiscount from '../hooks/useDiscount';
import DiscountProvider from '../context/discount/DiscountProvider';

const INITIAL_STATE = {
    nombre:'',
    tipo_descuento:'',
    valor:'',
    estado:'',
  }

const DiscountForm = () => {
  const [tipoDescuento, setTipoDescuento] = useState('');
  const {handleCreateDiscount} = useDiscount();
  const [ dataForm, setDataForm] = useState(INITIAL_STATE);
 
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
  const numeros = (text) => {
    // Utiliza una expresión regular para permitir solo números
    const numeroValido = text.replace(/[^0-9.]/g, '');
    setDataForm({ ...dataForm, valor: numeroValido });
  
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese los detalles del descuento</Text>
            {/* Contenido del formulario */}
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Crear Nuevo Descuento</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del descuento"
              value={dataForm.nombre}
              onChangeText={text => getValues('nombre', text)}
            />
            </View>
            
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Valor del descuento</Text>
            <View style={styles.inputWithIcon}>
            <TextInput
                style={styles.input}
                placeholder="Valor"
                value={dataForm.valor}
                onChangeText={text => getValues('valor', text)}
                keyboardType="numeric"
            />
            
              <TouchableOpacity
              onPress={() => setTipoDescuento(prevTipo => prevTipo === 'percent' ? 'dollar' : 'percent')}
              style={styles.iconContainer}
              >
              <Icon
              name={tipoDescuento === 'percent' ? 'percent' : 'dollar'}
              size={20}
              color={tipoDescuento === 'percent' ? '#00cc00' : '#0066ff'}
              style={styles.iconoDescuento}
              />
              </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={SubmitDiscount} style={styles.button}>
              <Text style={styles.buttonText}>Guardar Descuento</Text>
              </TouchableOpacity>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom:80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    flex: 1,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  iconContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop:10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DiscountForm;
