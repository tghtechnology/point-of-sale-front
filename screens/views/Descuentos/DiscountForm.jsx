import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useDiscount from '../../hooks/useDiscount';
import CustomAlert from '../../componentes/Alertas/CustomAlert';
import ErrorAlert from '../../componentes/Alertas/ErrorAlert';

const INITIAL_STATE = {
  nombre: '',
  tipo_descuento: '',
  valor: '',
  estado: true,
};

const DiscountForm = () => {
  const [tipoDescuento, setTipoDescuento] = useState('');
  const { handleCreateDiscount, discounts, setDiscounts } = useDiscount();
  const [dataForm, setDataForm] = useState(INITIAL_STATE);
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getValues = (name, value) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const validateFields = () => {
    if (!dataForm.nombre || !tipoDescuento || !dataForm.valor) {
      setErrorMessage('Todos los campos son obligatorios.');
      setErrorAlertVisible(true);
      return false;
    }
    if (isNaN(dataForm.valor) || parseFloat(dataForm.valor) <= 0) {
      setErrorMessage('El valor debe ser un número positivo.');
      setErrorAlertVisible(true);
      return false;
    }
    return true;
  };

  const SubmitDiscount = async () => {
    if (!validateFields()) return;

    const objectSend = {
      ...dataForm,
      tipo_descuento: tipoDescuento === 'percent' ? 'PORCENTAJE' : 'MONTO',
    };
    console.log('Valor de objectSend:', objectSend);

    try {
      const response = await handleCreateDiscount(objectSend);
      if (response) {
        const createdDiscount = response;
        setDiscounts([...discounts, createdDiscount]);
        setShowAlert(true);
        setDataForm(INITIAL_STATE);
        setTipoDescuento('');
      } else {
        setErrorAlertVisible(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Problema interno del servidor');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={dataForm.nombre}
          onChangeText={(text) => getValues('nombre', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={dataForm.valor}
            onChangeText={(text) => getValues('valor', text)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => setTipoDescuento((prevTipo) => (prevTipo === 'percent' ? 'dollar' : 'percent'))}
            style={styles.iconContainer}
          >
            <Icon
              name={tipoDescuento === 'percent' ? 'percent' : 'dollar'}
              size={18}
              color="#517EF2"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={SubmitDiscount} style={styles.button}>
        <Text style={styles.buttonText}>Guardar Descuento</Text>
      </TouchableOpacity>

      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Descuento Creado"
        message="El descuento se ha creado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle"
      />
      <ErrorAlert
        isVisible={errorAlertVisible}
        onClose={() => setErrorAlertVisible(false)}
        message={errorMessage}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
},
inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#0258FE',
    marginBottom: 15,
   
},
input: {
    color: 'black',
    paddingHorizontal: 10,
    padding: 10,
    fontSize: 15
},
label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 20,
},
inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'gray',
},
iconContainer: {
    width: 29,
    height: 29,
    padding: 5,
    alignItems: 'center',
    borderColor: '#0258FE',
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: 250,
},
button: {
    backgroundColor: '#0258FE',
    width:227,
    height:39,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginLeft:70,
},
buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:8,
},
});

export default DiscountForm;