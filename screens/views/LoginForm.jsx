import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import CustomAlert from '../componentes/CustomAlert';


const LoginForm = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [inconAlertVisible, setConAlertVisible] = useState(false);
  const [emailAlertVisible, setEmailAlertVisible] = useState(false);
  //Logica de Iniciar Secion
  const handleSignIn = () => {



    // Verifica si los campos de entrada están vacíos
    if (!email.trim() || !password.trim()) {
      setConAlertVisible(true)
      return;
    }
    //aqui termina

    // Verifica si el correo electrónico es válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailAlertVisible(true)
      return;
    }
    //Aqui Termina

    const userData = {
      email: email,
      password: password,
    };
     fetch('http://192.168.18.8:3000/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(userData),
     })
       .then(response => {
         if (!response.ok) {
          throw new Error('Invalid credentials');
        }
         return response.json();
      })
      .then(data => {
        setSuccessAlertVisible(true);
        navigation.navigate('Home');
      })
       .catch(error => {
         setErrorAlertVisible(true); // Muestra la alerta de error
      });
  };
  //Aqui Termina

  const handleIniciarPress = () => {
    navigation.navigate('Envio');

  };

  const handleRecibosPress = () => {
    console.log('Registro presionado');
    navigation.navigate('FormRecibos');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Correo Electronico'
        placeholderTextColor="#546574"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        placeholderTextColor="#546574"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity  onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleIniciarPress}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <CustomAlert
        isVisible={successAlertVisible}
        onClose={() => setSuccessAlertVisible(false)}
        title="Inicio de sesión exitoso"
        message="Inicio de Secion Exitoso."
        buttonColor="green"
        iconName="check"
      />

      <CustomAlert
        isVisible={errorAlertVisible}
        onClose={() => setErrorAlertVisible(false)}
        title="Error"
        message="Error al Iniciar Secion"
        buttonColor="red"
        iconName="times-circle"
      />

      <CustomAlert
        isVisible={inconAlertVisible}
        onClose={() => setConAlertVisible(false)}
        title="Campos Incompletos"
        message="Ingresar Email o Password."
        buttonColor="orange"
        iconName="question"
      />

      <CustomAlert
        isVisible={emailAlertVisible}
        onClose={() => setEmailAlertVisible(false)}
        title="Formato Incorrecto"
        message="Ingresar Email."
        buttonColor="lightblue"
        iconName="exclamation-triangle"
      />

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    marginTop: 300, // Puedes ajustar este valor según tus necesidades
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
  button: {
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

  forgotPasswordText: {
    color: 'blue',
    marginTop: 18,
    textAlign: 'center',
    fontSize: 15,
  }


})

export default LoginForm;