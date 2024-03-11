import { View, Text } from 'react-native'
import { TextInput, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import CustomAlert from './componentes/CustomAlert';


const FormEnvioCorreo = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [campoAlertVisible, setCampoAlertVisible] = useState(false);
  const [formatAlertVisible, setFormatAlertVisible] = useState(false);

  //Logica de Enviar Pin
  const handleSendPin = () => {
    // Verificar si el campo de Pin está vacío
    if (!email.trim()) {
      setCampoAlertVisible(true);
      return;
    }
    //Aqui termina

    // Verificar si el correo electrónico tiene un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormatAlertVisible(true);
      return;
    }
    //Aqui Termina

    const userData = {
      email: email,
    };

    fetch('http://192.168.18.8:3000/enviarPIN', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al enviar el PIN');
        }
        return response.json();
      })
      .then(data => {
        setSuccessAlertVisible(true);
        navigation.navigate('Verificar');
      })
      .catch(error => {
        console.error('Error al enviar el PIN:', error.message);
        setErrorAlertVisible(true); // Muestra la alerta de error
      });
  };
  //Aqui Termina


  return (
    <View style={styles.container}>
      <Text>
        Introduzca su correo electronico para recibir
        instrucciones para restablecer la contraseña
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Direccion de Correo Electronico"
        placeholderTextColor="#546574"
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.buttonEnviar} onPress={handleSendPin}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <CustomAlert
        isVisible={successAlertVisible}
        onClose={() => setSuccessAlertVisible(false)}
        title="Envio Exitoso"
        message="Has enviado el Pin correctamente."
        buttonColor="green"
        iconName="check"
      />

      <CustomAlert
        isVisible={errorAlertVisible}
        onClose={() => setErrorAlertVisible(false)}
        title="Error"
        message="El Pin no se envio Correctamente. Por favor, inténtalo de nuevo."
        buttonColor="red"
        iconName="times-circle"
      />

      <CustomAlert
        isVisible={campoAlertVisible}
        onClose={() => setCampoAlertVisible(false)}
        title="Campos Incompletos"
        message="Falta ingresar el Email. Por favor, inténtalo de nuevo."
        buttonColor="orange"
        iconName="question" // Agrega el nombre del icono aquí
      />

      <CustomAlert
        isVisible={formatAlertVisible}
        onClose={() => setFormatAlertVisible(false)}
        title="Formato Incorrecto"
        message="Ingresar formato Email. Por favor, inténtalo de nuevo."
        buttonColor="lightblue"
        iconName="exclamation-triangle" // Agrega el nombre del icono aquí
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100, // Puedes ajustar este valor según tus necesidades
    paddingHorizontal: 25, // Añadido para agregar espaciado a los lados
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
  buttonEnviar: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default FormEnvioCorreo