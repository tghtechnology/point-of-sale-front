import { View, Text, Alert } from 'react-native'
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
//import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import CustomAlert from '../Alertas/CustomAlert';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'



const FormVerificarPin = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  //Alertas
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [campoAlertVisible, setCampoAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  //

  // Logica para Conformar PIN
  const [pin, setSentPin] = useState('');
  const [email, setEmail] = useState(''); // Agrega un estado para el correo electrónico

  const fetchPin = async (pin, email) => {
    // Verificar si el campo de Pin está vacío
    if (!pin.trim()) {
      setCampoAlertVisible(true);
      return;
    }
    //Aqui Terminna
    // Verificar si el Pin es un número
    if (isNaN(pin)) {
      setErrorAlertVisible(true);
      return;
    }
    //Aqui Termina
    const userData = {
      pin: pin,
      email: email,
    };
    fetch('http://192.168.18.8:3000/verificarPin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Pin Incorrecto');
        }
        return response.json();
      })
      .then(data => {
        setSuccessAlertVisible(true)
      })
      .catch(error => {
        setErrorAlertVisible(true)
      });
  };
  // Aqui Termina
  return (
    <View style={styles.container}>
      <Text style={styles.Tittle}>Ingresa el PIN enviado al Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Pin"
        placeholderTextColor="#546574"
        onChangeText={(number) => setSentPin(number)}
      />
      <TouchableOpacity style={styles.buttonEnviar} onPress={() => fetchPin(pin, email)}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={campoAlertVisible}
        onClose={() => setCampoAlertVisible(false)}
        title="Campos Incompletos"
        message="Falta ingresar el Pin. Por favor, inténtalo de nuevo."
        buttonColor="orange"
        iconName="question" // Agrega el nombre del icono aquí
      />
      <CustomAlert
        isVisible={errorAlertVisible}
        onClose={() => setErrorAlertVisible(false)}
        title="Error"
        message="Pin Incorrecto. Por favor, inténtalo de nuevo."
        buttonColor="red"
        iconName="times-circle"
      />
      <CustomAlert
        isVisible={successAlertVisible}
        onClose={() => setSuccessAlertVisible(false)}
        title="Verificacion Exitosa"
        message="Has verificado el Pin correctamente."
        buttonColor="green"
        iconName="check"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100, // Puedes ajustar este valor según tus necesidades
    paddingHorizontal: 25, // Añadido para agregar espaciado a los lados
  },
  Tittle: {
    fontSize: 34,
    textAlign: 'center'
  },
  PinCode: {
    paddingLeft: 50
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
export default FormVerificarPin