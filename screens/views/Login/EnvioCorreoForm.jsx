import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useEmail from '../../hooks/useEmail';
import CustomAlert from "../../componentes/Alertas/CustomAlert"
import EmailProvider from '../../context/email/EmailProvider';
import LoginAlert from '../../componentes/Alertas/LoginAlert';

const INITIAL_STATE = {
  email: '',
};

const EnvioCorreoForm = () => {
  const navigation = useNavigation();
  const [dataForm, setDataForm] = useState(INITIAL_STATE);
  const { handleSendEmail } = useEmail();
  const [showAlert, setShowAlert] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const getValues = (name, value) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSend = async () => {
    const objectSend = { ...dataForm };

    if (!objectSend.email) {
      setAlertMessage('El campo de correo electrónico no puede estar vacío.');
      setIsAlertVisible(true);
      return;
    }

    if (!validateEmail(objectSend.email)) {
      setAlertMessage('Por favor, introduce un correo electrónico válido.');
      setIsAlertVisible(true);
      return;
    }

    try {
      const response = await handleSendEmail(objectSend);
      if (response) {
        setDataForm(INITIAL_STATE);
        setShowAlert(true);
      } else {
        setAlertMessage('No se envió correctamente el mensaje.');
        setIsAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage('Escriba bien su correo');
      setIsAlertVisible(true);
      console.log(error);
    }
    console.log("Valor del formulario: " + JSON.stringify(objectSend));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Introduzca su email para recibir un correo para restablecer su contraseña.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#546574"
        onChangeText={text => getValues('email', text)}
        value={dataForm.email}
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Correo Enviado"
        message="Por favor, revisa tu correo electronico"
        buttonColor="#2196F3"
        iconName="check-circle" 
      />
      <LoginAlert
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
        message={alertMessage}
        iconName="exclamation-circle"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#f5f5f5',
  },
  instructionText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 25,
    fontSize: 17,
    borderBottomWidth: 1, // Cambiado de borderWidth
    borderBottomColor: 'blue', // Cambiado de borderColor
    height: 40,
    color: '#546574',
    padding: 10,
    
  },
  button: {
    backgroundColor: '#0258FE',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EnvioCorreoForm;
