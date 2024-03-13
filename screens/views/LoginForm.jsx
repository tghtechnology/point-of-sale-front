import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import CustomAlert from '../componentes/CustomAlert';
import useAuth from '../hooks/useAuth';
import AuthProvider from '../context/auth/AuthProvider';
// import CustomAlert from '../../Alertas/CustomAlert';


const INITIAL_LOGIN = {
  email:'',
  password:''
}
const LoginForm = () => {
  const navigation = useNavigation();
  const [value, setValues] = useState(INITIAL_LOGIN);

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [inconAlertVisible, setConAlertVisible] = useState(false);
  const [emailAlertVisible, setEmailAlertVisible] = useState(false);
  const {} = useAuth
  //Logica de Iniciar Secion

  const getValuesLogin = (name, value) => {
    setValues({
      ...value,
      [name]:value
    })
  }

  const handleSignIn = () => {

  //   // Verifica si los campos de entrada están vacíos
  //   if (!email.trim() || !password.trim()) {
  //     setConAlertVisible(true)
  //     return;
  //   }
  //   //aqui termina

  //   // Verifica si el correo electrónico es válido
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     setEmailAlertVisible(true)
  //     return;
  //   }
  //   //Aqui Termina

    // fetch('http://192.168.18.27:3000/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Invalid credentials');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     setSuccessAlertVisible(true);
    //     navigation.navigate('Home');
    //   })
    //   .catch(error => {
    //     setErrorAlertVisible(true); // Muestra la alerta de error
    //   });

    navigation.navigate('Home')
  };
  //Aqui Termina

  const handleIniciarPress = () => {
    navigation.navigate('Envio');
  };

  // const handleRecibosPress = () => {
  //   console.log('Registro presionado');
  //   navigation.navigate('FormRecibos');
  // };

  const handleSend  = async () => {
    const objectSend = {
      ...value,
      email:value,
      password:value,
    }
    if(Object.values(value).includes("")){
      alert("Complete todos los campos")
    }
    try {
      const response = await handleCreateUser(objectSend);
      if(response){
        alert("Usuario creado con exito")
        setValues(INITIAL_STATE);
      }else{
        alert("El usuarios no se pudo crear");
      }
    } catch (error) {
      alert("problema interno del servidor")
    }
    console.log("valor del formulario"  + JSON.stringify(objectSend));
  }
  return (
    <View style={styles.container}>
      {/* INPUT DE USUARIO */}
      <TextInput
        style={styles.input}
        placeholder='Correo Electrónico'
        placeholderTextColor="#546574"
        value={value.email}
        onChangeText={(text) => getValuesLogin("email",text)}
      />

      {/* INPUT PARA CONTRASEÑA */}
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        placeholderTextColor="#546574"
        secureTextEntry={true}
        value={value.password}
        onChangeText={(text) => getValuesLogin("password",text)}
      />

      {/* BOTÓN DE INICIO DE SESIÓN */}
      <TouchableOpacity  onPress={handleSend} style={styles.button}>
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