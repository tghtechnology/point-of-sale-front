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
  const [campoAlertVisible, setCampoAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  //

  // Logica para Conformar PIN
  const [userPin, setUserPin] = useState('');
  const [pin, setSentPin] = useState('');
  const [email, setEmail] = useState(''); // Agrega un estado para el correo electrónico

  const endpoint = 'http://192.168.18.8:3000/verificarPin';

  const fetchPin = async () => {
    try {
      const response = await fetch(`${endpoint}?email=${email}`);
      if (!response.ok) {
        throw new Error('El correo electrónico ya existe en la base de datos.');
      }
      const data = await response.json();
      setSentPin(data.pin);
    } catch (error) {
      console.error('Error al obtener el PIN:', error);
      Alert.alert('Error', error.message);
    }
  };

  const confirmPin = () => {
    if (userPin === pin) {
      Alert.alert('Correcto', 'El PIN ingresado es correcto.');
    } else {
      setErrorAlertVisible(true);
    }
  };

  // Obtener el PIN cuando se cambia el correo electrónico
  React.useEffect(() => {
    if (email) {
      fetchPin();
    }
  }, [email]);
  // Aqui Termina
  return (
    <View style={styles.container}>
      <Text style={styles.Tittle}>Ingresa el PIN enviado al Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Pin"
        placeholderTextColor="#546574"
        onChangeText={(text) => setSentPin(text)}
      />
      <TouchableOpacity style={styles.buttonEnviar} onPress={confirmPin}>
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
        message="El Pin no se envio Correctamente. Por favor, inténtalo de nuevo."
        buttonColor="red"
        iconName="times-circle"
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