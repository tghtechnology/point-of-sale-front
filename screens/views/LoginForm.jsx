import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import CustomAlert from '../componentes/CustomAlert';
import useAuth from '../hooks/useAuth';
// import CustomAlert from '../../Alertas/CustomAlert';

const LoginForm = () => {
  const navigation = useNavigation();
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [inconAlertVisible, setConAlertVisible] = useState(false);
  const [emailAlertVisible, setEmailAlertVisible] = useState(false);
  const {loginAccess} = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  //Logica de Iniciar Secion



  const handleSignIn = async () => {
    try {
      const response = await loginAccess(credentials);
      if (response == true) {
        alert("Sesion Iniada")
        navigation.navigate("Home")
      } else {
        alert("Secion no iniciada");
      }
    } catch (error) {
      alert("Secion no iniciada");
    }
  };
  //Aqui Termina

  const handleIniciarPress = () => {
    navigation.navigate('Envio');
  };

  return (
    <View style={styles.container}>
      {/* INPUT DE USUARIO */}
      <TextInput
        style={styles.input}
        placeholder='Correo Electrónico'
        placeholderTextColor="#546574"
        onChangeText={(text) =>
          setCredentials((prevCredentials) => ({
            ...prevCredentials,
            email: text,
          }))
        }
      />

      {/* INPUT PARA CONTRASEÑA */}
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        placeholderTextColor="#546574"
        secureTextEntry={true}
        onChangeText={(text) =>
          setCredentials((prevCredentials) => ({
            ...prevCredentials,
            password: text,
          }))
        }
      />

      {/* BOTÓN DE INICIO DE SESIÓN */}
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* OPCIÓN PARA RECUPERAR CONTRASEÑA */}
      <TouchableOpacity onPress={handleIniciarPress}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <CustomAlert
        isVisible={successAlertVisible}
        onClose={() => setSuccessAlertVisible(false)}
        title="Inicio de sesión exitoso"
        message="Inicio de Sesión Exitoso."
        buttonColor="green"
        iconName="check"
      />

      <CustomAlert
        isVisible={errorAlertVisible}
        onClose={() => setErrorAlertVisible(false)}
        title="Error"
        message="Error al Iniciar Sesión"
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