import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react'
import CustomAlert from '../componentes/CustomAlert';
import ErrorAlert from '../componentes/ErrorAlert';
import useAuth from '../hooks/useAuth';
// import CustomAlert from '../../Alertas/CustomAlert';

const LoginForm = () => {
  const navigation = useNavigation();
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const { loginAccess } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  //Logica de Iniciar Secion


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      const response = await loginAccess(credentials);
      if (response) {
        //setSuccessAlertVisible(true); // Mostrar alerta de inicio de sesión exitoso
        navigation.navigate("Home");
      } else {
        setErrorAlertVisible(true); // Mostrar alerta de error de inicio de sesión
      }
    } catch (error) {
      setErrorAlertVisible(true); // Mostrar alerta de error de inicio de sesión
    }
  };
  //Aqui Termina

  const handleIniciarPress = () => {
    navigation.navigate('Envio');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
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

      <View style={styles.passwordContainer}>
        {/* INPUT PARA CONTRASEÑA */}
        <TextInput
          style={styles.passwordInput}
          placeholder='Contraseña'
          placeholderTextColor="#546574"
          secureTextEntry={!showPassword} // Utiliza SecureTextEntry para ocultar la contraseña
          onChangeText={(text) =>
            setCredentials((prevCredentials) => ({
              ...prevCredentials,
              password: text,
            }))
          }
        />
         <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)} // Cambia la visibilidad de la contraseña al tocar el botón
          style={styles.showPasswordButton}
        >
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="#546574"
          />
        </TouchableOpacity>
      </View>


      {/* BOTÓN DE INICIO DE SESIÓN */}
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* OPCIÓN PARA RECUPERAR CONTRASEÑA */}
      <TouchableOpacity onPress={handleIniciarPress}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <CustomAlert isVisible={successAlertVisible} onClose={() => setSuccessAlertVisible(false)}/>
      <ErrorAlert isVisible={errorAlertVisible} onClose={() => setErrorAlertVisible(false)}/>
    </View>
    <View style={styles.redSection}></View>
    </View>
  )
}


const styles = StyleSheet.create({

  container: {
    marginTop: 100, // Puedes ajustar este valor según tus necesidades
    flex: 1,
    justifyContent: 'center',
  },

  box:{ 
    position: 'relative',
    backgroundColor:'#D9D9D9',
    padding:40,
    borderRadius: 15,
    zIndex: 1,
    margin: 10,
    bottom: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },

  redSection: {
    position: 'absolute', 
    top: '30%',
    width: '100%', 
    height: '100%', 
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor: '#0258FE',
  },

  passwordContainer: {
    position: 'absolute',
    flex: 1,  
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    padding: 1,
    top:'40%'
  },

  passwordInput: {
    marginBottom:5 ,
    fontSize: 17,
    borderBottomWidth: 1, 
    borderBottomColor: 'blue',  
    width:'100%',
    color: '#546574',
    padding: 8,
    borderRadius: 5,
    textAlign: 'left',
    left:'20%'
  },

  showPasswordButton: {
    position: 'absolute',
    right: '8%',
    padding: 5,
    
    
  },

  input: {
    marginBottom: 20,
    fontSize: 17,
    borderBottomWidth: 1, // Cambiado de borderWidth
    borderBottomColor: 'blue', // Cambiado de borderColo
    color: '#546574',
    color: '#546574',
    padding: 10,
    width:'100%',
    textAlign: 'left'
  },
  button: {
    backgroundColor: '#0258FE',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: '30%',
    borderRadius: 10,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  forgotPasswordText: {
    color: 'blue',
    marginTop: 12,
    textAlign: 'center',
    fontSize: 15,
  }


})

export default LoginForm;
