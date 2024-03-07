import React, { useState,useEffect  } from 'react'
import {  View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native'
import { registroUsuario } from '../api';
import { obtenerPais } from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';


const FormReg = () => {
  const [data, setData] = useState({
    id:'',
    nombre:'',
    email:'',
    password:'',
    pais: 'Selecciona un país',
  });
  const [countries, setCountries] = useState(['Selecciona un país']);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await obtenerPais();
        setCountries(['Selecciona un país', ...countriesData]);
      } catch (error) {
        // Manejar errores si es necesario
      }
    };

    loadCountries();
  }, []);

  const EnviarDatos = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (
      !data.nombre ||
      !emailRegex.test(data.email) ||
      data.password.length < 8 ||
      data.pais === 'Selecciona un país'
    ) {
      if (!emailRegex.test(data.email)) {
        alert('Ingresa una dirección de correo electrónico válida.');
      } else if (data.password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
      } else {
        alert('Por favor, llena todos los campos correctamente.');
      }
      return; // Si no están llenos o la contraseña es menor a 8 caracteres, termina la función aquí
    }
    try{ 
    const response = await registroUsuario(data);
    console.log('Respuesta de la API:', response);
    toggleModal();
    setData({
      id: '',
      nombre: '',
      email: '',
      password: '',
      pais: 'Selecciona un país',
      });
  } catch (error) {
    console.error('Error al enviar datos:', error.message);
  }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.Tittle}>Registro</Text>
      <TextInput
      style={styles.input} 
         placeholder="Correo Electronico"
         placeholderTextColor="#546574"
         value={data.email}
         onChangeText={(text) => setData({...data, email:text})}
      />
      <View style={styles.passwordContainer}>
       <TextInput
        style={styles.passwordInput}
        placeholder=" Contraseña"
        placeholderTextColor="#546574"
        secureTextEntry={!showPassword} // Utiliza SecureTextEntry para ocultar la contraseña
        value={data.password}
        onChangeText={(text) => setData({ ...data, password: text })}
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
      <TextInput
      style={styles.input} 
         placeholder="Nombre del Negocio"
         placeholderTextColor="#546574"
         value={data.nombre}
         onChangeText={(text) => setData({...data, nombre:text})}
      />
      
      <Text>Selecciona un país:</Text>
      <Picker
        selectedValue={data.pais}
        onValueChange={(itemValue, itemIndex) => setData({ ...data, pais: itemValue })}
      >
        {countries.map((country, index) => (
          <Picker.Item key={index} label={country} value={country} />
        ))}
      </Picker>

      <Text>País seleccionado: {selectedCountry}</Text>

      <TouchableOpacity style={styles.buttonRegister} onPress={EnviarDatos}>
          <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modalContainer}>
          <Icon name="check-circle" size={80} color="green" style={styles.icon} />
          <Text style={styles.modalText}>Registro Exitoso</Text>
          <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
      textAlign: 'center',
      marginBottom: 50,
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
    buttonRegister: {
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
    selectedItem: {
      width: '100%',
      marginBottom: 9,
      fontSize: 16,
      borderWidth: 1,
      borderColor: 'red',
      height: 30,
      color: '#546574',
      textAlign: 'center',
      padding: 4,
      borderRadius: 5
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: 'gray',
      
      padding: 10,
    },
    passwordInput: {
        flex:1,
        marginBottom: 25,
        fontSize: 17,
        borderBottomWidth: 1, // Cambiado de borderWidth
        borderBottomColor: 'red', // Cambiado de borderColor
        height: 40,
        color: '#546574',
        padding: 10,
        borderRadius: 5,
    },
    showPasswordButton: {
      padding: 5,
      paddingBottom: 25,
    },
    //alerta modal
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 50,
      alignItems: 'center',
    },
    icon: {
      marginBottom: 20,
    },
    modalText: {
      fontSize: 25,
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: 'green',
      padding: 20,
      borderRadius: 10,
    },
    modalButtonText: {
      color: 'white',
      fontSize: 25,
    },
  })

export default FormReg